import React from 'react';
import { Link } from 'react-router-dom';

const RecommendedCoursesCard = () => {
  return (
    <div className="bg-purple-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Recommended Courses</h3>
      <ul>
        <li className="mb-2">
          <Link to="/courses/course1" className="hover:text-purple-400">
            Course 1: Introduction to Machine Learning
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/courses/course2" className="hover:text-purple-400">
            Course 2: Data Visualization with Python
          </Link>
        </li>
        {/* Add more recommended courses */}
      </ul>
    </div>
  );
};

export default RecommendedCoursesCard;