// frontend/src/pages/HomePage.tsx

import { useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom'; // Link-ஐ Import செய்யவும்

// Hotel Type (Backend-லிருந்து வருவது, totalPrice-உடன்)
type HotelType = {
  _id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  // Backend-ல் கணக்கிடப்பட்ட fields
  numberOfNights?: number; 
  totalPrice?: number;
};

/**
 * API Call Function: தேதிகள் இருந்தால் /hotels/search-ஐ அழைக்கும், 
 * இல்லையெனில் எதையும் செய்யாது (நீங்கள் கேட்டபடி).
 */
const fetchAvailableHotels = async (
  checkIn: string,
  checkOut: string,
): Promise<HotelType[]> => {
  
  if (!checkIn || !checkOut) {
    return []; // தேதிகள் இல்லை என்றால், காலி array-ஐ return செய்யவும்
  }

  const params = new URLSearchParams();
  params.append('checkIn', new Date(checkIn).toISOString());
  params.append('checkOut', new Date(checkOut).toISOString());
  
  const response = await apiClient.get('/hotels/search', { params });
  return response.data;
};

const HomePage = () => {
  const [searchCheckIn, setSearchCheckIn] = useState<string>('');
  const [searchCheckOut, setSearchCheckOut] = useState<string>('');

  const { data: hotels, isLoading, isError } = useQuery({
    queryKey: ['fetchHotels', searchCheckIn, searchCheckOut],
    queryFn: () => fetchAvailableHotels(searchCheckIn, searchCheckOut),
    enabled: !!(searchCheckIn && searchCheckOut),
    staleTime: 1000 * 60 * 5, 
  });

  const handleSearch = (checkIn: string, checkOut: string) => {
    setSearchCheckIn(checkIn);
    setSearchCheckOut(checkOut);
  };

  /**
   * Render logic-ஐக் கையாளும் ஒரு helper function
   * (இது நீங்கள் வழங்கிய UI code-ஐ அடிப்படையாகக் கொண்டது)
   */
  const renderHotelList = () => {
    // 1. Loading State - Skeleton Loading Cards
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-t-xl"></div>
              <div className="bg-white p-4 rounded-b-xl shadow-lg">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // 2. Error State
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-500">We couldn't fetch the hotels. Please try again later.</p>
        </div>
      );
    }

    // 3. Data State (hotels array)
    if (hotels && hotels.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            // --- Link Wrapper (முக்கிய மாற்றம்) ---
            <Link
              to={`/hotel/${hotel._id}?checkIn=${searchCheckIn}&checkOut=${searchCheckOut}`}
              key={hotel._id} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg h-full">
                
                {/* Hotel Image with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={hotel.imageUrls[0]}
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-yellow-500 text-sm font-semibold">
                      {'★'.repeat(hotel.starRating)}
                      <span className="text-gray-300">{'★'.repeat(5 - hotel.starRating)}</span>
                    </span>
                  </div>
                </div>
                
                {/* Hotel Details */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 mb-1 line-clamp-1">
                    {hotel.name}
                  </h2>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    {/* (Location Icon SVG) */}
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {hotel.city}, {hotel.country}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                    {hotel.description}
                  </p>

                  {/* Price Section */}
                  <div className="border-t pt-4 mt-auto">
                    {hotel.totalPrice && hotel.numberOfNights ? (
                      // Search செய்த பிறகு (Total Price)
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Total Price</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ${hotel.totalPrice}
                          </p>
                          <p className="text-xs text-gray-500">
                            {hotel.numberOfNights} nights
                          </p>
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg">
                          View Details
                        </div>
                      </div>
                    ) : (
                      // Search செய்வதற்கு முன் (Price per Night)
                      // (இந்த UI இப்போது காட்டப்படாது, ஏனெனில் நாம் search-க்கு முன் எதையும் fetch செய்வதில்லை)
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Per Night</p>
                          <p className="text-2xl font-bold text-blue-600">
                            ${hotel.pricePerNight}
                          </p>
                        </div>
                         <div className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg">
                          View Details
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
            // --- Link Wrapper End ---
          ))}
        </div>
      );
    }
    
    // 4. Initial state or No results
    if (searchCheckIn && searchCheckOut) {
      // Search செய்த பிறகு, முடிவுகள் (results) இல்லை
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="text-6xl mb-4">🏨</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No hotels available</h3>
          <p className="text-gray-500">Try adjusting your search dates or filters</p>
        </div>
      );
    }

    // Search செய்வதற்கு முன் (ஆரம்ப நிலை)
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">Start Your Journey</h3>
        <p className="text-gray-500 text-center max-w-md">
          Select your check-in and check-out dates above to discover amazing hotels for your stay
        </p>
      </div>
    );
  };

  // --- Main Component JSX ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        
        {/* Hero Section with SearchBar */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
              Find Your Perfect Stay
            </h1>
            <p className="text-lg text-gray-600">
              Discover comfortable hotels at the best prices
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          {(searchCheckIn && searchCheckOut) && !isLoading && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                Available Hotels
              </h2>
              {hotels && hotels.length > 0 && (
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {hotels.length} hotels found
                </span>
              )}
            </div>
          )}
          
          {/* Hotels Grid (Loading, Error, or Data) */}
          {renderHotelList()}
        </div>

      </div>
    </div>
  );
};

export default HomePage;