import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './signup.css';
import logo from './logo/black_logo_text.svg';

function Signup() {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const isFormValid = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim !== '' && password == confirmPassword;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log("Login attempt: ", email, password);
        }
    }


    return (
        <div className="signup-page-wrapper">
            <div className="head-container">
                <p className="back-to-home"><Link to="/" className="backtohome">BACK</Link></p>
                <p className="login-instead"><Link to="/" className="logininstead">LOGIN</Link></p>
            </div>
            <div className="gradient-box">
                <div className="signup-container">
                    <img className="logo" src={logo} />
                    <h2>Get started with DoDo</h2>
                    {/* Login UI code */}
                    <div className="email-group">
                        <p className="signup-text">EMAIL ADDRESS</p>
                        <input type="text" required placeholder="name@example.com" className="signup-input" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="password-group">
                        <p className="signup-text">PASSWORD</p>
                        <input type="password" required placeholder="password" className="signup-input" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="confirm-password-group">
                        <p className="signup-text">CONFIRM PASSWORD</p>
                        <input type="password" required placeholder="type password again" className="signup-input" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    </div>
                    <div className="signup-button-container">
                        <button id="signup-button" type="submit" disabled={!isFormValid} onClick={handleSubmit}>
                            <span>CONTINUE</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;