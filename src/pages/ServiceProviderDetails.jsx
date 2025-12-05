import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  ChevronLeft,
  User,
  FileText,
  CreditCard,
  MessageSquare,
  Loader2,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  FileCheck,
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
import { Badge } from "../components/ui/badge";
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
import { getServiceTitleLabel } from "../utils/titleUtils";
import { useLanguage } from "../contexts/LanguageContext";
import { useTranslation } from "react-i18next";

const ServiceProviderDetails = () => {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await adminAPI.getServiceProvider(id);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(t("error"));
        }
      } catch (err) {
        console.error("Error fetching service provider:", err);
        setError(err.response?.data?.message || t("error"));
        toast.error(t("error"));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  const getInitials = (name) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return t("notSpecifiedAmount");
    return `${amount.toLocaleString()} OMR`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
        <AdminSidebar isMobileOpen={isSidebarOpen} onMobileClose={closeSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
          </main>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
        <AdminSidebar isMobileOpen={isSidebarOpen} onMobileClose={closeSidebar} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onToggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="text-center py-12 text-red-600 dark:text-red-400">
              {error || t("error")}
            </div>
          </main>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: t("profile"), icon: User },
    { id: "proposals", label: t("proposals"), icon: FileText },
    { id: "transactions", label: t("transactions"), icon: CreditCard },
    { id: "messages", label: t("messages"), icon: MessageSquare },
  ];

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
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/service-providers")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                {t("back")}
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {getInitials(data.name)}
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    {data.name}
                  </h1>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {t("serviceProviderDetails")}
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Card>
              <CardContent className="p-0">
                <div className="flex border-b border-neutral-200 dark:border-neutral-700">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                          activeTab === tab.id
                            ? "border-primary-500 text-primary-600 dark:text-primary-400"
                            : "border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("basicInformation")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-neutral-500">{t("name")}</label>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {data.name}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">{t("email")}</label>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-neutral-400" />
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {data.email}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">{t("phone")}</label>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-neutral-400" />
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {data.phone || "—"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">{t("status")}</label>
                          <div>
                            <Badge variant={data.verified ? "success" : "warning"}>
                              {data.verified ? t("active") : t("pending")}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">{t("taxId")}</label>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {data.taxId || "—"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">{t("licenseNumber")}</label>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {data.licenseNumber || "—"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">{t("createdAt")}</label>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-neutral-400" />
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {formatDate(data.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Documents */}
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("documents")} ({data.documents?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.documents && data.documents.length > 0 ? (
                        <div className="space-y-2">
                          {data.documents.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                            >
                              <div className="flex items-center space-x-3">
                                <FileCheck className="w-5 h-5 text-neutral-400" />
                                <div>
                                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                    {doc.name || `Document ${index + 1}`}
                                  </p>
                                  <p className="text-xs text-neutral-500">
                                    {doc.type || t("documents")}
                                  </p>
                                </div>
                              </div>
                              <a
                                href={doc.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                              >
                                {t("view")}
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-neutral-500">{t("noDocumentsUploaded")}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Proposals Tab */}
              {activeTab === "proposals" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t("proposals")} ({data.proposals?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.proposals && data.proposals.length > 0 ? (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>{t("request")}</TableHead>
                                <TableHead>{t("price")}</TableHead>
                                <TableHead>{t("duration")}</TableHead>
                                <TableHead>{t("status")}</TableHead>
                                <TableHead>{t("date")}</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.proposals.map((proposal) => (
                                <TableRow key={proposal.id}>
                                  <TableCell className="font-medium">
                                    {proposal.requestTitle ? getServiceTitleLabel(proposal.requestTitle, language || 'en') : "—"}
                                  </TableCell>
                                  <TableCell>{formatCurrency(proposal.price)}</TableCell>
                                  <TableCell>{proposal.durationDays || "—"} {t("days")}</TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        proposal.status === "accepted"
                                          ? "success"
                                          : proposal.status === "rejected"
                                          ? "destructive"
                                          : "warning"
                                      }
                                    >
                                      {proposal.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>{formatDate(proposal.createdAt)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <p className="text-sm text-neutral-500">{t("noProposalsFound")}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Transactions Tab */}
              {activeTab === "transactions" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t("transactions")} ({data.transactions?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.transactions && data.transactions.length > 0 ? (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>{t("type")}</TableHead>
                                <TableHead>{t("amount")}</TableHead>
                                <TableHead>{t("status")}</TableHead>
                                <TableHead>{t("description")}</TableHead>
                                <TableHead>{t("date")}</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.transactions.map((txn) => (
                                <TableRow key={txn.id}>
                                  <TableCell>
                                    <Badge variant="secondary">{txn.type}</Badge>
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {formatCurrency(txn.amount)}
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant={
                                        txn.status === "completed"
                                          ? "success"
                                          : txn.status === "pending"
                                          ? "warning"
                                          : "destructive"
                                      }
                                    >
                                      {txn.status}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {txn.description || "—"}
                                  </TableCell>
                                  <TableCell>{formatDate(txn.date)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <p className="text-sm text-neutral-500">{t("noTransactionsFound")}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Messages Tab */}
              {activeTab === "messages" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {t("conversations")} ({data.messagesSummary?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.messagesSummary && data.messagesSummary.length > 0 ? (
                        <div className="space-y-3">
                          {data.messagesSummary.map((msg) => (
                            <div
                              key={msg.clientId}
                              className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <p className="font-medium text-neutral-900 dark:text-white">
                                      {msg.clientName}
                                    </p>
                                    {msg.unread > 0 && (
                                      <Badge variant="secondary">{msg.unread} {t("unread")}</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                                    {msg.clientEmail}
                                  </p>
                                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    {msg.lastMessage || t("noMessages")}
                                  </p>
                                </div>
                                <div className="text-xs text-neutral-500">
                                  {formatDate(msg.lastMessageDate)}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-neutral-500">{t("noConversationsFound")}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceProviderDetails;

