import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { requestsAPI, proposalsAPI, messagesAPI, bookingsAPI } from "../services/api.js";

const StatusTracker = ({ status }) => {
  const steps = ["submitted", "open", "in-progress", "completed"];
  const idx = steps.indexOf(status);
  return (
    <div className="flex items-center space-x-2 sm:space-x-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
              i <= idx
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {i + 1}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 sm:w-10 h-0.5 ${
                i < idx ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("offers");
  const [request, setRequest] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [proposalsLoading, setProposalsLoading] = useState(false);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [error, setError] = useState("");
  const [acceptingProposalId, setAcceptingProposalId] = useState(null);
  const messagesEndRef = useRef(null);

  // Fetch request details
  useEffect(() => {
    const loadRequest = async () => {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        const res = await requestsAPI.get(id);
        const data = res.data.success ? res.data.data : res.data;
        setRequest(data);
      } catch (e) {
        console.error("Error loading request:", e);
        setError(e?.response?.data?.message || "Failed to load request");
        toast.error("Failed to load request details");
      } finally {
        setLoading(false);
      }
    };
    loadRequest();
  }, [id]);

  // Fetch proposals when offers tab is active
  useEffect(() => {
    const loadProposals = async () => {
      if (!id || tab !== "offers") return;
      setProposalsLoading(true);
      try {
        const res = await proposalsAPI.listByRequest(id);
        const data = res.data.success ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setProposals(data);
      } catch (e) {
        console.error("Error loading proposals:", e);
        toast.error("Failed to load proposals");
      } finally {
        setProposalsLoading(false);
      }
    };
    loadProposals();
  }, [id, tab]);

  // Fetch messages when chat tab is active
  useEffect(() => {
    const loadMessages = async () => {
      if (!id || tab !== "chat" || proposals.length === 0) return;
      
      setMessagesLoading(true);
      try {
        // Get unique service provider IDs from proposals
        const serviceProviderIds = [...new Set(
          proposals
            .map(p => p.serviceProvider?._id || p.serviceProvider || p.company?._id || p.company)
            .filter(Boolean)
        )];

        if (serviceProviderIds.length === 0) {
          setMessages([]);
          setMessagesLoading(false);
          return;
        }

        // Fetch messages with each service provider
        const allMessages = [];
        for (const serviceProviderId of serviceProviderIds) {
          try {
            const res = await messagesAPI.getConversation(serviceProviderId);
            const conversationMessages = res.data.success 
              ? res.data.data 
              : (Array.isArray(res.data) ? res.data : []);
            
            // Add service provider info to each message
            const proposal = proposals.find(p => 
              (p.serviceProvider?._id || p.serviceProvider) === serviceProviderId ||
              (p.company?._id || p.company) === serviceProviderId
            );
            const serviceProviderName = proposal?.serviceProvider?.name || 
                                      proposal?.company?.name || 
                                      "Service Provider";
            
            conversationMessages.forEach(msg => {
              allMessages.push({
                ...msg,
                serviceProviderId,
                serviceProviderName,
              });
            });
          } catch (e) {
            console.error(`Error loading messages with service provider ${serviceProviderId}:`, e);
          }
        }

        // Sort messages by createdAt
        allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setMessages(allMessages);
      } catch (e) {
        console.error("Error loading messages:", e);
        toast.error("Failed to load messages");
      } finally {
        setMessagesLoading(false);
      }
    };

    // Only load messages if we have proposals
    if (tab === "chat" && proposals.length > 0) {
      loadMessages();
    } else if (tab === "chat" && proposals.length === 0 && !proposalsLoading) {
      // If no proposals yet, try loading them first
      const loadProposalsFirst = async () => {
        try {
          const res = await proposalsAPI.listByRequest(id);
          const data = res.data.success ? res.data.data : (Array.isArray(res.data) ? res.data : []);
          setProposals(data);
        } catch (e) {
          console.error("Error loading proposals for messages:", e);
        }
      };
      loadProposalsFirst();
    }
  }, [id, tab, proposals, proposalsLoading]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (tab === "chat" && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, tab]);

  const handleAcceptProposal = async (proposalId) => {
    if (!confirm("Are you sure you want to accept this proposal? This will create a booking and place funds in escrow.")) {
      return;
    }

    setAcceptingProposalId(proposalId);
    try {
      await bookingsAPI.acceptProposal(proposalId);
      toast.success("Proposal accepted! Booking created and funds placed in escrow.");
      // Reload proposals to update status
      const res = await proposalsAPI.listByRequest(id);
      const data = res.data.success ? res.data.data : (Array.isArray(res.data) ? res.data : []);
      setProposals(data);
    } catch (e) {
      console.error("Error accepting proposal:", e);
      toast.error(e?.response?.data?.message || "Failed to accept proposal");
    } finally {
      setAcceptingProposalId(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading request details...</p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error || "Request not found"}</p>
          <button
            onClick={() => navigate("/client/requests")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  const isRejected = request.status === 'rejected';
  const isPending = request.status === 'pending';

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6 gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {request.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {request.description}
          </p>
        </div>
        <StatusTracker status={request.status || "submitted"} />
      </div>

      {/* Rejection Reason Alert */}
      {isRejected && request.rejectionReason && (
        <div className="mb-4 sm:mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Request Rejected
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p className="font-medium mb-1">Reason:</p>
                <p className="whitespace-pre-wrap">{request.rejectionReason}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/client/request/new", { state: { editRequest: request } })}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Update & Resubmit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pending Status Alert */}
      {isPending && (
        <div className="mb-4 sm:mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Under Review
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>Your request is currently under admin review. It will become visible to service providers once approved.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-wrap gap-2 sm:gap-4 border-b border-gray-100 dark:border-gray-700 mb-4">
          {["offers", "chat", "delivered"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-2 text-xs sm:text-sm font-medium transition-colors ${
                tab === t
                  ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
              {t === "offers" && proposals.length > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  {proposals.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === "offers" && (
          <div className="space-y-3">
            {proposalsLoading ? (
              <div className="text-center py-8">
                <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading proposals...</p>
              </div>
            ) : proposals.length === 0 ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                <p>No proposals yet. Service providers can submit proposals for this request.</p>
              </div>
            ) : (
              proposals.map((proposal) => {
                const serviceProvider = proposal.serviceProvider || proposal.company;
                const serviceProviderName = serviceProvider?.name || "Service Provider";
                const isAccepted = proposal.status === "accepted";
                const isCanceled = proposal.status === "canceled";
                
                return (
                  <div
                    key={proposal._id || proposal.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                        {serviceProviderName}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Duration: {proposal.durationDays || proposal.duration || "N/A"} days
                      </div>
                      {proposal.notes && (
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {proposal.notes}
                        </div>
                      )}
                      {proposal.attachments && proposal.attachments.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {proposal.attachments.map((att, idx) => (
                            <a
                              key={idx}
                              href={att.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              📎 {att.name || "Attachment"}
                            </a>
                          ))}
                  </div>
                      )}
                      {proposal.status && (
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                            isAccepted ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200" :
                            isCanceled ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200" :
                            "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200"
                          }`}>
                            {proposal.status}
                          </span>
                  </div>
                      )}
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-3">
                  <div className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                        ${(proposal.price || 0).toLocaleString()}
                  </div>
                      {!isAccepted && !isCanceled && (
                        <button
                          onClick={() => handleAcceptProposal(proposal._id || proposal.id)}
                          disabled={acceptingProposalId === (proposal._id || proposal.id)}
                          className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          {acceptingProposalId === (proposal._id || proposal.id) ? "Accepting..." : "Accept"}
                  </button>
                      )}
                </div>
              </div>
                );
              })
            )}
          </div>
        )}

        {tab === "chat" && (
          <div className="space-y-4">
            {messagesLoading ? (
              <div className="text-center py-8">
                <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                <p>No messages yet. Messages from service providers who have submitted proposals will appear here.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {messages.map((msg) => {
                  const isFromServiceProvider = msg.sender === "serviceProvider" || msg.sender === "company";
                  const senderName = isFromServiceProvider 
                    ? (msg.serviceProviderName || "Service Provider")
                    : "You";
                  
                  return (
                    <div
                      key={msg._id || msg.id}
                      className={`flex ${isFromServiceProvider ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                          isFromServiceProvider
                            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        <div className="text-xs font-medium mb-1 opacity-75">
                          {senderName}
                        </div>
                        <div className="text-sm">{msg.text || "(No text)"}</div>
                        {msg.file && (
                          <div className="mt-2">
                            <a
                              href={msg.file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs underline"
                            >
                              📎 {msg.file.name || "File"}
                            </a>
                          </div>
                        )}
                        <div className="text-xs mt-1 opacity-60">
                          {formatDate(msg.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        )}

        {tab === "delivered" && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Delivered files will appear here once the service provider completes the work.</p>
          </div>
        )}
      </div>
    </div>
  );
};
