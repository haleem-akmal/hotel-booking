import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedPage from './components/ProtectedPage';
import MyBookingsPage from './pages/MyBookingsPage';
import HomePage from './pages/HomePage';
import HotelDetailsPage from './pages/HotelDetailsPage'; // 1. Import செய்யவும்
import { Toaster } from 'react-hot-toast';
import VerifyEmailPage from './pages/VerifyEmailPage';

function App() {
  
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <Routes>
      <Route
        path="/"
        element={<Layout />} // Layout wrapper
      >
        {/* Public Pages inside Layout */}
        <Route index element={<HomePage />} />
        <Route path="/search" element={<div>Search Page</div>} />
        
        {/* 2. Hotel Details Route-ஐ இங்கே சேர்க்கவும் */}
        <Route path="/hotel/:hotelId" element={<HotelDetailsPage />} />

        {/* Protected Pages inside Layout */}
        <Route element={<ProtectedPage />}> 
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Route>
      </Route>

      {/* Public Pages without Layout */}
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/verify-email" element={<VerifyEmailPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    </>
  );
  
}

export default App;