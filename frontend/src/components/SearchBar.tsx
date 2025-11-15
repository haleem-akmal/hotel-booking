// frontend/src/components/SearchBar.tsx

import { useState } from 'react';

// 1. Typescript: onSearch prop-இன் type-ஐ வரையறுத்தல்
type Props = {
  // onSearch என்பது, checkIn மற்றும் checkOut strings-ஐப் பெறும் ஒரு function
  onSearch: (checkIn: string, checkOut: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  // 2. தேதிகளுக்கான local state-ஐ உருவாக்குதல்
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkIn && checkOut) {
      // 3. state-ல் உள்ள தேதிகளை HomePage-க்கு (parent) அனுப்பவும்
      onSearch(checkIn, checkOut);
    }
  };

  // 4. இன்றைய தேதியை min-ஆக வைப்பது (பழைய தேதிகளைத் தேர்ந்தெடுக்க முடியாது)
  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Check-in Date */}
        <div className="relative group">
          <label 
            htmlFor="checkIn" 
            className="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold text-gray-600 z-10"
          >
            Check-in Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-blue-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              required
              min={today}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 hover:border-gray-300 text-gray-700 font-medium"
              placeholder="Select date"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg 
                className="h-4 w-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Check-out Date */}
        <div className="relative group">
          <label 
            htmlFor="checkOut" 
            className="absolute -top-2 left-3 bg-white px-2 text-xs font-semibold text-gray-600 z-10"
          >
            Check-out Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-purple-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              required
              min={checkIn || today}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 hover:border-gray-300 text-gray-700 font-medium"
              placeholder="Select date"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg 
                className="h-4 w-4 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            disabled={!checkIn || !checkOut}
            className={`
              w-full py-3 px-6 rounded-xl font-semibold text-white
              transition-all duration-300 transform
              ${checkIn && checkOut 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-lg active:scale-100' 
                : 'bg-gray-300 cursor-not-allowed'
              }
              flex items-center justify-center gap-2
            `}
          >
            <svg 
              className="h-5 w-5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
            Search Hotels
          </button>
        </div>
      </div>

      {/* Optional: Date Info Bar */}
      {checkIn && checkOut && (
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">Check-in:</span> {new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
              <span className="text-gray-400">→</span>
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-purple-600">Check-out:</span> {new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">
                {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Helper Text */}
      {!checkIn && !checkOut && (
        <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
          <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Select your travel dates to see available hotels and prices
        </div>
      )}
    </form>
  );
};

export default SearchBar;