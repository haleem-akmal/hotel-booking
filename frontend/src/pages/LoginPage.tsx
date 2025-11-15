// frontend/src/pages/LoginPage.tsx

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import apiClient from '../apiClient';
import { useAppContext } from '../contexts/AppContext';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { saveLoginData } = useAppContext();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await apiClient.post('/auth/login', formData);
      
      const { access_token, user } = response.data;

      if (access_token && user) {
        saveLoginData(access_token, user);
        toast.success('Login successful!');
        navigate('/');
      }
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated Background Circles */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative bg-white/90 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/50 transform transition-all duration-500 hover:scale-[1.02]">
        
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-50"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full shadow-xl">
              <svg 
                className="h-8 w-8 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Welcome Back Message */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back!
            </span>
          </h2>
          <p className="text-gray-500 text-sm">Sign in to continue to HotelBooking.com</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field with Icon */}
          <div className="group">
            <label 
              htmlFor="email" 
              className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors"
            >
              Email Address
            </label>
            <div className="relative">
              <input 
                id="email" 
                type="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full p-3 pl-10 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="john.doe@example.com"
              />
              <svg 
                className="absolute left-3 top-4 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
            </div>
          </div>

          {/* Password Field with Icon */}
          <div className="group">
            <div className="flex justify-between items-center mb-2">
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-gray-700 group-focus-within:text-blue-600 transition-colors"
              >
                Password
              </label>
              <Link 
                to="/forgot-password" 
                className="text-xs text-blue-600 hover:text-purple-600 transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input 
                id="password" 
                type="password" 
                required 
                value={formData.password}
                onChange={handleChange}
                disabled={isSubmitting}
                className="mt-1 block w-full p-3 pl-10 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              <svg 
                className="absolute left-3 top-4 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
                />
              </svg>
            </div>
          </div>

          {/* Remember Me Checkbox (Optional Enhancement) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>
          
          {/* Submit Button with Animation */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`group relative w-full flex justify-center py-3.5 px-4 border-2 border-transparent rounded-xl shadow-lg text-sm font-bold text-white overflow-hidden transition-all duration-300 ${
              isSubmitting 
                ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] hover:shadow-xl'
            } focus:outline-none focus:ring-4 focus:ring-blue-500/50`}
          >
            {/* Button Animation Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              <span className="flex items-center">
                Sign In
                <svg 
                  className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 7l5 5m0 0l-5 5m5-5H6" 
                  />
                </svg>
              </span>
            )}
          </button>
        </form>


        {/* Link to Register with Enhanced Style */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 relative group"
          >
            Create Account
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;