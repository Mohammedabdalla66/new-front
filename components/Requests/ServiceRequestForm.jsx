import React, { useState } from "react";

export const ServiceRequestForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleFilesChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      files: files.map((f) => f.name),
      budget,
      deadline,
    };
    console.log("Service Request Submitted:", payload);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-3xl bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Create Service Request
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
            Provide details so providers can make accurate offers.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mx-4 sm:mx-6 mt-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-3 text-xs sm:text-sm text-green-800 dark:text-green-200">
            Request submitted successfully. Check console for payload.
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5"
        >
          {/* Service Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Service Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g. Monthly Bookkeeping for Small Business"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe the work scope, required deliverables, and any context providers should know."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Attachments
            </label>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleFilesChange}
              className="block w-full text-xs sm:text-sm text-gray-700 dark:text-gray-300 file:mr-2 sm:file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 dark:file:bg-blue-900/20 file:px-2 sm:file:px-4 file:py-1 sm:file:py-2 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
            />
            {files.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                {files.map((f, i) => (
                  <li key={i} className="truncate">
                    {f.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Budget and Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Budget
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 1500"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Enter an estimated budget (USD).
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Select a target due date.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm sm:text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
