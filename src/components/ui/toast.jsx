import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = ({ open, title, description, variant = 'default', onOpenChange }) => {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50"
          role="status"
          aria-live="polite"
        >
          <div
            className={`min-w-[280px] max-w-sm rounded-lg shadow-lg border p-4 bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 ${
              variant === 'success'
                ? 'border-green-200 dark:border-green-900/30'
                : variant === 'destructive'
                ? 'border-red-200 dark:border-red-900/30'
                : ''
            }`}
          >
            {title && (
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </div>
            )}
            {description && (
              <div className="text-sm text-neutral-700 dark:text-neutral-300 mt-1">
                {description}
              </div>
            )}
            <div className="mt-3 text-right">
              <button
                onClick={() => onOpenChange?.(false)}
                className="text-sm text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Toast;
