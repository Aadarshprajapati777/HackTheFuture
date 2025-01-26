// pages/Dashboard.js
import React from 'react';
import ProgressCard from '../components/ProgressCard';
import RecommendedCoursesCard from '../components/RecommendedCoursesCard';

const Dashboard = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProgressCard />
        <RecommendedCoursesCard />
      </div>
    </div>
  );
};

export default Dashboard;