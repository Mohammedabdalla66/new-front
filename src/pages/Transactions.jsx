import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Search, ChevronRight, Eye, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
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
import { adminAPI } from "../services/adminApi";
import { toast } from "react-toastify";

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
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [txns, setTxns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    query: "",
    status: "",
    type: "",
    fromDate: "",
    toDate: "",
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });

  const [viewOpen, setViewOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Debounced search
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(filters.query);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [filters.query]);

  // Fetch transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await adminAPI.listTransactions({
          page,
          limit,
          type: filters.type === "All" ? "" : filters.type,
          status: filters.status === "All" ? "" : filters.status,
          fromDate: filters.fromDate || "",
          toDate: filters.toDate || "",
        });

        if (response.data.success) {
          // Filter by search query on client side if needed
          let filteredData = response.data.data;
          if (debouncedQuery) {
            const q = debouncedQuery.toLowerCase();
            filteredData = filteredData.filter(
              (t) =>
                t.transactionId?.toLowerCase().includes(q) ||
                t.partyName?.toLowerCase().includes(q) ||
                t.partyEmail?.toLowerCase().includes(q)
            );
          }
          setTxns(filteredData);
          setMeta(response.data.meta);
        } else {
          setError("Failed to load transactions");
        }
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError(err.response?.data?.message || "Failed to load transactions");
        toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [
    page,
    limit,
    filters.type,
    filters.status,
    filters.fromDate,
    filters.toDate,
    debouncedQuery,
  ]);

  const openView = (t) => {
    setSelected(t);
    setViewOpen(true);
  };

  const resetFilters = () => {
    setFilters({ query: "", status: "", type: "", fromDate: "", toDate: "" });
    setPage(1);
  };

  // Analytics based on current page data
  const totalTransactions = meta.total;
  const totalRevenue = txns
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + (t.type === "refund" ? 0 : t.amount), 0);
  const successRate =
    totalTransactions === 0
      ? 0
      : Math.round(
          (txns.filter((t) => t.status === "completed").length / txns.length) *
            100
        );
  const refundsIssued = txns.filter(
    (t) => t.status === "completed" && t.type === "refund"
  ).length;

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
              <div
                className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400"
                // style={isArabic ? { flexDirection: "row-reverse" } : {}}
              >
                <span>{t("dashboard")}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-900 dark:text-white font-medium">
                  {t("transactions")}
                </span>
              </div>
              <div
                className="flex items-center space-x-3"
                // style={isArabic ? { flexDirection: "row-reverse" } : {}}
              >
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {t("transactions")}
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {t("trackAndManageTransactions")}
                  </p>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: t("totalRevenue"),
                  value: `${totalRevenue.toFixed(2)} OMR`,
                },
                {
                  title: t("totalTransactions"),
                  value: String(totalTransactions),
                },
                { title: t("successRate"), value: `${successRate}%` },
                { title: t("refundsIssued"), value: String(refundsIssued) },
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
                <div
                  className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between"
                  style={isArabic ? { flexDirection: "row-reverse" } : {}}
                >
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
                    {/* Search */}
                    <div className="relative col-span-1 md:col-span-2">
                      <Search
                        className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4 ${
                          isArabic ? "right-3" : "left-3"
                        }`}
                      />
                      <Input
                        placeholder={t("searchByIdNameEmail")}
                        className={isArabic ? "pr-10" : "pl-10"}
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
                        <SelectValue placeholder={t("status")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">{t("all")}</SelectItem>
                        <SelectItem value="completed">
                          {t("completed")}
                        </SelectItem>
                        <SelectItem value="pending">{t("pending")}</SelectItem>
                        <SelectItem value="failed">{t("error")}</SelectItem>
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
                        <SelectValue placeholder={t("type")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">
                          {t("all")} {t("type")}
                        </SelectItem>
                        <SelectItem value="deposit">{t("deposit")}</SelectItem>
                        <SelectItem value="payment">{t("payment")}</SelectItem>
                        <SelectItem value="hold">{t("hold")}</SelectItem>
                        <SelectItem value="release">{t("release")}</SelectItem>
                        <SelectItem value="refund">{t("refund")}</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Date From */}
                    <Input
                      type="date"
                      value={filters.fromDate}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          fromDate: e.target.value,
                        }))
                      }
                    />
                    {/* Date To */}
                    <Input
                      type="date"
                      value={filters.toDate}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          toDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div
                    className="flex items-center gap-2 w-full lg:w-auto"
                    style={isArabic ? { flexDirection: "row-reverse" } : {}}
                  >
                    <Button
                      variant="outline"
                      className="w-full lg:w-auto"
                      onClick={resetFilters}
                    >
                      {t("resetFilters")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("transactionsList")} ({meta.total} {t("total")})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-red-600 dark:text-red-400">
                    {error}
                  </div>
                ) : txns.length === 0 ? (
                  <div className="text-center py-12 text-neutral-600 dark:text-neutral-400">
                    {t("noTransactionsFound")}
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t("transactionId")}</TableHead>
                            <TableHead>{t("clientServiceProvider")}</TableHead>
                            <TableHead>{t("amount")}</TableHead>
                            <TableHead>{t("type")}</TableHead>
                            <TableHead>{t("status")}</TableHead>
                            <TableHead>{t("dateTime")}</TableHead>
                            <TableHead
                              className={isArabic ? "text-left" : "text-right"}
                            >
                              {t("actions")}
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {txns.map((t, index) => (
                            <motion.tr
                              key={t._id || t.transactionId}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.05,
                              }}
                              className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                            >
                              <TableCell className="font-medium">
                                {t.transactionId || t._id?.toString().slice(-8)}
                              </TableCell>
                              <TableCell>
                                <div
                                  className="flex items-center gap-2"
                                  style={
                                    isArabic
                                      ? { flexDirection: "row-reverse" }
                                      : {}
                                  }
                                >
                                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                                    <span className="text-primary-600 dark:text-primary-400 text-xs font-semibold">
                                      {getInitials(t.partyName || "Unknown")}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="text-sm text-neutral-900 dark:text-neutral-100">
                                      {t.partyName || "Unknown"}
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                      {t.partyEmail || "—"}
                                    </div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {t.amount?.toFixed(2) || "0.00"} OMR
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    t.type === "payment" ||
                                    t.type === "deposit" ||
                                    t.type === "release"
                                      ? "success"
                                      : t.type === "refund"
                                      ? "secondary"
                                      : "warning"
                                  }
                                >
                                  {t.type || "—"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    t.status === "completed"
                                      ? "success"
                                      : t.status === "pending"
                                      ? "warning"
                                      : "destructive"
                                  }
                                >
                                  {t.status || "—"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {new Date(
                                  t.datetime || t.createdAt
                                ).toLocaleString(isArabic ? "ar-OM" : "en-US")}
                              </TableCell>
                              <TableCell
                                className={
                                  isArabic ? "text-left" : "text-right"
                                }
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                  onClick={() => openView(t)}
                                  aria-label={t("view")}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </TableCell>
                            </motion.tr>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {meta.pages > 1 && (
                      <div
                        className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4"
                        style={isArabic ? { flexDirection: "row-reverse" } : {}}
                      >
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {t("page")} {page} {t("of")} {meta.pages}
                        </div>
                        <div
                          className="flex gap-2"
                          style={
                            isArabic ? { flexDirection: "row-reverse" } : {}
                          }
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                          >
                            {t("previous")}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setPage((p) => Math.min(meta.pages, p + 1))
                            }
                            disabled={page === meta.pages}
                          >
                            {t("next")}
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
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
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    <DialogHeader>
                      <DialogTitle>{t("transactionDetails")}</DialogTitle>
                      <DialogDescription>
                        {t("reviewProposalBeforeApproval")}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          {t("transactionId")}
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.transactionId || selected._id}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          {t("clientServiceProvider")}
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.partyName || "Unknown"} •{" "}
                          {selected.partyEmail || "—"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          {t("amount")}
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.amount?.toFixed(2) || "0.00"} OMR
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          {t("type")}
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.type || "—"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          {t("status")}
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {selected.status || "—"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-neutral-500">
                          {t("dateTime")}
                        </div>
                        <div className="text-sm text-neutral-900 dark:text-neutral-100">
                          {new Date(
                            selected.datetime || selected.createdAt
                          ).toLocaleString(isArabic ? "ar-OM" : "en-US")}
                        </div>
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <div className="text-xs text-neutral-500">
                          {t("description")}
                        </div>
                        <div className="text-sm text-neutral-700 dark:text-neutral-300">
                          {selected.description || "—"}
                        </div>
                      </div>
                    </div>

                    <div
                      className="flex items-center justify-end gap-2 pt-2"
                      style={isArabic ? { flexDirection: "row-reverse" } : {}}
                    >
                      <Button
                        variant="outline"
                        onClick={() => setViewOpen(false)}
                      >
                        {t("close")}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
