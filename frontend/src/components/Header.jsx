import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-purple-700 text-white py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">LearnMate AI</Link>
        <ul className="flex space-x-4">
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/auth">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};