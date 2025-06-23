import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="text-white bg-black min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold">About Us - Full Details</h2>
      <p className="text-sm mt-4 max-w-xl text-center">
        CrowdShield offers a robust infrastructure for real-time crowd monitoring using IoT and AI. It is built to help ensure safety in mass gatherings through accurate tracking, prediction, and alert systems.
      </p>
      <Link to="/"><button className="mt-6 border border-white px-4 py-1 rounded hover:bg-white hover:text-black">Back</button></Link>
    </div>
  );
}

export default AboutPage;