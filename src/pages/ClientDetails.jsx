import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
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
  Wallet,
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

const ClientDetails = () => {
  const { language } = useLanguage();
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
        const response = await adminAPI.getClient(id);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError("Failed to load client details");
        }
      } catch (err) {
        console.error("Error fetching client:", err);
        setError(err.response?.data?.message || "Failed to load client");
        toast.error("Failed to load client details");
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
    if (!amount || amount === 0) return "Not specified";
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
              {error || "Client not found"}
            </div>
          </main>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "wallet", label: "Wallet", icon: Wallet },
    { id: "requests", label: "Requests", icon: FileText },
    { id: "proposals", label: "Proposals", icon: FileText },
    { id: "messages", label: "Messages", icon: MessageSquare },
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
                onClick={() => navigate("/admin/clients")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
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
                    Client Details
                  </p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Card>
              <CardContent className="p-0">
                <div className="flex border-b border-neutral-200 dark:border-neutral-700 overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
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
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-neutral-500">Name</label>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {data.name}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">Email</label>
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-neutral-400" />
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {data.email}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">Phone</label>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-neutral-400" />
                            <p className="text-sm font-medium text-neutral-900 dark:text-white">
                              {data.phone || "—"}
                            </p>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">Status</label>
                          <div>
                            <Badge variant={data.verified ? "success" : "warning"}>
                              {data.verified ? "Active" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">Address</label>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {data.address || "—"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">Nationality</label>
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">
                            {data.nationality || "—"}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-neutral-500">Created At</label>
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
                </motion.div>
              )}

              {/* Wallet Tab */}
              {activeTab === "wallet" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Wallet Balance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-3">
                        <Wallet className="w-8 h-8 text-primary-500" />
                        <div>
                          <p className="text-sm text-neutral-500">Current Balance</p>
                          <p className="text-3xl font-bold text-neutral-900 dark:text-white">
                            {formatCurrency(data.wallet?.balance || 0)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Requests Tab */}
              {activeTab === "requests" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Requests ({data.requests?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.requests && data.requests.length > 0 ? (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.requests.map((request) => (
                                <TableRow key={request.id}>
                                  <TableCell className="font-medium">
                                    {getServiceTitleLabel(request.title, language || 'en')}
                                  </TableCell>
                                  <TableCell>{formatCurrency(request.budget)}</TableCell>
                                  <TableCell>
                                    <Badge variant="secondary">{request.status}</Badge>
                                  </TableCell>
                                  <TableCell>{formatDate(request.createdAt)}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <p className="text-sm text-neutral-500">No requests found</p>
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
                      <CardTitle>Proposals ({data.proposals?.length || 0})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.proposals && data.proposals.length > 0 ? (
                        <div className="rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Request</TableHead>
                                <TableHead>Service Provider</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {data.proposals.map((proposal) => (
                                <TableRow key={proposal.id}>
                                  <TableCell className="font-medium">
                                    {proposal.requestTitle ? getServiceTitleLabel(proposal.requestTitle, language || 'en') : "—"}
                                  </TableCell>
                                  <TableCell>
                                    {proposal.serviceProvider?.name || "—"}
                                  </TableCell>
                                  <TableCell>{formatCurrency(proposal.price)}</TableCell>
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
                        <p className="text-sm text-neutral-500">No proposals found</p>
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
                        Conversations ({data.messagesSummary?.length || 0})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {data.messagesSummary && data.messagesSummary.length > 0 ? (
                        <div className="space-y-3">
                          {data.messagesSummary.map((msg) => (
                            <div
                              key={msg.serviceProviderId}
                              className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <p className="font-medium text-neutral-900 dark:text-white">
                                      {msg.serviceProviderName}
                                    </p>
                                    {msg.unread > 0 && (
                                      <Badge variant="secondary">{msg.unread} unread</Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                                    {msg.serviceProviderEmail}
                                  </p>
                                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                    {msg.lastMessage || "No messages"}
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
                        <p className="text-sm text-neutral-500">No conversations found</p>
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

export default ClientDetails;
// ClientDetails component

