import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BottomBar from './components/BottomBar/BottomBar';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1f1f1f]">
      <Header />
      <ToastContainer />
      <main className="flex-grow flex flex-col md:w-[80%] w-[90%] mx-auto bg-[#1f1f1f]">
        <Outlet />
      </main>
      <Footer />
      <BottomBar />
    </div>
  );
}

export default App;
