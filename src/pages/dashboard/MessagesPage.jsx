import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { messagesAPI } from "../../services/api";
import { socket } from "../../services/socket";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { getServiceTitleLabel } from "../../utils/titleUtils";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";

const MessagesPage = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Determine the base path based on current route
  const getBasePath = () => {
    if (location.pathname.startsWith('/firm/')) {
      return '/firm/messages';
    } else if (location.pathname.startsWith('/dashboard/')) {
      return '/dashboard/messages';
    }
    return '/firm/messages'; // Default for service provider
  };

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

  // Load conversations list for service provider
  useEffect(() => {
    const loadConversations = async () => {
      if (!user || user.role !== 'serviceProvider') {
        setConversationsLoading(false);
        return;
      }
      
      try {
        setConversationsLoading(true);
        const response = await messagesAPI.listServiceProviderConversations();
        
        if (response.data.success) {
          const chats = response.data.data || [];
          setConversations(chats.map(chat => {
            const conversationId = chat.conversationId || chat._id;
            return {
              id: conversationId,
              conversationId: conversationId,
              client: chat.client?.name || t("unknownClient"),
              clientId: chat.client?._id || chat.client,
              company: chat.client?.name || t("unknown"),
              lastMessage: chat.lastMessage?.text || t("noMessagesYet"),
              timestamp: chat.lastMessage?.timestamp 
                ? new Date(chat.lastMessage.timestamp).toLocaleTimeString() 
                : '',
              unread: chat.unreadCount?.serviceProvider || 0,
              requestTitle: chat.request?.title || '',
              proposalPrice: chat.proposal?.price || null,
              avatar: chat.client?.name?.charAt(0)?.toUpperCase() || 'C',
              online: false, // TODO: Implement online status
            };
          }));
          
          // Check if there's a chat parameter in URL
          const chatParam = searchParams.get('chat');
          if (chatParam) {
            const foundChat = chats.find(c => {
              const convId = c.conversationId || c._id;
              return convId === chatParam || 
                     convId?.toString() === chatParam ||
                     (c.client?._id || c.client) === chatParam;
            });
            if (foundChat) {
              const idToUse = foundChat.conversationId || foundChat._id || chatParam;
              setSelectedChat(idToUse);
            } else {
              // Try using chatParam directly as conversationId
              setSelectedChat(chatParam);
            }
          } else if (chats.length > 0 && !selectedChat) {
            // Auto-select first conversation if none is selected
            const firstChat = chats[0];
            const idToUse = firstChat.conversationId || firstChat._id;
            setSelectedChat(idToUse);
          }
        }
      } catch (e) {
        console.error('Error loading conversations:', e);
        toast.error(t("failedToLoadConversations"));
      } finally {
        setConversationsLoading(false);
        setLoading(false);
      }
    };
    
    if (user) {
      loadConversations();
    }
  }, [user, searchParams]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedChat) {
      setMessages([]);
      return;
    }
    
    const loadMessages = async () => {
      try {
        setLoading(true);
        // Check if selectedChat is a conversationId (from conversations list) or clientId (legacy)
        const activeConversation = conversations.find(c => 
          c.id === selectedChat || 
          c.conversationId === selectedChat ||
          (c.conversationId && c.conversationId.toString() === selectedChat.toString())
        );
        
        let response;
        if (activeConversation && activeConversation.conversationId) {
          // Use conversationId-based API
          console.log('Loading messages for conversationId:', activeConversation.conversationId);
          response = await messagesAPI.getMessagesByConversation(activeConversation.conversationId);
        } else if (selectedChat && /^[0-9a-fA-F]{24}$/.test(selectedChat)) {
          // If selectedChat is a valid ObjectId, try using it as conversationId
          const matchingChat = conversations.find(c => 
            (c.conversationId && c.conversationId.toString() === selectedChat.toString()) ||
            (c._id && c._id.toString() === selectedChat.toString())
          );
          if (matchingChat) {
            response = await messagesAPI.getMessagesByConversation(matchingChat.conversationId || matchingChat._id || selectedChat);
          } else {
            // Try using selectedChat directly as conversationId
            response = await messagesAPI.getMessagesByConversation(selectedChat);
          }
        } else {
          // Fallback to legacy API (using clientId)
          console.log('Using legacy API with clientId:', selectedChat);
          response = await messagesAPI.getConversationForServiceProvider(selectedChat);
        }
        
        if (response.data.success) {
          const msgs = response.data.data || [];
          const mapped = msgs.map(msg => ({
            id: msg._id,
            sender: msg.sender === 'serviceProvider' ? 'provider' : 'client',
            message: msg.text || '',
            timestamp: new Date(msg.createdAt).toLocaleTimeString(),
            avatar: msg.sender === 'serviceProvider' ? 'SP' : 'C',
            file: msg.file,
          }));
          setMessages(mapped);
        }
      } catch (err) {
        console.error('Error loading messages:', err);
        toast.error(t("failedToLoadMessages"));
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
    
    loadMessages();
  }, [selectedChat, conversations]);

  // Socket listeners for real-time messages
  useEffect(() => {
    const handleChatMessage = (data) => {
      // Check if message is for current conversation
      const isForCurrentChat = selectedChat && (
        data.conversationId === selectedChat ||
        data.conversationId?.toString() === selectedChat.toString()
      );
      
      if (isForCurrentChat && data.to === (user?._id || user?.id)) {
        // Message is for current conversation and user
        const newMessage = {
          id: data.id || Date.now(),
          sender: 'client',
          message: data.text || '',
          timestamp: new Date(data.timestamp || Date.now()).toLocaleTimeString(),
          avatar: 'C',
          file: data.file,
        };
        setMessages(prev => [...prev, newMessage]);
        // Scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
        // Refresh conversations to update last message
        if (user) {
          messagesAPI.listServiceProviderConversations()
            .then(response => {
              if (response.data.success) {
                const chats = response.data.data || [];
                setConversations(chats.map(chat => {
                  const conversationId = chat.conversationId || chat._id;
                  return {
                    id: conversationId,
                    conversationId: conversationId,
                    client: chat.client?.name || t("unknownClient"),
                    clientId: chat.client?._id || chat.client,
                    company: chat.client?.name || t("unknown"),
                    lastMessage: chat.lastMessage?.text || t("noMessagesYet"),
                    timestamp: chat.lastMessage?.timestamp 
                      ? new Date(chat.lastMessage.timestamp).toLocaleTimeString() 
                      : '',
                    unread: chat.unreadCount?.serviceProvider || 0,
                    requestTitle: chat.request?.title || '',
                    proposalPrice: chat.proposal?.price || null,
                    avatar: chat.client?.name?.charAt(0)?.toUpperCase() || 'C',
                    online: false,
                  };
                }));
              }
            })
            .catch(err => console.error('Error refreshing conversations:', err));
        }
      }
    };

    socket.on('chat:message', handleChatMessage);

    return () => {
      socket.off('chat:message', handleChatMessage);
    };
  }, [user, selectedChat]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat || sending) return;

    try {
      setSending(true);
      
      // Find the active conversation
      const activeConversation = conversations.find(c => 
        c.id === selectedChat || 
        c.conversationId === selectedChat ||
        (c.conversationId && c.conversationId.toString() === selectedChat.toString())
      );
      
      let response;
      let conversationIdToUse = null;
      
      // Determine which conversationId to use
      if (activeConversation && activeConversation.conversationId) {
        conversationIdToUse = activeConversation.conversationId;
      } else if (selectedChat && /^[0-9a-fA-F]{24}$/.test(selectedChat)) {
        // If selectedChat is a valid ObjectId, try using it as conversationId
        const matchingChat = conversations.find(c => 
          (c.conversationId && c.conversationId.toString() === selectedChat.toString()) ||
          (c._id && c._id.toString() === selectedChat.toString())
        );
        if (matchingChat) {
          conversationIdToUse = matchingChat.conversationId || matchingChat._id || selectedChat;
        } else {
          conversationIdToUse = selectedChat;
        }
      }
      
      if (conversationIdToUse) {
        // Use conversationId-based API
        console.log('Sending message to conversationId:', conversationIdToUse);
        response = await messagesAPI.sendToConversation(conversationIdToUse, {
          text: message.trim(),
        });
      } else {
        // Fallback to legacy API (using clientId)
        console.log('Using legacy API with clientId:', selectedChat);
        response = await messagesAPI.sendFromServiceProvider(selectedChat, {
          text: message.trim(),
        });
      }

      if (response.data.success) {
        const newMsg = response.data.data;
        const mapped = {
          id: newMsg._id,
          sender: 'provider',
          message: newMsg.text || message.trim(),
          timestamp: new Date(newMsg.createdAt || new Date()).toLocaleTimeString(),
          avatar: 'SP',
          file: newMsg.file,
        };
        setMessages(prev => [...prev, mapped]);
        setMessage("");
        
        // Refresh conversations to update last message
        try {
          const conversationsResponse = await messagesAPI.listServiceProviderConversations();
          if (conversationsResponse.data.success) {
            const chats = conversationsResponse.data.data || [];
            setConversations(chats.map(chat => {
              const conversationId = chat.conversationId || chat._id;
              return {
                id: conversationId,
                conversationId: conversationId,
                client: chat.client?.name || t("unknownClient"),
                clientId: chat.client?._id || chat.client,
                company: chat.client?.name || t("unknown"),
                lastMessage: chat.lastMessage?.text || t("noMessagesYet"),
                timestamp: chat.lastMessage?.timestamp 
                  ? new Date(chat.lastMessage.timestamp).toLocaleTimeString() 
                  : '',
                unread: chat.unreadCount?.serviceProvider || 0,
                requestTitle: chat.request?.title || '',
                proposalPrice: chat.proposal?.price || null,
                avatar: chat.client?.name?.charAt(0)?.toUpperCase() || 'C',
                online: false,
              };
            }));
          }
        } catch (refreshError) {
          console.error('Error refreshing conversations:', refreshError);
        }
        
        // Scroll to bottom
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error(t("failedToSendMessage"));
    } finally {
      setSending(false);
    }
  };

  const handleChatSelect = (chatId) => {
    // Use conversationId if available, otherwise use id
    const conversation = conversations.find(c => c.id === chatId || c.conversationId === chatId);
    const idToUse = conversation?.conversationId || conversation?.id || chatId;
    console.log('Chat selected, setting selectedChat to:', idToUse);
    setSelectedChat(idToUse);
    if (isMobile) {
      setShowSidebar(false);
    }
    // Update URL
    navigate(`${getBasePath()}?chat=${idToUse}`);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      {isMobile && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("messages")}
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {conversations.find((c) => c.id === selectedChat)?.client}
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div
          className={`${
            isMobile ? "hidden" : "flex"
          } w-80 lg:w-96 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}
        >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("messages")}
          </h2>
          <div className="mt-3 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversationsLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
              {t("loadingConversations")}
            </div>
          ) : conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <p>{t("noConversationsYet")}</p>
              <p className="text-sm mt-2">{t("startMessagingClients")}</p>
            </div>
          ) : (
            conversations.map((conversation) => (
            <div
              key={conversation.id}
                onClick={() => handleChatSelect(conversation.id)}
                className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                  selectedChat === conversation.id
                    ? "bg-blue-50 dark:bg-blue-900 border-r-2 border-r-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {conversation.client}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {conversation.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unread}
                    </div>
                  )}
                </div>
              </div>
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
              className="w-80 h-full bg-white dark:bg-gray-800 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("messages")}
                </h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("searchConversations")}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-full">
                {conversationsLoading ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {t("loadingConversations")}
                  </div>
                ) : conversations.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    {t("noConversationsYet")}
                  </div>
                ) : (
                  conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => handleChatSelect(conversation.id)}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedChat === conversation.id
                  ? "bg-blue-50 dark:bg-blue-900"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    {conversation.avatar}
                  </div>
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {conversation.client}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {conversation.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {conversation.lastMessage}
                  </p>
                </div>
                {conversation.unread > 0 && (
                  <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conversation.unread}
                  </div>
                )}
              </div>
            </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        {selectedChat ? (
          <>
              {/* Desktop Chat Header */}
              {!isMobile && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {conversations.find((c) => c.id === selectedChat)?.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {
                          conversations.find((c) => c.id === selectedChat)
                            ?.client
                        }
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                        {
                          conversations.find((c) => c.id === selectedChat)
                            ?.company
                        }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Info className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
              )}

              {/* Mobile Chat Header */}
              {isMobile && (
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                      {conversations.find((c) => c.id === selectedChat)?.avatar}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                        {
                          conversations.find((c) => c.id === selectedChat)
                            ?.client
                        }
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {
                          conversations.find((c) => c.id === selectedChat)
                            ?.company
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>{t("noMessagesYet")}</p>
                  <p className="text-sm mt-2">{t("startConversation")}</p>
                </div>
              ) : (
                messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                      msg.sender === "provider"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] lg:max-w-md rounded-2xl px-3 sm:px-4 py-2 shadow-sm ${
                        msg.sender === "provider"
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-600 rounded-bl-md"
                      }`}
                    >
                      <div className="text-xs opacity-80 mb-1">
                        {msg.sender === "provider" ? t("you") : msg.avatar} •{" "}
                        {msg.timestamp}
                      </div>
                      <p className="text-sm leading-relaxed break-words">
                        {msg.message}
                      </p>
                  </div>
                </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <form
                onSubmit={handleSendMessage}
                  className="flex items-end gap-2"
              >
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                  <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("typeMessage")}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  type="submit"
                    disabled={!message.trim() || sending || !selectedChat}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg"
                >
                    {sending ? (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                </button>
              </form>
            </div>
          </>
        ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center p-6">
                <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {t("selectConversation")}
              </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                {t("chooseConversationToStart")}
              </p>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
