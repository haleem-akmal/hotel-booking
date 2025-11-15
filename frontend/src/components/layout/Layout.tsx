// frontend/src/components/layout/Layout.tsx

import { Outlet } from 'react-router-dom';
import Header from './Header'; // 1. Header-ஐ Import செய்யவும்
import Footer from './Footer'; // 2. Footer-ஐ Import செய்யவும்
// import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      
      <Header /> {/* 3. Placeholder-க்குப் பதிலாக <Header /> */}
      
      {/* <Toaster position="bottom-right" reverseOrder={false} /> */}
      <main className="flex-grow container mx-auto p-4">
        <Outlet /> 
      </main>

      <Footer /> {/* 4. Placeholder-க்குப் பதிலாக <Footer /> */}
      
    </div>
  );
};

export default Layout;