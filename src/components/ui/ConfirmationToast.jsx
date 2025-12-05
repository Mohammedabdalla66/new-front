import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

/**
 * Confirmation Toast Component
 * Displays a styled toast notification with confirm/cancel actions
 * 
 * @param {boolean} open - Whether the toast is visible
 * @param {string} message - The confirmation message
 * @param {string} confirmText - Text for confirm button
 * @param {string} cancelText - Text for cancel button
 * @param {function} onConfirm - Callback when user confirms
 * @param {function} onCancel - Callback when user cancels
 * @param {function} onClose - Callback to close the toast
 */
export const ConfirmationToast = ({
  open,
  message,
  confirmText = "Yes, proceed",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  onClose,
}) => {
  const handleConfirm = useCallback(() => {
    onConfirm?.();
    onClose?.();
  }, [onConfirm, onClose]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose?.();
  }, [onCancel, onClose]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && open) {
        handleCancel();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, handleCancel]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40"
            onClick={handleCancel}
          />
          
          {/* Toast */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
            role="alertdialog"
            aria-live="assertive"
            aria-modal="true"
          >
            <div className="min-w-[320px] max-w-md rounded-lg shadow-xl border border-yellow-200 dark:border-yellow-900/50 bg-white dark:bg-neutral-800 p-4">
              {/* Header with icon */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {message}
                  </p>
                </div>
                <button
                  onClick={handleCancel}
                  className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-2 mt-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-lg transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 rounded-lg transition-colors"
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * Hook to show confirmation toast
 * Returns a promise that resolves to true if confirmed, false if cancelled
 */
export const useConfirmationToast = () => {
  const [toastState, setToastState] = useState({
    open: false,
    message: '',
    confirmText: 'Yes, proceed',
    cancelText: 'Cancel',
  });
  const [resolvePromise, setResolvePromise] = useState(null);

  const showConfirmation = (message, confirmText, cancelText) => {
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
      setToastState({
        open: true,
        message,
        confirmText: confirmText || 'Yes, proceed',
        cancelText: cancelText || 'Cancel',
      });
    });
  };

  const handleConfirm = () => {
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
    setToastState((prev) => ({ ...prev, open: false }));
  };

  const handleCancel = () => {
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
    setToastState((prev) => ({ ...prev, open: false }));
  };

  const handleClose = () => {
    handleCancel();
  };

  const ConfirmationToastComponent = () => (
    <ConfirmationToast
      open={toastState.open}
      message={toastState.message}
      confirmText={toastState.confirmText}
      cancelText={toastState.cancelText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      onClose={handleClose}
    />
  );

  return {
    showConfirmation,
    ConfirmationToastComponent,
  };
};

export default ConfirmationToast;

