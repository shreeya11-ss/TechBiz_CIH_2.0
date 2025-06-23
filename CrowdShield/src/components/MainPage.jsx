import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-white bg-black font-sans">
      <header className="flex justify-between items-center py-4">
        <div className="text-2xl font-bold">CrowdShield</div>
        <nav className="flex gap-6 items-center">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About us</a>
          <a href="#work" className="hover:underline">Work</a>
          <Link to="dashboard"><button className="bg-gray-300 text-black px-4 py-1 rounded-full">Sign up</button></Link>
        </nav>
      </header>

      <section className="flex flex-col md:flex-row justify-between items-center mt-10 gap-8">
        <div>
          <h1 className="text-4xl font-bold">Crowd Control System</h1>
          <p className="text-lg text-gray-300 mt-2">Smart Crowd Monitoring</p>
          <button className="mt-4 px-4 py-2 bg-white text-black rounded">Get Started</button>
        </div>
        <img src="/images/map-1.jpg" alt="Map Visualization" className="max-w-md rounded-lg" />
      </section>

      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 flex flex-col md:flex-row items-center mt-12 gap-4">
        <img src="/images/map-2.jpg" alt="Crowd map" className="w-36 rounded-lg" />
        <p className="text-sm">
          Ensure safety at large gatherings with real-time crowd analysis, geo-based alerts, and instant authority notifications. CrowdShield helps manage congestion, reduce risks, and maintain order using cutting-edge technology designed for temples, events, and public spaces.
        </p>
      </section>

      <section id="about" className="mt-12 flex flex-col md:flex-row items-center gap-6">
        <div>
          <h3 className="text-xl">About Us</h3>
          <h4 className="text-lg text-gray-400">Optimized Reach</h4>
          <p className="text-sm mt-2">
            CrowdShield is a smart crowd monitoring system built to provide real-time crowd detection, location tracking, and smart alerts for event managers and local authorities.
          </p>
          <Link to="/about"><button className="mt-4 border border-white px-4 py-1 rounded hover:bg-white hover:text-black">Learn more</button></Link>
        </div>
        <img src="/images/3d-box.png" alt="3D Cube" className="max-w-xs" />
      </section>

      <section id="work" className="mt-12 flex flex-col md:flex-row items-center gap-6">
        <img src="/images/crowd.jpg" alt="Crowd image" className="max-w-xs rounded-lg" />
        <div>
          <Link to="/work"><h3 className="text-xl">Work</h3></Link>
          <h4 className="text-lg text-gray-400">Optimized Reach</h4>
          <p className="text-sm mt-2">
            Gain deeper insights into crowd behavior and levels using live data feeds and historical analysis.
          </p>
          <Link to="/work"><button className="mt-4 border border-white px-4 py-1 rounded hover:bg-white hover:text-black">Learn more</button></Link>
        </div>
      </section>
    </div>
  );
}

export default MainPage;