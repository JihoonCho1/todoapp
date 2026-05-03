import React from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import logo from './black_logo_text.svg';

function Login() {
  return (
    <div className="gradient-box">
        <div className="login-container">
            <img className="logo" src={logo} />
            <h2>Login</h2>
            {/* Login UI code */}
            <p id="emailtext">Email Address:</p>
            <input type="text" placeholder="Email Address" className="login-input"></input>
            <p id="emailtext">Password:</p>
            <input type="password" placeholder="Password" className="login-input"></input>

        </div>
    </div>
  );
}

export default Login;