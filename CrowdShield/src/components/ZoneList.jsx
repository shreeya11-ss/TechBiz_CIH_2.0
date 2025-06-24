import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseconfig';

const ZoneList = () => {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "zones"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setZones(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Crowd Zones</h2>
      <ul>
        {zones.map((zone) => (
          <li key={zone.id} className="mb-2 p-2 border rounded shadow">
            <p><strong>Name:</strong> {zone.name}</p>
            <p><strong>Crowd:</strong> {zone.crowd}</p>
            <p><strong>Threshold:</strong> {zone.threshold}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ZoneList;
