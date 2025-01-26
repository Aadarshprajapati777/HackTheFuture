import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
// import Auth from './pages/Auth'; s

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path='/footer' element={<Footer />} />
        {/* <Route path="/auth" element={<Auth />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;