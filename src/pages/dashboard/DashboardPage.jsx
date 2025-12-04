import React, { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { serviceProviderAPI } from "../../services/api";
import { toast } from "react-toastify";
import {
  Calendar,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Plus,
  Phone,
  Upload,
  Clock,
  FileText,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

const DashboardPage = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const response = await serviceProviderAPI.getDashboardStats();
        if (response.data.success) {
          setStats(response.data.data);
        } else {
<<<<<<< HEAD
          console.error("Dashboard stats response not successful:", response.data);
          toast.error(response.data.message || "Failed to load dashboard statistics");
        }
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
        const errorMessage = error?.response?.data?.message || error?.message || "Failed to load dashboard statistics";
=======
          console.error(
            "Dashboard stats response not successful:",
            response.data
          );
          toast.error(response.data.message || t("failedToLoadDashboardStats"));
        }
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          t("failedToLoadDashboardStats");
>>>>>>> origin/mohamedAbdo
        console.error("Error details:", {
          status: error?.response?.status,
          statusText: error?.response?.statusText,
          data: error?.response?.data,
<<<<<<< HEAD
          url: error?.config?.url
=======
          url: error?.config?.url,
>>>>>>> origin/mohamedAbdo
        });
        toast.error(errorMessage);
        // Set default stats on error so UI doesn't break
        setStats({
          bookings: { total: 0, active: 0, completed: 0 },
          proposals: { total: 0, pending: 0, active: 0, accepted: 0 },
          earnings: 0,
<<<<<<< HEAD
          messages: { unread: 0 }
=======
          messages: { unread: 0 },
>>>>>>> origin/mohamedAbdo
        });
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

<<<<<<< HEAD
  const statsCards = stats ? [
    {
      title: t("totalBookings"),
      value: stats.bookings?.total || 0,
      change: "",
      changeType: "positive",
      icon: Calendar,
      color: "blue",
    },
    {
      title: t("activeProjects"),
      value: stats.bookings?.active || 0,
      change: "",
      changeType: "positive",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: t("completedProjects"),
      value: stats.bookings?.completed || 0,
      change: "",
      changeType: "positive",
      icon: CheckCircle,
      color: "purple",
    },
    {
      title: t("earnings"),
      value: `$${stats.earnings?.toLocaleString() || 0}`,
      change: "",
      changeType: "positive",
      icon: DollarSign,
      color: "yellow",
    },
  ] : [
    {
      title: t("totalBookings"),
      value: "0",
      change: "",
      changeType: "positive",
      icon: Calendar,
      color: "blue",
    },
    {
      title: t("activeProjects"),
      value: "0",
      change: "",
      changeType: "positive",
      icon: TrendingUp,
      color: "green",
    },
    {
      title: t("completedProjects"),
      value: "0",
      change: "",
      changeType: "positive",
      icon: CheckCircle,
      color: "purple",
    },
    {
      title: t("earnings"),
      value: "$0",
      change: "",
      changeType: "positive",
      icon: DollarSign,
      color: "yellow",
    },
  ];
=======
  const statsCards = stats
    ? [
        {
          title: t("totalBookings"),
          value: stats.bookings?.total || 0,
          change: "",
          changeType: "positive",
          icon: Calendar,
          color: "blue",
        },
        {
          title: t("activeProjects"),
          value: stats.bookings?.active || 0,
          change: "",
          changeType: "positive",
          icon: TrendingUp,
          color: "green",
        },
        {
          title: t("completedProjects"),
          value: stats.bookings?.completed || 0,
          change: "",
          changeType: "positive",
          icon: CheckCircle,
          color: "purple",
        },
        {
          title: t("earnings"),
          value: `$${stats.earnings?.toLocaleString() || 0}`,
          change: "",
          changeType: "positive",
          icon: DollarSign,
          color: "yellow",
        },
      ]
    : [
        {
          title: t("totalBookings"),
          value: "0",
          change: "",
          changeType: "positive",
          icon: Calendar,
          color: "blue",
        },
        {
          title: t("activeProjects"),
          value: "0",
          change: "",
          changeType: "positive",
          icon: TrendingUp,
          color: "green",
        },
        {
          title: t("completedProjects"),
          value: "0",
          change: "",
          changeType: "positive",
          icon: CheckCircle,
          color: "purple",
        },
        {
          title: t("earnings"),
          value: "$0",
          change: "",
          changeType: "positive",
          icon: DollarSign,
          color: "yellow",
        },
      ];
>>>>>>> origin/mohamedAbdo

  const quickActions = [
    {
      title: t("createProposal"),
      icon: Plus,
      color: "blue",
<<<<<<< HEAD
      description: "Submit a new project proposal",
=======
      description: t("submitNewProjectProposal"),
>>>>>>> origin/mohamedAbdo
    },
    {
      title: t("scheduleCall"),
      icon: Phone,
      color: "green",
<<<<<<< HEAD
      description: "Schedule a client meeting",
=======
      description: t("scheduleClientMeeting"),
>>>>>>> origin/mohamedAbdo
    },
    {
      title: t("uploadDocument"),
      icon: Upload,
      color: "purple",
<<<<<<< HEAD
      description: "Upload project documents",
=======
      description: t("uploadProjectDocuments"),
>>>>>>> origin/mohamedAbdo
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "proposal",
<<<<<<< HEAD
      title: "New proposal submitted for Tax Filing project",
      time: "2 hours ago",
=======
      title: t("newProposalSubmitted"),
      time: `2 ${t("hoursAgo")}`,
>>>>>>> origin/mohamedAbdo
      icon: FileText,
      color: "blue",
    },
    {
      id: 2,
      type: "message",
<<<<<<< HEAD
      title: "Received message from Sarah Johnson",
      time: "4 hours ago",
=======
      title: `${t("receivedMessageFrom")} Sarah Johnson`,
      time: `4 ${t("hoursAgo")}`,
>>>>>>> origin/mohamedAbdo
      icon: MessageSquare,
      color: "green",
    },
    {
      id: 3,
      type: "deadline",
<<<<<<< HEAD
      title: "Financial Statements project deadline in 2 days",
      time: "1 day ago",
=======
      title: `${t("projectDeadlineIn")} 2 ${t("days")}`,
      time: `1 ${t("dayAgo")}`,
>>>>>>> origin/mohamedAbdo
      icon: AlertCircle,
      color: "red",
    },
    {
      id: 4,
      type: "completion",
<<<<<<< HEAD
      title: "Bookkeeping project completed successfully",
      time: "2 days ago",
=======
      title: t("projectCompletedSuccessfully"),
      time: `2 ${t("daysAgoShort")}`,
>>>>>>> origin/mohamedAbdo
      icon: CheckCircle,
      color: "green",
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
<<<<<<< HEAD
      title: "Q4 Financial Statements",
      client: "ABC Company",
      deadline: "Dec 31, 2024",
=======
      title: t("deadline1Title"),
      client: t("deadline1Client"),
      deadline: t("deadline1Date"),
>>>>>>> origin/mohamedAbdo
      priority: "high",
      daysLeft: 3,
    },
    {
      id: 2,
<<<<<<< HEAD
      title: "Tax Return Filing",
      client: "XYZ Corp",
      deadline: "Jan 15, 2025",
=======
      title: t("deadline2Title"),
      client: t("deadline2Client"),
      deadline: t("deadline2Date"),
>>>>>>> origin/mohamedAbdo
      priority: "medium",
      daysLeft: 18,
    },
    {
      id: 3,
<<<<<<< HEAD
      title: "Monthly Bookkeeping",
      client: "DEF Ltd",
      deadline: "Jan 31, 2025",
=======
      title: t("deadline3Title"),
      client: t("deadline3Client"),
      deadline: t("deadline3Date"),
>>>>>>> origin/mohamedAbdo
      priority: "low",
      daysLeft: 34,
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900";
      case "low":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {card.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {card.value}
                  </p>
                  <p
                    className={`text-sm ${
                      card.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
<<<<<<< HEAD
                    {card.change} from last month
=======
                    {card.change} {t("fromLastMonth")}
>>>>>>> origin/mohamedAbdo
                  </p>
                </div>
                <div
                  className={`p-3 rounded-lg bg-${card.color}-100 dark:bg-${card.color}-900`}
                >
                  <Icon
                    className={`w-6 h-6 text-${card.color}-600 dark:text-${card.color}-400`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("quickActions")}
            </h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="w-full flex items-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900 mr-3`}
                    >
                      <Icon
                        className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`}
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {action.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("recentActivity")}
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg bg-${activity.color}-100 dark:bg-${activity.color}-900`}
                    >
                      <Icon
                        className={`w-4 h-4 text-${activity.color}-600 dark:text-${activity.color}-400`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("upcomingDeadlines")}
          </h3>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div
                key={deadline.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {deadline.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {deadline.client}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
<<<<<<< HEAD
                    Due: {deadline.deadline}
=======
                    {t("due")}: {deadline.deadline}
>>>>>>> origin/mohamedAbdo
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      deadline.priority
                    )}`}
                  >
<<<<<<< HEAD
                    {deadline.priority}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {deadline.daysLeft}d
=======
                    {t(deadline.priority)}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {deadline.daysLeft}
                    {t("daysShort")}
>>>>>>> origin/mohamedAbdo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Overview Chart Placeholder */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t("monthlyOverview")}
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400">
<<<<<<< HEAD
                Chart placeholder for monthly performance
=======
                {t("chartPlaceholder")}
>>>>>>> origin/mohamedAbdo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
