import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { clientRegisterSchema } from '../../utils/validationSchemas';
import { authAPI } from '../../services/api';
import { useLanguage } from '../../contexts/LanguageContext';

const getNationalities = (t) => [
  { value: '', label: t('selectNationality') },
  { value: 'omani', label: t('omani') },
  { value: 'saudi', label: t('saudiArabian') },
  { value: 'emirati', label: t('emirati') },
  { value: 'kuwaiti', label: t('kuwaiti') },
  { value: 'qatari', label: t('qatari') },
  { value: 'bahraini', label: t('bahraini') },
  { value: 'indian', label: t('indian') },
  { value: 'pakistani', label: t('pakistani') },
  { value: 'bangladeshi', label: t('bangladeshi') },
  { value: 'filipino', label: t('filipino') },
  { value: 'egyptian', label: t('egyptian') },
  { value: 'jordanian', label: t('jordanian') },
  { value: 'other', label: t('other') }
];

const ClientRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();
  const { t } = useLanguage();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(clientRegisterSchema)
  });

  const termsAccepted = watch('termsAccepted');

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setValue('phoneNumber', value);
    setVerified(false);
  };

  const onSendCode = async () => {
    if (!phoneNumber) {
      toast.error(t('enterPhoneNumberFirst'));
      return;
    }
    try {
      const response = await authAPI.sendPhoneCode(phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`);
      setVerificationSent(true);
      
      // Handle skipped verification (Twilio not configured or trial account)
      if (response.data?.skipped) {
        setVerified(true); // Auto-verify if skipped
        toast.warning(response.data?.message || t('phoneVerificationSkipped'));
      } else {
        toast.success(t('verificationCodeSent'));
      }
    } catch (e) {
      // If error but response indicates skip, allow it
      if (e?.response?.data?.skipped) {
        setVerified(true);
        toast.warning(e.response.data.message || t('phoneVerificationSkipped'));
      } else {
        toast.error(e?.response?.data?.message || t('failedToSendCode'));
      }
    }
  };

  const onVerifyCode = async () => {
    if (!code) {
      toast.error(t('enterVerificationCode'));
      return;
    }
    setVerifying(true);
    try {
      const res = await authAPI.verifyPhoneCode(phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`, code);
      if (res.data?.verified || res.data?.skipped) {
        setVerified(true);
        if (res.data?.skipped) {
          toast.warning(t('phoneVerificationSkipped'));
        } else {
          toast.success(t('phoneVerified'));
        }
      } else {
        setVerified(false);
        toast.error(t('invalidCode'));
      }
    } catch (e) {
      // If error but response indicates skip, allow it
      if (e?.response?.data?.skipped) {
        setVerified(true);
        toast.warning(t('phoneVerificationSkipped'));
      } else {
        setVerified(false);
        toast.error(e?.response?.data?.message || t('verificationFailed'));
      }
    } finally {
      setVerifying(false);
    }
  };

  const onSubmit = async (data) => {
    if (!verified) {
      toast.error(t('pleaseVerifyPhoneBeforeSubmit'));
      return;
    }
    setLoading(true);
    try {
      // Remove confirmPassword from data before sending
      const { confirmPassword, ...submitData } = data;
      submitData.type = 'client';
      submitData.phoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      submitData.verified = true;

      console.log('Sending registration data:', { ...submitData, password: '***' });
      const response = await authAPI.registerClient(submitData);
      
      console.log('Registration response:', response.data);
      
      // Store tokens and user if provided
      if (response.data?.accessToken) {
        localStorage.setItem('authToken', response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        if (response.data.user) {
          localStorage.setItem('authUser', JSON.stringify(response.data.user));
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
      }
      
      // Get user role from response
      const userRole = response.data?.user?.role || response.data?.role || 'client';
      
      toast.success(t('clientRegistrationSuccessful'));
      setTimeout(() => {
        // Redirect client to requests page
        navigate('/dashboard/requests');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      console.error('Error response:', error.response?.data);
      const message = error.response?.data?.message || 
                      error.response?.data?.errors?.join(', ') ||
                      error.message || 
                      t('registrationFailed');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t('createClientAccount')}
        </h3>
        <p className="text-sm text-gray-600">
          {t('fillPersonalInfo')}
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="form-label">{t('fullNameLabel')}</label>
        <input
          type="text"
          {...register('fullName')}
          className="form-input"
          placeholder={t('enterFullName')}
        />
        {errors.fullName && (
          <p className="form-error">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="form-label">{t('emailAddressLabel')}</label>
        <input
          type="email"
          {...register('email')}
          className="form-input"
          placeholder={t('enterEmailAddressLabel')}
        />
        {errors.email && (
          <p className="form-error">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="form-label">{t('phoneNumberLabel')}</label>
        <PhoneInput
          defaultCountry="om"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className="w-full"
        />
        {errors.phoneNumber && (
          <p className="form-error">{errors.phoneNumber.message}</p>
        )}
        <div className="mt-2 flex items-center gap-2">
          <button type="button" onClick={onSendCode} className="px-3 py-1.5 text-sm rounded-md border border-gray-300 hover:bg-gray-50">
            {t('sendCode')}
          </button>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={t('enterCode')}
            className="flex-1 form-input"
          />
          <button type="button" disabled={verifying} onClick={onVerifyCode} className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-green-700 disabled:bg-gray-300">
            {verifying ? t('verifying') : t('verify')}
          </button>
          {verified && <span className="text-blue-600 text-sm">{t('verified')}</span>}
        </div>
      </div>

      {/* Nationality */}
      <div>
        <label className="form-label">{t('nationalityLabel')}</label>
        <select
          {...register('nationality')}
          className="form-input"
        >
          {getNationalities(t).map(nationality => (
            <option key={nationality.value} value={nationality.value}>
              {nationality.label}
            </option>
          ))}
        </select>
        {errors.nationality && (
          <p className="form-error">{errors.nationality.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="form-label">{t('addressLabel')}</label>
        <textarea
          {...register('address')}
          rows={3}
          className="form-input resize-none"
          placeholder={t('enterFullAddress')}
        />
        {errors.address && (
          <p className="form-error">{errors.address.message}</p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">{t('passwordLabel')}</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="form-input pr-10"
              placeholder={t('createPassword')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="form-error">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label className="form-label">{t('confirmPasswordLabel')}</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="form-input pr-10"
              placeholder={t('confirmPassword')}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            {...register('termsAccepted')}
            className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
          />
        </div>
        <div className="ml-3 text-sm">
          <label className="text-gray-700">
            {t('iAcceptThe')}{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              {t('termsAndConditions')}
            </a>{' '}
            {t('and')}{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              {t('privacyPolicy')}
            </a>
          </label>
        </div>
      </div>
      {errors.termsAccepted && (
        <p className="form-error">{errors.termsAccepted.message}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !termsAccepted}
        className="btn-primary"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            {t('creatingAccount')}
          </div>
        ) : (
          t('createClientAccountBtn')
        )}
      </button>
    </form>
  );
};

export default ClientRegisterForm;