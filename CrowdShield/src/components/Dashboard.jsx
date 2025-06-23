// A React-based prototype for a Crowd Control Dashboard with resizable side panel zone details and video

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import toast, { Toaster } from 'react-hot-toast';

const alertSound = new Audio('/public/alert-sound-87478.mp3');

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
  const [panelWidth, setPanelWidth] = useState(400);
  const panelRef = useRef(null);
  const isResizing = useRef(false);
  const alertedZonesRef = useRef(new Set());

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

  const handleZoneClick = (zone) => {
    setSelectedZone(zone);
  };

  const handleClosePanel = () => {
    setSelectedZone(null);
  };

  const startResize = () => {
    isResizing.current = true;
  };

  const stopResize = () => {
    isResizing.current = false;
  };

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      setPanelWidth(Math.min(Math.max(300, window.innerWidth - e.clientX), 700));
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResize);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen flex overflow-hidden">
      <Toaster position="top-right" />
      <div style={{ width: selectedZone ? `calc(100% - ${panelWidth}px)` : '100%' }} className="transition-all duration-500 h-full">
        <MapContainer center={[28.6139, 77.2090]} zoom={15} scrollWheelZoom={true} style={{ height: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {zones.map((zone) => {
            const { level, color } = getRiskLevel(zone.crowd, zone.threshold);
            return (
              <Circle
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={90}
                pathOptions={{ color, fillColor: color, fillOpacity: 0.8 }}
                eventHandlers={{ click: () => handleZoneClick(zone) }}
              >
                <Popup>
                  <strong>{zone.name}</strong><br />
                  Crowd: {zone.crowd}<br />
                  Threshold: {zone.threshold}<br />
                  Risk Level: {level}
                </Popup>
              </Circle>
            );
          })}
        </MapContainer>
      </div>

      {selectedZone && (
        <div
          ref={panelRef}
          style={{ width: panelWidth }}
          className="h-full bg-white shadow-lg border-l border-gray-300 p-5 overflow-y-auto relative flex flex-col"
        >
          <div
            className="absolute top-0 left-0 w-1 cursor-ew-resize h-full z-10"
            onMouseDown={startResize}
          ></div>
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-xl font-bold">{selectedZone.name}</h2>
            <button
              onClick={handleClosePanel}
              className="text-2xl text-gray-500 hover:text-gray-800 font-bold"
            >
              ×
            </button>
          </div>
          <p className="mb-2"><strong>Crowd:</strong> {selectedZone.crowd}</p>
          <p className="mb-2"><strong>Threshold:</strong> {selectedZone.threshold}</p>
          <p className="mb-4"><strong>Risk Level:</strong> {getRiskLevel(selectedZone.crowd, selectedZone.threshold).level}</p>
          <video
            src={selectedZone.video}
            width="100%"
            controls
            autoPlay
            muted
            loop
            className="rounded-lg border border-gray-300 shadow-md"
          />
          <div className="mt-4 text-center">
            <button
              onClick={handleClosePanel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
            >
              Close Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
