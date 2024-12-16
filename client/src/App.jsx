import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VehiclesPage from './pages/VehiclesPage';
import AddPage from './pages/Add';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehiclesPage />} />
        <Route path="/vehicles/add" element={<AddPage />} />
      </Routes>
    </Router>
  );
}

export default App;
