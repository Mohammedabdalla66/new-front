import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
  notifications: [],
  messages: [],
  unreadCount: 0,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    addNotification: (state, action) => {
      const notification = {
        ...action.payload,
        id: action.payload.id || Date.now().toString(),
        timestamp: action.payload.timestamp || new Date().toISOString(),
        read: false,
      };
      state.notifications.unshift(notification);
      state.unreadCount += 1;
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach(n => {
        if (!n.read) {
          n.read = true;
        }
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    addMessage: (state, action) => {
      const message = {
        ...action.payload,
        id: action.payload.id || Date.now().toString(),
        timestamp: action.payload.timestamp || new Date().toISOString(),
      };
      state.messages.push(message);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setConnected,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
  addMessage,
  clearMessages,
} = socketSlice.actions;

// Selectors with safe fallbacks
export const selectSocketConnected = (state) => state.socket?.connected ?? false;
export const selectNotifications = (state) => state.socket?.notifications ?? [];
export const selectUnreadCount = (state) => state.socket?.unreadCount ?? 0;
export const selectMessages = (state) => state.socket?.messages ?? [];

export default socketSlice.reducer;

