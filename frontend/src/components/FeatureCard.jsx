import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-purple-800 rounded-lg p-6 shadow-lg">
      <div className="flex items-center mb-4">
        <img src={`/icons/${icon}.svg`} alt={title} className="w-8 h-8 mr-2" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;