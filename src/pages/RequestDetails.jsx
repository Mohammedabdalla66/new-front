import React, { useState } from "react";

const mockRequest = {
  id: "1",
  title: "Q4 2024 Tax Filing",
  description: "Complete tax return preparation for Q4 2024",
  status: "in-progress",
};

const mockOffers = [
  { id: "o1", agency: "TaxExperts LLC", price: 2500, duration: "2 weeks" },
  { id: "o2", agency: "AccountPro Firm", price: 2200, duration: "10 days" },
];

const StatusTracker = ({ status }) => {
  const steps = ["submitted", "in-progress", "completed"];
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

export const RequestDetails = ({ requestId }) => {
  const [tab, setTab] = useState("offers");
  const request = mockRequest; // fetch by requestId in real app

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
        <StatusTracker status={request.status} />
      </div>

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
            </button>
          ))}
        </div>

        {tab === "offers" && (
          <div className="space-y-3">
            {mockOffers.map((o) => (
              <div
                key={o.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white text-sm sm:text-base">
                    {o.agency}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Duration: {o.duration}
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end space-x-3">
                  <div className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                    ${o.price.toLocaleString()}
                  </div>
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "chat" && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Chat UI placeholder
          </div>
        )}

        {tab === "delivered" && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Delivered files placeholder
          </div>
        )}
      </div>
    </div>
  );
};
