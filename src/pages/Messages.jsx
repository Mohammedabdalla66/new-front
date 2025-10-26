import React, { useMemo, useRef, useState } from 'react';

const mockConversations = [
  { id: 'c1', company: 'TaxExperts LLC', lastMessage: 'We can deliver in 10 days.', time: '9:12 AM' },
  { id: 'c2', company: 'AccountPro Firm', lastMessage: 'Attached our proposal PDF.', time: 'Yesterday' },
  { id: 'c3', company: 'AuditWise Agency', lastMessage: 'Thanks for the details!', time: 'Mon' },
];

const mockMessagesByConv = {
  c1: [
    { id: 'm1', sender: 'TaxExperts LLC', side: 'left', text: 'Hello! We reviewed your request.', time: '9:05 AM' },
    { id: 'm2', sender: 'You', side: 'right', text: 'Great, what timeline are you thinking?', time: '9:08 AM' },
    { id: 'm3', sender: 'TaxExperts LLC', side: 'left', text: 'We can deliver in 10 days.', time: '9:12 AM' },
  ],
  c2: [
    { id: 'm4', sender: 'AccountPro Firm', side: 'left', text: 'Hi! Here is our proposal.', time: 'Yesterday', file: { name: 'proposal.pdf', url: '#', type: 'pdf' } },
    { id: 'm5', sender: 'You', side: 'right', text: 'Thanks, I will review it soon.', time: 'Yesterday' },
  ],
  c3: [
    { id: 'm6', sender: 'AuditWise Agency', side: 'left', text: 'Thanks for the details! We will revert.', time: 'Mon' },
  ],
};

export const Messages = () => {
  const [activeId, setActiveId] = useState('c1');
  const [text, setText] = useState('');
  const [attach, setAttach] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const endRef = useRef(null);

  const messages = useMemo(() => mockMessagesByConv[activeId] || [], [activeId]);

  const onSend = () => {
    if (!text && !attach) return;
    const payload = { to: activeId, text, file: attach ? attach.name : undefined, at: new Date().toISOString() };
    console.log('Send message:', payload);
    setText('');
    setAttach(null);
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setAttach(f || null);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex h-[70vh] md:h-[75vh]">
          {/* Sidebar */}
          <div className={`w-72 border-r border-gray-100 bg-white hidden md:block`}>
            <div className="p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
            </div>
            <div className="overflow-y-auto h-full">
              {mockConversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                    activeId === c.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-gray-900">{c.company}</div>
                    <div className="text-xs text-gray-400">{c.time}</div>
                  </div>
                  <div className="mt-1 text-sm text-gray-600 truncate">{c.lastMessage}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile sidebar toggle */}
          <div className="md:hidden w-full">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Messages</h2>
              <button onClick={() => setShowSidebar((s) => !s)} className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-700">{showSidebar ? 'Close' : 'Conversations'}</button>
            </div>
            {showSidebar && (
              <div className="border-b border-gray-100">
                {mockConversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setActiveId(c.id); setShowSidebar(false); }}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                      activeId === c.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-gray-900">{c.company}</div>
                      <div className="text-xs text-gray-400">{c.time}</div>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 truncate">{c.lastMessage}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Chat window */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Chatting with</div>
                <div className="text-lg font-semibold text-gray-900">
                  {mockConversations.find((c) => c.id === activeId)?.company}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.side === 'right' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm ${m.side === 'right' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-white text-gray-900 border border-gray-100 rounded-bl-md'}`}>
                    <div className="text-xs opacity-80 mb-1">{m.sender} • {m.time}</div>
                    {m.text && <div className="text-sm leading-relaxed">{m.text}</div>}
                    {m.file && (
                      <a href={m.file.url} className={`mt-2 inline-flex items-center text-xs px-2 py-1 rounded-md border ${m.side === 'right' ? 'border-white/50' : 'border-gray-200'} ${m.side === 'right' ? 'bg-white/10' : 'bg-gray-50'}`}>
                        {m.file.name}
                      </a>
                    )}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Composer */}
            <div className="p-3 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={onFile}
                  className="hidden"
                  id="attach-input"
                />
                <label htmlFor="attach-input" className="px-3 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 cursor-pointer hover:bg-gray-50">Attach</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={1}
                  placeholder="Write a message..."
                  className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button onClick={onSend} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Send</button>
              </div>
              {attach && (
                <div className="mt-2 text-xs text-gray-600">Attached: {attach.name}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


