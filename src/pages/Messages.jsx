import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { messagesAPI } from "../services/api";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { useAuth } from "../hooks/useAuth";
import { getServiceTitleLabel } from "../utils/titleUtils";

export const Messages = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  
  // Determine the base path based on current route
  const getBasePath = () => {
    if (location.pathname.startsWith('/firm/')) {
      return '/firm/messages';
    } else if (location.pathname.startsWith('/client/')) {
      return '/client/messages';
    } else if (location.pathname.startsWith('/dashboard/')) {
      return '/dashboard/messages';
    }
    return '/client/messages'; // Default fallback
  };
  const [text, setText] = useState("");
  const [attach, setAttach] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [error, setError] = useState("");
  const endRef = useRef(null);

  // Load conversations on mount
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setConversationsLoading(true);
        const response = user?.role === 'client' 
          ? await messagesAPI.listClientConversations()
          : await messagesAPI.listServiceProviderConversations();
        
        if (response.data.success) {
          const chats = response.data.data || [];
          setConversations(chats.map(chat => {
            // Always use conversationId (Chat._id) as the primary id
            const conversationId = chat.conversationId || chat._id;
            return {
              id: conversationId, // Use conversationId as the primary id
              company: chat.serviceProvider?.name || chat.client?.name || 'Unknown',
              lastMessage: chat.lastMessage?.text || 'No messages yet',
              time: chat.lastMessage?.timestamp ? new Date(chat.lastMessage.timestamp).toLocaleTimeString() : '',
              unread: user?.role === 'client' 
                ? (chat.unreadCount?.client || 0)
                : (chat.unreadCount?.serviceProvider || 0),
              requestTitle: chat.request?.title || '',
              proposalPrice: chat.proposal?.price || null,
              conversationId: conversationId, // Explicitly set conversationId
              // Keep participant IDs for reference
              serviceProviderId: chat.serviceProvider?._id || chat.serviceProvider,
              clientId: chat.client?._id || chat.client
            };
          }));
          
          // Check if there's a chat parameter in URL
          const chatParam = searchParams.get('chat');
          if (chatParam) {
            // Try to find by conversationId first, then by participant ID
            const foundChat = chats.find(c => {
              const convId = c.conversationId || c._id;
              return convId === chatParam || 
                     convId?.toString() === chatParam ||
                     (c.serviceProvider?._id || c.serviceProvider || c.client?._id || c.client) === chatParam;
            });
            if (foundChat) {
              // Always use conversationId if available
              const idToUse = foundChat.conversationId || foundChat._id || chatParam;
              console.log('Setting activeId from URL param:', idToUse);
              setActiveId(idToUse);
            } else {
              // If chat param exists but conversation not found, try using it directly
              // This handles cases where the conversation might not be loaded yet
              console.log('Chat param found but conversation not in list, using param directly:', chatParam);
              setActiveId(chatParam);
            }
          } else if (chats.length > 0 && !activeId) {
            // Auto-select first conversation if none is selected
            const firstChat = chats[0];
            const idToUse = firstChat.conversationId || firstChat._id;
            console.log('Auto-selecting first conversation:', idToUse);
            setActiveId(idToUse);
          }
        }
      } catch (e) {
        console.error('Error loading conversations:', e);
      } finally {
        setConversationsLoading(false);
      }
    };
    
    if (user) {
      loadConversations();
    }
  }, [user, searchParams]);

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!activeId) {
        setMessages([]);
        return;
      }

      // Validate ObjectId format before making request
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      if (!objectIdRegex.test(activeId)) {
        setError(t("invalidServiceProviderId"));
        setMessages([]);
        return;
      }

      setLoading(true);
      setError("");
      try {
        // Check if activeId is a conversationId (from conversations list) or serviceProviderId (legacy)
        const activeConversation = conversations.find(c => 
          c.id === activeId || 
          c.conversationId === activeId ||
          (c.conversationId && c.conversationId.toString() === activeId.toString())
        );
        
        let res;
        let conversationIdToUse = null;
        
        // Determine which conversationId to use
        if (activeConversation && activeConversation.conversationId) {
          conversationIdToUse = activeConversation.conversationId;
        } else if (activeId && /^[0-9a-fA-F]{24}$/.test(activeId)) {
          // If activeId is a valid ObjectId, try using it directly as conversationId
          const matchingChat = conversations.find(c => 
            (c.conversationId && c.conversationId.toString() === activeId.toString()) ||
            (c._id && c._id.toString() === activeId.toString())
          );
          if (matchingChat) {
            conversationIdToUse = matchingChat.conversationId || matchingChat._id || activeId;
          } else {
            // Try using activeId directly as conversationId
            conversationIdToUse = activeId;
          }
        }
        
        if (conversationIdToUse) {
          // Use conversationId-based API
          console.log('Loading messages for conversationId:', conversationIdToUse);
          res = await messagesAPI.getMessagesByConversation(conversationIdToUse);
        } else {
          // Fallback to legacy API (using serviceProviderId/clientId)
          console.log('Using legacy API with activeId:', activeId);
          res = user?.role === 'client'
            ? await messagesAPI.getConversation(activeId)
            : await messagesAPI.getConversationForServiceProvider(activeId);
        }
        
        const data = res.data.success ? (res.data.data || []) : (Array.isArray(res.data) ? res.data : []);
        const mapped = data.map((m) => ({
          id: m._id,
          sender: m.sender === "client" ? (user?.role === 'client' ? "You" : "Client") : "Service Provider",
          side: m.sender === "client" ? (user?.role === 'client' ? "right" : "left") : (user?.role === 'client' ? "left" : "right"),
          text: m.text,
          time: new Date(m.createdAt).toLocaleTimeString(),
          file: m.file
            ? {
                name: m.file.name || m.file,
                url: m.file.url || "#",
                type: m.file.type || "file",
              }
            : undefined,
        }));
        if (mounted) setMessages(mapped);
      } catch (e) {
        console.error(e);
        if (mounted) {
          const errorMsg =
            e?.response?.data?.message || t("failedToLoadMessages");
          setError(errorMsg);
          setMessages([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [activeId, conversations, user]);

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onSend = async () => {
    if (!text.trim() && !attach) {
      console.log('Cannot send: no text or attachment');
      setError(t("pleaseEnterMessage"));
      setTimeout(() => setError(""), 3000);
      return;
    }
    
    if (!activeId) {
      console.log('Cannot send: no activeId. Conversations:', conversations);
      setError(t("pleaseSelectConversation"));
      setTimeout(() => setError(""), 3000);
      // Try to auto-select first conversation if available
      if (conversations.length > 0) {
        const firstChat = conversations[0];
        const idToUse = firstChat.conversationId || firstChat.id;
        console.log('Auto-selecting first conversation:', idToUse);
        setActiveId(idToUse);
        // Retry sending after a short delay
        setTimeout(() => {
          if (text.trim() || attach) {
            onSend();
          }
        }, 100);
      }
      return;
    }
    
    try {
      setError("");
      const payload = { text: text.trim(), file: attach ? attach.name : undefined };
      
      // Find the active conversation
      const activeConversation = conversations.find(c => 
        c.id === activeId || 
        c.conversationId === activeId ||
        (c.conversationId && c.conversationId.toString() === activeId.toString())
      );
      
      console.log('Sending message - activeId:', activeId, 'activeConversation:', activeConversation);
      
      let res;
      let conversationIdToUse = null;
      
      // Determine which conversationId to use
      if (activeConversation && activeConversation.conversationId) {
        conversationIdToUse = activeConversation.conversationId;
      } else if (activeId && /^[0-9a-fA-F]{24}$/.test(activeId)) {
        // If activeId is a valid ObjectId and matches a conversationId, use it directly
        const matchingChat = conversations.find(c => 
          (c.conversationId && c.conversationId.toString() === activeId.toString()) ||
          (c._id && c._id.toString() === activeId.toString())
        );
        if (matchingChat) {
          conversationIdToUse = matchingChat.conversationId || matchingChat._id || activeId;
        } else {
          // Try using activeId directly as conversationId
          conversationIdToUse = activeId;
        }
      }
      
      if (conversationIdToUse) {
        // Use conversationId-based API
        console.log('Using conversationId-based API:', conversationIdToUse);
        res = await messagesAPI.sendToConversation(conversationIdToUse, payload);
      } else {
        // Fallback to legacy API (using serviceProviderId/clientId)
        console.log('Using legacy API with activeId:', activeId);
        res = user?.role === 'client'
          ? await messagesAPI.send(activeId, payload)
          : await messagesAPI.sendFromServiceProvider(activeId, payload);
      }
      
      console.log('Message sent successfully:', res.data);
      
      const m = res.data.success ? res.data.data : res.data;
      if (!m || !m._id) {
        throw new Error('Invalid response from server');
      }
      
      const mapped = {
        id: m._id,
        sender: "You",
        side: "right",
        text: m.text || text.trim(),
        time: new Date(m.createdAt || new Date()).toLocaleTimeString(),
        file: m.file ? { name: m.file.name || m.file, url: m.file.url || "#", type: m.file.type || "file" } : undefined,
      };
      setMessages((prev) => [...prev, mapped]);
      setText("");
      setAttach(null);
      
      // Refresh conversations to update last message
      if (user) {
        try {
          const response = user.role === 'client' 
            ? await messagesAPI.listClientConversations()
            : await messagesAPI.listServiceProviderConversations();
          if (response.data.success) {
            const chats = response.data.data || [];
            setConversations(chats.map(chat => {
              const conversationId = chat.conversationId || chat._id;
              return {
                id: conversationId, // Use conversationId as the primary id
                company: chat.serviceProvider?.name || chat.client?.name || 'Unknown',
                lastMessage: chat.lastMessage?.text || 'No messages yet',
                time: chat.lastMessage?.timestamp ? new Date(chat.lastMessage.timestamp).toLocaleTimeString() : '',
                unread: user.role === 'client' 
                  ? (chat.unreadCount?.client || 0)
                  : (chat.unreadCount?.serviceProvider || 0),
                requestTitle: chat.request?.title || '',
                proposalPrice: chat.proposal?.price || null,
                conversationId: conversationId,
                serviceProviderId: chat.serviceProvider?._id || chat.serviceProvider,
                clientId: chat.client?._id || chat.client
              };
            }));
          }
        } catch (refreshError) {
          console.error('Error refreshing conversations:', refreshError);
          // Don't show error to user, just log it
        }
      }
    } catch (e) {
      console.error('Error sending message:', e);
      console.error('Error details:', e.response?.data);
      const errorMsg = e?.response?.data?.message || e?.message || t("failedToSendMessage");
      setError(errorMsg);
      // Show error for 3 seconds then clear
      setTimeout(() => setError(""), 3000);
    }
    // Reset textarea height
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.style.height = "40px";
    }
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setAttach(f || null);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleTextareaChange = (e) => {
    setText(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 128) + "px";
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("messages")}
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {activeId ? t("serviceProvider") : t("noConversationSelected")}
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div
          className={`${
            isMobile ? "hidden" : "flex"
          } w-80 flex-col bg-white border-r border-gray-200`}
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("conversations")}
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversationsLoading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                Loading conversations...
              </div>
            ) : conversations.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                {t("noConversationsYet")}
              </div>
            ) : (
              conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    // Use conversationId if available, otherwise use id
                    const idToUse = c.conversationId || c.id;
                    console.log('Conversation clicked, setting activeId:', idToUse);
                    setActiveId(idToUse);
                    navigate(`${getBasePath()}?chat=${idToUse}`);
                  }}
                  className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    (activeId === c.id || activeId === c.conversationId)
                      ? "bg-blue-50 border-r-2 border-r-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900 truncate">
                      {c.company}
                    </div>
                    <div className="text-xs text-gray-400 ml-2">{c.time}</div>
                  </div>
                  {c.requestTitle && (
                    <div className="text-xs text-gray-500 truncate mt-1">
                      {getServiceTitleLabel(c.requestTitle, language || 'en')}
                    </div>
                  )}
                  <div className="mt-1 text-sm text-gray-600 truncate">
                    {c.lastMessage}
                  </div>
                  {c.unread > 0 && (
                    <div className="mt-1">
                      <span className="inline-block px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                        {c.unread}
                      </span>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && showSidebar && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setShowSidebar(false)}
          >
            <div
              className="w-80 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Conversations
                </h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto h-full">
                {conversationsLoading ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    Loading conversations...
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No conversations yet.
                  </div>
                ) : (
                  conversations.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        // Use conversationId if available, otherwise use id
                        const idToUse = c.conversationId || c.id;
                        console.log('Mobile conversation clicked, setting activeId:', idToUse);
                        setActiveId(idToUse);
                        setShowSidebar(false);
                        navigate(`${getBasePath()}?chat=${idToUse}`);
                      }}
                      className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                        (activeId === c.id || activeId === c.conversationId) ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900 truncate">
                          {c.company}
                        </div>
                        <div className="text-xs text-gray-400 ml-2">
                          {c.time}
                        </div>
                      </div>
                      {c.requestTitle && (
                        <div className="text-xs text-gray-500 truncate mt-1">
                          {c.requestTitle}
                        </div>
                      )}
                      <div className="mt-1 text-sm text-gray-600 truncate">
                        {c.lastMessage}
                      </div>
                      {c.unread > 0 && (
                        <div className="mt-1">
                          <span className="inline-block px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
                            {c.unread}
                          </span>
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Chat window */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Desktop Header */}
          {!isMobile && (
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {t("chattingWith")}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {activeId
                    ? t("serviceProvider")
                    : t("selectConversationToStart")}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">
            {!activeId && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="text-lg mb-2">{t("noConversationSelected")}</p>
                  <p className="text-sm">{t("selectServiceProvider")}</p>
                </div>
              </div>
            )}
            {activeId && loading && (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t("loadingMessagesLabel")}
              </div>
            )}
            {activeId && error && (
              <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                {error || t("failedToLoadMessages")}
              </div>
            )}
            {activeId && messages.length === 0 && !loading && !error && (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                <p>{t("startConversation")}</p>
              </div>
            )}
            {activeId &&
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.side === "right" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 sm:px-4 py-2 shadow-sm ${
                      m.side === "right"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-white text-gray-900 border border-gray-100 rounded-bl-md"
                    }`}
                  >
                    <div className="text-xs opacity-80 mb-1">
                      {m.sender} • {m.time}
                    </div>
                    {m.text && (
                      <div className="text-sm leading-relaxed break-words">
                        {m.text}
                      </div>
                    )}
                    {m.file && (
                      <a
                        href={m.file.url}
                        className={`mt-2 inline-flex items-center text-xs px-2 py-1 rounded-md border ${
                          m.side === "right"
                            ? "border-white/50"
                            : "border-gray-200"
                        } ${m.side === "right" ? "bg-white/10" : "bg-gray-50"}`}
                      >
                        📎 {m.file.name}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            <div ref={endRef} />
          </div>

          {/* Composer */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-end gap-2">
              <input
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                onChange={onFile}
                className="hidden"
                id="attach-input"
              />
              <label
                htmlFor="attach-input"
                className="px-3 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 cursor-pointer hover:bg-gray-50 whitespace-nowrap"
              >
                📎
              </label>
              <div className="flex-1 min-w-0">
                <textarea
                  value={text}
                  onChange={handleTextareaChange}
                  onKeyPress={handleKeyPress}
                  rows={1}
                  placeholder={t("writeMessage")}
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[40px] max-h-32"
                  style={{ minHeight: "40px" }}
                />
              </div>
              <button
                onClick={onSend}
                disabled={!text.trim() && !attach}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {t("send")}
              </button>
            </div>
            {attach && (
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <span>📎 {t("attached")}</span>
                <span className="truncate">{attach.name}</span>
                <button
                  onClick={() => setAttach(null)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
