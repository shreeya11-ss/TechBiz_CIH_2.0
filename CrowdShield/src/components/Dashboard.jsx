import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import toast, { Toaster } from 'react-hot-toast';
import L from 'leaflet';

// Fix for default Leaflet icon issue with Webpack/CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Assume you have an alert sound at this path in your public folder
const alertSound = new Audio('/public/alert.mp3');

const zones = [
  {
    id: 'zone1',
    name: 'Connaught Place',
    lat: 28.6328,
    lng: 77.2197,
    crowd: 140,
    threshold: 120,
    video: '/public/video1.mp4'
  },
  {
    id: 'zone2',
    name: 'India Gate',
    lat: 28.6129,
    lng: 77.2295,
    crowd: 75,
    threshold: 100,
    video: '/public/video3.mp4'
  },
  {
    id: 'zone3',
    name: 'Rajiv Chowk',
    lat: 28.6361,
    lng: 77.2205,
    crowd: 95,
    threshold: 80,
    video: '/public/video2.mp4'
  }
];

const getRiskLevel = (count, threshold) => {
  if (count > threshold) return { level: 'High', color: 'red' };
  if (count > threshold * 0.75) return { level: 'Moderate', color: 'orange' };
  return { level: 'Safe', color: 'green' };
};

export default function Dashboard() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [panelWidth, setPanelWidth] = useState(450); // Initial width for the panel when open
  const panelRef = useRef(null);
  const alertedZonesRef = useRef(new Set());

  // Effect for handling high-risk alerts
  useEffect(() => {
    zones.forEach((zone) => {
      const { level } = getRiskLevel(zone.crowd, zone.threshold);
      if (level === 'High' && !alertedZonesRef.current.has(zone.id)) {
        const message = `🚨 High Risk at ${zone.name}! Crowd: ${zone.crowd}`;
        toast.error(message);
        alertSound.play();
        console.warn(message);
        alertedZonesRef.current.add(zone.id);
      } else if (level !== 'High') {
        alertedZonesRef.current.delete(zone.id);
      }
    });
  }, []);

  // Function to handle zone clicks
  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
  };

  // Function to close the side panel
  const handleClosePanel = () => {
    setSelectedZone(null);
  };

  // Effect to handle clicks outside the panel to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && selectedZone) {
        if (!event.target.closest('.leaflet-interactive') && !event.target.closest('.leaflet-popup')) {
          setSelectedZone(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedZone]);

  return (
    <div className="relative h-screen w-screen flex overflow-hidden font-sans">
      <Toaster position="top-right" />

      {/* Map Section */}
      <div
        style={{
          width: selectedZone ? `calc(100% - ${panelWidth}px)` : '100%',
          transition: 'width 0.5s ease-in-out',
        }}
        className="h-full z-0"
      >
        <MapContainer
          center={[28.6139, 77.2090]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {zones.map((zone) => {
            const { level, color } = getRiskLevel(zone.crowd, zone.threshold);
            return (
              <Circle
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={300}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.6 }}
                eventHandlers={{ click: () => handleZoneClick(zone) }}
              >
                <Popup>
                  <strong className="text-lg">{zone.name}</strong><br />
                  Crowd: <span className="font-semibold">{zone.crowd}</span><br />
                  Threshold: <span className="font-semibold">{zone.threshold}</span><br />
                  Risk Level: <span className="font-bold" style={{ color }}>{level}</span>
                </Popup>
              </Circle>
            );
          })}
        </MapContainer>
      </div>

      {/* Side Panel */}
      <div
        ref={panelRef}
        style={{
          width: selectedZone ? `${panelWidth}px` : '0px',
          right: selectedZone ? '0' : `-${panelWidth}px`,
          transition: 'width 0.5s ease-in-out, right 0.5s ease-in-out',
          boxShadow: selectedZone ? '-8px 0 15px rgba(0,0,0,0.2)' : 'none', // Stronger, conditional shadow
        }}
        className="h-full bg-gradient-to-br from-blue-50 to-white overflow-y-auto absolute top-0 flex flex-col z-10 text-gray-800"
      >
        {selectedZone && (
          <>
            {/* Resizer Handle */}
            <div
              className="absolute top-0 left-0 w-2 h-full cursor-ew-resize bg-blue-200 hover:bg-blue-300 transition-colors duration-200"
              onMouseDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startWidth = panelWidth;
                const onMouseMove = (moveEvent) => {
                  setPanelWidth(
                    Math.min(
                      Math.max(300, startWidth + (startX - moveEvent.clientX)),
                      window.innerWidth * 0.6
                    )
                  );
                };
                const onMouseUp = () => {
                  window.removeEventListener('mousemove', onMouseMove);
                  window.removeEventListener('mouseup', onMouseUp);
                };
                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
              }}
            />

            {/* Panel Header */}
            <div className="flex justify-between items-center p-6 pb-4 border-b border-blue-100 bg-white bg-opacity-90 sticky top-0 z-20">
              <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight">{selectedZone.name}</h2>
              <button
                onClick={handleClosePanel}
                className="text-4xl text-gray-500 hover:text-red-500 font-light focus:outline-none focus:ring-2 focus:ring-red-200 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
                aria-label="Close panel"
              >
                &times;
              </button>
            </div>

            {/* Panel Content Area */}
            <div className="flex-grow p-6 space-y-6">
              {/* Video Section */}
              <div className="rounded-xl overflow-hidden border-2 border-blue-200 shadow-lg bg-black">
                <video
                  src={selectedZone.video}
                  width="100%"
                  controls
                  autoPlay
                  muted
                  loop
                  className="aspect-video"
                  onError={(e) => console.error("Error loading video:", e)}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Zone Details Card */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                <h3 className="text-xl font-bold text-blue-700 mb-4">Current Status</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-lg font-medium text-gray-600">Crowd Count:</span>
                    <span className="text-2xl font-bold text-blue-600">{selectedZone.crowd}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-lg font-medium text-gray-600">Threshold:</span>
                    <span className="text-2xl font-bold text-gray-500">{selectedZone.threshold}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 last:border-b-0">
                    <span className="text-lg font-medium text-gray-600">Risk Level:</span>
                    <span className={`text-2xl font-bold ${getRiskLevel(selectedZone.crowd, selectedZone.threshold).color === 'red' ? 'text-red-600 animate-pulse' : getRiskLevel(selectedZone.crowd, selectedZone.threshold).color === 'orange' ? 'text-orange-600' : 'text-green-600'}`}>
                      {getRiskLevel(selectedZone.crowd, selectedZone.threshold).level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Information (Placeholder) */}
              <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100 text-sm text-gray-500 italic">
                <h3 className="text-lg font-bold text-gray-700 mb-3">Insights</h3>
                <p>Monitor crowd density in real-time to ensure public safety and efficient management. High-risk alerts indicate immediate attention is required.</p>
              </div>
            </div>

            {/* Close Button at the bottom */}
            <div className="p-6 pt-4 bg-white bg-opacity-90 sticky bottom-0 z-20 border-t border-blue-100">
              <button
                onClick={handleClosePanel}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-75"
              >
                Dismiss Panel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}