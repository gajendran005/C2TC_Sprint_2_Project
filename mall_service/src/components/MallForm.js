import React, { useEffect, useState } from 'react';
import './MallForm.css';

const MallForm = ({ fetchMall, editingMall, setEditingMall }) => {

  const [id, setId] = useState('');
  const [mallName, setMallName] = useState('');
  const [location, setLocation] = useState('');
  const [totalShops, setTotalShops] = useState('');
  const [managerName, setManagerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [parkingArea, setParkingArea] = useState('');
  const [openingHours, setOpeningHours] = useState('');

  useEffect(() => {
    if (editingMall) {
      setId(editingMall.id);
      setMallName(editingMall.mallName);
      setLocation(editingMall.location);
      setTotalShops(editingMall.totalShops);
      setManagerName(editingMall.managerName);
      setContactNumber(editingMall.contactNumber);
      setParkingArea(editingMall.parkingArea);
      setOpeningHours(editingMall.openingHours);
    } else {
      setId('');
      setMallName('');
      setLocation('');
      setTotalShops('');
      setManagerName('');
      setContactNumber('');
      setParkingArea('');
      setOpeningHours('');
    }
  }, [editingMall]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mall = {
      mallName,
      location,
      totalShops,
      managerName,
      contactNumber,
      parkingArea,
      openingHours,
    };

    try {
      if (editingMall) {
        await fetch(`http://localhost:8080/mallservice/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mall),
        });
      } else {
        await fetch('http://localhost:8080/mallservice', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mall),
        });
      }

      fetchMall();
      setEditingMall(null);
      setId('');
      setMallName('');
      setLocation('');
      setTotalShops('');
      setManagerName('');
      setContactNumber('');
      setParkingArea('');
      setOpeningHours('');

    } catch (error) {
      console.log("Error saving mall details:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>{editingMall ? 'Edit Mall Details' : 'Add Mall'}</h2>
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={mallName}
          onChange={(e) => setMallName(e.target.value)}
          placeholder="Enter Mall Name"
          required
          className="input-field"
        />

        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
          required
          className="input-field"
        />

        <input
          type="number"
          value={totalShops}
          onChange={(e) => setTotalShops(e.target.value)}
          placeholder="Enter Total Shops"
          required
          className="input-field"
        />

        <input
          type="text"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
          placeholder="Enter Manager Name"
          required
          className="input-field"
        />

        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Enter Contact Number"
          required
          className="input-field"
        />

        <input
          type="number"
          value={parkingArea}
          onChange={(e) => setParkingArea(e.target.value)}
          placeholder="Enter Parking Area (sq.ft)"
          required
          className="input-field"
        />

        <input
          type="text"
          value={openingHours}
          onChange={(e) => setOpeningHours(e.target.value)}
          placeholder="Enter Opening Hours (e.g., 10 AM - 10 PM)"
          required
          className="input-field"
        />

        <div>
          <button type="submit" className="input-field">
            {editingMall ? 'Update Mall' : 'Add Mall'}
          </button>
        </div>

      </form>
    </div>
  );
};

export default MallForm;
