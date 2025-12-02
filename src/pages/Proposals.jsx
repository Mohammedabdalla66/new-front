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
  Clock
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
import Toast from '../components/ui/toast';
import AlertDialog from '../components/ui/alert-dialog';
import { adminAPI } from '../services/api';
import { getServiceTitleLabel } from '../utils/titleUtils';
import { useLanguage } from '../contexts/LanguageContext';

const Proposals = () => {
  const { language } = useLanguage();
  // Data
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');

  // Dialogs / Modals
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  // Selection
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [proposalToReject, setProposalToReject] = useState(null);

  // Toast
  const [toast, setToast] = useState({ open: false });

  // Load proposals from API
  useEffect(() => {
    const loadProposals = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.listPendingProposals();
        const proposalsData = response.data?.data || response.data || [];
        setProposals(proposalsData.map(proposal => ({
          id: proposal._id || proposal.id,
          requestTitle: proposal.request?.title || 'N/A',
          requestTitleDisplay: getServiceTitleLabel(proposal.request?.title, language || 'en'),
          requestId: proposal.request?._id || proposal.request,
          serviceProviderName: proposal.serviceProvider?.name || 'N/A',
          serviceProviderEmail: proposal.serviceProvider?.email || '',
          serviceProviderId: proposal.serviceProvider?._id || proposal.serviceProvider,
          price: proposal.price || 0,
          durationDays: proposal.durationDays || 0,
          notes: proposal.notes || '',
          status: proposal.status || 'pending',
          attachments: proposal.attachments || [],
          createdAt: proposal.createdAt,
        })));
      } catch (error) {
        console.error('Error loading proposals:', error);
        setToast({
          open: true,
          title: 'Error',
          description: error?.response?.data?.message || 'Failed to load proposals',
          variant: 'destructive'
        });
        setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
      } finally {
        setLoading(false);
      }
    };
    loadProposals();
  }, []);

  // Derived: filtered list (search + status)
  const filteredProposals = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return proposals.filter((p) => {
      const matchesStatus = statusFilter === 'all' ? true : p.status === statusFilter;
      const matchesSearch = !q
        ? true
        : p.requestTitle.toLowerCase().includes(q) ||
          p.serviceProviderName.toLowerCase().includes(q) ||
          p.notes.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [proposals, searchQuery, statusFilter]);

  // Handlers: View
  const openView = (proposal) => {
    setSelectedProposal(proposal);
    setViewDialogOpen(true);
  };

  // Approve/Reject workflow
  const approveProposal = async (proposal) => {
    try {
      await adminAPI.approveProposal(proposal.id);
      setProposals((prev) => prev.filter((p) => p.id !== proposal.id));
      setToast({
        open: true,
        title: 'Proposal approved',
        description: `Proposal for "${proposal.requestTitleDisplay || getServiceTitleLabel(proposal.requestTitle, language || 'en')}" has been approved.`,
        variant: 'success'
      });
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
      setViewDialogOpen(false);
    } catch (error) {
      console.error('Error approving proposal:', error);
      setToast({
        open: true,
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to approve proposal',
        variant: 'destructive'
      });
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
    }
  };

  const openRejectDialog = (proposal) => {
    setProposalToReject(proposal);
    setRejectionReason('');
    setRejectDialogOpen(true);
    setViewDialogOpen(false);
  };

  const rejectProposal = async () => {
    if (!proposalToReject) return;
    
    try {
      await adminAPI.rejectProposal(proposalToReject.id, rejectionReason);
      setProposals((prev) => prev.filter((p) => p.id !== proposalToReject.id));
      setToast({
        open: true,
        title: 'Proposal rejected',
        description: `Proposal for "${proposalToReject.requestTitleDisplay || getServiceTitleLabel(proposalToReject.requestTitle, language || 'en')}" has been rejected.`,
        variant: 'destructive'
      });
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
      setRejectDialogOpen(false);
      setProposalToReject(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      setToast({
        open: true,
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to reject proposal',
        variant: 'destructive'
      });
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
    }
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return 'Not specified';
    return `${amount.toLocaleString()} OMR`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header with Breadcrumb */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-900 dark:text-white font-medium">Proposals</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Proposal Management</h1>
                  <p className="text-neutral-600 dark:text-neutral-400">Review and approve/reject service provider proposals</p>
                </div>
              </div>
            </div>

            {/* Top Actions Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    {/* Search */}
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        placeholder="Search proposals by request title, provider name, or notes..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Status Filter */}
                    <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proposals Table */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Request</TableHead>
                          <TableHead>Service Provider</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProposals.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                              {statusFilter === 'pending' ? 'No pending proposals' : 'No proposals found'}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredProposals.map((proposal, index) => (
                            <motion.tr
                              key={proposal.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.06 }}
                              className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                            >
                              <TableCell className="font-medium max-w-xs truncate">
                                {proposal.requestTitleDisplay || proposal.requestTitle}
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">{proposal.serviceProviderName}</span>
                                  <span className="text-xs text-neutral-500">{proposal.serviceProviderEmail}</span>
                                </div>
                              </TableCell>
                              <TableCell>{formatCurrency(proposal.price)}</TableCell>
                              <TableCell>{proposal.durationDays} days</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    proposal.status === 'active'
                                      ? 'success'
                                      : proposal.status === 'pending'
                                      ? 'warning'
                                      : 'secondary'
                                  }
                                >
                                  {proposal.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{formatDate(proposal.createdAt)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => openView(proposal)}
                                    aria-label="View details"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  {proposal.status === 'pending' && (
                                    <>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </motion.tr>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* View Proposal Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                {selectedProposal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <DialogHeader>
                      <DialogTitle>Proposal Details</DialogTitle>
                      <DialogDescription>Review proposal information before approval.</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500">Request Title</div>
                          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {selectedProposal.requestTitleDisplay || getServiceTitleLabel(selectedProposal.requestTitle, language || 'en')}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500">Status</div>
                          <Badge
                            variant={
                              selectedProposal.status === 'active'
                                ? 'success'
                                : selectedProposal.status === 'pending'
                                ? 'warning'
                                : 'secondary'
                            }
                          >
                            {selectedProposal.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500">Service Provider</div>
                          <div className="text-sm text-neutral-900 dark:text-neutral-100">
                            {selectedProposal.serviceProviderName}
                          </div>
                          <div className="text-xs text-neutral-500">{selectedProposal.serviceProviderEmail}</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500">Submitted</div>
                          <div className="text-sm text-neutral-900 dark:text-neutral-100">
                            {formatDate(selectedProposal.createdAt)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500">Price</div>
                          <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {formatCurrency(selectedProposal.price)}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500">Duration</div>
                          <div className="text-sm text-neutral-900 dark:text-neutral-100">
                            {selectedProposal.durationDays} days
                          </div>
                        </div>
                      </div>

                      {selectedProposal.notes && (
                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500">Notes</div>
                          <div className="text-sm text-neutral-700 dark:text-neutral-300 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                            {selectedProposal.notes}
                          </div>
                        </div>
                      )}

                      {selectedProposal.attachments && selectedProposal.attachments.length > 0 && (
                        <div className="space-y-1">
                          <div className="text-xs text-neutral-500">Attachments</div>
                          <div className="space-y-2">
                            {selectedProposal.attachments.map((att, index) => (
                              <a
                                key={index}
                                href={att.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2 p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-sm text-blue-600 dark:text-blue-400"
                              >
                                <FileText className="w-4 h-4" />
                                <span>{att.name || `Attachment ${index + 1}`}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      <div className="text-sm text-neutral-500" />
                      {selectedProposal.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <Button variant="destructive" onClick={() => openRejectDialog(selectedProposal)}>
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject
                          </Button>
                          <Button onClick={() => approveProposal(selectedProposal)}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
                          </Button>
                        </div>
                      ) : (
                        <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                          Close
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </DialogContent>
            </Dialog>

            {/* Rejection Reason Dialog */}
            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Reject Proposal</DialogTitle>
                  <DialogDescription>
                    Please provide a reason for rejecting this proposal. This will be shown to the service provider.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-2">
                      Rejection Reason *
                    </label>
                    <textarea
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Enter the reason for rejecting this proposal..."
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                      required
                    />
                  </div>
                  {proposalToReject && (
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      <p className="font-medium mb-1">Proposal Details:</p>
                      <p>Request: {proposalToReject.requestTitleDisplay || getServiceTitleLabel(proposalToReject.requestTitle, language || 'en')}</p>
                      <p>Service Provider: {proposalToReject.serviceProviderName}</p>
                      <p>Price: {proposalToReject.price?.toLocaleString()} OMR</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => {
                    setRejectDialogOpen(false);
                    setRejectionReason('');
                    setProposalToReject(null);
                  }}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={rejectProposal}
                    disabled={!rejectionReason.trim()}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject Proposal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </main>
        {/* Toast notifications */}
        <Toast
          open={toast.open}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onOpenChange={(open) => setToast((t) => ({ ...t, open }))}
        />
      </div>
    </div>
  );
};

export default Proposals;

