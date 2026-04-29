import './App.css';
import whitelogo from './logo_text.svg';
import justlogo from './logo_dodo.svg';

import React, { useEffect, useRef, useState } from 'react';

// Main Home page
function App() {
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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <nav className={`NavBar ${active ? 'visible' : ''}`}>
        <img 
          src={active ? justlogo : whitelogo} 
          className="logo" 
          alt="Logo" 
        />
        <ul>

          <li><a href="#login">Login</a></li>
          <li className="starthere"><a href="#signup">Get Started</a></li>
        </ul>
      </nav>

      <div className="Intro">
        <p className="smallText">To Do with DoDo!</p>
        <p className="prompt">Plan Better <br></br>Because<br></br>Today Matters</p>
        <button id="startbtn">Get Started</button>
      </div>

      <div className="bodyobserver" ref={ref}>
        <h2></h2>
      </div>

      <div className='bodysection'>
        <h2>Start adding your schedule today</h2>
      </div>

    </div>
  );

}


//Signup Page
function Login() {

}


export default App;
