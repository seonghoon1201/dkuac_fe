import React from 'react';
import { Link } from 'react-router-dom';
import instagramLogo from '../images/instagram.png';
import githubLogo from '../images/github.png';
import dankookLogo from '../images/dankook.png';
import dkuacLogo from '../images/dkuac.png';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="logo-container">
            <Link to="/">
              <img src={dkuacLogo} alt="DKUAC" className="logo" />
              <span className="logo-text">DKUAC</span>
            </Link>
          </li>
          <li><Link to="/activities" className="nav-link">Activities</Link></li>
          <li><Link to="/people" className="nav-link">People</Link></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
          <div className="spacer"></div>
          <li>
            <a href="https://www.instagram.com/dku_ac" target="_blank" rel="noopener noreferrer">
              <img src={instagramLogo} alt="Instagram" className="icon" />
            </a>
          </li>
          <li>
            <a href="https://github.com/DKUAC" target="_blank" rel="noopener noreferrer">
              <img src={githubLogo} alt="GitHub" className="icon" />
            </a>
          </li>
          <li>
            <a href="https://www.dankook.ac.kr" target="_blank" rel="noopener noreferrer">
              <img src={dankookLogo} alt="Dankook University" className="icon" />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
