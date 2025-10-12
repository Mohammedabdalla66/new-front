import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { toast } from 'react-toastify';
import { loginSchema } from '../../utils/validationSchemas';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const GotoRegister = () => {
    navigate('/auth/register');
  };

  // Fake auth: set user with selected role and go to landing
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const role = data.role || 'client';
      const fakeUser = {
        email: data.email,
        role,
        name: 'Demo User'
      };
      login(fakeUser); // useAuth stores user in localStorage
      toast.success('Logged in (demo)');
      navigate('/'); // go to landing; RoleRoute will protect inner areas
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="text-center mb-8">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <LogIn className="w-6 h-6 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="form-label">Email Address</label>
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

        {/* Password Field */}
        <div>
          <label className="form-label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className="form-input pr-10"
              placeholder="Enter your password"
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

        {/* Role Selector (Fake Auth) */}
        <div>
          <label className="form-label">Role</label>
          <select
            {...register('role')}
            className="form-input"
            defaultValue="client"
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
            <option value="firm">Firm</option>
          </select>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Register Link */}
        <div className="text-center">
          <p 
          onClick={GotoRegister}
          className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button  className="font-medium text-green-600 hover:text-green-700" >Create an account</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;