import React from 'react';
import './mainpage.css'; // Or your preferred CSS module/solution
import { Link } from 'react-router-dom';
// Assuming you have image assets in your public/images folder or imported
import heroImage from '/public/download (1).jpeg'; // Placeholder for the top right image
import mapImage from '/public/download (1).jpeg'; // Placeholder for the map image
import cubeImage from '/public/download (1).jpeg'; // Placeholder for the cube image
import crowdImage from '/public/download (1).jpeg'; // Placeholder for the crowd image

function App() {
  return (
    <div className="app-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          {/* SVG or Image for Crowd Shield logo */}
          Crowd Shield
        </div>
        <nav className="nav-links">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About us</a></li>
            <li><a href="#work">Work</a></li>
          </ul>
        </nav>
        <Link to='/login'><button className="sign-up-button">Login</button></Link>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Crowd Monitoring System</h1>
          <p>Smart Crowd Monitoring</p>
          <button className="get-started-button">Get Started &rarr;</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="City Lights at Night" />
        </div>
      </section>

      {/* Real Time Monitoring Section */}
      <section className="real-time-monitoring-section">
        <div className="content-card"> {/* This card has a distinct background */}
          <div className="card-image">
            <img src={mapImage} alt="Map showing crowd data" />
          </div>
          <div className="card-text">
            <h2>Real Time Monitoring</h2>
            <p>
              Ensure safety at large gatherings with real-time crowd analysis,
              concerted alerts, and instant authority notifications. CrowdShield
              helps manage congestion, reduce risks, and maintains safety using
              cutting-edge technology designed for temples, events, and public
              spaces. Take control before the crowd takes over.
            </p>
          </div>
        </div>
      </section>

      {/* Designed for Public Spaces Section */}
      <section className="designed-for-public-spaces-section">
        <div className="content-text">
          <h2>Designed for public spaces</h2>
          <p>
            Whether it's a busy metro station, a temple during festivities, or a city square,
            CrowdShield adapts seamlessly – using existing smart infrastructure and AI-powered detection.
          </p>
          <a href="#learn-more-public-spaces" className="learn-more-link">Learn More &rarr;</a>
        </div>
        <div className="content-image">
          <img src={cubeImage} alt="Abstract colorful cube" />
        </div>
      </section>

      {/* Optimized Reach Section */}
      <section className="optimized-reach-section">
        <div className="content-card"> {/* This card also has a distinct background */}
          <div className="card-image">
            <img src={crowdImage} alt="Crowd gathered for an event" />
          </div>
          <div className="card-text">
            <h2>Optimized Reach</h2>
            <p>
              Gain clear insights into crowd behavior and trends with simple, visual data – all
              designed to support fast decision-making. With real-time location overview,
              CrowdShield automatically sends alerts to authorities – no delays, no confusion.
            </p>
            <a href="#learn-more-optimized-reach" className="learn-more-link">Learn More &rarr;</a>
          </div>
        </div>
      </section>

      {/* You might want a footer here too */}
      {/* <footer>
        <p>&copy; 2025 Crowd Shield. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

export default App;