import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

export default function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url('../image/homemale.jpg')`, // Reference the image directly from the public folder
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className='container-fluid' style={{ ...backgroundImageStyle, minHeight: '100vh', padding: '20px' }}>
      <div className="text-center">
        <h1 style={{ color: '#FFFFFF' }}>Welcome to Our Swimming Club!</h1>
        <p style={{ color: '#FFFFFF' }}>We offer top-notch swimming facilities for all ages.</p>
        <button className="Join-Now" onClick={() => window.location.href = "http://localhost:3000/add"} style={{ backgroundColor: '#006CA5', color: '#FFFFFF', padding: '10px 20px', border: 'none', borderRadius: '5px' }}>Join Now</button>
      </div>
      <nav className="navbar navbar-expand navbar-light bg-light fixed-bottom">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
