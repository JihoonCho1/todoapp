import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './signup.css';
import logo from './logo/black_logo_text.svg';
import axios from 'axios';

function Signup() {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // Error Message
    const [errorMessage, setErrorMessage] = useState('');

    // Check if email and passwords aren't empty
    const isInputNotEmpty = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== '';

    // Check if email is right format
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = regex.test(email);

    // Check password Length
    const isLengthPassword = (password.length >= 8);

    // Check if confirmPassword is correct
    const isConfirmed = password == confirmPassword;

    // Check if password has at least one letter and digit
    const hasDigitAndAlpha = /^(?=.*[a-zA-Z])(?=.*\d)/.test(password);

    // All conditions Pass
    const isFormValid = isInputNotEmpty && isEmailValid && isConfirmed && hasDigitAndAlpha;

    // Event handling for Continue Button (Make account)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Sign Up Successfully
        if (isFormValid) {
            try {
                const response = await axios.post('/api/auth/register', {
                    username: email.substring(0, email.indexOf('@')),
                    email: email,
                    password: password
                });

                alert("Registered Successfully");
                console.log(response.data);
            } catch (error) {
                console.error(error);
                setErrorMessage(error.response?.data?.message || 'Registration failed');
            }
        }

        // Errors
        if (!isEmailValid) {
            setErrorMessage("Invalid Email Address");
            console.log("Invalid Email Address");
        } else if (!isLengthPassword) {
            setErrorMessage("Password length must be at least 8");
            console.log("Password shorter than 8", password.length)
        } else if (!isConfirmed) {
            setErrorMessage("Password doesn't match");
            console.log("Confirm Password failed", confirmPassword);
        } else if (!hasDigitAndAlpha) {
            setErrorMessage("Password must contain at least 1 digit and letter");
            console.log("Invalid Password", password);
        }
    }

    return (
        <div className="signup-page-wrapper">
            <div className="head-container">
                <p className="back-to-home"><Link to="/" className="backtohome">BACK</Link></p>
                <p className="login-instead"><Link to="/login" className="logininstead">LOGIN</Link></p>
            </div>
            <div className="gradient-box">

                {/* Sign Up container */}
                <div className="signup-container">
                    <img className="logo" src={logo} />
                    <h2>Get started with DoDo</h2>
                    {/* Login UI code */}

                    {/* Email text + Email input box */}
                    <div className="email-group"> 
                        <p className="signup-text">EMAIL ADDRESS</p>
                        <input type="text" id="email" required placeholder="name@example.com" className="signup-input" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>

                    {/* Password text + Password input box */}
                    <div className="password-group">
                        <p className="signup-text">PASSWORD</p>
                        <input type="password" id="password" required placeholder="password" className="signup-input" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    {/* Confirm password text + Confirm password input box */}
                    <div className="confirm-password-group">
                        <p className="signup-text">CONFIRM PASSWORD</p>
                        <input type="password" id="confirmPassword" required placeholder="type password again" className="signup-input" onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    </div>

                    {/* Error Message */}
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>

                    {/* Sign Up button / Continue */}
                    <div className="signup-button-container">
                        <button id="signup-button" type="submit" disabled={!isInputNotEmpty} onClick={handleSubmit}>
                            <span>CONTINUE</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;