import React from 'react';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  return (
    <div className="bg-purple-900 text-white py-20">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to LearnMate AI</h1>
        <p className="text-lg mb-8">Your personalized AI learning assistant</p>
        <button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">Start Learning</button>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          <FeatureCard
            icon="puzzle"
            title="Personalized Learning Paths"
            description="AI-generated learning paths tailored to your style and goals"
          />
          <FeatureCard
            icon="award"
            title="Adaptive Assessments"
            description="Dynamic quizzes that adjust to your knowledge level"
          />
          <FeatureCard
            icon="users"
            title="Group Learning"
            description="Collaborate with peers in virtual study groups"
          />
          <FeatureCard
            icon="help-circle"
            title="AI Doubt Solver"
            description="Get instant answers to your questions from our AI tutor"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;