import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Search, ChevronRight, Eye } from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import AlertDialog from "../components/ui/alert-dialog";
import Toast from "../components/ui/toast";

// Mock data
const initialTxns = [
  {
    id: "TXN-2024-0001",
    partyName: "Alice Johnson",
    partyEmail: "alice.johnson@example.com",
    amount: 199.99,
    currency: "USD",
    type: "Payment",
    status: "Completed",
    paymentMethod: "Card",
    datetime: "2024-07-12T10:15:00Z",
    notes: "Monthly subscription payment.",
  },
  {
    id: "TXN-2024-0002",
    partyName: "Beta Logistics",
    partyEmail: "ops@betalogistics.co",
    amount: 499.0,
    currency: "USD",
    type: "Payment",
    status: "Pending",
    paymentMethod: "Bank",
    datetime: "2024-07-13T14:20:00Z",
  },
  {
    id: "TXN-2024-0003",
    partyName: "Carlos Mendes",
    partyEmail: "c.mendes@domain.com",
    amount: 129.5,
    currency: "USD",
    type: "Subscription",
    status: "Completed",
    paymentMethod: "Card",
    datetime: "2024-07-14T09:05:00Z",
  },
  {
    id: "TXN-2024-0004",
    partyName: "Delta Marketing LLC",
    partyEmail: "hello@deltamktg.io",
    amount: 129.5,
    currency: "USD",
    type: "Payment",
    status: "Failed",
    paymentMethod: "Card",
    datetime: "2024-07-15T18:42:00Z",
  },
  {
    id: "TXN-2024-0005",
    partyName: "Echo Industries",
    partyEmail: "finance@echo.io",
    amount: 199.99,
    currency: "USD",
    type: "Refund",
    status: "Refunded",
    paymentMethod: "Card",
    datetime: "2024-07-16T12:10:00Z",
    notes: "Manual refund requested.",
  },
];

const currencySymbol = (cur) =>
  cur === "USD" ? "$" : cur === "EUR" ? "€" : "£";
