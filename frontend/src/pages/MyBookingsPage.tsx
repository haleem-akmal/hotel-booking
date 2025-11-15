// frontend/src/pages/MyBookingsPage.tsx

import { useQuery } from '@tanstack/react-query'; // 1. useQuery-ஐ Import செய்யவும்
import apiClient from '../apiClient'; // 2. நமது apiClient-ஐ Import செய்யவும்

// 3. Backend-லிருந்து வரும் Booking-இன் Type-ஐ வரையறுத்தல்
// (Hotel-ஐ populate செய்வதால், hotel ஒரு object ஆக இருக்கும்)
type HotelType = {
  _id: string;
  name: string;
  city: string;
  country: string;
  pricePerNight: number;
  imageUrls: string[];
};

type BookingType = {
  _id: string;
  hotel: HotelType;
  user: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  createdAt: string;
};

// 4. API Call-ஐச் செய்யும் Function
const fetchMyBookings = async (): Promise<BookingType[]> => {
  // Interceptor (apiClient) தானாகவே token-ஐச் சேர்க்கும்
  const response = await apiClient.get('/bookings'); 
  return response.data;
};

const MyBookingsPage = () => {
  // 5. useQuery-ஐப் பயன்படுத்துதல்
  const { data: bookings, isLoading, isError } = useQuery({
    queryKey: ['fetchMyBookings'], // 6. Query-இன் "பெயர்" (Cache Key)
    queryFn: fetchMyBookings,     // 7. API-ஐ அழைக்கும் function
  });

  // 6. Loading State-ஐக் கையாளுதல்
  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <p className="mt-4">Loading your bookings...</p>
      </div>
    );
  }

  // 7. Error State-ஐக் கையாளுதல்
  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <p className="mt-4 text-red-600">
          Error loading bookings. Please try again later.
        </p>
      </div>
    );
  }

  // 8. Success State (Data-வைக் காட்டுதல்)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
      
      {/* 9. Bookings இல்லை என்றால் */}
      {bookings && bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {/* 10. Bookings-களை map செய்து காட்டுதல் */}
          {bookings?.map((booking) => (
            <div key={booking._id} className="flex bg-white rounded-lg shadow-lg overflow-hidden border">
              {/* Hotel Image */}
              <div className="w-1/3">
                <img 
                  src={booking.hotel.imageUrls[0]} 
                  alt={booking.hotel.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              {/* Booking Details */}
              <div className="w-2/3 p-4">
                <h2 className="text-2xl font-semibold text-gray-800">{booking.hotel.name}</h2>
                <p className="text-sm text-gray-600">{booking.hotel.city}, {booking.hotel.country}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-semibold">Check-in:</span>
                    <p>{new Date(booking.checkInDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Check-out:</span>
                    <p>{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="font-semibold">Total Price:</span>
                    <p>${booking.totalPrice}</p>
                  </div>
                   <div>
                    <span className="font-semibold">Booked On:</span>
                    <p>{new Date(booking.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;