import React from 'react';
import { Link } from 'react-router-dom';

function Vehicles({ vehicles, setVehicles }) {
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/vehicles/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: newStatus,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('changing');
        setVehicles((prevVehicles) =>
          prevVehicles.map((vehicle) =>
            vehicle._id === id ? { ...vehicle, status: newStatus } : vehicle
          )
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-6 w-1/2">
      {/* Add New Button */}
      <div className="mb-4 ml-auto">
        <Link
          to="/vehicles/add"
          className="inline-block px-4 py-2 bg-blue-500 text-white font-medium text-sm rounded hover:bg-blue-600"
        >
          Add New
        </Link>
      </div>

      {/* Vehicles Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Last Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr
                key={vehicle._id}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-gray-100 transition`}
              >
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {vehicle.name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  <select
                    value={vehicle.status}
                    onChange={(e) =>
                      handleStatusChange(vehicle._id, e.target.value)
                    }
                    className="p-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
                  >
                    <option value="Available">Available</option>
                    <option value="Pending">Pending</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {vehicle.updatedAt.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vehicles;
