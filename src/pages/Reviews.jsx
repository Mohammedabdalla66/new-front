import React, { useState } from 'react';

export const Reviews = ({ requestId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Rate Your Experience</h1>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="mb-4">
          <div className="text-gray-700 mb-2">Company & Service Rating</div>
          <div className="flex space-x-2">
            {[1,2,3,4,5].map((i) => (
              <button key={i} onClick={() => setRating(i)} className={`w-10 h-10 rounded-full border ${i <= rating ? 'bg-yellow-400 border-yellow-500' : 'bg-white border-gray-300'}`}>★</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
          <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={5} value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit Review</button>
        </div>
      </div>
    </div>
  );
};


