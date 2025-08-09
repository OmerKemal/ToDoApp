import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

const Login = () => {
  const [username, setUsername] = useState('');   // username (not email)
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // login supports either object or (username, password)
      const res = await login({ username, password });
      if (res.token) {
        localStorage.setItem('token', res.token);
        navigate('/todos');
      } else {
        alert(res.message || 'Login failed');
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-testid="login-form"
    >
      {/* optional: disable native validation */}
      <h2 data-testid="login-title">Login</h2>

      <input
        type="text"             // <-- text instead of email
        name="username"
        placeholder="Username"
        autoComplete="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        data-testid="login-username"
      />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        data-testid="login-password"
      />
      <br />

      <button type="submit" data-testid="login-submit">Login</button>
    </form>
  );
};

export default Login;