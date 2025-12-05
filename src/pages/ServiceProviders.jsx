import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Search,
  Eye,
  ChevronRight,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
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
import { adminAPI } from "../services/adminApi";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

const ServiceProviders = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filters and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  const [meta, setMeta] = useState({ total: 0, pages: 1 });

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on search
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch service providers
  useEffect(() => {
    const fetchServiceProviders = async () => {
      setLoading(true);
      setError(null);
      try {
        const status = statusFilter === "All" ? "" : statusFilter.toLowerCase();
        const response = await adminAPI.listServiceProviders({
          page,
          limit,
          q: debouncedSearch,
          status,
        });

        if (response.data.success) {
          setServiceProviders(response.data.data);
          setMeta(response.data.meta);
        } else {
          setError(t("error"));
        }
      } catch (err) {
        console.error("Error fetching service providers:", err);
        setError(
          err.response?.data?.message || t("error")
        );
        toast.error(t("error"));
      } finally {
        setLoading(false);
      }
    };

    fetchServiceProviders();
  }, [page, limit, debouncedSearch, statusFilter]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleViewDetails = (id) => {
    navigate(`/admin/service-providers/${id}`);
  };

  const getStatusBadge = (verified) => {
    if (verified) return { label: t("active"), variant: "success" };
    return { label: t("pending"), variant: "warning" };
  };

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
            {/* Page Header */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>{t("dashboard")}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-neutral-900 dark:text-white font-medium">
                  {t("serviceProviders")}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {t("serviceProviders")}
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {t("manageServiceProvidersInfo")}
                  </p>
                </div>
              </div>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                      <Input
                        placeholder={t("searchByNameEmailTaxId")}
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>

                    <Select
                      value={statusFilter}
                      onValueChange={(value) => {
                        setStatusFilter(value);
                        setPage(1);
                      }}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder={t("filterByStatus")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">{t("allStatus")}</SelectItem>
                        <SelectItem value="active">{t("active")}</SelectItem>
                        <SelectItem value="pending">{t("pending")}</SelectItem>
                        <SelectItem value="inactive">{t("inactive")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Providers Table */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {t("serviceProvidersList")} ({meta.total} {t("total")})
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
                ) : serviceProviders.length === 0 ? (
                  <div className="text-center py-12 text-neutral-600 dark:text-neutral-400">
                    {t("noServiceProvidersFound")}
                  </div>
                ) : (
                  <>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>{t("name")}</TableHead>
                            <TableHead>{t("email")}</TableHead>
                            <TableHead>{t("phone")}</TableHead>
                            <TableHead>{t("documents")}</TableHead>
                            <TableHead>{t("status")}</TableHead>
                            <TableHead>{t("created")}</TableHead>
                            <TableHead className="text-right">{t("actions")}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {serviceProviders.map((provider, index) => {
                            const status = getStatusBadge(provider.verified);
                            return (
                              <motion.tr
                                key={provider._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.3,
                                  delay: index * 0.05,
                                }}
                                className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                              >
                                <TableCell>
                                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                                    <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">
                                      {getInitials(provider.name)}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                  {provider.name}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4 text-neutral-400" />
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                      {provider.email}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4 text-neutral-400" />
                                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                      {provider.phone || "—"}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">
                                    {provider.documentsCount || 0}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <Badge variant={status.variant}>
                                    {status.label}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {new Date(provider.createdAt).toLocaleDateString()}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleViewDetails(provider._id)}
                                    aria-label="View details"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </TableCell>
                              </motion.tr>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>

                    {/* Pagination */}
                    {meta.pages > 1 && (
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          {t("page")} {page} {t("of")} {meta.pages}
                        </div>
                        <div className="flex gap-2">
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceProviders;

