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
} from "lucide-react";

const MessagesPage = () => {
  const { t } = useLanguage();
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");

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

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
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
              onClick={() => setSelectedChat(conversation.id)}
              className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
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

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                  {conversations.find((c) => c.id === selectedChat)?.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {conversations.find((c) => c.id === selectedChat)?.client}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {conversations.find((c) => c.id === selectedChat)?.company}
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "provider" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-xs lg:max-w-md ${
                      msg.sender === "provider" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                        msg.sender === "provider"
                          ? "bg-gray-600 ml-3"
                          : "bg-blue-600 mr-3"
                      }`}
                    >
                      {msg.avatar}
                    </div>
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        msg.sender === "provider"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === "provider"
                            ? "text-blue-100"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-2"
              >
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