const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const Transactions = () => {
  const [txns, setTxns] = useState(initialTxns);

  const [filters, setFilters] = useState({
    query: "",
    status: "All",
    type: "All",
    from: "",
    to: "",
  });

  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState({ open: false });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openView = (t) => {
    setSelected(t);
    setViewOpen(true);
  };

  const resetFilters = () => {
    setFilters({ query: "", status: "All", type: "All", from: "", to: "" });
  };

  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const from = filters.from ? new Date(filters.from) : null;
    const to = filters.to ? new Date(filters.to) : null;

    return txns.filter((t) => {
      const matchesQuery =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.partyName.toLowerCase().includes(q) ||
        t.partyEmail.toLowerCase().includes(q);

      const matchesStatus =
        filters.status === "All" ? true : t.status === filters.status;
      const matchesType =
        filters.type === "All" ? true : t.type === filters.type;

      const dt = new Date(t.datetime);
      const afterFrom = from ? dt >= new Date(from.setHours(0, 0, 0, 0)) : true;
      const beforeTo = to ? dt <= new Date(to.setHours(23, 59, 59, 999)) : true;

      return (
        matchesQuery && matchesStatus && matchesType && afterFrom && beforeTo
      );
    });
  }, [txns, filters]);

  // Analytics based on filtered
  const totalTransactions = filtered.length;
  const totalRevenue = filtered
    .filter((t) => t.status === "Completed")
    .reduce((sum, t) => sum + (t.type === "Refund" ? 0 : t.amount), 0);
  const successRate =
    totalTransactions === 0
      ? 0
      : Math.round(
          (filtered.filter((t) => t.status === "Completed").length /
            totalTransactions) *
            100
        );
  const refundsIssued = filtered.filter((t) => t.status === "Refunded").length;

  // Refund flow
  const canRefund = (t) =>
    !!t && t.status === "Completed" && t.type === "Payment";
  const onConfirmRefund = () => {
    if (!selected) return;
    setTxns((prev) =>
      prev.map((x) =>
        x.id === selected.id ? { ...x, status: "Refunded", type: "Refund" } : x
      )
    );
    setConfirmOpen(false);
    setToast({
      open: true,
      title: "Refund issued",
      description: `Refund issued successfully for ${selected.id}.`,
      variant: "success",
    });
    setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
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

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>Dashboard</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-900 dark:text-white font-medium">
                  Transactions
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    Transactions
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Track and manage all transactions
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Total Revenue",
                  value: `$${totalRevenue.toFixed(2)}`,
                },
                {
                  title: "Total Transactions",
                  value: String(totalTransactions),
                },
                { title: "Success Rate", value: `${successRate}%` },
                { title: "Refunds Issued", value: String(refundsIssued) },
              ].map((c, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{c.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{c.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
                    {/* Search */}
                    <div className="relative col-span-1 md:col-span-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        placeholder="Search by ID, name, or email..."
                        className="pl-10"
                        value={filters.query}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            query: e.target.value,
                          }))
                        }
                      />
                    </div>

                    {/* Status */}
                    <Select
                      value={filters.status}
                      onValueChange={(v) =>
                        setFilters((prev) => ({ ...prev, status: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                        <SelectItem value="Refunded">Refunded</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Type */}
                    <Select
                      value={filters.type}
                      onValueChange={(v) =>
                        setFilters((prev) => ({ ...prev, type: v }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Payment">Payment</SelectItem>
                        <SelectItem value="Refund">Refund</SelectItem>
                        <SelectItem value="Subscription">
                          Subscription
                        </SelectItem>
                        <SelectItem value="Transfer">Transfer</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Date From */}
                    <Input
                      type="date"
                      value={filters.from}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          from: e.target.value,
                        }))
                      }
                    />
                    {/* Date To */}
                    <Input
                      type="date"
                      value={filters.to}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, to: e.target.value }))
                      }
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full lg:w-auto">
                    <Button
                      variant="outline"
                      className="w-full lg:w-auto"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>Transactions List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Client/Firm</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((t, index) => (
                        <motion.tr
                          key={t.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.06 }}
                          className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                        >
                          <TableCell className="font-medium">{t.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                                <span className="text-primary-600 dark:text-primary-400 text-xs font-semibold">
                                  {getInitials(t.partyName)}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm text-neutral-900 dark:text-neutral-100">
                                  {t.partyName}
                                </div>
                                <div className="text-xs text-neutral-500">
                                  {t.partyEmail}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {currencySymbol(t.currency)}
                            {t.amount.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                t.type === "Payment"
                                  ? "success"
                                  : t.type === "Refund"
                                  ? "secondary"
                                  : "warning"
                              }
                            >
                              {t.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                t.status === "Completed"
                                  ? "success"
                                  : t.status === "Pending"
                                  ? "warning"
                                  : t.status === "Refunded"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {t.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(t.datetime).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => openView(t)}
                              aria-label="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* View Transaction Dialog */}
            <Dialog open={viewOpen} onOpenChange={setViewOpen}>
              <DialogContent>
                {selected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <DialogHeader>
                      <DialogTitle>Transaction Details</DialogTitle>
                      <DialogDescription>
                        Review transaction information.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          Transaction ID
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.id}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          Client/Firm
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.partyName} • {selected.partyEmail}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Amount</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {currencySymbol(selected.currency)}
                          {selected.amount.toFixed(2)}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Type</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.type}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">Status</div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.status}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          Payment Method
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.paymentMethod}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          Date & Time
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {new Date(selected.datetime).toLocaleString()}
                        </div>
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <div className="text-xs text-neutral-500">Notes</div>
                        <div className="text-sm text-neutral-700 dark:text-neutral-300">
                          {selected.notes || "—"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2">
                      <div className="text-sm text-neutral-500" />
                      {canRefund(selected) ? (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="destructive"
                            onClick={() => setConfirmOpen(true)}
                          >
                            Refund
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setViewOpen(false)}
                          >
                            Close
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              selected.status === "Completed"
                                ? "success"
                                : selected.status === "Pending"
                                ? "warning"
                                : selected.status === "Refunded"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {selected.status}
                          </Badge>
                          <Button
                            variant="outline"
                            onClick={() => setViewOpen(false)}
                          >
                            Close
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </DialogContent>
            </Dialog>

            {/* Confirm Refund */}
            <AlertDialog
              open={confirmOpen}
              onOpenChange={setConfirmOpen}
              title="Issue Refund"
              description="Are you sure you want to issue a refund for this transaction? This action cannot be undone."
              confirmText="Refund"
              variant="destructive"
              onConfirm={onConfirmRefund}
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

export default Transactions;
