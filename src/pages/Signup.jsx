import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/auth.css';

const Signup = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup, signupWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(email, password, { fullName, username, address });
      navigate('/login');
    } catch (error) {
      setError('Failed to create an account');
      console.error(error);
    }
    
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    try {
      setError('');
      setLoading(true);
      await signupWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Failed to sign up with Google');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card signup-card">
        <h1>Create an Account</h1>
        <p>Join us and start planning your trips</p>
        
        {error && <div className="error-message">{error}</div>}
        
        {!showForm ? (
          <div className="signup-options">
            <button 
              onClick={handleGoogleSignup} 
              className="btn-google" 
              disabled={loading}
            >
              <i className="fab fa-google"></i> Sign up with Google
            </button>
            <div className="divider">
              <span>OR</span>
            </div>
            <button 
              onClick={() => setShowForm(true)} 
              className="btn-secondary"
            >
              Sign up with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="btn-outline"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </button>
            </div>
          </form>
        )}
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;