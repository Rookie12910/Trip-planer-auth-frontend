import React, { useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/home.css';

const Home = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // navigate('/auth/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleLogin = () => {
    navigate('/auth/login');
  }

   const navigateToCreateTrip = () => {
    navigate('/create-trip');
  };
  
  const navigateToMyTrips = () => {
    navigate('/my-trips');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">Trip Planner</div>
        {currentUser ? (
          <div className="nav-buttons">
          <button onClick={handleLogout} className="btn-outline">Logout</button>
        </div>
        ) : (
          <div className="nav-buttons">
          <button onClick={handleLogin} className="btn-outline">Login</button>
        </div>
        )}
        
      </nav>
      
      <div className="welcome-section">
        {          currentUser ? (
          <h1>Welcome, {currentUser.fullName || currentUser.email}!</h1>
        ) : (
          <h1>Welcome!</h1>
        )}
        <p>Your adventure begins here. Start planning your next trip.</p>
        
        <div className="action-buttons">
          <button className="btn-primary" onClick={navigateToCreateTrip}>Create New Trip</button>
          <button className="btn-secondary" onClick={navigateToMyTrips}>View My Trips</button>
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