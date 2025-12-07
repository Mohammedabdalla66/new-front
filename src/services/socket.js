import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
  transports: ['websocket', 'polling'],
  withCredentials: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

// Log connection events for debugging
socket.on('connect', () => {
  console.log('✅ Socket.io connected:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('❌ Socket.io disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('❌ Socket.io connection error:', error.message);
});

export default socket;

