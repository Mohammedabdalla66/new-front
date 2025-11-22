import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { requestsAPI } from "../../services/api";

export const ServiceRequestForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [requestId, setRequestId] = useState(null);

  // Check if we're editing a rejected request
  useEffect(() => {
    if (location.state?.editRequest) {
      const request = location.state.editRequest;
      setIsEditing(true);
      setRequestId(request._id || request.id);
      setTitle(request.title || "");
      setDescription(request.description || "");
      setBudget(request.budget ? String(request.budget) : "");
      if (request.deadline) {
        const date = new Date(request.deadline);
        setDeadline(date.toISOString().split('T')[0]);
      }
      // Note: Files from previous submission are not pre-filled as they're already uploaded
    }
  }, [location.state]);

  const handleFilesChange = (e) => {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // If files are present, use FormData for multipart upload to Cloudinary
      if (files.length > 0) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('budget', budget || '0');
        if (deadline) {
          formData.append('deadline', deadline);
        }
        
        // Append files - backend expects 'documents' field name from multer config
        files.forEach((file) => {
          formData.append('documents', file);
        });
        
        // Log FormData for debugging (in development only)
        if (process.env.NODE_ENV === 'development') {
          console.log('FormData entries:');
          for (let pair of formData.entries()) {
            if (pair[1] instanceof File) {
              console.log(`${pair[0]}: [File] ${pair[1].name} (${pair[1].size} bytes)`);
            } else {
              console.log(`${pair[0]}: ${pair[1]}`);
            }
          }
        }
        
        let response;
        if (isEditing && requestId) {
          // Update existing request
          response = await requestsAPI.update(requestId, formData);
          toast.success("Request updated and resubmitted successfully!");
        } else {
          // Create new request
          response = await requestsAPI.createWithFiles(formData);
          toast.success("Request submitted successfully!");
        }
        setSubmitted(true);
        
        // Redirect to Requests page after 1.5 seconds
        setTimeout(() => {
          navigate("/client/requests");
        }, 1500);
      } else {
        // No files - use JSON payload
        const payload = {
          title,
          description,
          budget: budget ? parseFloat(budget) : 0,
          deadline: deadline || undefined,
        };
        
        let response;
        if (isEditing && requestId) {
          // Update existing request
          response = await requestsAPI.update(requestId, payload);
          toast.success("Request updated and resubmitted successfully!");
        } else {
          // Create new request
          response = await requestsAPI.create(payload);
          toast.success("Request submitted successfully!");
        }
        setSubmitted(true);
        
        // Redirect to Requests page after 1.5 seconds
        setTimeout(() => {
          navigate("/client/requests");
        }, 1500);
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      const errorMessage = err?.response?.data?.message || err?.response?.data?.error || "Failed to submit request. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-3xl bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            {isEditing ? "Update & Resubmit Request" : "Create Service Request"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
            {isEditing 
              ? "Update your request based on the admin's feedback and resubmit for review."
              : "Provide details so providers can make accurate offers."}
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mx-4 sm:mx-6 mt-4 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-3 text-xs sm:text-sm text-green-800 dark:text-green-200">
            Request submitted successfully! Redirecting to your requests...
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="mx-4 sm:mx-6 mt-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 text-xs sm:text-sm text-red-800 dark:text-red-200">
            {error}
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
              disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm sm:text-base text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
