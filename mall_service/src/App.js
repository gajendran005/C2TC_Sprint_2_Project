import './App.css';
import { useEffect, useState } from 'react';
import MallForm from './components/MallForm';
import MallList from './components/MallList';

const App = () => {
  const [malls, setMalls] = useState([]);
  const [editingMall, setEditingMall] = useState(null);

  // Fetch mall data when component mounts
  useEffect(() => {
    fetchMall();
  }, []);

  // Function to get all mall records
  const fetchMall = async () => {
    try {
      const response = await fetch('http://localhost:8080/mallservice');
      const data = await response.json();
      setMalls(data);
    } catch (error) {
      console.log('Error fetching mall details:', error);
    }
  };

  return (
    <div className="App">
      <h1>Mall Management System</h1>

      <div className="main-content">
        {/* Left Section – Mall Form */}
        <div className="left-section">
          <MallForm
            fetchMall={fetchMall}
            editingMall={editingMall}
            setEditingMall={setEditingMall}
          />
        </div>

        {/* Right Section – Mall List */}
        <div className="right-section">
          <MallList
            malls={malls}
            fetchMall={fetchMall}
            setEditingMall={setEditingMall}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
