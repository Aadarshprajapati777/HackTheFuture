
// pages/Courses.js
import React from 'react';
import CourseCard from '../components/CourseCard';

const Courses = () => {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CourseCard
          title="Introduction to Machine Learning"
          description="Learn the fundamentals of machine learning algorithms and their applications."
          enroll="/courses/course1"
        />
        <CourseCard
          title="Data Visualization with Python"
          description="Explore effective ways to visualize data using Python's data visualization libraries."
          enroll="/courses/course2"
        />
        {/* Add more course cards */}
      </div>
    </div>
  );
};

export default Courses;
