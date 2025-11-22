import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '@/services/socket';
import {
  setConnected,
  addNotification,
  addMessage,
} from '@/features/socket/socketSlice';
import { useAuthContext } from './AuthContext';

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      // Disconnect if not authenticated
      if (socket.connected) {
        socket.disconnect();
        dispatch(setConnected(false));
      }
      return;
    }

    // Connect socket if authenticated
    if (!socket.connected) {
      socket.connect();
    }

    // Socket event handlers
    const handleConnect = () => {
      console.log('✅ Socket connected');
      dispatch(setConnected(true));

      // Register user with server
      if (user?.id || user?._id) {
        const userID = user.id || user._id;
        const interests = user.interests || [];
        socket.emit('register', { userID, interests });
        console.log('📝 Registered user with socket:', { userID, interests });
      }
    };

    const handleDisconnect = () => {
      console.log('❌ Socket disconnected');
      dispatch(setConnected(false));
    };

    const handleNotification = (data) => {
      console.log('🔔 Received notification:', data);
      dispatch(addNotification(data));
    };

    const handleNewNotification = (data) => {
      console.log('🔔 Received newNotification:', data);
      dispatch(addNotification(data));
    };

    const handleMessage = (data) => {
      console.log('💬 Received message:', data);
      dispatch(addMessage(data));
    };

    // Register event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('notification', handleNotification);
    socket.on('newNotification', handleNewNotification);
    socket.on('message', handleMessage);

    // Register user immediately if already connected
    if (socket.connected && (user?.id || user?._id)) {
      const userID = user.id || user._id;
      const interests = user.interests || [];
      socket.emit('register', { userID, interests });
      console.log('📝 Registered user with socket (already connected):', { userID, interests });
    }

    // Cleanup on unmount or when user changes
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('notification', handleNotification);
      socket.off('newNotification', handleNewNotification);
      socket.off('message', handleMessage);
    };
  }, [dispatch, user, isAuthenticated]);

  return <>{children}</>;
};

