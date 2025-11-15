// frontend/src/pages/RegisterPage.tsx

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import apiClient from '../apiClient';
import { toast } from 'react-hot-toast'; // Toaster-ஐ Import செய்யவும்

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  // API Call-ஐக் கையாளும் Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API Call
      const response = await apiClient.post('/auth/register', formData);

      // Success Case
      if (response.status === 201) {
        toast.success(
          response.data.message ||
            'Registration successful. Please check your email.',
        );

        setFormData({ firstName: '', lastName: '', email: '', password: '' });

        setTimeout(() => {
          navigate('/login');
        }, 5000); // 5 வினாடிகளுக்குப் பிறகு Login-க்குச் செல்லவும்
      }
    } catch (error: any) {
      // Error Case
      let errorMessage = 'An unexpected error occurred.';
      if (error.response && error.response.data && error.response.data.message) {
        const responseData = error.response.data;
        if (Array.isArray(responseData.message)) {
          errorMessage = responseData.message[0];
        } else {
          errorMessage = responseData.message;
        }
      }
      toast.error(errorMessage); // Error-ஐ Toast-ஆகக் காட்டவும்
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Animated Background Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Main Form Card */}
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center mb-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Your Account
          </span>
        </h2>
        <p className="text-center text-gray-500 text-sm mb-8">Join us to book your perfect stay</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex space-x-4">
            {/* First Name */}
            <div className="flex-1 group">
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full p-3 pl-10 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="John"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
            </div>
            
            {/* Last Name */}
            <div className="flex-1 group">
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="mt-1 block w-full p-3 pl-10 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Doe"
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="group">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-blue-600 transition-colors"
            >
              Password
            </label>
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
            <p className="mt-2 text-xs text-gray-500">Must be at least 8 characters long</p>
          </div>

          {/* Submit Button */}
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
                Creating Your Account...
              </span>
            ) : (
              <span className="flex items-center">
                Create Account
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

        {/* Divider */}
        <div className="relative mt-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">Or</span>
          </div>
        </div>

        {/* Link to Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 relative group"
          >
            Sign In Here
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;