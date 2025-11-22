import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Building2, User } from 'lucide-react';
import ServiceProviderRegisterForm from '../../components/auth/ServiceProviderRegisterForm';
import ClientRegisterForm from '../../components/auth/ClientRegisterForm';

const RegisterPage = () => {
  const [registrationType, setRegistrationType] = useState('serviceProvider');

  return (
    <div className="auth-card">
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <UserPlus className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600">
          Join us today and start managing your business
        </p>
      </div>

      {/* Registration Type Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
        <button
          type="button"
          onClick={() => setRegistrationType('serviceProvider')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md font-medium text-sm transition-colors ${
            registrationType === 'serviceProvider'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4 mr-2" />
          Service Provider
        </button>
        <button
          type="button"
          onClick={() => setRegistrationType('client')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md font-medium text-sm transition-colors ${
            registrationType === 'client'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="w-4 h-4 mr-2" />
          Client
        </button>
      </div>

      {/* Render appropriate form */}
      {registrationType === 'serviceProvider' ? (
        <ServiceProviderRegisterForm />
      ) : (
        <ClientRegisterForm />
      )}

      {/* Login Link */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/auth/login"
            className="font-medium text-green-600 hover:text-green-700"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;