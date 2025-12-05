import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  Building2, User } from 'lucide-react';
import ServiceProviderRegisterForm from '../../components/auth/ServiceProviderRegisterForm';
import ClientRegisterForm from '../../components/auth/ClientRegisterForm';
import CaHupLogo from '../../components/CaHupLogo';
import { useLanguage } from '../../contexts/LanguageContext';

const RegisterPage = () => {
  const [registrationType, setRegistrationType] = useState('serviceProvider');
  const { t } = useLanguage();

  return (
    <div className="auth-card">
      <div className="text-center mb-8">
      <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <CaHupLogo className="w-11 h-11 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {t('createYourAccount')}
        </h2>
        <p className="text-gray-600">
          {t('joinUsToday')}
        </p>
      </div>

      {/* Registration Type Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
        <button
          type="button"
          onClick={() => setRegistrationType('serviceProvider')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md font-medium text-sm transition-colors ${
            registrationType === 'serviceProvider'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4 mr-2" />
          {t('serviceProvider')}
        </button>
        <button
          type="button"
          onClick={() => setRegistrationType('client')}
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md font-medium text-sm transition-colors ${
            registrationType === 'client'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="w-4 h-4 mr-2" />
          {t('client')}
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
          {t('alreadyHaveAccount')}{' '}
          <Link
            to="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            {t('signInHere')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;