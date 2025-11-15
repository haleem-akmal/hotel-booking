// frontend/src/pages/HotelDetailsPage.tsx

import { useQuery } from '@tanstack/react-query';
// 1. useParams (ID-ஐப் படிக்க) மற்றும் useSearchParams (Query-ஐப் படிக்க)
import { useParams, useSearchParams } from 'react-router-dom'; 
import apiClient from '../apiClient';
import BookingForm from '../components/BookingForm'; // BookingForm-ஐ Import செய்யவும்

// HotelType (Backend-லிருந்து வருவது)
type HotelType = {
  _id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
};

// API Call Function
const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await apiClient.get(`/hotels/${hotelId}`);
  return response.data;
};

const HotelDetailsPage = () => {
  // URL-லிருந்து 'hotelId'-ஐப் பெறவும் (e.g., /hotel/123)
  const { hotelId } = useParams<{ hotelId: string }>();
  
  // 2. URL-லிருந்து Query Params-ஐப் படிக்கவும் (e.g., ?checkIn=...)
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');

  // useQuery-ஐப் பயன்படுத்துதல்
  const { data: hotel, isLoading, isError } = useQuery({
    queryKey: ['fetchHotelById', hotelId],
    queryFn: () => fetchHotelById(hotelId as string),
    enabled: !!hotelId, // hotelId இருந்தால் மட்டும் query-ஐ இயக்கவும்
  });

  // Loading State - Modern Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Loading Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg w-64 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded-lg w-48"></div>
            </div>
          </div>
        </div>
        
        {/* Loading Gallery */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-4 gap-2 h-96 animate-pulse">
            <div className="col-span-2 row-span-2 bg-gray-200 rounded-l-2xl"></div>
            <div className="bg-gray-200"></div>
            <div className="bg-gray-200 rounded-tr-2xl"></div>
            <div className="bg-gray-200"></div>
            <div className="bg-gray-200 rounded-br-2xl"></div>
          </div>
          
          {/* Loading Content */}
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="col-span-2 space-y-4">
              <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
            <div className="col-span-1">
              <div className="h-96 bg-gray-200 rounded-xl animate-pulse sticky top-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State - Clean Design
  if (isError || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Hotel</h2>
          <p className="text-gray-600 mb-6">We're having trouble loading this hotel's details. Please try again.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Success State - Modern Clean Design
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Sticky Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              {/* Back Button */}
              <button 
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Hotel Info */}
              <div>
                <h1 className="text-xl font-bold text-gray-900">{hotel.name}</h1>
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-4 h-4 ${i < hotel.starRating ? 'text-amber-400' : 'text-gray-300'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-500">•</span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{hotel.city}, {hotel.country}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0" />
                </svg>
              </button>
              <button className="p-3 hover:bg-gray-100 rounded-lg transition-colors group">
                <svg className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        
        {/* Photo Gallery - Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[500px] mb-8">
          <div className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-l-2xl">
            <img 
              src={hotel.imageUrls[0]} 
              alt={hotel.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
          {hotel.imageUrls.slice(1, 5).map((url, index) => (
            <div 
              key={index} 
              className={`relative group cursor-pointer overflow-hidden ${
                index === 1 ? 'rounded-tr-2xl' : 
                index === 3 ? 'rounded-br-2xl' : ''
              }`}
            >
              <img 
                src={url} 
                alt={`View ${index + 2}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              {index === 3 && hotel.imageUrls.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <button className="px-4 py-2 bg-white/90 backdrop-blur text-gray-900 font-medium rounded-lg hover:bg-white transition-colors">
                    +{hotel.imageUrls.length - 5} Photos
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Hotel Info */}
          <div className="lg:col-span-2">
            
            {/* Overview Section */}
            <div className="bg-white rounded-2xl p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {hotel.description}
              </p>
              
              {/* Quick Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🏊', label: 'Pool' },
                  { icon: '🏋️', label: 'Gym' },
                  { icon: '🍽️', label: 'Restaurant' },
                  { icon: '🚗', label: 'Parking' },
                  { icon: '📶', label: 'Free WiFi' },
                  { icon: '❄️', label: 'AC' },
                  { icon: '🧖', label: 'Spa' },
                  { icon: '🛎️', label: '24/7 Service' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Check-in & Check-out</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Check-in</span>
                    <span className="font-medium text-gray-900">After 3:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out</span>
                    <span className="font-medium text-gray-900">Before 11:00 AM</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">Policies</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free cancellation up to 24 hours</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>No smoking policy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
              <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-gray-500">Map View</p>
                  <p className="text-sm text-gray-400">{hotel.city}, {hotel.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* 3. BookingForm component-ஐப் பயன்படுத்தவும் */}
              <BookingForm 
                hotelId={hotel._id} 
                pricePerNight={hotel.pricePerNight} 
                // 4. தேதிகளை Props-ஆக BookingForm-க்கு அனுப்பவும்
                initialCheckIn={checkIn}
                initialCheckOut={checkOut}
              />
              
              {/* Why Book With Us */}
              <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Why book with us?</h4>
                <div className="space-y-3">
                  {[
                    'Best price guarantee',
                    'No booking fees',
                    '24/7 customer support',
                    'Secure payment'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailsPage;