import './App.css';
import textlogo from './logo_text.svg';
import justlogo from './logo_dodo.svg';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import Login from './Login';

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

            {/* Changed Logo */}
            <img
              src={justlogo}
              className={`logo ${active ? 'show' : 'hide'}`}
              alt="justLogo"
            />

            {active && <span className="logo-text">DoDo!</span>}
          </div>
          <ul>
            {/* Change Login and Start here when hover on */}
            <li><Link to="/login">Login</Link></li>
            <li className="starthere"><a href="#signup">Get Started</a></li>
          </ul>
        </nav>

        {/* Introduction Section */}
        <div className="Intro">
          <p className="smallText">To Do with DoDo!</p>
          <p className="prompt">Plan Better <br></br>Because<br></br>Today Matters</p>
          <button id="startbtn">Get Started</button>
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
  // Setting up the Router
  return (
  <BrowserRouter>
      <Routes>
        {/* Home Path */}
        <Route path="/" element={<Home />} />
        {/* Login Path */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
