import React from 'react';
import { Link } from 'react-router-dom';

function WorkPage() {
  return (
    <div className="text-white bg-black min-h-screen flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold">Work - Full Details</h2>
      <p className="text-sm mt-4 max-w-xl text-center">
        Our work involves implementing smart crowd control at major events, temples, rallies, and concerts. Through sensor-driven data and visualizations, authorities gain full control and awareness.
      </p>
      <Link to="/"><button className="mt-6 border border-white px-4 py-1 rounded hover:bg-white hover:text-black">Back</button></Link>
    </div>
  );
}

export default WorkPage;