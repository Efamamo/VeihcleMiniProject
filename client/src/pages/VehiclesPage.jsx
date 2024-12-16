import { useState } from 'react';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import Vehicles from '../components/Vehicles';
import { useEffect } from 'react';

function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function fetchVehicles() {
      const response = await fetch('http://localhost:5000/vehicles');

      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
        setVehicles(data);
      }
    }
    fetchVehicles();
  }, []);
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full">
        <Nav />
        <Vehicles vehicles={vehicles} setVehicles={setVehicles} />
      </div>
    </div>
  );
}

export default VehiclesPage;
