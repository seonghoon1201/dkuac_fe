import React from "react";
import { Link, useLocation } from "react-router-dom";
import instagramLogo from "../../images/instagram.png";
import githubLogo from "../../images/github.png";
import dankookLogo from "../../images/dankook.png";
import dkuacLogo from "../../images/dkuac.png";
import loginLogo from "../../images/login.png";
import logoutIcon from "../../images/logout.png";
import styles from "./styles";
import userInfoStore from "../../stores/userInfoStore";
import { useCookies } from "react-cookie";

const Header = () => {
  const { isLoggedIn } = userInfoStore();
  const clearUserInfoStorage = userInfoStore.persist.clearStorage;
  const [cookies, setCookie, removeCookie] = useCookies(["refreshToken"]);
  const location = useLocation();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    removeCookie("refreshToken");
    clearUserInfoStorage();
    window.location.href = "/";
  };

  return (
    <header style={styles.header}>
      <nav>
        <ul style={styles.navList}>
          <div style={styles.leftContainer}>
            <li>
              <Link to="/" style={styles.logoContainer}>
                <img src={dkuacLogo} alt="DKUAC" style={styles.logo} />
                <span style={styles.logoText}>DKUAC</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/activities" 
                style={{
                  ...styles.navLink, 
                  color: location.pathname === "/activities" ? "black" : "white"
                }}
              >
                Activities
              </Link>
            </li>
            <li>
              <Link 
                to="/equipment" 
                style={{
                  ...styles.navLink, 
                  color: location.pathname === "/equipment" ? "black" : "white"
                }}
              >
                Equipment
              </Link>
            </li>
            <li>
              <Link 
                to="/people" 
                style={{
                  ...styles.navLink, 
                  color: location.pathname === "/people" ? "black" : "white"
                }}
              >
                People
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                style={{
                  ...styles.navLink, 
                  color: location.pathname === "/contact" ? "black" : "white"
                }}
              >
                Contact
              </Link>
            </li>
          </div>
          <div style={styles.rightContainer}>
            <li>
              <a
                href="https://www.instagram.com/dku_ac"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.icon}
              >
                <img src={instagramLogo} alt="Instagram" style={styles.icon} />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/DKUAC"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.icon}
              >
                <img src={githubLogo} alt="GitHub" style={styles.icon} />
              </a>
            </li>
            <li>
              <a
                href="https://www.dankook.ac.kr"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.icon}
              >
                <img
                  src={dankookLogo}
                  alt="Dankook University"
                  style={styles.icon}
                />
              </a>
            </li>
            <li>
              {isLoggedIn ? (
                <img
                  src={logoutIcon}
                  alt="Logout"
                  style={styles.icon}
                  onClick={handleLogout}
                  className="logout-button"
                />
              ) : (
                <Link to="/login" style={styles.icon}>
                  <img src={loginLogo} alt="Login" style={styles.icon} />
                </Link>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
