import { useMemo, useState } from 'react';
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
  Mail
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
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

// Mock data
const initialClients = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    phone: '+1 (555) 101-2020',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Beta Logistics',
    email: 'ops@betalogistics.co',
    phone: '+1 (555) 222-3030',
    status: 'Pending',
  },
  {
    id: 3,
    name: 'Carlos Mendes',
    email: 'c.mendes@domain.com',
    phone: '+1 (555) 333-4040',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Delta Marketing LLC',
    email: 'hello@deltamktg.io',
    phone: '+1 (555) 444-5050',
    status: 'Active',
  },
];

const Clients = () => {
  // Data
  const [clients, setClients] = useState(initialClients);

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
  const updateClientStatus = (id, status) => {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    // Keep modal data in sync if it's the same client
    setSelectedClient((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  const approveClient = (client) => {
    updateClientStatus(client.id, 'Active');
    setToast({ open: true, title: 'Client approved', description: `${client.name} is now Active.`, variant: 'success' });
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
  };

  const rejectClient = (client) => {
    updateClientStatus(client.id, 'Inactive');
    setToast({ open: true, title: 'Client rejected', description: `${client.name} has been set to Inactive.`, variant: 'destructive' });
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
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

  const onConfirmLifecycle = () => {
    if (!selectedClient || !confirmAction) return;
    if (confirmAction === 'deactivate') {
      updateClientStatus(selectedClient.id, 'Inactive');
      setToast({ open: true, title: 'Client deactivated', description: `${selectedClient.name} has been set to Inactive.`, variant: 'destructive' });
    } else if (confirmAction === 'reactivate') {
      updateClientStatus(selectedClient.id, 'Active');
      setToast({ open: true, title: 'Client reactivated', description: `${selectedClient.name} is now Active.`, variant: 'success' });
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
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-900 dark:text-white font-medium">Clients</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Clients</h1>
                  <p className="text-neutral-600 dark:text-neutral-400">Manage client accounts and details</p>
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
                        placeholder="Search clients by name or email..."
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
                        <SelectItem value="All">All Status</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Add Client Button */}
                  <Button className="w-full sm:w-auto" onClick={openAdd}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Clients Table */}
            <Card>
              <CardHeader>
                <CardTitle>Clients List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Client Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClients.map((client, index) => (
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
                              {client.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openView(client)}
                                aria-label="View details"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {client.status === 'Active' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  onClick={() => requestDeactivate(client)}
                                  aria-label="Deactivate client"
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
                                  aria-label="Reactivate client"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => openEdit(client)}
                                aria-label="Edit client"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                onClick={() => openDelete(client)}
                                aria-label="Delete client"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
                      <DialogTitle>Client Details</DialogTitle>
                      <DialogDescription>Review client information.</DialogDescription>
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
                        <div className="text-xs text-neutral-500">Phone</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">{selectedClient.phone}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Status</div>
                        <Badge
                          variant={
                            selectedClient.status === 'Active'
                              ? 'success'
                              : selectedClient.status === 'Pending'
                              ? 'warning'
                              : 'secondary'
                          }
                        >
                          {selectedClient.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Company</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">Acme Corp</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Created</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">2024-07-12</div>
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <div className="text-xs text-neutral-500">Notes</div>
                        <div className="text-sm text-neutral-700 dark:text-neutral-300">Additional details can go here.</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      <div className="text-sm text-neutral-500" />
                      {selectedClient.status === 'Pending' ? (
                        <div className="flex items-center gap-2">
                          <Button variant="destructive" onClick={() => rejectClient(selectedClient)}>
                            Reject
                          </Button>
                          <Button onClick={() => approveClient(selectedClient)}>
                            Approve
                          </Button>
                          <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
                          </Button>
                        </div>
                      ) : selectedClient.status === 'Active' ? (
                        <div className="flex items-center gap-2">
                          <Button variant="destructive" onClick={() => requestDeactivate(selectedClient)}>
                            Deactivate
                          </Button>
                          <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button onClick={() => requestReactivate(selectedClient)}>
                            Reactivate
                          </Button>
                          <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                            Close
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
                    <DialogTitle>Add New Client</DialogTitle>
                    <DialogDescription>Enter details to create a client.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name *</label>
                      <Input
                        placeholder="Enter client name"
                        value={formData.name}
                        onChange={(e) => onFormChange('name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email *</label>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => onFormChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Phone *</label>
                      <Input
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => onFormChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Status</label>
                      <Select value={formData.status} onValueChange={(v) => onFormChange('status', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveAdd} disabled={!formData.name || !formData.email || !formData.phone}>
                      Save
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
                    <DialogTitle>Edit Client</DialogTitle>
                    <DialogDescription>Update client information.</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Name *</label>
                      <Input
                        placeholder="Enter client name"
                        value={formData.name}
                        onChange={(e) => onFormChange('name', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Email *</label>
                      <Input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => onFormChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Phone *</label>
                      <Input
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={(e) => onFormChange('phone', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Status</label>
                      <Select value={formData.status} onValueChange={(v) => onFormChange('status', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={saveEdit} disabled={!formData.name || !formData.email || !formData.phone}>
                      Save Changes
                    </Button>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Client</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this client? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={confirmDelete}>
                    Delete
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
          title={confirmAction === 'deactivate' ? 'Deactivate Client' : 'Reactivate Client'}
          description={
            confirmAction === 'deactivate'
              ? 'Are you sure you want to deactivate this client? They will lose access until reactivated.'
              : 'Are you sure you want to reactivate this client? They will regain access.'
          }
          confirmText={confirmAction === 'deactivate' ? 'Deactivate' : 'Reactivate'}
          variant={confirmAction === 'deactivate' ? 'destructive' : 'default'}
          onConfirm={onConfirmLifecycle}
        />
      </div>
    </div>
  );
};

export default Clients;

