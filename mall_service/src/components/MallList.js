import React from 'react';
import './MallList.css';

const MallList = ({ malls, fetchMall, setEditingMall }) => {

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/mallservice/${id}`, { method: 'DELETE' });
      fetchMall(); // Refresh the mall list after deletion
    } catch (error) {
      console.log('Error deleting mall:', error);
    }
  };

  return (
    <div className='mall-list-container'>
      <h2>Mall Records</h2>

      {malls.length === 0 ? (
        <p className='no-data'>No malls available.</p>
      ) : (
        <div className='mall-grid'>
          {malls.map((mall) => (
            <div key={mall.id} className='mall-card'>
              <div className='mall-details'>
                <h3>{mall.mallName}</h3>
                <p><strong>ID :</strong> {mall.id}</p>
                <p><strong>Mall Name :</strong> {mall.mallName}</p>
                <p><strong>Location :</strong> {mall.location}</p>
                <p><strong>Total Shops :</strong> {mall.totalShops}</p>
                <p><strong>Manager Name :</strong> {mall.managerName}</p>
                <p><strong>Contact Number :</strong> {mall.contactNumber}</p>
                <p><strong>Parking Area :</strong> {mall.parkingArea} sq.ft</p>
                <p><strong>Opening Hours :</strong> {mall.openingHours}</p>
              </div>

              <div className='card-buttons'>
                <button className='edit-btn' onClick={() => setEditingMall(mall)}>
                  Edit
                </button>
                <button className='delete-btn' onClick={() => handleDelete(mall.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MallList;
