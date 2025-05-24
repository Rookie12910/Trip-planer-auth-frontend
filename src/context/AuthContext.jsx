import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock users database
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { email: 'demo@example.com', password: 'password123', fullName: 'Demo User', username: 'demouser', address: 'Demo Address' }
    ];
  });

  // Sign up with email and password
  const signup = (email, password, userData) => {
    return new Promise((resolve, reject) => {
      const userExists = users.find(user => user.email === email);
      
      if (userExists) {
        reject(new Error('User already exists'));
        return;
      }
      
      const newUser = { email, password, ...userData };
      const updatedUsers = [...users, newUser];
      
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      resolve(newUser);
    });
  };

  // Login with email and password
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = users.find(user => user.email === email && user.password === password);
      
      if (!user) {
        reject(new Error('Invalid credentials'));
        return;
      }
      
      const userInfo = { ...user, password: undefined }; // Remove password from user object
      setCurrentUser(userInfo);
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      resolve(userInfo);
    });
  };

  // Sign up/login with Google (mocked)
  const signupWithGoogle = () => {
    return new Promise((resolve) => {
      const googleUser = {
        email: 'google@example.com',
        fullName: 'Google User',
        username: 'googleuser',
      };
      
      setCurrentUser(googleUser);
      localStorage.setItem('currentUser', JSON.stringify(googleUser));
      resolve(googleUser);
    });
  };

  // Logout
  const logout = () => {
    return new Promise((resolve) => {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
      resolve();
    });
  };

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    signupWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;