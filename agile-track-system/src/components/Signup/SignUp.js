import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Added error state for validation feedback
  const history = useHistory();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Reset error on submit

    // Basic validation
    if (!name || !email || !password) {
      setError('All fields are required!');
      return;
    }
    if (!email.includes('@')) {
      setError("Email must contain '@'!");
      return;
    }

    try {
      await axios.post('http://localhost:4000/users', {
        name,
        email,
        password,
        role: 'employee'
      });
      history.push('/login');
    } catch (error) {
      setError('Error signing up: ' + error.message); // Show error in UI
      console.error('Error signing up:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>} {/* Added error display with className */}
      <form onSubmit={handleSignUp}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;