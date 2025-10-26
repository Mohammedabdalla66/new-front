import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header.jsx';
import ClientSidebar from '../sidebar/ClientSidebar.jsx';

const mockUser = {
  name: 'John Davidson',
  email: 'john.davidson@company.com',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
};

export const Layout = ({ children, activeTab, onTabChange, darkMode = false, unreadMessagesCount = 0 }) => {
  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <ClientSidebar activeTab={activeTab} onTabChange={onTabChange} unreadMessagesCount={unreadMessagesCount} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className={`flex-1 overflow-y-auto ${darkMode ? 'bg-gray-950 text-gray-100' : ''}`}>
          <Outlet/>
        </main>
      </div>
    </div>
  );
};