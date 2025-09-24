import React from 'react';
import { Header } from './Header.jsx';
import { Sidebar } from './Sidebar.jsx';

const mockUser = {
  name: 'John Davidson',
  email: 'john.davidson@company.com',
  avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2'
};

export const Layout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={mockUser} />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};