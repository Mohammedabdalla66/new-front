import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
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
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Remove confirmPassword from data before sending
      const { confirmPassword, ...submitData } = data;
      submitData.type = 'client';

      const response = await authAPI.registerClient(submitData);
      
      toast.success('Client registration successful! Please check your email for verification.');
      navigate('/auth/login');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
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
          country={'om'}
          value={phoneNumber}
          onChange={handlePhoneChange}
          inputProps={{
            name: 'phoneNumber',
            required: true,
            className: 'form-input pl-12'
          }}
        />
        {errors.phoneNumber && (
          <p className="form-error">{errors.phoneNumber.message}</p>
        )}
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
            <a href="#" className="text-green-600 hover:text-green-700 font-medium">
              Terms and Conditions
            </a>{' '}
            and{' '}
            <a href="#" className="text-green-600 hover:text-green-700 font-medium">
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