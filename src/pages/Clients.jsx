import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  Phone,
  Mail,
  Loader2
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
import { useTranslation } from 'react-i18next';

const Clients = () => {
  const { t } = useTranslation();
  
  // Helper function to translate status
  const translateStatus = (status) => {
    if (!status) return '';
    const statusLower = status.toLowerCase();
    return t(statusLower) || status;
  };
  
  // Data
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Dialogs / Modals
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Selection
  const [selectedClient, setSelectedClient] = useState(null);

  // Forms
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Pending',
  });

  // Toast
  const [toast, setToast] = useState({ open: false });

  // Load users from API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const response = await adminAPI.listUsers({ role: 'client' });
        const users = response.data || [];
        setClients(users.map(user => ({
          id: user._id || user.id,
          name: user.name || 'N/A',
          email: user.email || '',
          phone: user.phone || 'N/A',
          status: user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending' : user.status === 'inactive' ? 'Inactive' : 'Pending',
          role: user.role,
          createdAt: user.createdAt,
        })));
      } catch (error) {
        console.error('Error loading clients:', error);
        setToast({
          open: true,
          title: t("error"),
          description: error?.response?.data?.message || t("failedToLoadClients"),
          variant: 'destructive'
        });
        setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Helpers
  const getInitials = (name) =>
    name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  // Derived: filtered list (search + status)
  const filteredClients = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return clients.filter((c) => {
      const matchesStatus = statusFilter === 'All' ? true : c.status === statusFilter;
      const matchesSearch = !q
        ? true
        : c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [clients, searchQuery, statusFilter]);

  // Handlers: View
  const openView = (client) => {
    setSelectedClient(client);
    setViewDialogOpen(true);
  };

  // Approve/Reject workflow
  const updateClientStatus = async (id, status) => {
    try {
      const apiStatus = status === 'Active' ? 'active' : status === 'Pending' ? 'pending' : 'pending';
      await adminAPI.updateUserStatus(id, apiStatus);
      setClients((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
      // Keep modal data in sync if it's the same client
      setSelectedClient((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
      return true;
    } catch (error) {
      console.error('Error updating user status:', error);
      setToast({
        open: true,
        title: t("error"),
        description: error?.response?.data?.message || t("failedToUpdateUserStatus"),
        variant: 'destructive'
      });
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 3000);
      return false;
    }
  };

  const approveClient = async (client) => {
    const success = await updateClientStatus(client.id, 'Active');
    if (success) {
      setToast({ open: true, title: t("clientApproved"), description: `${client.name} ${t("isNowActive")}`, variant: 'success' });
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
      // Reload users to get updated data
      const response = await adminAPI.listUsers({ role: 'client' });
      const users = response.data || [];
      setClients(users.map(user => ({
        id: user._id || user.id,
        name: user.name || 'N/A',
        email: user.email || '',
        phone: user.phone || 'N/A',
        status: user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending' : 'Inactive',
        role: user.role,
        createdAt: user.createdAt,
      })));
    }
  };

  const rejectClient = async (client) => {
    const success = await updateClientStatus(client.id, 'Pending');
    if (success) {
      setToast({ open: true, title: t("clientDeactivated"), description: `${client.name} ${t("isNowPending")}`, variant: 'success' });
      setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
      // Reload users to get updated data
      const response = await adminAPI.listUsers({ role: 'client' });
      const users = response.data || [];
      setClients(users.map(user => ({
        id: user._id || user.id,
        name: user.name || 'N/A',
        email: user.email || '',
        phone: user.phone || 'N/A',
        status: user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending' : 'Inactive',
        role: user.role,
        createdAt: user.createdAt,
      })));
    }
  };

  // Handlers: Add
  const openAdd = () => {
    setFormData({ name: '', email: '', phone: '', status: 'Pending' });
    setAddDialogOpen(true);
  };

  const saveAdd = () => {
    if (!formData.name || !formData.email || !formData.phone) return;
    const nextId = clients.length ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
    const created = {
      id: nextId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
    };
    setClients((prev) => [...prev, created]);
    setAddDialogOpen(false);
  };

  // Handlers: Edit
  const openEdit = (client) => {
    setSelectedClient(client);
    setFormData({ name: client.name, email: client.email, phone: client.phone, status: client.status });
    setEditDialogOpen(true);
  };

  const saveEdit = () => {
    if (!selectedClient) return;
    if (!formData.name || !formData.email || !formData.phone) return;
    setClients((prev) =>
      prev.map((c) => (c.id === selectedClient.id ? { ...c, ...formData } : c))
    );
    setEditDialogOpen(false);
  };

  // Handlers: Delete
  const openDelete = (client) => {
    setSelectedClient(client);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedClient) return;
    setClients((prev) => prev.filter((c) => c.id !== selectedClient.id));
    setDeleteDialogOpen(false);
  };

  // Handlers: Deactivate/Reactivate with confirmation
  const requestDeactivate = (client) => {
    setSelectedClient(client);
    setConfirmAction('deactivate');
    setConfirmDialogOpen(true);
  };

  const requestReactivate = (client) => {
    setSelectedClient(client);
    setConfirmAction('reactivate');
    setConfirmDialogOpen(true);
  };

  const onConfirmLifecycle = async () => {
    if (!selectedClient || !confirmAction) return;
    if (confirmAction === 'deactivate') {
      const success = await updateClientStatus(selectedClient.id, 'Pending');
      if (success) {
        setToast({ open: true, title: t("clientDeactivated"), description: `${selectedClient.name} ${t("hasBeenSetToPending")}`, variant: 'destructive' });
      }
    } else if (confirmAction === 'reactivate') {
      const success = await updateClientStatus(selectedClient.id, 'Active');
      if (success) {
        setToast({ open: true, title: t("clientReactivated"), description: `${selectedClient.name} ${t("isNowActiveStatus")}`, variant: 'success' });
      }
    }
    // Close view dialog if it was open (requirement)
    setViewDialogOpen(false);
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
  };

  // Form change helper
  const onFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
                <span>{t("dashboard")}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-900 dark:text-white font-medium">{t("clients")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">{t("clients")}</h1>
                  <p className="text-neutral-600 dark:text-neutral-400">{t("manageClientAccountsDetails")}</p>
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
                        placeholder={t("searchClientsByNameEmail")}
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    {/* Status Filter */}
                    <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v)}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder={t("filterByStatus")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">{t("allStatus")}</SelectItem>
                        <SelectItem value="Pending">{t("pending")}</SelectItem>
                        <SelectItem value="Active">{t("active")}</SelectItem>
                        <SelectItem value="Inactive">{t("inactive")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Add Client Button */}
                  <Button className="w-full sm:w-auto" onClick={openAdd}>
                    <Plus className="w-4 h-4 mr-2" />
                    {t("addClient")}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clients Table */}
            <Card>
              <CardHeader>
                <CardTitle>{t("clientsList")}</CardTitle>
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
                          <TableHead className="w-12"></TableHead>
                          <TableHead>{t("clientName")}</TableHead>
                          <TableHead>{t("email")}</TableHead>
                          <TableHead>{t("phone")}</TableHead>
                          <TableHead>{t("status")}</TableHead>
                          <TableHead className="text-right">{t("actions")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClients.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-neutral-500">
                              {t("noClientsFound")}
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredClients.map((client, index) => (
                        <motion.tr
                          key={client.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.06 }}
                          className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                        >
                          <TableCell>
                            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                              <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                                {getInitials(client.name)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{client.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-neutral-400" />
                              <span className="text-sm text-neutral-600 dark:text-neutral-400">{client.email}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-neutral-400" />
                              <span className="text-sm text-neutral-600 dark:text-neutral-400">{client.phone}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                client.status === 'Active'
                                  ? 'success'
                                  : client.status === 'Pending'
                                  ? 'warning'
                                  : 'secondary'
                              }
                            >
                              {translateStatus(client.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openView(client)}
                                aria-label={t("viewDetails")}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {client.status === 'Active' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  onClick={() => requestDeactivate(client)}
                                  aria-label={t("deactivateClient")}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                              {client.status === 'Inactive' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20"
                                  onClick={() => requestReactivate(client)}
                                  aria-label={t("reactivateClient")}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openEdit(client)}
                                aria-label={t("editClient")}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => openDelete(client)}
                                aria-label={t("deleteClientAction")}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
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

            {/* View Client Dialog */}
            <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
              <DialogContent>
                {selectedClient && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <DialogHeader>
                      <DialogTitle>{t("clientDetails")}</DialogTitle>
                      <DialogDescription>{t("reviewClientInformation")}</DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-400 font-semibold">
                          {getInitials(selectedClient.name)}
                        </span>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-neutral-900 dark:text-white">{selectedClient.name}</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">{selectedClient.email}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">{t("phone")}</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">{selectedClient.phone}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">{t("status")}</div>
                        <Badge
                          variant={
                            selectedClient.status === 'Active'
                              ? 'success'
                              : selectedClient.status === 'Pending'
                              ? 'warning'
                              : 'secondary'
                          }
                        >
                          {translateStatus(selectedClient.status)}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">{t("company")}</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">Acme Corp</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">{t("created")}</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">2024-07-12</div>
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <div className="text-xs text-neutral-500">{t("notes")}</div>
                        <div className="text-sm text-neutral-700 dark:text-neutral-300">{t("additionalDetailsCanGoHere")}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      <div className="text-sm text-neutral-500" />
                      {selectedClient.status === 'Pending' ? (
                        <div className="flex items-center gap-2">
                          <Button variant="destructive" onClick={() => rejectClient(selectedClient)}>
                            {t("reject")}
                          </Button>
                          <Button onClick={() => approveClient(selectedClient)}>
                            {t("approve")}
                          </Button>
                          <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            {t("close")}
                          </Button>
                        </div>
                      ) : selectedClient.status === 'Active' ? (
                        <div className="flex items-center gap-2">
                          <Button variant="destructive" onClick={() => requestDeactivate(selectedClient)}>
                            {t("deactivate")}
                          </Button>
                          <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            {t("close")}
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button onClick={() => requestReactivate(selectedClient)}>
                            {t("reactivate")}
                          </Button>
                          <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            {t("close")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </DialogContent>
            </Dialog>

            {/* Add Client Dialog */}
            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <DialogHeader>
                    <DialogTitle>{t("addNewClient")}</DialogTitle>
                    <DialogDescription>{t("enterDetailsToCreateClient")}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("name")} *</label>
                      <Input
                        placeholder={t("enterClientName")}
                        value={formData.name}
                        onChange={(e) => onFormChange('name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("email")} *</label>
                      <Input
                        type="email"
                        placeholder={t("enterEmailAddress")}
                        value={formData.email}
                        onChange={(e) => onFormChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("phone")} *</label>
                      <Input
                        placeholder={t("enterPhoneNumber")}
                        value={formData.phone}
                        onChange={(e) => onFormChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("status")}</label>
                      <Select value={formData.status} onValueChange={(v) => onFormChange('status', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectStatus")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">{t("pending")}</SelectItem>
                          <SelectItem value="Active">{t("active")}</SelectItem>
                          <SelectItem value="Inactive">{t("inactive")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={saveAdd} disabled={!formData.name || !formData.email || !formData.phone}>
                      {t("save")}
                    </Button>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>

            {/* Edit Client Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
              <DialogContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <DialogHeader>
                    <DialogTitle>{t("editClient")}</DialogTitle>
                    <DialogDescription>{t("updateClientInformation")}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("name")} *</label>
                      <Input
                        placeholder={t("enterClientName")}
                        value={formData.name}
                        onChange={(e) => onFormChange('name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("email")} *</label>
                      <Input
                        type="email"
                        placeholder={t("enterEmailAddress")}
                        value={formData.email}
                        onChange={(e) => onFormChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("phone")} *</label>
                      <Input
                        placeholder={t("enterPhoneNumber")}
                        value={formData.phone}
                        onChange={(e) => onFormChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{t("status")}</label>
                      <Select value={formData.status} onValueChange={(v) => onFormChange('status', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectStatus")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">{t("pending")}</SelectItem>
                          <SelectItem value="Active">{t("active")}</SelectItem>
                          <SelectItem value="Inactive">{t("inactive")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                      {t("cancel")}
                    </Button>
                    <Button onClick={saveEdit} disabled={!formData.name || !formData.email || !formData.phone}>
                      {t("saveChanges")}
                    </Button>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t("deleteClient")}</DialogTitle>
                  <DialogDescription>
                    {t("areYouSureDeleteClient")}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    {t("delete")}
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
        {/* Confirm lifecycle dialog */}
        <AlertDialog
          open={confirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
          title={confirmAction === 'deactivate' ? t("deactivateClient") : t("reactivateClient")}
          description={
            confirmAction === 'deactivate'
              ? t("areYouSureDeactivateClient")
              : t("areYouSureReactivateClient")
          }
          confirmText={confirmAction === 'deactivate' ? t("deactivate") : t("reactivate")}
          variant={confirmAction === 'deactivate' ? 'destructive' : 'default'}
          onConfirm={onConfirmLifecycle}
        />
      </div>
    </div>
  );
};

export default Clients;
