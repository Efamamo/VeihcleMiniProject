import React, { useState } from 'react';

function Add() {
  const [vehicleName, setVehicleName] = useState('');
  const [status, setStatus] = useState('Available');
  const [statusError, setStatusError] = useState('');
  const [nameError, setNameError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    e;
    try {
      const response = await fetch('http://localhost:5000/vehicles', {
        method: 'POST',
        body: JSON.stringify({
          name: vehicleName,
          status: status,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status == 201) {
        window.location.href = '/';
      }else if (response.status == 400){
        const data = await response.json()
        for ( error in data ){
            if (error == 'status'){
                setStatusError(data[error])
            }else{
                setNameError(data[error])
            }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Vehicle</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="vehicleName"
            className="block text-gray-700 font-medium mb-2"
          >
            Vehicle Name
          </label>
          <input
            type="text"
            id="vehicleName"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            placeholder="Enter vehicle name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          {nameError && <p className="text-sm text-red-500">{nameError}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="status"
            className="block text-gray-700 font-medium mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          {statusError && <p className="text-sm text-red-500">{statusError}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
}

export default Add;
