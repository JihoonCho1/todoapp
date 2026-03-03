import './App.css';
import whitelogo from './whitelogo.png';
import React, { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <div className={active ? "visible" : "NavBar"}>
        <img className="logo" src={whitelogo} alt="logo"/>
        <ul>
          <li><a href="index.html">Login</a></li>
          <li><a className="starthere" href="index.html">Get Started</a></li>
        </ul>
      </div>

      <div className="Intro">
        <p className="smallText">To Do with DoDo!</p>
        <p className="prompt">Plan Better <br></br>Because<br></br>Today Matters</p>
        <button id="startbtn">Get Started</button>
      </div>

      <div className="bodyobserver" ref={ref}>
        <p>Maintainenace</p>
      </div>

    </div>
  );

}

export default App;
