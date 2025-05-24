import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (error) {
      setError('Failed to login. Please check your credentials.');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
    <header className="auth-header">
        <div className="logo">Trip Planner</div>
      </header>
    <div className="auth-container">
      <div className="auth-card">
         <button 
            className="auth-close-btn" 
            onClick={() => navigate('/')}
            aria-label="Close"
          >
            ×
          </button>
        <h1>Welcome Back</h1>
        <p>Login to plan your next adventure</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/auth/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;