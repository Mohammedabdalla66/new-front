import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  X
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
  const language = i18n.language || 'en';
  // Data
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t("pendingRequests")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t("reviewApproveRejectRequests")}
              </p>
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
                  <div className="overflow-x-auto">
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
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getServiceTitleLabel(selectedRequest?.title, language || 'en')}</DialogTitle>
            <DialogDescription>
              {t("fullRequestDetailsAttachments")}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("description")}
                </label>
                <p className="mt-1 text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                  {selectedRequest.description}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                    {formatCurrency(selectedRequest.budget)}
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
              {selectedRequest.attachments.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    {t("attachments")} ({selectedRequest.attachments.length})
                  </label>
                  <div className="space-y-2">
                    {selectedRequest.attachments.map((att, idx) => (
                      <a
                        key={idx}
                        href={att.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Download className="w-4 h-4 text-gray-500" />
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


