import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Added error state for validation feedback
  const history = useHistory();
  const { login } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error on submit

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required!');
      return;
    }
    if (!email.includes('@')) {
      setError("Email must contain '@'!");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/users?email=${email}&password=${password}`);
      if (response.data.length > 0) {
        const user = response.data[0];
        login(user);
        if (user.role === 'admin') {
          history.push('/');
        } else {
          history.push('/profiles');
        }
      } else {
        setError('Invalid email or password'); // Replaced alert with state
      }
    } catch (error) {
      setError('Error logging in: ' + error.message); // Show error in UI
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {/* Added error display with className */}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <button onClick={() => history.push('/signup')}>Sign Up</button>

    </div>
  );
};

export default Login;