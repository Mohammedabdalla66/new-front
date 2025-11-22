import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { PhoneInput } from 'react-international-phone';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { clientRegisterSchema } from '../../utils/validationSchemas';
import { authAPI } from '../../services/api';

const NATIONALITIES = [
  { value: '', label: 'Select Nationality' },
  { value: 'omani', label: 'Omani' },
  { value: 'saudi', label: 'Saudi Arabian' },
  { value: 'emirati', label: 'Emirati' },
  { value: 'kuwaiti', label: 'Kuwaiti' },
  { value: 'qatari', label: 'Qatari' },
  { value: 'bahraini', label: 'Bahraini' },
  { value: 'indian', label: 'Indian' },
  { value: 'pakistani', label: 'Pakistani' },
  { value: 'bangladeshi', label: 'Bangladeshi' },
  { value: 'filipino', label: 'Filipino' },
  { value: 'egyptian', label: 'Egyptian' },
  { value: 'jordanian', label: 'Jordanian' },
  { value: 'other', label: 'Other' }
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
      toast.error('Enter phone number first');
      return;
    }
    try {
      const response = await authAPI.sendPhoneCode(phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`);
      setVerificationSent(true);
      
      // Handle skipped verification (Twilio not configured or trial account)
      if (response.data?.skipped) {
        setVerified(true); // Auto-verify if skipped
        toast.warning(response.data?.message || 'Phone verification skipped (service not configured)');
      } else {
        toast.success('Verification code sent');
      }
    } catch (e) {
      // If error but response indicates skip, allow it
      if (e?.response?.data?.skipped) {
        setVerified(true);
        toast.warning(e.response.data.message || 'Phone verification skipped');
      } else {
        toast.error(e?.response?.data?.message || 'Failed to send code');
      }
    }
  };

  const onVerifyCode = async () => {
    if (!code) {
      toast.error('Enter the verification code');
      return;
    }
    setVerifying(true);
    try {
      const res = await authAPI.verifyPhoneCode(phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`, code);
      if (res.data?.verified || res.data?.skipped) {
        setVerified(true);
        if (res.data?.skipped) {
          toast.warning('Phone verification skipped (service not configured)');
        } else {
          toast.success('Phone verified');
        }
      } else {
        setVerified(false);
        toast.error('Invalid code');
      }
    } catch (e) {
      // If error but response indicates skip, allow it
      if (e?.response?.data?.skipped) {
        setVerified(true);
        toast.warning('Phone verification skipped');
      } else {
        setVerified(false);
        toast.error(e?.response?.data?.message || 'Verification failed');
      }
    } finally {
      setVerifying(false);
    }
  };

  const onSubmit = async (data) => {
    if (!verified) {
      toast.error('Please verify your phone number before submitting');
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
      
      toast.success('Client registration successful! Redirecting...');
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
                      'Registration failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Create Your Client Account
        </h3>
        <p className="text-sm text-gray-600">
          Fill in your personal information to get started
        </p>
      </div>

      {/* Full Name */}
      <div>
        <label className="form-label">Full Name *</label>
        <input
          type="text"
          {...register('fullName')}
          className="form-input"
          placeholder="Enter your full name"
        />
        {errors.fullName && (
          <p className="form-error">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="form-label">Email Address *</label>
        <input
          type="email"
          {...register('email')}
          className="form-input"
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="form-error">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Number */}
      <div>
        <label className="form-label">Phone Number *</label>
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
            Send Code
          </button>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            className="flex-1 form-input"
          />
          <button type="button" disabled={verifying} onClick={onVerifyCode} className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-green-700 disabled:bg-gray-300">
            {verifying ? 'Verifying...' : 'Verify'}
          </button>
          {verified && <span className="text-blue-600 text-sm">Verified</span>}
        </div>
      </div>

      {/* Nationality */}
      <div>
        <label className="form-label">Nationality *</label>
        <select
          {...register('nationality')}
          className="form-input"
        >
          {NATIONALITIES.map(nationality => (
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
        <label className="form-label">Address *</label>
        <textarea
          {...register('address')}
          rows={3}
          className="form-input resize-none"
          placeholder="Enter your full address"
        />
        {errors.address && (
          <p className="form-error">{errors.address.message}</p>
        )}
      </div>

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="form-input pr-10"
              placeholder="Create password"
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
          <label className="form-label">Confirm Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword')}
              className="form-input pr-10"
              placeholder="Confirm password"
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
            I accept the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Privacy Policy
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
            Creating Account...
          </div>
        ) : (
          'Create Client Account'
        )}
      </button>
    </form>
  );
};

export default ClientRegisterForm;