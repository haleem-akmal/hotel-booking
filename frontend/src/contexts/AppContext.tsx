// frontend/src/contexts/AppContext.tsx

import React, { createContext, useContext, useState } from 'react';

// 1. User-இன் Type-ஐ வரையறுத்தல் (Backend அனுப்புவதைப் போல)
export type UserType = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string; // Optional
};

// 2. AppContextType-ல் 'user'-ஐச் சேர்ப்பது
type AppContextType = {
  isLoggedIn: boolean;
  token: string | null;
  user: UserType | null; // User object-ஐச் சேமிக்க
  saveLoginData: (token: string, user: UserType) => void; // Function-ஐ மாற்றுதல்
  logout: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  
  // 3. Token-ஐ State-ல் சேமித்தல் (localStorage-லிருந்து)
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );

  // 4. User-ஐ State-ல் சேமித்தல் (localStorage-லிருந்து)
  const [user, setUser] = useState<UserType | null>(() => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  });

  const contextValue: AppContextType = {
    isLoggedIn: !!token,
    token: token,
    user: user, // User-ஐ provide செய்தல்

    // 5. saveToken-ஐ saveLoginData-ஆக மாற்றுதல்
    saveLoginData: (newToken: string, newUser: UserType) => {
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('access_token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser)); // User-ஐ JSON string-ஆகச் சேமித்தல்
    },

    // 6. logout-ல் user-ஐயும் நீக்குதல்
    logout: () => {
      setToken(null);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    },
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};