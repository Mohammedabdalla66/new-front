import React, { useState } from "react";

export const Reviews = ({ requestId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Rate Your Experience
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
        <div className="mb-4">
          <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2">
            Company & Service Rating
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <button
                key={i}
                onClick={() => setRating(i)}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border text-sm sm:text-base transition-colors ${
                  i <= rating
                    ? "bg-yellow-400 border-yellow-500 text-yellow-800"
                    : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Comments
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
          />
        </div>
        <div className="mt-4">
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};
