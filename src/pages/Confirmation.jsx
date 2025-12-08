import React from "react";

export const Confirmation = ({ requestId }) => {
  const goToOrders = () => {
    window.dispatchEvent(
      new CustomEvent("navigate", { detail: { to: "requests" } })
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 sm:p-8 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Thank you!
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-6">
          Your payment was successful. Your request is now confirmed.
        </p>
        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-6 sm:mb-8">
          Request ID: {requestId || "—"}
        </div>
        <button
          onClick={goToOrders}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Go to Orders
        </button>
      </div>
    </div>
  );
};
