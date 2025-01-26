// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-purple-800 text-white py-6">
      <div className="container mx-auto flex justify-between items-center">
        <p>&copy; 2023 LearnMate AI. All rights reserved.</p>
        <ul className="flex space-x-4">
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service">Terms of Service</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;