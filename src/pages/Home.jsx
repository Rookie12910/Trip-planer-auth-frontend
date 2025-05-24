import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/home.css';

const Home = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">Trip Planner</div>
        <div className="nav-buttons">
          <button onClick={handleLogout} className="btn-outline">Logout</button>
        </div>
      </nav>
      
      <div className="welcome-section">
        <h1>Welcome, {currentUser?.fullName || currentUser?.email}!</h1>
        <p>Your adventure begins here. Start planning your next trip.</p>
        
        <div className="action-buttons">
          <button className="btn-primary">Create New Trip</button>
          <button className="btn-secondary">View My Trips</button>
        </div>
      </div>
      
      <div className="featured-section">
        <h2>Popular Destinations</h2>
        <div className="destination-cards">
          <div className="destination-card">
            <div className="card-image"></div>
            <h3>Mountain Retreat</h3>
            <p>Experience the serenity of nature</p>
          </div>
          <div className="destination-card">
            <div className="card-image"></div>
            <h3>Beach Paradise</h3>
            <p>Sun, sand, and relaxation</p>
          </div>
          <div className="destination-card">
            <div className="card-image"></div>
            <h3>City Exploration</h3>
            <p>Discover urban adventures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;