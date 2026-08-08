import './App.css';
import textlogo from './logo/logo_text.svg';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ProtectedRoutes from './utils/protectedRoutes';
import GuestRoutes from './utils/guestRoutes';
import axios from 'axios';
import api, { setAuthToken } from './api';


// Main Home page
function Home() {
  
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  // Navbar change when observe a div
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
        } else {
          setActive(false); 
        }
      },
      { 
        threshold: 0,
        rootMargin: "-100px 0px 0px 0px"
      }
      
    );
    // Observer
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    // if observed, change design of navigation bar
    <div className="home-container">
      <div className="App">
        <nav className={`NavBar ${active ? 'visible' : ''}`}>
          <div className="logo-container">
            {/* Before Changed logo */}
            <img 
              src={textlogo}
              className={`logo ${active ? 'hide' : 'show'}`} 
              alt="Logo" 
            />


            {active && <span className="logo-text">DoDo!</span>}
          </div>
          <ul>
            {/* Change Login and Start here when hover on */}
            <li><Link to="/login">Login</Link></li>
            <li className="starthere"><Link to="/Signup">Get Started</Link></li>
          </ul>
        </nav>

        {/* Introduction Section */}
        <div className="Intro">
          <p className="smallText">To Do with DoDo!</p>
          <p className="prompt">Plan Better <br></br>Because<br></br>Today Matters</p>
          <Link id="startbtn" to="/Signup">Get Started</Link>
        </div>

        {/* Section where it changes the design of navigation bar when observed */}
        <div className="bodyobserver" ref={ref}>
          <h2></h2>
        </div>

        <div className='bodysection'>
          <h2>Start adding your schedule today</h2>
        </div>

      </div>
    </div>
  );

}

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isInitialised, setIsInitialised] = useState(null);

  useEffect(() => {
      if (accessToken) return;
      // When app is first loaded, Use refresh token inside cookie and get new Access Token
      const silentRefresh = async () => {
          console.log(accessToken);
          try {
              // Call refresh-token router (cookie is automatically delivered)
              const res = await api.post('/auth/refresh-token', {}, {
              withCredentials: true
              });
              
              // Save access token to state memory
              const newAccessToken = res.data.accessToken;
              setAuthToken(newAccessToken);
              setAccessToken(newAccessToken);

              // Get User's data and set User
              const userRes = await axios.get('/api/auth/me', {
              headers: { Authorization: `Bearer ${res.data.accessToken}` }
              });
              setUser(userRes.data);

          } catch (err) {
              console.log("Session expired or Login Required");
              setUser(null);
              setAccessToken(null);
              setIsInitialised(true);

          } finally {
              setIsInitialised(true);
          }
      };
      
      silentRefresh();
  }, []);

  // Setting up the Router
  return (
  <BrowserRouter>
      <Routes>
        {/* Home Path */}
        <Route path="/" element={user ? <Navigate to="/dashboard"/> : <Home />} />

        {/* GUEST ONLY PATH */}
        <Route element={<GuestRoutes user={user} isInitialised={isInitialised}/>}>
          {/* Login Path */}
          <Route path="/login" element={<Login user={user} setUser={setUser} />} />
          {/* Signup Path */}
          <Route path="/signup" element={<Signup />}/>
        </Route>
        
        {/* USER ONLY PATH */}
        <Route element={<ProtectedRoutes user={user} isInitialised={isInitialised}/>}>
          {/* Dashboard Path */}
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />
          <Route path="/profile" element={<Profile setAccessToken={setAccessToken}user={user} setUser={setUser}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
