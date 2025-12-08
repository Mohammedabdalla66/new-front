import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  ChevronRight,
  DollarSign,
  Calendar,
  User,
  Loader2,
  Clock,
  Download,
  X,
  ArrowLeft
} from 'lucide-react';
import Navbar from '../components/Layout/Navbar';
import AdminSidebar from '../components/sidebar/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import Toast from '../components/ui/toast';
import AlertDialog from '../components/ui/alert-dialog';
import { adminAPI } from '../services/api';
import { getServiceTitleLabel } from '../utils/titleUtils';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const PendingRequests = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const language = i18n.language || 'en';
  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Data
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Mobile sidebar handlers
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');

  // Dialogs / Modals
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Selection
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Load requests from API
  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.listPendingRequests();
        const requestsData = response.data?.data || response.data || [];
        setRequests(requestsData.map(request => {
          const requestId = request._id || request.id;
          return {
            id: requestId?.toString ? requestId.toString() : String(requestId),
            title: request.title || 'N/A',
            description: request.description || '',
            clientName: request.client?.name || 'N/A',
            clientEmail: request.client?.email || '',
            clientId: request.client?._id || request.client,
            budget: request.budget || 0,
            deadline: request.deadline,
            attachments: request.attachments || [],
            status: request.status || 'pending',
            rejectionReason: request.rejectionReason || '',
            createdAt: request.createdAt,
            legalForm: request.legalForm || '',
            businessActivity: request.businessActivity || '',
            registeredCapital: request.registeredCapital || '',
            estimatedRevenue: request.estimatedRevenue || '',
            estimatedExpenses: request.estimatedExpenses || '',
          };
        }));
      } catch (error) {
        console.error('Error loading requests:', error);
        toast.error(error?.response?.data?.message || t("failedToLoadRequests"));
      } finally {
        setLoading(false);
      }
    };
    loadRequests();
  }, []);

  // Derived: filtered list (search)
  const filteredRequests = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return requests.filter((r) => {
      const matchesSearch = !q
        ? true
        : r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.clientName.toLowerCase().includes(q);
      return matchesSearch;
    });
  }, [requests, searchQuery]);

  // Handlers: View
  const handleView = (request) => {
    setSelectedRequest(request);
    setViewDialogOpen(true);
  };

  // Handlers: Approve
  const handleApprove = (request) => {
    setSelectedRequest(request);
    setConfirmAction('approve');
    setConfirmDialogOpen(true);
  };

  const confirmApprove = async () => {
    if (!selectedRequest) return;
    try {
      await adminAPI.approveRequest(selectedRequest.id);
      toast.success(t("requestApprovedSuccessfully"));
      setRequests(requests.filter(r => r.id !== selectedRequest.id));
      setConfirmDialogOpen(false);
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error(error?.response?.data?.message || t("failedToApproveRequest"));
    }
  };

  // Handlers: Reject
  const handleReject = (request) => {
    setSelectedRequest(request);
    setRejectionReason('');
    setRejectDialogOpen(true);
  };

  const confirmReject = async () => {
    if (!selectedRequest || !rejectionReason.trim()) {
      toast.error(t("pleaseProvideRejectionReason"));
      return;
    }
    try {
      console.log('Rejecting request:', {
        id: selectedRequest.id,
        status: selectedRequest.status,
        reason: rejectionReason.trim()
      });
      await adminAPI.rejectRequest(selectedRequest.id, rejectionReason);
      toast.success(t("requestRejectedSuccessfully"));
      setRequests(requests.filter(r => r.id !== selectedRequest.id));
      setRejectDialogOpen(false);
      setSelectedRequest(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting request:', error);
      console.error('Error response:', error?.response?.data);
      const errorMessage = error?.response?.data?.message || 
                          error?.message || 
                          t("failedToRejectRequest");
      toast.error(errorMessage);
      
      // If the request status is not pending, show a helpful message
      if (errorMessage.includes('Only pending requests can be rejected') || 
          errorMessage.includes('pending')) {
        toast.warning(t("thisRequestMayHaveBeenProcessed"));
        // Reload requests to get updated status
        const loadRequests = async () => {
          try {
            const response = await adminAPI.listPendingRequests();
            const requestsData = response.data?.data || response.data || [];
            setRequests(requestsData.map(request => {
              const requestId = request._id || request.id;
              return {
                id: requestId?.toString ? requestId.toString() : String(requestId),
                title: request.title || 'N/A',
                description: request.description || '',
                clientName: request.client?.name || 'N/A',
                clientEmail: request.client?.email || '',
                clientId: request.client?._id || request.client,
                budget: request.budget || 0,
                deadline: request.deadline,
                attachments: request.attachments || [],
                status: request.status || 'pending',
                rejectionReason: request.rejectionReason || '',
                createdAt: request.createdAt,
                legalForm: request.legalForm || '',
                businessActivity: request.businessActivity || '',
                registeredCapital: request.registeredCapital || '',
                estimatedRevenue: request.estimatedRevenue || '',
                estimatedExpenses: request.estimatedExpenses || '',
              };
            }));
          } catch (e) {
            console.error('Error reloading requests:', e);
          }
        };
        loadRequests();
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t("notAvailable");
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return t("notSpecified");
    return `${amount.toLocaleString()} OMR`;
  };

  // Helper function to get legal form label
  const getLegalFormLabel = (value) => {
    if (!value) return t("notSpecified");
    const options = {
      individual_trader: language === "ar" ? "تاجر فرد" : "Individual Trader",
      sole_partner: language === "ar" ? "الشريك الواحد" : "Sole Partner",
      limited_liability: language === "ar" ? "محدودية المسؤولية" : "Limited Liability",
      public_company: language === "ar" ? "مساهمة عامة" : "Public Company",
      closed_company: language === "ar" ? "مساهمة مغلقة" : "Closed Company",
      limited_partnership: language === "ar" ? "توصية" : "Limited Partnership",
      solidarity_company: language === "ar" ? "تضامنية" : "Solidarity Company",
    };
    return options[value] || value;
  };

  // Helper function to get business activity label
  const getBusinessActivityLabel = (value) => {
    if (!value) return t("notSpecified");
    const options = {
      financial_sector: language === "ar" ? "القطاع المالي" : "Financial Sector",
      industrial_sector: language === "ar" ? "القطاع الصناعي" : "Industrial Sector",
      oil_gas_sector: language === "ar" ? "قطاع النفط والغاز" : "Oil & Gas Sector",
      tourism_sector: language === "ar" ? "القطاع السياحي" : "Tourism Sector",
      service_sector: language === "ar" ? "القطاع الخدمي" : "Service Sector",
      construction_sector: language === "ar" ? "البناء والإنشاءات" : "Construction Sector",
      retail_sector: language === "ar" ? "قطاع التجزئة" : "Retail Sector",
      telecommunications_it: language === "ar" ? "الاتصالات وتقنية المعلومات" : "Telecommunications & IT",
      education_sector: language === "ar" ? "التعليم" : "Education Sector",
      public_sector: language === "ar" ? "قطاع عام" : "Public Sector",
    };
    return options[value] || value;
  };

  // Helper function to format number with OMR
  const formatNumber = (value) => {
    if (!value || value === '') return t("notSpecified");
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return t("notSpecified");
    return `${numValue.toLocaleString()} OMR`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={closeSidebar}
          role="presentation"
        />
      )}
      <AdminSidebar isMobileOpen={isSidebarOpen} onMobileClose={closeSidebar} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onToggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header with Back Button */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
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
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("pendingRequests")}
                  </h1>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {t("reviewApproveRejectRequests")}
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder={t("searchByTitleDescriptionClient")}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requests Table */}
            <Card>
              <CardHeader>
                <CardTitle>{t("pendingRequests")} ({filteredRequests.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  </div>
                ) : filteredRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      {searchQuery ? t("noRequestsMatchSearch") : t("noPendingRequests")}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t("title")}</TableHead>
                            <TableHead>{t("client")}</TableHead>
                            <TableHead>{t("budget")}</TableHead>
                            <TableHead>{t("deadline")}</TableHead>
                            <TableHead>{t("submitted")}</TableHead>
                            <TableHead>{t("attachments")}</TableHead>
                            <TableHead className="text-right">{t("actions")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {getServiceTitleLabel(request.title, language || 'en')}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                  {request.description}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <div className="font-medium">{request.clientName}</div>
                                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                                    {request.clientEmail}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{formatCurrency(request.budget)}</TableCell>
                              <TableCell>{formatDate(request.deadline)}</TableCell>
                              <TableCell>{formatDate(request.createdAt)}</TableCell>
                              <TableCell>
                                {request.attachments.length > 0 ? (
                                  <Badge variant="secondary">
                                    {request.attachments.length} {t("files")}
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400">{t("none")}</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleView(request)}
                                  >
                                    <Eye className="w-4 h-4 mr-1" />
                                    {t("view")}
                                  </Button>
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApprove(request)}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    {t("approve")}
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleReject(request)}
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    {t("reject")}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-4">
                      {filteredRequests.map((request) => (
                        <Card key={request.id}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  {getServiceTitleLabel(request.title, language || 'en')}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                  {request.description}
                                </p>
                              </div>
                              
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">{t("client")}:</span>
                                  <span className="font-medium text-gray-900 dark:text-white">{request.clientName}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">{t("budget")}:</span>
                                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(request.budget)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">{t("deadline")}:</span>
                                  <span className="font-medium text-gray-900 dark:text-white">{formatDate(request.deadline)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-gray-500 dark:text-gray-400">{t("attachments")}:</span>
                                  <span className="font-medium text-gray-900 dark:text-white">
                                    {request.attachments.length > 0 ? (
                                      <Badge variant="secondary">
                                        {request.attachments.length} {t("files")}
                                      </Badge>
                                    ) : (
                                      <span className="text-gray-400">{t("none")}</span>
                                    )}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex flex-col gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleView(request)}
                                  className="w-full"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  {t("view")}
                                </Button>
                                <div className="flex gap-2">
                                  <Button
                                    variant="default"
                                    size="sm"
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                    onClick={() => handleApprove(request)}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    {t("approve")}
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleReject(request)}
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    {t("reject")}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getServiceTitleLabel(selectedRequest?.title, language || 'en')}</DialogTitle>
            <DialogDescription>
              {t("fullRequestDetailsAttachments")}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("basicInformation") || "Basic Information"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("description")}
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {selectedRequest.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("client")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedRequest.clientName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedRequest.clientEmail}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("budget")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {selectedRequest.budget || t("notSpecified")}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("deadline")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {formatDate(selectedRequest.deadline)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t("submitted")}
                      </label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">
                        {formatDate(selectedRequest.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("companyInformation") || "Company Information"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("legalFormLabel") || "Legal Form"}
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {getLegalFormLabel(selectedRequest.legalForm)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("businessActivityLabel") || "Business Activity"}
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {getBusinessActivityLabel(selectedRequest.businessActivity)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("registeredCapitalLabel") || "Registered Capital"}
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatNumber(selectedRequest.registeredCapital)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("estimatedRevenueLabel") || "Estimated Revenue"}
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatNumber(selectedRequest.estimatedRevenue)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("estimatedExpensesLabel") || "Estimated Expenses"}
                    </label>
                    <p className="mt-1 text-sm text-gray-900 dark:text-white">
                      {formatNumber(selectedRequest.estimatedExpenses)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              {selectedRequest.attachments.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t("attachments")} ({selectedRequest.attachments.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedRequest.attachments.map((att, idx) => (
                      <a
                        key={idx}
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <Download className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-900 dark:text-white truncate">
                          {att.name || `${t("file")} ${idx + 1}`}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("rejectRequest")}</DialogTitle>
            <DialogDescription>
              {t("provideRejectionReason")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                {t("rejectionReason")} *
              </label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={t("enterReasonForRejection")}
                rows={4}
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setRejectDialogOpen(false);
                  setRejectionReason('');
                }}
              >
                {t("cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={confirmReject}
                disabled={!rejectionReason.trim()}
              >
                {t("rejectRequest")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Dialog */}
      <AlertDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title={confirmAction === 'approve' ? t("approveRequest") : t("confirmAction")}
        description={
          confirmAction === 'approve'
            ? `${t("areYouSureApproveRequest").replace("{title}", getServiceTitleLabel(selectedRequest?.title, language || 'en'))}`
            : t("areYouSureWantToProceed")
        }
        confirmText={confirmAction === 'approve' ? t("approve") : t("confirm")}
        onConfirm={confirmApprove}
        variant={confirmAction === 'approve' ? 'default' : 'destructive'}
      />
    </div>
  );
};

export default PendingRequests;


