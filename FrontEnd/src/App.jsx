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

  const loggedInUser = JSON.parse(localStorage.getItem('user')) || {};
  const isLoggedIn = Boolean(loggedInUser.email); 

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
          rtl={false} />
      </div>

      {!hideSidebar && <Sidebar user={loggedInUser} />}
      <div className='flex size-full flex-col'>
        <div className="root-layout">
          <img src="/icons/logo.svg" alt="logo" />
          <div>
            <MobileNav user={loggedInUser} />
          </div>
        </div>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to='/sign-in' />} />
          <Route path='/my-banks' element={isLoggedIn ? <Banks /> : <Navigate to='/sign-in' />} />
          <Route path='/transaction-history' element={isLoggedIn ? <Transaction /> : <Navigate to='/sign-in' />} />
          <Route path="/payment-transfer" element={isLoggedIn ? <Transfer /> : <Navigate to='/sign-in' />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
