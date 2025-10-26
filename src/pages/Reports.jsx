import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  ChevronRight,
  Calendar,
  FileDown,
  Share2,
  Plus,
  Edit,
  Trash2,
  FileText,
  FileSpreadsheet,
  FileArchive,
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
import AlertDialog from '../components/ui/alert-dialog';
import Toast from '../components/ui/toast';

// Recharts
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Bar,
  BarChart,
  AreaChart,
  Area,
  Legend
} from 'recharts';

// Mock base data (would come from API)
const mockSummary = [
  { id: 'firm-1', name: 'Delta Marketing LLC', email: 'hello@deltamktg.io', type: 'Firm', transactions: 124, revenue: 15230.45, refunds: 3, lastActivity: '2024-07-19' },
  { id: 'client-1', name: 'Alice Johnson', email: 'alice.johnson@example.com', type: 'Client', transactions: 18, revenue: 1899.99, refunds: 1, lastActivity: '2024-07-18' },
  { id: 'firm-2', name: 'Beta Logistics', email: 'ops@betalogistics.co', type: 'Firm', transactions: 89, revenue: 10110.0, refunds: 5, lastActivity: '2024-07-17' },
  { id: 'client-2', name: 'Carlos Mendes', email: 'c.mendes@domain.com', type: 'Client', transactions: 44, revenue: 5250.5, refunds: 0, lastActivity: '2024-07-15' },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

const getInitials = (name) => name.split(' ').filter(Boolean).map((n) => n[0]).join('').toUpperCase().slice(0,2);

const addDays = (d, days) => {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
};

const formatISODate = (d) => d.toISOString().substring(0, 10);

const defaultRangeLast30 = () => {
  const to = new Date();
  const from = addDays(to, -30);
  return { from: formatISODate(from), to: formatISODate(to) };
};

const computeNextDelivery = (now, freq, timeHHmm) => {
  const [hh, mm] = timeHHmm.split(':').map((n) => parseInt(n, 10));
  const base = new Date(now);
  base.setHours(hh, mm, 0, 0);
  let next = new Date(base);
  if (freq === 'Daily') {
    if (next <= now) next = addDays(next, 1);
  } else if (freq === 'Weekly') {
    if (next <= now) next = addDays(next, 7);
  } else {
    // Monthly: add one month if past
    if (next <= now) {
      const m = next.getMonth();
      next.setMonth(m + 1);
    }
  }
  return next.toISOString();
};

const Reports = () => {
  // Filters
  const [filters, setFilters] = useState({
    ...defaultRangeLast30(),
    groupBy: 'All',
    reportType: 'Financial'
  });

  // Base dataset (could be transformed by reportType)
  const [summary, setSummary] = useState(mockSummary);

  // Scheduling
  const [schedules, setSchedules] = useState([]);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  // Toasts and confirm
  const [toast, setToast] = useState({ open: false });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  // Drag & Drop Export state
  const [isDragOver, setIsDragOver] = useState(false);

  // Derived filtered data for table and charts
  const filtered = useMemo(() => {
    const from = filters.from ? new Date(filters.from) : null;
    const to = filters.to ? new Date(filters.to) : null;

    let rows = summary.filter((r) => {
      const d = new Date(r.lastActivity);
      const afterFrom = from ? d >= new Date(from.setHours(0,0,0,0)) : true;
      const beforeTo = to ? d <= new Date(to.setHours(23,59,59,999)) : true;
      return afterFrom && beforeTo;
    });

    if (filters.groupBy === 'By Firm') rows = rows.filter((r) => r.type === 'Firm');
    if (filters.groupBy === 'By Client') rows = rows.filter((r) => r.type === 'Client');

    return rows;
  }, [summary, filters]);

  // KPIs
  const totalRevenue = filtered.reduce((s, r) => s + r.revenue, 0);
  const totalTransactions = filtered.reduce((s, r) => s + r.transactions, 0);
  const activeClients = filtered.filter((r) => r.type === 'Client').length; // mock metric
  const refundRate = totalTransactions === 0 ? 0 : Math.round((filtered.reduce((s, r) => s + r.refunds, 0) / totalTransactions) * 100);

  // Charts mock data derived from filtered
  const revenueOverTime = useMemo(() => {
    // Generate a 6-point time series
    return Array.from({ length: 6 }).map((_, i) => ({
      label: `W${i + 1}`,
      revenue: Math.max(0, (totalRevenue / 6) * (0.7 + Math.random() * 0.6))
    }));
  }, [totalRevenue, filters]);

  const txBreakdown = useMemo(() => {
    const payments = Math.round(totalTransactions * 0.6);
    const subs = Math.round(totalTransactions * 0.25);
    const transfers = Math.max(0, totalTransactions - payments - subs);
    const refunds = filtered.reduce((s, r) => s + r.refunds, 0);
    return [
      { name: 'Payments', value: payments },
      { name: 'Subscriptions', value: subs },
      { name: 'Transfers', value: transfers },
      { name: 'Refunds', value: refunds },
    ];
  }, [totalTransactions, filtered]);

  const topEntities = useMemo(() => {
    return [...filtered].sort((a, b) => b.revenue - a.revenue).slice(0, 5).map((r) => ({ name: r.name, revenue: r.revenue }));
  }, [filtered]);

  const refundsTrend = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({ label: `W${i + 1}`, refunds: Math.round((refundRate / 100) * (totalTransactions / 6) * (0.8 + Math.random() * 0.4)) }));
  }, [refundRate, totalTransactions]);

  // Effects
  useEffect(() => {
    // Simulate dynamic reportType altering the data slightly
    if (filters.reportType === 'Financial') setSummary(mockSummary);
    else if (filters.reportType === 'Clients Activity') setSummary(mockSummary.map((r) => ({ ...r, transactions: Math.round(r.transactions * 1.1) })));
    else setSummary(mockSummary.map((r) => ({ ...r, revenue: r.revenue * 1.05 })));
  }, [filters.reportType]);

  // Actions
  const onGenerate = () => {
    // In a real app, fetch with current filters. Here we just show a toast.
    setToast({ open: true, title: 'Report generated', description: 'KPIs and charts updated for the selected filters.', variant: 'success' });
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 2000);
  };

  const exportCSV = (rows) => {
    const headers = ['Name', 'Email', 'Type', 'Transactions', 'Revenue', 'Refunds', 'Last Activity'];
    const csv = [headers.join(','), ...rows.map((r) => [r.name, r.email, r.type, r.transactions, r.revenue.toFixed(2), r.refunds, r.lastActivity].join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const onExport = (format) => {
    if (format === 'CSV') {
      exportCSV(filtered);
    } else {
      // Simulate Excel/PDF export
      const blob = new Blob([`Mock ${format} export`], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.${format === 'PDF' ? 'pdf' : 'xlsx'}`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const triggerExportWithToast = (format) => {
    onExport(format);
    setToast({ open: true, title: 'Export complete', description: `Report exported successfully as ${format}.`, variant: 'success' });
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 2000);
  };

  const onShare = () => {
    setToast({ open: true, title: 'Report shared', description: 'Report shared successfully.', variant: 'success' });
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 2000);
  };

  // Scheduling
  const openCreateSchedule = () => {
    setEditingSchedule(null);
    setScheduleOpen(true);
  };

  const openEditSchedule = (s) => {
    setEditingSchedule(s);
    setScheduleOpen(true);
  };

  const saveSchedule = (s) => {
    const now = new Date();
    const next = computeNextDelivery(now, s.frequency, s.time);
    if (s.id) {
      setSchedules((prev) => prev.map((x) => (x.id === s.id ? { ...x, ...s, nextDelivery: next } : x)));
    } else {
      const id = `sch-${Date.now()}`;
      setSchedules((prev) => [...prev, { ...s, id, nextDelivery: next }]);
    }
    setScheduleOpen(false);
    setToast({ open: true, title: 'Report scheduled', description: 'Report scheduled successfully.', variant: 'success' });
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 2000);
  };

  const requestDeleteSchedule = (s) => {
    setScheduleToDelete(s);
    setConfirmOpen(true);
  };

  const confirmDeleteSchedule = () => {
    if (!scheduleToDelete) return;
    setSchedules((prev) => prev.filter((x) => x.id !== scheduleToDelete.id));
    setConfirmOpen(false);
  };

  // Render
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-900 dark:text-white font-medium">Reports</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Reports</h1>
                  <p className="text-neutral-600 dark:text-neutral-400">Analytics, insights, and automated scheduling</p>
                </div>
              </div>
            </div>

            {/* Filters & Export */}
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Filters Row */}
                <div className="w-full flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Date Range - left, separated */}
                  <div className="flex items-center gap-2 lg:mr-6">
                    <Calendar className="w-4 h-4 text-neutral-400" />
                    <Input type="date" value={filters.from} onChange={(e) => setFilters((p) => ({ ...p, from: e.target.value }))} />
                    <span className="text-neutral-500">to</span>
                    <Input type="date" value={filters.to} onChange={(e) => setFilters((p) => ({ ...p, to: e.target.value }))} />
                  </div>

                  {/* Divider spacing (visual gap) */}
                  <div className="hidden lg:block w-px h-10 bg-neutral-200 dark:bg-neutral-700" />

                  {/* Other filters */}
                  <div className="flex-1 flex flex-col sm:flex-row gap-4">
                    <Select value={filters.groupBy} onValueChange={(v) => setFilters((p) => ({ ...p, groupBy: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Group by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="By Firm">By Firm</SelectItem>
                        <SelectItem value="By Client">By Client</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filters.reportType} onValueChange={(v) => setFilters((p) => ({ ...p, reportType: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Financial">Financial</SelectItem>
                        <SelectItem value="Clients Activity">Clients Activity</SelectItem>
                        <SelectItem value="Firms Performance">Firms Performance</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button onClick={onGenerate}>Generate Report</Button>
                  </div>
                </div>

                {/* Export Section: Drag & Drop */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                  {/* Draggable options */}
                  <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <DraggableExport label="CSV" icon={<FileText className="w-4 h-4" />} onClick={() => triggerExportWithToast('CSV')} />
                    <DraggableExport label="Excel" icon={<FileSpreadsheet className="w-4 h-4" />} onClick={() => triggerExportWithToast('Excel')} />
                    <DraggableExport label="PDF" icon={<FileArchive className="w-4 h-4" />} onClick={() => triggerExportWithToast('PDF')} />
                  </div>

                  {/* Drop Zone */}
                  <motion.div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      const format = e.dataTransfer.getData('text/plain');
                      if (format) triggerExportWithToast(format);
                    }}
                    className={`col-span-1 rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                      isDragOver ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                    initial={{ opacity: 0.95 }}
                    whileHover={{ scale: 1.01 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">Drop here to export</div>
                    <div className="text-xs text-neutral-500 mt-1">Supports CSV, Excel, PDF</div>
                  </motion.div>
                </div>

                {/* Scheduled Reports header */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">Scheduled Reports</div>
                  <Button onClick={openCreateSchedule}>
                    <Plus className="w-4 h-4 mr-2" /> Schedule Report
                  </Button>
                </div>

                {/* Schedules List */}
                <div className="rounded-md border mt-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Frequency</TableHead>
                        <TableHead>Next Delivery</TableHead>
                        <TableHead>Recipient</TableHead>
                        <TableHead>Report Type</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-neutral-500">No schedules yet</TableCell>
                        </TableRow>
                      ) : (
                        schedules.map((s) => (
                          <TableRow key={s.id} className="border-b">
                            <TableCell>{s.frequency}</TableCell>
                            <TableCell>{new Date(s.nextDelivery).toLocaleString()}</TableCell>
                            <TableCell>{s.recipient}</TableCell>
                            <TableCell>{s.reportType}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => openEditSchedule(s)} aria-label="Edit schedule">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20" onClick={() => requestDeleteSchedule(s)} aria-label="Delete schedule">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-end">
                  <Button variant="outline" onClick={onShare}>
                    <Share2 className="w-4 h-4 mr-2" /> Share Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}` },
                { title: 'Total Transactions', value: `${totalTransactions}` },
                { title: 'Active Clients', value: `${activeClients}` },
                { title: 'Refund Rate', value: `${refundRate}%` },
              ].map((kpi, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{kpi.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="text-2xl font-bold">
                      {kpi.value}
                    </motion.div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                </CardHeader>
                <CardContent style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transactions Breakdown</CardTitle>
                </CardHeader>
                <CardContent style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={txBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100}>
                        {txBreakdown.map((_, i) => (
                          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Firms / Clients</CardTitle>
                </CardHeader>
                <CardContent style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topEntities}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" hide={false} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Refunds Trend</CardTitle>
                </CardHeader>
                <CardContent style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={refundsTrend}>
                      <defs>
                        <linearGradient id="colorRefunds" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.6}/>
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="refunds" stroke="#EF4444" fillOpacity={1} fill="url(#colorRefunds)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Table */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Transactions</TableHead>
                        <TableHead>Total Revenue</TableHead>
                        <TableHead>Refunds</TableHead>
                        <TableHead>Last Activity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((r, idx) => (
                        <ExpandableRow key={r.id} row={r} index={idx} />
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Dialog */}
            <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
              <DialogContent>
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }} className="space-y-4">
                  <DialogHeader>
                    <DialogTitle>{editingSchedule ? 'Edit Schedule' : 'Schedule Report'}</DialogTitle>
                    <DialogDescription>Configure automated delivery for a report.</DialogDescription>
                  </DialogHeader>

                  <ScheduleForm
                    initial={editingSchedule || { frequency: 'Weekly', time: '09:00', method: 'Email', recipient: '', reportType: filters.reportType }}
                    onCancel={() => setScheduleOpen(false)}
                    onSave={(data) => saveSchedule(editingSchedule ? { ...data, id: editingSchedule.id } : data)}
                  />
                </motion.div>
              </DialogContent>
            </Dialog>

            {/* Confirm Delete Schedule */}
            <AlertDialog
              open={confirmOpen}
              onOpenChange={setConfirmOpen}
              title="Delete Schedule"
              description="Are you sure you want to delete this scheduled report?"
              confirmText="Delete"
              variant="destructive"
              onConfirm={confirmDeleteSchedule}
            />
          </div>
        </main>

        {/* Toast */}
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

// Expandable row component
const ExpandableRow = ({ row, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.tr
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-800/50 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <TableCell>
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
            <span className="text-primary-600 dark:text-primary-400 text-xs font-semibold">{getInitials(row.name)}</span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="text-sm text-neutral-900 dark:text-neutral-100 font-medium">{row.name}</span>
            <span className="text-xs text-neutral-500">{row.email}</span>
          </div>
        </TableCell>
        <TableCell>
          <Badge variant={row.type === 'Firm' ? 'secondary' : 'success'}>{row.type}</Badge>
        </TableCell>
        <TableCell>{row.transactions}</TableCell>
        <TableCell>${row.revenue.toFixed(2)}</TableCell>
        <TableCell>{row.refunds}</TableCell>
        <TableCell>{new Date(row.lastActivity).toLocaleDateString()}</TableCell>
      </motion.tr>
      <AnimatePresence>
        {open && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-neutral-50 dark:bg-neutral-800/40"
          >
            <TableCell colSpan={7}>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-neutral-500">Recent Activity</div>
                  <div className="text-neutral-900 dark:text-neutral-100">{row.name} made {Math.round(row.transactions / 4)} transactions last week.</div>
                </div>
                <div>
                  <div className="text-neutral-500">Avg. Order Value</div>
                  <div className="text-neutral-900 dark:text-neutral-100">${(row.revenue / Math.max(1, row.transactions)).toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-neutral-500">Notes</div>
                  <div className="text-neutral-900 dark:text-neutral-100">Performance is trending {Math.random() > 0.5 ? 'up' : 'down'} this period.</div>
                </div>
              </div>
            </TableCell>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
};

// Schedule form component
const ScheduleForm = ({
  initial,
  onSave,
  onCancel,
}) => {
  const [form, setForm] = useState(initial);
  useEffect(() => {
    setForm(initial);
  }, [initial]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Frequency</label>
          <Select value={form.frequency} onValueChange={(v) => setForm((p) => ({ ...p, frequency: v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Daily">Daily</SelectItem>
              <SelectItem value="Weekly">Weekly</SelectItem>
              <SelectItem value="Monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Time</label>
          <Input type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Delivery Method</label>
          <Select value={form.method} onValueChange={(v) => setForm((p) => ({ ...p, method: v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Recipient Email</label>
          <Input type="email" placeholder="recipient@example.com" value={form.recipient} onChange={(e) => setForm((p) => ({ ...p, recipient: e.target.value }))} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Report Type</label>
          <Select value={form.reportType} onValueChange={(v) => setForm((p) => ({ ...p, reportType: v }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Financial">Financial</SelectItem>
              <SelectItem value="Clients Activity">Clients Activity</SelectItem>
              <SelectItem value="Firms Performance">Firms Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(form)} disabled={!form.recipient}>Save Schedule</Button>
      </div>
    </div>
  );
};

export default Reports;

// Draggable export option component
const DraggableExport = ({ label, icon, onClick }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', label);
    e.dataTransfer.effectAllowed = 'copy';
  };
  return (
    <motion.div
      draggable
      onDragStart={handleDragStart}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      className="cursor-grab active:cursor-grabbing select-none"
    >
      <Card onClick={onClick}>
        <CardContent className="p-4 flex items-center gap-2">
          {icon}
          <span className="font-medium">Export as {label}</span>
        </CardContent>
      </Card>
    </motion.div>
  );
};

