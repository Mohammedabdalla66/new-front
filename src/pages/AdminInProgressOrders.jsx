import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Filter, RefreshCw, Eye, AlertTriangle, CheckCircle, 
  XCircle, Clock, MessageSquare, FileText, DollarSign, User, 
  Building2, Calendar, TrendingUp, Shield, Send, Ban, 
  PlayCircle, CheckCircle2, FileDown, AlertCircle, Info, ArrowLeft
} from 'lucide-react';
import { adminAPI } from '../services/api';
import { socket } from '../services/socket';
import Navbar from '../components/Layout/Navbar';
import AdminSidebar from '../components/sidebar/AdminSidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';

const AdminInProgressOrders = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [systemMessage, setSystemMessage] = useState('');
  const [warningData, setWarningData] = useState({ target: 'client', message: '' });
  const [statusAction, setStatusAction] = useState({ orderId: null, newStatus: '' });

  // Fetch in-progress orders
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getInProgressOrders({
        page,
        limit: 25,
        q: searchQuery,
      });
      
      if (response.data.success) {
        setOrders(response.data.data || []);
        setTotalPages(response.data.meta?.pages || 1);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery]);

  // Fetch order details
  const fetchOrderDetails = useCallback(async (orderId) => {
    try {
      setDetailsLoading(true);
      const response = await adminAPI.getOrderDetails(orderId);
      if (response.data.success) {
        setOrderDetails(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to load order details');
    } finally {
      setDetailsLoading(false);
    }
  }, []);

  // Socket event handlers
  useEffect(() => {
    const handleOrderUpdated = (data) => {
      if (data.orderId) {
        // Refresh orders list
        fetchOrders();
        // If the updated order is currently open, refresh its details
        if (selectedOrder === data.orderId) {
          fetchOrderDetails(data.orderId);
        }
      }
    };

    const handleStatusChanged = (data) => {
      toast.success(`Order status changed: ${data.oldStatus} → ${data.newStatus}`);
      fetchOrders();
      if (selectedOrder === data.orderId) {
        fetchOrderDetails(data.orderId);
      }
    };

    const handleMessageSent = (data) => {
      if (selectedOrder === data.orderId) {
        fetchOrderDetails(data.orderId);
      }
    };

    const handleRiskUpdated = (data) => {
      setOrders(prev => prev.map(order => 
        order._id === data.orderId 
          ? { ...order, riskScore: data.riskScore, riskFactors: data.riskFactors }
          : order
      ));
      if (selectedOrder === data.orderId) {
        fetchOrderDetails(data.orderId);
      }
    };

    socket.on('adminOrderUpdated', handleOrderUpdated);
    socket.on('adminStatusChanged', handleStatusChanged);
    socket.on('adminMessageSent', handleMessageSent);
    socket.on('orderRiskUpdated', handleRiskUpdated);

    return () => {
      socket.off('adminOrderUpdated', handleOrderUpdated);
      socket.off('adminStatusChanged', handleStatusChanged);
      socket.off('adminMessageSent', handleMessageSent);
      socket.off('orderRiskUpdated', handleRiskUpdated);
    };
  }, [selectedOrder, fetchOrders, fetchOrderDetails]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle order click
  const handleOrderClick = async (order) => {
    setSelectedOrder(order._id);
    setIsDetailsOpen(true);
    await fetchOrderDetails(order._id);
  };

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!statusAction.orderId || !statusAction.newStatus) return;
    
    try {
      await adminAPI.updateOrderStatus(statusAction.orderId, statusAction.newStatus);
      toast.success('Order status updated successfully');
      setStatusAction({ orderId: null, newStatus: '' });
      fetchOrders();
      if (selectedOrder === statusAction.orderId) {
        fetchOrderDetails(statusAction.orderId);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  // Handle system message
  const handleSendSystemMessage = async () => {
    if (!systemMessage.trim() || !selectedOrder) return;
    
    try {
      await adminAPI.sendSystemMessage(selectedOrder, systemMessage);
      toast.success('System message sent');
      setSystemMessage('');
      fetchOrderDetails(selectedOrder);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    }
  };

  // Handle add warning
  const handleAddWarning = async () => {
    if (!warningData.message.trim() || !selectedOrder) return;
    
    try {
      await adminAPI.addWarning(selectedOrder, warningData.target, warningData.message);
      toast.success('Warning added successfully');
      setWarningData({ target: 'client', message: '' });
      fetchOrderDetails(selectedOrder);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add warning');
    }
  };

  // Handle risk recalculation
  const handleRecalculateRisk = async () => {
    if (!selectedOrder) return;
    
    try {
      await adminAPI.recalculateRiskScore(selectedOrder);
      toast.success('Risk score recalculated');
      fetchOrderDetails(selectedOrder);
    } catch (error) {
      toast.error('Failed to recalculate risk score');
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const badges = {
      'pending': { bg: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', label: 'Pending Review' },
      'active': { bg: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: 'Active' },
      'in-progress': { bg: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'In Progress' },
      'suspended': { bg: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: 'Suspended' },
      'completed': { bg: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200', label: 'Completed' },
    };
    const badge = badges[status] || badges['pending'];
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${badge.bg}`}>
        {badge.label}
      </span>
    );
  };

  // Get risk indicator
  const getRiskIndicator = (riskScore) => {
    if (riskScore >= 70) {
      return { color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900', label: 'High Risk' };
    } else if (riskScore >= 40) {
      return { color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900', label: 'Medium Risk' };
    } else {
      return { color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900', label: 'Low Risk' };
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <AdminSidebar isMobileOpen={isSidebarOpen} onMobileClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/admin')}
                  className="md:hidden"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white">
                    {t('inProgressOrders')}
                  </h1>
                  <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-1">
                    {t('manageAndMonitorOrders')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchOrders}
                  className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode(viewMode === 'table' ? 'card' : 'table')}
                  className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  {viewMode === 'table' ? 'Card View' : 'Table View'}
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search by client, provider, title, ID, or price..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Orders List */}
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-neutral-400" />
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-neutral-600 dark:text-neutral-400">{t('noInProgressOrdersFound')}</p>
                </CardContent>
              </Card>
            ) : viewMode === 'table' ? (
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Project Title</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => {
                        const risk = getRiskIndicator(order.riskScore || 0);
                        return (
                          <TableRow 
                            key={order._id} 
                            className="cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            onClick={() => handleOrderClick(order)}
                          >
                            <TableCell className="font-mono text-xs">
                              {order._id.toString().slice(-8)}
                            </TableCell>
                            <TableCell className="font-medium">
                              {order.projectTitle || order.request?.title || 'N/A'}
                            </TableCell>
                            <TableCell>
                              {order.client?.name || 'Unknown'}
                            </TableCell>
                            <TableCell>
                              {order.serviceProvider?.name || 'Unknown'}
                            </TableCell>
                            <TableCell>
                              {order.proposal?.price 
                                ? `OMR ${order.proposal.price.toFixed(2)}`
                                : order.offerId?.price 
                                ? `OMR ${order.offerId.price.toFixed(2)}`
                                : 'N/A'}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className={`px-2 py-1 rounded ${risk.bg}`}>
                                  <span className={`text-xs font-medium ${risk.color}`}>
                                    {order.riskScore || 0}
                                  </span>
                                </div>
                                {order.riskScore >= 70 && (
                                  <AlertTriangle className="h-4 w-4 text-red-500" />
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              {order.deadline 
                                ? new Date(order.deadline).toLocaleDateString()
                                : 'N/A'}
                            </TableCell>
                            <TableCell onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleOrderClick(order)}
                                className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders.map((order) => {
                  const risk = getRiskIndicator(order.riskScore || 0);
                  return (
                    <Card 
                      key={order._id}
                      className="cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => handleOrderClick(order)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg">
                              {order.projectTitle || order.request?.title || 'Untitled'}
                            </CardTitle>
                            <p className="text-xs text-neutral-500 mt-1 font-mono">
                              #{order._id.toString().slice(-8)}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Client:</span>
                          <span className="font-medium">{order.client?.name || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Provider:</span>
                          <span className="font-medium">{order.serviceProvider?.name || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Price:</span>
                          <span className="font-bold">
                            {order.proposal?.price 
                              ? `OMR ${order.proposal.price.toFixed(2)}`
                              : order.offerId?.price 
                              ? `OMR ${order.offerId.price.toFixed(2)}`
                              : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-neutral-600 dark:text-neutral-400">Risk Score:</span>
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded ${risk.bg}`}>
                              <span className={`text-xs font-medium ${risk.color}`}>
                                {order.riskScore || 0} - {risk.label}
                              </span>
                            </div>
                            {order.riskScore >= 70 && (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </div>
                        {order.deadline && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-neutral-600 dark:text-neutral-400">Deadline:</span>
                            <span>{new Date(order.deadline).toLocaleDateString()}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-800 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {/* Order Details Modal */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>

                {detailsLoading ? (
                  <div className="text-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin mx-auto text-neutral-400" />
                    <p className="mt-2 text-neutral-600 dark:text-neutral-400">Loading details...</p>
                  </div>
                ) : orderDetails ? (
                  <div className="space-y-6">
                    {/* Order Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Order Summary</span>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(orderDetails.status)}
                            <div className={`px-3 py-1 rounded ${getRiskIndicator(orderDetails.riskScore || 0).bg}`}>
                              <span className={`text-sm font-medium ${getRiskIndicator(orderDetails.riskScore || 0).color}`}>
                                Risk: {orderDetails.riskScore || 0}
                              </span>
                            </div>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Project Title</p>
                          <p className="font-medium">{orderDetails.projectTitle || orderDetails.request?.title || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Price</p>
                          <p className="font-medium">
                            {orderDetails.proposal?.price 
                              ? `OMR ${orderDetails.proposal.price.toFixed(2)}`
                              : orderDetails.offerId?.price 
                              ? `OMR ${orderDetails.offerId.price.toFixed(2)}`
                              : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Start Date</p>
                          <p className="font-medium">
                            {orderDetails.startDate 
                              ? new Date(orderDetails.startDate).toLocaleDateString()
                              : orderDetails.createdAt 
                              ? new Date(orderDetails.createdAt).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Deadline</p>
                          <p className="font-medium">
                            {orderDetails.deadline 
                              ? new Date(orderDetails.deadline).toLocaleDateString()
                              : 'N/A'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Client Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Client Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Name</p>
                          <p className="font-medium">{orderDetails.client?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Email</p>
                          <p className="font-medium">{orderDetails.client?.email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Phone</p>
                          <p className="font-medium">{orderDetails.client?.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Verified</p>
                          <p className="font-medium">
                            {orderDetails.client?.verified ? (
                              <span className="text-green-600">✓ Verified</span>
                            ) : (
                              <span className="text-red-600">✗ Not Verified</span>
                            )}
                          </p>
                        </div>
                        {orderDetails.clientHistory && orderDetails.clientHistory.length > 0 && (
                          <div className="col-span-2">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Previous Orders</p>
                            <div className="space-y-1">
                              {orderDetails.clientHistory.slice(0, 5).map((booking) => (
                                <div key={booking._id} className="text-sm">
                                  {booking.request?.title || 'Order'} - {booking.status}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Provider Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          Provider Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Name</p>
                          <p className="font-medium">{orderDetails.serviceProvider?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Email</p>
                          <p className="font-medium">{orderDetails.serviceProvider?.email || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Phone</p>
                          <p className="font-medium">{orderDetails.serviceProvider?.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Verified</p>
                          <p className="font-medium">
                            {orderDetails.serviceProvider?.verified ? (
                              <span className="text-green-600">✓ Verified</span>
                            ) : (
                              <span className="text-red-600">✗ Not Verified</span>
                            )}
                          </p>
                        </div>
                        {orderDetails.providerHistory && orderDetails.providerHistory.length > 0 && (
                          <div className="col-span-2">
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Previous Orders</p>
                            <div className="space-y-1">
                              {orderDetails.providerHistory.slice(0, 5).map((booking) => (
                                <div key={booking._id} className="text-sm">
                                  {booking.request?.title || 'Order'} - {booking.status}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Offer Details */}
                    {orderDetails.offerId && (
                      <Card>
                        <CardHeader>
                          <CardTitle>Offer Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">Price</p>
                              <p className="font-medium text-lg">OMR {orderDetails.offerId.price?.toFixed(2) || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">Duration</p>
                              <p className="font-medium">{orderDetails.offerId.durationDays || 'N/A'} days</p>
                            </div>
                          </div>
                          {orderDetails.offerId.notes && (
                            <div>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">Description</p>
                              <p className="font-medium">{orderDetails.offerId.notes}</p>
                            </div>
                          )}
                          {orderDetails.offerId.attachments && orderDetails.offerId.attachments.length > 0 && (
                            <div>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Attachments</p>
                              <div className="space-y-2">
                                {orderDetails.offerId.attachments.map((file, idx) => (
                                  <a
                                    key={idx}
                                    href={file.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-primary-600 hover:underline"
                                  >
                                    <FileText className="h-4 w-4" />
                                    {file.name || `Attachment ${idx + 1}`}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}

                    {/* Project Timeline */}
                    {orderDetails.timeline && orderDetails.timeline.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Project Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {orderDetails.timeline.map((event, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary-500 mt-2" />
                                <div className="flex-1">
                                  <p className="font-medium">{event.event.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {new Date(event.date).toLocaleString()}
                                  </p>
                                  {event.description && (
                                    <p className="text-sm mt-1">{event.description}</p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Payments */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Payment Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Payment Status</p>
                          <p className="font-medium capitalize">{orderDetails.paymentStatus || 'pending'}</p>
                        </div>
                        {orderDetails.transactions && orderDetails.transactions.length > 0 && (
                          <div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">Transaction History</p>
                            <div className="space-y-2">
                              {orderDetails.transactions.slice(0, 10).map((txn) => (
                                <div key={txn._id} className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800 rounded">
                                  <div>
                                    <p className="text-sm font-medium">{txn.type}</p>
                                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {new Date(txn.createdAt).toLocaleString()}
                                    </p>
                                  </div>
                                  <p className="font-medium">OMR {txn.amount?.toFixed(2) || '0.00'}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Files */}
                    {orderDetails.files && orderDetails.files.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Files
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {orderDetails.files.map((file, idx) => (
                              <a
                                key={idx}
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-800 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700"
                              >
                                <div className="flex items-center gap-2">
                                  <FileDown className="h-4 w-4" />
                                  <span className="text-sm">{file.name || `File ${idx + 1}`}</span>
                                </div>
                                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                  {new Date(file.createdAt).toLocaleDateString()}
                                </span>
                              </a>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Chat Thread */}
                    {orderDetails.messages && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="h-5 w-5" />
                            Chat Thread
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3 max-h-96 overflow-y-auto">
                            {orderDetails.messages.length === 0 ? (
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center py-4">
                                No messages yet
                              </p>
                            ) : (
                              orderDetails.messages.map((msg) => (
                                <div
                                  key={msg._id}
                                  className={`p-3 rounded-lg ${
                                    msg.sender === 'admin'
                                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                                      : msg.sender === 'client'
                                      ? 'bg-blue-50 dark:bg-blue-900/20'
                                      : 'bg-green-50 dark:bg-green-900/20'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs font-medium">
                                      {msg.sender === 'admin' 
                                        ? '🔧 Admin' 
                                        : msg.sender === 'client'
                                        ? `👤 ${msg.client?.name || 'Client'}`
                                        : `🏢 ${msg.serviceProvider?.name || 'Provider'}`}
                                    </span>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {new Date(msg.createdAt).toLocaleString()}
                                    </span>
                                  </div>
                                  <p className="text-sm">{msg.text}</p>
                                  {msg.file && (
                                    <a
                                      href={msg.file.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-2 mt-2 text-sm text-primary-600 hover:underline"
                                    >
                                      <FileText className="h-4 w-4" />
                                      {msg.file.name || 'File'}
                                    </a>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Risk Insights */}
                    {orderDetails.riskFactors && orderDetails.riskFactors.length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Risk Analysis
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {orderDetails.riskFactors.map((factor, idx) => (
                              <div
                                key={idx}
                                className={`p-3 rounded-lg ${
                                  factor.severity === 'critical' || factor.severity === 'high'
                                    ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                                    : factor.severity === 'medium'
                                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
                                    : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium capitalize">{factor.factor.replace(/_/g, ' ')}</span>
                                  <span className={`text-xs px-2 py-1 rounded capitalize ${
                                    factor.severity === 'critical' || factor.severity === 'high'
                                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                      : factor.severity === 'medium'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                  }`}>
                                    {factor.severity}
                                  </span>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">{factor.details}</p>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={handleRecalculateRisk}
                            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                          >
                            Recalculate Risk Score
                          </button>
                        </CardContent>
                      </Card>
                    )}

                    {/* Admin Actions */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Admin Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Status Update */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Update Status</label>
                          <div className="flex gap-2">
                            <select
                              value={statusAction.newStatus}
                              onChange={(e) => setStatusAction({ orderId: selectedOrder, newStatus: e.target.value })}
                              className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900"
                            >
                              <option value="">Select status...</option>
                              <option value="suspended">Suspend</option>
                              <option value="in-progress">Reopen</option>
                              <option value="completed">Force Complete</option>
                            </select>
                            <button
                              onClick={handleStatusUpdate}
                              disabled={!statusAction.newStatus}
                              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                            >
                              Update
                            </button>
                          </div>
                        </div>

                        {/* System Message */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Send System Message</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={systemMessage}
                              onChange={(e) => setSystemMessage(e.target.value)}
                              placeholder="Enter system message..."
                              className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900"
                            />
                            <button
                              onClick={handleSendSystemMessage}
                              disabled={!systemMessage.trim()}
                              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Add Warning */}
                        <div>
                          <label className="block text-sm font-medium mb-2">Add Warning</label>
                          <div className="space-y-2">
                            <select
                              value={warningData.target}
                              onChange={(e) => setWarningData({ ...warningData, target: e.target.value })}
                              className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900"
                            >
                              <option value="client">Client</option>
                              <option value="provider">Provider</option>
                            </select>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={warningData.message}
                                onChange={(e) => setWarningData({ ...warningData, message: e.target.value })}
                                placeholder="Warning message..."
                                className="flex-1 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg bg-white dark:bg-neutral-900"
                              />
                              <button
                                onClick={handleAddWarning}
                                disabled={!warningData.message.trim()}
                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50"
                              >
                                <AlertCircle className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Warnings List */}
                        {orderDetails.warnings && orderDetails.warnings.length > 0 && (
                          <div>
                            <label className="block text-sm font-medium mb-2">Active Warnings</label>
                            <div className="space-y-2">
                              {orderDetails.warnings.map((warning, idx) => (
                                <div
                                  key={idx}
                                  className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium capitalize">{warning.target}</span>
                                    <span className="text-xs text-neutral-600 dark:text-neutral-400">
                                      {new Date(warning.createdAt).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-sm">{warning.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ) : null}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminInProgressOrders;

