import React, { useMemo, useRef, useState } from "react";

const mockConversations = [
  {
    id: "c1",
    company: "TaxExperts LLC",
    lastMessage: "We can deliver in 10 days.",
    time: "9:12 AM",
  },
  {
    id: "c2",
    company: "AccountPro Firm",
    lastMessage: "Attached our proposal PDF.",
    time: "Yesterday",
  },
  {
    id: "c3",
    company: "AuditWise Agency",
    lastMessage: "Thanks for the details!",
    time: "Mon",
  },
];

const mockMessagesByConv = {
  c1: [
    {
      id: "m1",
      sender: "TaxExperts LLC",
      side: "left",
      text: "Hello! We reviewed your request.",
      time: "9:05 AM",
    },
    {
      id: "m2",
      sender: "You",
      side: "right",
      text: "Great, what timeline are you thinking?",
      time: "9:08 AM",
    },
    {
      id: "m3",
      sender: "TaxExperts LLC",
      side: "left",
      text: "We can deliver in 10 days.",
      time: "9:12 AM",
    },
  ],
  c2: [
    {
      id: "m4",
      sender: "AccountPro Firm",
      side: "left",
      text: "Hi! Here is our proposal.",
      time: "Yesterday",
      file: { name: "proposal.pdf", url: "#", type: "pdf" },
    },
    {
      id: "m5",
      sender: "You",
      side: "right",
      text: "Thanks, I will review it soon.",
      time: "Yesterday",
    },
  ],
  c3: [
    {
      id: "m6",
      sender: "AuditWise Agency",
      side: "left",
      text: "Thanks for the details! We will revert.",
      time: "Mon",
    },
  ],
};

export const Messages = () => {
  const [activeId, setActiveId] = useState("c1");
  const [text, setText] = useState("");
  const [attach, setAttach] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const endRef = useRef(null);

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

  const messages = useMemo(
    () => mockMessagesByConv[activeId] || [],
    [activeId]
  );

  // Auto-scroll to bottom when messages change
  React.useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onSend = () => {
    if (!text && !attach) return;
    const payload = {
      to: activeId,
      text,
      file: attach ? attach.name : undefined,
      at: new Date().toISOString(),
    };
    console.log("Send message:", payload);
    setText("");
    setAttach(null);
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
            <h1 className="text-lg font-semibold text-gray-900">Messages</h1>
          </div>
          <div className="text-sm text-gray-500">
            {mockConversations.find((c) => c.id === activeId)?.company}
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
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Conversations
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                  activeId === c.id
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
                <div className="mt-1 text-sm text-gray-600 truncate">
                  {c.lastMessage}
                </div>
              </button>
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
                {mockConversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveId(c.id);
                      setShowSidebar(false);
                    }}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      activeId === c.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900 truncate">
                        {c.company}
                      </div>
                      <div className="text-xs text-gray-400 ml-2">{c.time}</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 truncate">
                      {c.lastMessage}
                    </div>
                  </button>
                ))}
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
                <div className="text-sm text-gray-500">Chatting with</div>
                <div className="text-lg font-semibold text-gray-900">
                  {mockConversations.find((c) => c.id === activeId)?.company}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">
            {messages.map((m) => (
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
                  placeholder="Write a message... (Enter to send, Shift+Enter for new line)"
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[40px] max-h-32"
                  style={{ minHeight: "40px" }}
                />
              </div>
              <button
                onClick={onSend}
                disabled={!text.trim() && !attach}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Send
              </button>
            </div>
            {attach && (
              <div className="mt-2 text-xs text-gray-600 flex items-center gap-2">
                <span>📎 Attached:</span>
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
