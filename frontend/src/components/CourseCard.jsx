import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, enroll }) => {
  return (
    <div className="bg-purple-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link to={enroll} className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
        Enroll
      </Link>
    </div>
  );
};

export default CourseCard;