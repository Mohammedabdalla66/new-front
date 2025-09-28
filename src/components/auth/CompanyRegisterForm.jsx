import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Upload, X } from 'lucide-react';
import { companyRegisterSchema } from '../../utils/validationSchemas';
import { authAPI } from '../../services/api';
import FileUploadArea from '../common/FileUploadArea';

const COMPANY_TYPES = [
  { value: '', label: 'Select Company Type' },
  { value: 'llc', label: 'Limited Liability Company (LLC)' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { value: 'other', label: 'Other' }
];

const CompanyRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(companyRegisterSchema),
    defaultValues: {
      phoneNumber: ''
    }
  });

  const termsAccepted = watch('termsAccepted');

  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
    setValue('phoneNumber', value);
  };

  const handleFilesSelected = (files) => {
    setUploadedFiles(files);
  };

  const onSubmit = async (data) => {
    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one document');
      return;
    }

    setLoading(true);
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append form fields
      Object.keys(data).forEach(key => {
        if (key !== 'confirmPassword') {
          formData.append(key, data[key]);
        }
      });
      
      // Append files
      uploadedFiles.forEach((file, index) => {
        formData.append(`documents`, file);
      });
      
      // Add registration type
      formData.append('type', 'company');

      const response = await authAPI.registerCompany(formData);
      
      toast.success('Company registration successful! Please check your email for verification.');
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
          Create Your Company Account
        </h3>
        <p className="text-sm text-gray-600">
          Fill in your company information to get started
        </p>
      </div>

      {/* Company Name */}
      <div>
        <label className="form-label">Company Name *</label>
        <input
          type="text"
          {...register('companyName')}
          className="form-input"
          placeholder="Enter your company name"
        />
        {errors.companyName && (
          <p className="form-error">{errors.companyName.message}</p>
        )}
      </div>

      {/* Commercial Registration Number */}
      <div>
        <label className="form-label">Commercial Registration Number *</label>
        <input
          type="text"
          {...register('commercialRegistrationNumber')}
          className="form-input"
          placeholder="Enter registration number"
        />
        {errors.commercialRegistrationNumber && (
          <p className="form-error">{errors.commercialRegistrationNumber.message}</p>
        )}
      </div>

      {/* Tax Number */}
      <div>
        <label className="form-label">Tax Number</label>
        <input
          type="text"
          {...register('taxNumber')}
          className="form-input"
          placeholder="Enter tax number (optional)"
        />
        {errors.taxNumber && (
          <p className="form-error">{errors.taxNumber.message}</p>
        )}
      </div>

      {/* Company Email */}
      <div>
        <label className="form-label">Company Email *</label>
        <input
          type="email"
          {...register('companyEmail')}
          className="form-input"
          placeholder="Enter company email address"
        />
        {errors.companyEmail && (
          <p className="form-error">{errors.companyEmail.message}</p>
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

      {/* Contact Person Name */}
      <div>
        <label className="form-label">Contact Person Name *</label>
        <input
          type="text"
          {...register('contactPersonName')}
          className="form-input"
          placeholder="Enter contact person full name"
        />
        {errors.contactPersonName && (
          <p className="form-error">{errors.contactPersonName.message}</p>
        )}
      </div>

      {/* Company Type */}
      <div>
        <label className="form-label">Company Type *</label>
        <select
          {...register('companyType')}
          className="form-input"
        >
          {COMPANY_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.companyType && (
          <p className="form-error">{errors.companyType.message}</p>
        )}
      </div>

      {/* Address Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="form-label">City *</label>
          <input
            type="text"
            {...register('city')}
            className="form-input"
            placeholder="City"
          />
          {errors.city && (
            <p className="form-error">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="form-label">Street *</label>
          <input
            type="text"
            {...register('street')}
            className="form-input"
            placeholder="Street"
          />
          {errors.street && (
            <p className="form-error">{errors.street.message}</p>
          )}
        </div>
        <div>
          <label className="form-label">Zip Code *</label>
          <input
            type="text"
            {...register('zipCode')}
            className="form-input"
            placeholder="Zip Code"
          />
          {errors.zipCode && (
            <p className="form-error">{errors.zipCode.message}</p>
          )}
        </div>
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

      {/* File Upload */}
      <div>
        <label className="form-label">Company Documents *</label>
        <FileUploadArea
          onFilesSelected={handleFilesSelected}
          maxFiles={5}
          maxSize={5 * 1024 * 1024} // 5MB
          acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.jpeg']}
        />
        <p className="mt-2 text-xs text-gray-500">
          Upload your license and official documents (PDF, DOCX, JPG - Max 5MB each)
        </p>
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
          'Create Company Account'
        )}
      </button>
    </form>
  );
};

export default CompanyRegisterForm;