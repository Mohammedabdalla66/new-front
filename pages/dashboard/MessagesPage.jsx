import React, { useState } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
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
  const { t } = useLanguage();
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  const conversations = [
    {
      id: 1,
      client: "Sarah Johnson",
      company: "ABC Company",
      lastMessage: "Thank you for the financial statements. They look great!",
      timestamp: "2 hours ago",
      unread: 2,
      avatar: "SJ",
      online: true,
    },
    {
      id: 2,
      client: "Michael Chen",
      company: "XYZ Corp",
      lastMessage: "Can we schedule a call for tomorrow?",
      timestamp: "4 hours ago",
      unread: 0,
      avatar: "MC",
      online: false,
    },
    {
      id: 3,
      client: "Emily Davis",
      company: "DEF Ltd",
      lastMessage: "I have some questions about the tax filing process.",
      timestamp: "1 day ago",
      unread: 1,
      avatar: "ED",
      online: true,
    },
    {
      id: 4,
      client: "Robert Wilson",
      company: "GHI Industries",
      lastMessage: "The audit documents are ready for review.",
      timestamp: "2 days ago",
      unread: 0,
      avatar: "RW",
      online: false,
    },
  ];

  const messages = {
    1: [
      {
        id: 1,
        sender: "client",
        message: "Hi, I need help with my Q4 financial statements.",
        timestamp: "10:30 AM",
        avatar: "SJ",
      },
      {
        id: 2,
        sender: "provider",
        message:
          "Hello Sarah! I'd be happy to help you with your financial statements. Can you tell me more about your requirements?",
        timestamp: "10:32 AM",
        avatar: "JD",
      },
      {
        id: 3,
        sender: "client",
        message:
          "We need a complete set of financial statements including balance sheet, income statement, and cash flow statement.",
        timestamp: "10:35 AM",
        avatar: "SJ",
      },
      {
        id: 4,
        sender: "provider",
        message:
          "Perfect! I can prepare all three statements for you. What's your preferred timeline?",
        timestamp: "10:37 AM",
        avatar: "JD",
      },
      {
        id: 5,
        sender: "client",
        message: "We need them by December 31st. Is that feasible?",
        timestamp: "10:40 AM",
        avatar: "SJ",
      },
      {
        id: 6,
        sender: "provider",
        message:
          "Absolutely! I can have them ready by December 30th to give you time for review. I'll send you a detailed proposal shortly.",
        timestamp: "10:42 AM",
        avatar: "JD",
      },
      {
        id: 7,
        sender: "client",
        message: "Thank you for the financial statements. They look great!",
        timestamp: "2 hours ago",
        avatar: "SJ",
      },
    ],
  };

  const currentMessages = messages[selectedChat] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    if (isMobile) {
      setShowSidebar(false);
    }
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
          {conversations.map((conversation) => (
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
            ))}
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
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-full">
                {conversations.map((conversation) => (
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
          ))}
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
              {currentMessages.map((msg) => (
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
                        {msg.sender === "provider" ? "You" : msg.avatar} •{" "}
                        {msg.timestamp}
                      </div>
                      <p className="text-sm leading-relaxed break-words">
                        {msg.message}
                      </p>
                  </div>
                </div>
              ))}
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
                    placeholder="Type a message..."
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
                    disabled={!message.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg"
                >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center p-6">
                <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Choose a conversation from the list to start messaging
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
