// frontend/src/components/ProtectedPage.tsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const ProtectedPage = () => {
  // 1. Context-லிருந்து isLoggedIn-ஐப் பெறவும்
  const { isLoggedIn } = useAppContext();

  if (isLoggedIn) {
    // 2. User login செய்திருந்தால், child component-ஐக் காட்டவும்
    // (Layout-ல் உள்ளது போலவே, <Outlet /> child route-ஐ render செய்யும்)
    return <Outlet />;
  } else {
    // 3. User login செய்யவில்லை என்றால், /login-க்கு redirect செய்யவும்
    // 'replace' option, browser history-ல் /my-bookings-ஐச் சேமிக்காது.
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedPage;