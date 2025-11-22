import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import themeReducer from '../features/theme/themeSlice';
import socketReducer from '../features/socket/socketSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    theme: themeReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
