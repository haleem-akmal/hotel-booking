// frontend/src/components/layout/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white shadow-xl mt-auto">
      <div className="backdrop-blur-sm bg-black/10">
        <div className="container mx-auto">
          <div className="px-4 md:px-8 lg:px-12 xl:px-16 py-6 md:py-8">
            
            {/* Main Footer Content */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
              
              {/* Logo & Description Section */}
              <div className="flex flex-col items-center md:items-start space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-lg blur-md opacity-50"></div>
                    <div className="relative bg-white p-1.5 rounded-lg shadow-lg">
                      <svg 
                        className="h-6 w-6 text-blue-600" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                      HotelBooking
                    </span>
                    <span className="text-blue-100 font-light">.com</span>
                  </h2>
                </div>
                <p className="text-xs md:text-sm text-blue-100 max-w-xs text-center md:text-left opacity-90">
                  Your trusted partner for finding the perfect accommodation worldwide
                </p>
                
                {/* Social Media Icons */}
                <div className="flex space-x-3 mt-2">
                  <a href="#" className="group">
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                  </a>
                  <a href="#" className="group">
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                  </a>
                  <a href="#" className="group">
                    <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>

              {/* Links Sections */}
              <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 text-center md:text-left">
                
                {/* Quick Links */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-white flex items-center justify-center md:justify-start space-x-2">
                    <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <span>Quick Links</span>
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>About Us</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Contact</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>FAQs</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Support</span>
                    </a>
                  </div>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-white flex items-center justify-center md:justify-start space-x-2">
                    <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <span>Legal</span>
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Privacy Policy</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Terms of Service</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Cookie Policy</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Disclaimer</span>
                    </a>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="font-semibold text-sm mb-3 text-white flex items-center justify-center md:justify-start space-x-2">
                    <div className="h-1 w-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    <span>Services</span>
                  </h3>
                  <div className="flex flex-col space-y-2">
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Hotel Booking</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Flight Booking</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Car Rental</span>
                    </a>
                    <a href="#" className="group text-blue-100 hover:text-white text-xs md:text-sm transition-colors duration-300 flex items-center justify-center md:justify-start space-x-1">
                      <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      <span>Travel Insurance</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
                <p className="text-xs text-blue-100 opacity-80">
                  &copy; 2025 Hotel Booking Inc. All rights reserved.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-xs text-blue-100">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="h-4 w-4 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs text-blue-100">support@hotelbooking.com</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;