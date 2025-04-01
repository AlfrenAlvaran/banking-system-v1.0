import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Sidebar from './components/sidebar';
import MobileNav from './components/MobileNav';
import Banks from './pages/Banks';
import Transaction from './pages/Transaction';
import Transfer from './pages/Transfer';
import SignIn from './[auth]/SignIn';
import SignUp from './[auth]/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const location = useLocation();
  const pathname = location.pathname;

  let loggedInUser = {};
  try {
    const userFromStorage = localStorage.getItem('user');
    loggedInUser = userFromStorage ? JSON.parse(userFromStorage) : {};
  } catch (error) {
    console.error('Error parsing user data from localStorage:', error);
  }

  const isLoggedIn = loggedInUser.email !== undefined; // Check if email exists

  console.log('User:', loggedInUser);
  console.log('Is logged in:', isLoggedIn);

  const hideSidebar = pathname === '/sign-in' || pathname === '/sign-up';

  return (
    <main className='flex h-screen w-full'>
      <div className='flex justify-center items-center'>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
        />
      </div>

      {/* Conditionally render Sidebar */}
      {!hideSidebar && <Sidebar user={loggedInUser} />}
      
      <div className='flex size-full flex-col'>
        <div className="root-layout">
          <img src="/icons/logo.svg" alt="logo" />
          <div>
            <MobileNav user={loggedInUser} />
          </div>
        </div>
        
        <Routes>
          {/* Protected routes, redirect to sign-in if not logged in */}
          <Route path='/' element={loggedInUser.email ? <Home /> : <Navigate to='/sign-in' />} />
          <Route path='/my-banks' element={loggedInUser.email ? <Banks /> : <Navigate to='/sign-in' />} />
          <Route path='/transaction-history' element={loggedInUser.email ? <Transaction /> : <Navigate to='/sign-in' />} />
          <Route path="/payment-transfer" element={loggedInUser.email ? <Transfer /> : <Navigate to='/sign-in' />} />
          
          {/* Public routes */}
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
