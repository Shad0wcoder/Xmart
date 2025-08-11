import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border border-[#161616] p-1 text-white bg-[#252525] mb-12 md:mb-0 max-w-[1500px] mx-auto">
      <div className="flex justify-between flex-wrap p-2">
        <div className="w-full">
          <h2 className="text-xl font-bold">Xmart</h2>
          <p className='text-xs md:text-base'>Xmart is your go-to eCommerce platform offering a wide range of products across various categories. We are committed to providing the best shopping experience with excellent customer service.</p>
        </div>

        <div className="m-2">
          <h3 className='text-base'>Quick Links</h3>
          <ul className='text-sm'>
            <li className='hover:text-blue-600'><Link to="/about">About Us</Link></li>
            <li className='hover:text-blue-600'><Link to="/contact">Contact Us</Link></li>
            <li className='hover:text-blue-600'><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="m-2">
          <h3 className='text-base'>Follow Us</h3>
          <ul className='text-sm'>
            <li className='hover:text-blue-600'><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li className='hover:text-blue-600'><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li className='hover:text-blue-600'><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li className='hover:text-blue-600'><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Xmart. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
