import React from "react";
import { Link } from "react-router-dom";
import instagramLogo from "../images/instagram.png";
import githubLogo from "../images/github.png";
import dankookLogo from "../images/dankook.png";
import dkuacLogo from "../images/dkuac.png";
import loginLogo from "../images/login.png";
import logoutIcon from "../images/logout.png"; // logout.png 이미지 import
import userInfoStore from "../stores/userInfoStore";

const Header = () => {
  const styles = {
    header: {
      backgroundColor: "#3a5ba0",
      color: "white",
      padding: "1vw",
    },
    navList: {
      listStyle: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      margin: 0,
      padding: 0,
    },
    leftContainer: {
      display: "flex",
      alignItems: "center",
    },
    logoContainer: {
      marginRight: "2vw",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
    },
    logo: {
      maxWidth: "40px",
      height: "auto",
      marginRight: "1vw",
    },
    logoText: {
      fontSize: "30px",
      fontWeight: "bold",
      color: "white",
      textDecoration: "none",
      lineHeight: "1.2",
      marginTop: "0.5vw",
      marginBottom: "1vw",
      marginRight: "2vw",
    },
    navLink: {
      textDecoration: "none",
      color: "white",
      fontSize: "1rem",
      marginRight: "3vw",
    },
    rightContainer: {
      display: "flex",
      alignItems: "center",
    },
    icon: {
      maxWidth: "30px",
      height: "auto",
      marginLeft: "10px",
      cursor: "pointer",
    },
    logoutButton: {
      border: "none",
      background: "none",
      cursor: "pointer",
      marginLeft: "10px",
    },
  };

  const { isLoggedIn } = userInfoStore();
  const clearUserInfoStorage = userInfoStore.persist.clearStorage;

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
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
              <Link to="/activities" style={styles.navLink}>
                Activities
              </Link>
            </li>
            <li>
              <Link to="/people" style={styles.navLink}>
                People
              </Link>
            </li>
            <li>
              <Link to="/contact" style={styles.navLink}>
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
