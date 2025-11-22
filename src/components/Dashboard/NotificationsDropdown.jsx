import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bell, X, Check, CheckCheck } from 'lucide-react';
import {
  selectNotifications,
  selectUnreadCount,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
} from '@/features/socket/socketSlice';
import { toast } from 'react-toastify';

const NotificationsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const notifications = useSelector(selectNotifications);
  const unreadCount = useSelector(selectUnreadCount);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Show toast for new notifications
  useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0];
      if (!latestNotification.read) {
        toast.info(latestNotification.title || latestNotification.Message || 'New notification', {
          position: 'top-right',
        });
      }
    }
  }, [notifications.length]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markNotificationAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllNotificationsAsRead());
  };

  const handleRemove = (notificationId) => {
    dispatch(removeNotification(notificationId));
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        title="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications
              {unreadCount > 0 && (
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                  ({unreadCount} new)
                </span>
              )}
            </h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                              !notification.read ? 'bg-blue-600' : 'bg-transparent'
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium ${
                                !notification.read
                                  ? 'text-gray-900 dark:text-white'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {notification.title || 'Notification'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {notification.Message || notification.message || ''}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {formatTime(notification.timestamp)}
                              </span>
                              {notification.link && (
                                <a
                                  href={notification.link}
                                  className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                >
                                  View
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                        <button
                          onClick={() => handleRemove(notification.id)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                          title="Remove"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;

