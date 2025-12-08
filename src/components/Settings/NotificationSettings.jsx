import React, { useState } from 'react';

export const NotificationSettings = ({ settings, onSave }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const toggle = (key) => setLocalSettings({ ...localSettings, [key]: !localSettings[key] });

  const handleSave = () => onSave(localSettings);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span className="text-gray-700">Email Notifications</span>
          <input type="checkbox" checked={localSettings.emailNotifications} onChange={() => toggle('emailNotifications')} />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-gray-700">SMS Notifications</span>
          <input type="checkbox" checked={localSettings.smsNotifications} onChange={() => toggle('smsNotifications')} />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-gray-700">Booking Updates</span>
          <input type="checkbox" checked={localSettings.bookingUpdates} onChange={() => toggle('bookingUpdates')} />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-gray-700">Marketing Emails</span>
          <input type="checkbox" checked={localSettings.marketingEmails} onChange={() => toggle('marketingEmails')} />
        </label>
        <label className="flex items-center justify-between">
          <span className="text-gray-700">Proposal Notifications</span>
          <input type="checkbox" checked={localSettings.proposalNotifications} onChange={() => toggle('proposalNotifications')} />
        </label>
      </div>
      <div className="mt-6">
        <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Save Changes</button>
      </div>
    </div>
  );
};