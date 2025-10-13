import React, { useState } from 'react';
import { ProfileForm } from '../components/Profile/ProfileForm.jsx';

const mockClient = {
  id: 'client-1',
  name: 'Jane Client',
  email: 'jane.client@example.com',
  phone: '+1 (555) 111-2222',
  company: 'ClientCo LLC',
  avatar:
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=2',
  location: 'Austin, TX',
  joinedDate: '2023-06-01',
  verified: false,
};

export default function ClientProfile() {
  const [user, setUser] = useState(mockClient);

  const handleSave = (updatedUser) => {
    setUser(updatedUser);
    console.log('Saving client (static):', updatedUser);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Update your personal details and preferences.</p>
      </div>

      <ProfileForm user={user} onSave={handleSave} />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-2">24</div>
          <div className="text-sm text-gray-600">Total Requests</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-2">$1,820</div>
          <div className="text-sm text-gray-600">Total Paid</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
          <div className="text-sm text-gray-600">Pending Documents</div>
        </div>
      </div>
    </div>
  );
}


