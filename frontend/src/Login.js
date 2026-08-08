import React from 'react';
import { Link, Navigate, useParams, useNavigate  } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './login.css';
import logo from './logo/black_logo_text.svg';
import axios from 'axios';
import api, { setAuthToken } from './api';

function Login({ onClose, user, setUser }) {
  const navigate = useNavigate();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  if (user) {
    return <Navigate to='/dashboard' replace />
  }

  // need to fix this, DONT SAVE TO LOCAL STORAGE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      setAuthToken(res.data.token);
      setUser(res.data);
      setErrorMessage("");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid email or password");
    }
  }
  
  return (
    
    <div className="login-page-wrapper">
      <div className="head-container">
        <p className="back-to-home"><Link to="/" className="backtohome">BACK</Link></p>
        <p className="get-started"><Link to="/signup" className="getstarted">GET STARTED</Link></p>
      </div>
      <div className="gradient-box">
          <div className="login-container">
              <img className="logo" src={logo} />
              <h2>Log into DoDo</h2>
              {/* Login UI code */}
              <div className="email-group">
                <p id="login-text">EMAIL ADDRESS</p>
                <input type="text" required placeholder="name@example.com" className="login-input" onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div className="password-group">
                <p id="login-text">PASSWORD</p>
                <input type="password" required placeholder="password" className="login-input" onChange={(e) => setPassword(e.target.value)}></input>
              </div>
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
              <div className="login-button-container">
                <button id="login-button" type="submit" disabled={!isFormValid} onClick={handleSubmit}>
                  <span>LOG IN</span>
                </button>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Login;