import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import axios from 'axios'
import ShowProduct from './components/product/ShowProduct'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <Header />
    <ToastContainer />
    <main className='main1'>
      <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default App
