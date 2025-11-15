// frontend/src/pages/VerifyEmailPage.tsx

import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

// API Call Function
const verifyEmailRequest = async (token: string) => {
  const response = await apiClient.get(`/auth/verify-email?token=${token}`);
  return response.data;
};

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  // 1. URL-லிருந்து ?token=...-ஐப் படிக்கவும்
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  // 2. useQuery-ஐப் பயன்படுத்தி Backend-க்கு token-ஐ அனுப்பவும்
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['verifyEmail', token],
    queryFn: () => verifyEmailRequest(token as string),
    // 3. token இருந்தால் மட்டும் API call-ஐ இயக்கவும்
    enabled: !!token, 
    // 4. மீண்டும் மீண்டும் (retry) முயற்சிக்க வேண்டாம் (token தவறாக இருந்தால்)
    retry: false, 
  });

  // 5. Success/Error-ஐக் கையாள useEffect
  useEffect(() => {
    if (data) {
      // 6. வெற்றி (Success)
      toast.success(data.message || 'Email verified successfully!');
      // 3 வினாடிகளுக்குப் பிறகு Login-க்கு அனுப்பவும்
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
    
    if (isError) {
      // 7. பிழை (Error)
      let errorMessage = 'Verification failed.';
      if (error && (error as any).response && (error as any).response.data) {
        errorMessage = (error as any).response.data.message;
      }
      toast.error(errorMessage);
      
      setTimeout(() => {
        navigate('/'); // Home-க்கு அனுப்பவும்
      }, 3000);
    }
  }, [data, isError, error, navigate]);

  // 8. Loading State-ஐக் காட்டுதல்
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl font-semibold">
          Verifying your email, please wait...
        </div>
      </div>
    );
  }

  // 9. Success/Error message-ஐக் காட்டுதல் (redirect ஆகும் முன்)
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        {isError ? (
          <h1 className="text-3xl font-bold text-red-600">Verification Failed</h1>
        ) : (
          <h1 className="text-3xl font-bold text-green-600">Verification Successful!</h1>
        )}
        <p className="mt-4 text-gray-600">You will be redirected shortly...</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;