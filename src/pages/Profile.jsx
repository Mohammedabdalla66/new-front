import React from 'react';
import { ProfileForm } from '../components/Profile/ProfileForm.jsx';

export const Profile = () => {
  const handleSave = (updatedUser) => {
    // ProfileForm now handles all API calls and state updates
    console.log('Profile updated:', updatedUser);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-gray-600">Manage your account information and preferences.</p>
      </div>

      <ProfileForm user={user} onSave={handleSave} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">24</div>
          <div className="text-sm text-gray-600">Total Bookings</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">$45,280</div>
          <div className="text-sm text-gray-600">Total Spent</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">4.8</div>
          <div className="text-sm text-gray-600">Average Rating Given</div>
        </div>
      </div>
    </div>
  );
};