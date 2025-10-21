import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  ChevronRight,
  Phone,
  Mail
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

// Mock data for firms (including Pending)
const initialFirms = [
  {
    id: 1,
    name: "Professional Accounting Group A",
    email: "contact@proaccounting-a.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
    logo: "PA"
  },
  {
    id: 2,
    name: "Elite Financial Services",
    email: "info@elitefinancial.com",
    phone: "+1 (555) 234-5678",
    status: "Active",
    logo: "EF"
  },
  {
    id: 3,
    name: "Metro Tax Solutions",
    email: "hello@metrotax.com",
    phone: "+1 (555) 345-6789",
    status: "Inactive",
    logo: "MT"
  },
  {
    id: 4,
    name: "Precision Bookkeeping Co.",
    email: "contact@precisionbook.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
    logo: "PB"
  },
  {
    id: 5,
    name: "Strategic Accounting Partners",
    email: "partners@strategicaccounting.com",
    phone: "+1 (555) 567-8901",
    status: "Inactive",
    logo: "SA"
  },
  {
    id: 6,
    name: "Digital Finance Solutions",
    email: "support@digitalfinance.com",
    phone: "+1 (555) 678-9012",
    status: "Active",
    logo: "DF"
  },
  {
    id: 7,
    name: "Nova Ledger Advisory",
    email: "review@novaledger.io",
    phone: "+1 (555) 789-0123",
    status: "Pending",
    logo: "NL"
  }
];

const Firms = () => {
  const [firms, setFirms] = useState(initialFirms);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Pending'
  });

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const openDetails = (firm) => {
    setSelectedFirm(firm);
    setDialogOpen(true);
  };

  const updateStatus = (id, status) => {
    setFirms((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
    setDialogOpen(false);
  };

  const handleAddFirm = () => {
    setAddDialogOpen(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'Pending'
    });
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveFirm = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      return; // Basic validation
    }

    const newFirm = {
      id: Math.max(...firms.map(f => f.id)) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      status: formData.status,
      logo: formData.name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
    };

    setFirms(prev => [...prev, newFirm]);
    setAddDialogOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'Pending'
    });
  };

  const handleCancelAdd = () => {
    setAddDialogOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'Pending'
    });
  };

  // Derived filtered firms based on search + status
  const filteredFirms = firms.filter((f) => {
    const matchesStatus = statusFilter === 'All' ? true : f.status === statusFilter;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
            <span className="text-neutral-900 dark:text-white font-medium">Firms</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Firms</h1>
              <p className="text-neutral-600 dark:text-neutral-400">Manage accounting firms and their information</p>
            </div>
          </div>
        </div>

        {/* Top Actions Bar */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search Input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                  <Input
                    placeholder="Search firms by name..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
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
              
              {/* Add Firm Button */}
              <Button className="w-full sm:w-auto" onClick={handleAddFirm}>
                <Plus className="w-4 h-4 mr-2" />
                Add Firm
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Firms Table */}
        <Card>
          <CardHeader>
            <CardTitle>Firms List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Firm Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFirms.map((firm, index) => (
                    <motion.tr
                      key={firm.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1 
                      }}
                      className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <TableCell>
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                            {firm.logo}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {firm.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {firm.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {firm.phone}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            firm.status === 'Active'
                              ? 'success'
                              : firm.status === 'Pending'
                              ? 'warning'
                              : 'secondary'
                          }
                        >
                          {firm.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => openDetails(firm)}
                            aria-label="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
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

        {/* Details Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            {selectedFirm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <DialogHeader>
                  <DialogTitle>Firm Details</DialogTitle>
                  <DialogDescription>
                    Review the information and approve or reject this account.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold">
                      {selectedFirm.logo}
                    </span>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-neutral-900 dark:text-white">{selectedFirm.name}</div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">{selectedFirm.email}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-500">Phone</div>
                    <div className="text-sm text-neutral-900 dark:text-neutral-100">{selectedFirm.phone}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-500">Status</div>
                    <Badge 
                      variant={
                        selectedFirm.status === 'Active' ? 'success' : selectedFirm.status === 'Pending' ? 'warning' : 'secondary'
                      }
                    >
                      {selectedFirm.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <div className="text-xs text-neutral-500">Extra Info</div>
                    <div className="text-sm text-neutral-700 dark:text-neutral-300">Additional details or notes can go here.</div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => updateStatus(selectedFirm.id, 'Inactive')}
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => updateStatus(selectedFirm.id, 'Active')}
                  >
                    Approve
                  </Button>
                </div>
              </motion.div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Firm Dialog */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogContent>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <DialogHeader>
                <DialogTitle>Add New Firm</DialogTitle>
                <DialogDescription>
                  Enter the firm details to add them to the platform.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Firm Name *
                  </label>
                  <Input
                    placeholder="Enter firm name"
                    value={formData.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Phone *
                  </label>
                  <Input
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Status
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleFormChange('status', value)}
                  >
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
                <Button
                  variant="outline"
                  onClick={handleCancelAdd}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveFirm}
                  disabled={!formData.name || !formData.email || !formData.phone}
                >
                  Save
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Firms;

