// frontend/src/components/layout/Header.tsx

import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

const Header = () => {
  const { isLoggedIn, user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-xl">
      <div className="backdrop-blur-sm bg-black/10">
        <div className="container mx-auto">
          {/* Reduced padding for compact look */}
          <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-3 md:py-4">
            <div className="flex justify-between items-center">
              
              {/* Logo Section */}
              <Link 
                to="/" 
                className="group flex items-center space-x-2 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-lg blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  <div className="relative bg-white p-1.5 rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                    <svg 
                      className="h-6 w-6 text-blue-600" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                      HotelBooking
                    </span>
                    <span className="text-blue-100 font-light">.com</span>
                  </h1>
                  <p className="text-xs text-blue-100 hidden md:block opacity-90">Your perfect stay awaits</p>
                </div>
              </Link>

              {/* Navigation Section with extra spacing */}
              <nav className="flex items-center">
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2 md:space-x-4">
                    
                    {/* User Profile Display */}
                    <div className="hidden md:flex items-center space-x-2 mr-3 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full">
                      <div className="h-7 w-7 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/20">
                        <span className="text-white font-bold text-xs">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-blue-100 opacity-80">Welcome back,</span>
                        <span className="font-semibold text-xs">
                          {user?.firstName} {user?.lastName}
                        </span>
                      </div>
                    </div>

                    {/* Mobile User Display */}
                    <div className="md:hidden">
                      <div className="h-7 w-7 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/20">
                        <span className="text-white font-bold text-xs">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </span>
                      </div>
                    </div>
                    
                    {/* My Bookings Button */}
                    <Link
                      to="/my-bookings"
                      className="group relative overflow-hidden px-3 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
                    >
                      <svg 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
                        />
                      </svg>
                      <span className="hidden sm:inline">My Bookings</span>
                      <span className="sm:hidden">Bookings</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                    </Link>

                    {/* Sign Out Button */}
                    <button
  onClick={handleLogout}
  className="group relative px-4 py-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-lg transition-all duration-300 flex items-center space-x-2 hover:bg-white hover:text-red-600 hover:border-white transform hover:scale-105 shadow-lg hover:shadow-xl"
>
  <span className="font-bold text-sm">
    Sign Out
  </span>
  <svg 
    className="h-4 w-4 group-hover:translate-x-1 transition-transform" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
    />
  </svg>
</button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 md:space-x-3">
                    <Link
                      to="/register"
                      className="group relative overflow-hidden px-3 md:px-4 py-2 text-sm font-semibold bg-gradient-to-r from-white to-gray-100 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                        Register
                      </span>
                      <svg 
                        className="h-4 w-4 text-blue-600 relative z-10" 
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
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    <Link
                      to="/login"
                      className="group relative overflow-hidden px-3 md:px-4 py-2 text-sm font-semibold bg-gradient-to-r from-white to-gray-100 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold">
                        Sign In
                      </span>
                      <svg 
                        className="h-4 w-4 text-blue-600 relative z-10" 
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
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;