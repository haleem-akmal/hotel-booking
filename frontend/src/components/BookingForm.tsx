// frontend/src/components/BookingForm.tsx

import { useState, useEffect } from 'react'; // 1. useEffect-ஐ Import செய்யவும்
import { useAppContext } from '../contexts/AppContext';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // 2. useMutation-ஐ Import செய்யவும்
import apiClient from '../apiClient';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Typescript: Parent (HotelDetailsPage)-லிருந்து வரும் props
type Props = {
  hotelId: string;
  pricePerNight: number;
  initialCheckIn: string | null;
  initialCheckOut: string | null;
};

// Backend-க்கு அனுப்பும் DTO-இன் Type
type BookingFormData = {
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
  // totalPrice backend-ல் கணக்கிடப்படும், ஆனால் நாம் DTO-இன் ஒரு பகுதியாக அனுப்பலாம்
  // (Backend-ல் நாம் BookingService-ல் totalPrice-ஐக் கணக்கிடுவதால், இதை அனுப்பத் தேவையில்லை)
};

const BookingForm = ({ 
  hotelId, 
  pricePerNight, 
  initialCheckIn, 
  initialCheckOut 
}: Props) => {
  
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 3. Form state-ஐ props-லிருந்து அமைக்கவும்
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn || '');
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut || '');

  // 4. கணக்கிடப்பட்ட (Calculated) state
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  // 5. useEffect: தேதிகள் மாறும்போது விலையைக் கணக்கிட
  useEffect(() => {
    if (checkIn && checkOut) {
      try {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        // தேதிகள் தவறாக இருந்தால் (checkout < checkin)
        if (checkOutDate <= checkInDate) {
          setNumberOfNights(0);
          setTotalPrice(0);
          return;
        }

        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const nights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        
        setNumberOfNights(nights);
        setTotalPrice(nights * pricePerNight);
      } catch (error) {
        // Invalid date string
        setNumberOfNights(0);
        setTotalPrice(0);
      }
    } else {
      // தேதிகள் முழுமையாகத் தேர்ந்தெடுக்கப்படவில்லை
      setNumberOfNights(0);
      setTotalPrice(0);
    }
  }, [checkIn, checkOut, pricePerNight]); // 6. இந்த 3 மாறும்போது useEffect-ஐ இயக்கவும்

  // 7. useMutation: Booking-ஐ உருவாக்க (POST /bookings)
  const mutation = useMutation({
    // API call-ஐச் செய்யும் function
    mutationFn: async (formData: BookingFormData) => {
      // apiClient interceptor தானாகவே token-ஐச் சேர்க்கும்
      const response = await apiClient.post('/bookings', formData);
      return response.data;
    },
    // 8. வெற்றி (Success) பெற்றால்:
    onSuccess: () => {
      toast.success('Booking Successful! Check your email for receipt.');
      // My Bookings-ஐ refetch செய்ய (அடுத்த முறை செல்லும்போது)
      queryClient.invalidateQueries({ queryKey: ['fetchMyBookings'] });
      // TODO: Search results-ஐயும் refetch செய்யலாம்
      // queryClient.invalidateQueries({ queryKey: ['fetchHotels'] });
      navigate('/my-bookings'); // My Bookings பக்கத்திற்கு அனுப்பவும்
    },
    // 9. பிழை (Error) ஏற்பட்டால்:
    onError: (error: any) => {
      let errorMessage = 'An unexpected error occurred.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      toast.error(errorMessage);
    },
  });

  // 10. Form Submit logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numberOfNights === 0) {
      toast.error('Please select valid check-in and check-out dates.');
      return;
    }
    
    // API call-க்குத் தேவையான data
    const bookingData: BookingFormData = {
      hotelId: hotelId,
      checkInDate: new Date(checkIn).toISOString(),
      checkOutDate: new Date(checkOut).toISOString(),
    };
    
    // 11. useMutation-ஐ இயக்கவும்
    mutation.mutate(bookingData);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all hover:shadow-3xl"
    >
      {/* Header with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium opacity-90">Price per night</p>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">${pricePerNight}</span>
              <span className="text-sm opacity-75">/ night</span>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-semibold flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Best Deal
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Date Selection Section */}
        <div className="space-y-4">
          {/* Check-in Date */}
          <div className="group">
            <label 
              htmlFor="checkIn" 
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
            >
              <span className="p-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Check-in Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                min={today}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={mutation.isPending} // 12. Submit செய்யும்போது Disable
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Check-out Date */}
          <div className="group">
            <label 
              htmlFor="checkOut" 
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2"
            >
              <span className="p-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              Check-out Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
                min={checkIn || today}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all outline-none hover:border-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                disabled={mutation.isPending} // 12. Submit செய்யும்போது Disable
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
          {numberOfNights > 0 ? (
            <div className="space-y-3">
              {/* Nights Calculation */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                  <span className="text-gray-700">
                    ${pricePerNight} x {numberOfNights} {numberOfNights > 1 ? 'nights' : 'night'}
                  </span>
                </div>
                <span className="font-semibold text-gray-800">
                  ${pricePerNight * numberOfNights}
                </span>
              </div>

              {/* Service Fee (Optional) */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-gray-700">Service fee</span>
                </div>
                <span className="text-green-600 font-semibold">FREE</span>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-2"></div>

              {/* Total Price */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <div className="text-right">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    ${totalPrice}
                  </span>
                  <p className="text-xs text-gray-500">Includes taxes & fees</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-3">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm text-gray-500 font-medium">
                Select your travel dates to see the total price
              </p>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Free cancellation up to 24 hours before check-in</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Best price guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>Instant confirmation via email</span>
          </div>
        </div>

        {/* Submit Button */}
        {isLoggedIn ? (
          <button
            type="submit"
            disabled={mutation.isPending} // 12. Submit செய்யும்போது Disable
            className={`w-full px-6 py-4 font-bold rounded-xl text-white transition-all transform ${
              mutation.isPending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing your booking...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Confirm Booking
              </span>
            )}
          </button>
        ) : (
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-gray-700 font-semibold">Please log in to make a booking</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full mt-3 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all border border-blue-200"
            >
              Login Now
            </button>
          </div>
        )}

        {/* Trust Badges */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <img 
              src="https://img.icons8.com/color/48/000000/visa.png" 
              alt="Visa" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity"
            />
            <img 
              src="https://img.icons8.com/color/48/000000/mastercard.png" 
              alt="Mastercard" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity"
            />
            <img 
              src="https://img.icons8.com/color/48/000000/amex.png" 
              alt="Amex" 
              className="h-8 opacity-60 hover:opacity-100 transition-opacity"
            />
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Secure Payment
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;