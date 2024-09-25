import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import instagramLogo from "../../images/instagram.png";
import githubLogo from "../../images/github.png";
import dankookLogo from "../../images/dankook.png";
import dkuacLogo from "../../images/dkuac.png";
import loginLogo from "../../images/login.png";
import logoutIcon from "../../images/logout.png";
import hamburgerIcon from "../../images/hamburger.png"; // 햄버거 아이콘 이미지 추가
import styles from "./styles";
import userInfoStore from "../../stores/userInfoStore";
import { basicAxios } from "../../api/axios";

const Header = () => {
  const { isLoggedIn } = userInfoStore();
  const clearUserInfoStorage = userInfoStore.persist.clearStorage;
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false); // 메뉴 상태 추가

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("로그아웃 요청");
    basicAxios
      .post("/auth/logout")
      .then((res) => {
        console.log(res);
        localStorage.removeItem("accessToken");
        clearUserInfoStorage();
      })
      .catch((e) => {
        console.error(e);
        alert("로그아웃 과정에서 에러가 발생했습니다.");
      })
      .finally(() => {
        window.location.href = "/";
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen); // 메뉴 열기/닫기
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
            <li className="desktop-menu">
              <Link
                to="/activities"
                style={{
                  ...styles.navLink,
                  color:
                    location.pathname === "/activities" ? "black" : "white",
                }}
              >
                Activities
              </Link>
            </li>
            <li className="desktop-menu">
              <Link
                to="/equipment"
                style={{
                  ...styles.navLink,
                  color:
                    location.pathname === "/equipment" ? "black" : "white",
                }}
              >
                Equipment
              </Link>
            </li>
            <li className="desktop-menu">
              <Link
                to="/people"
                style={{
                  ...styles.navLink,
                  color: location.pathname === "/people" ? "black" : "white",
                }}
              >
                People
              </Link>
            </li>
            <li className="desktop-menu">
              <Link
                to="/contact"
                style={{
                  ...styles.navLink,
                  color: location.pathname === "/contact" ? "black" : "white",
                }}
              >
                Contact
              </Link>
            </li>
          </div>

          {/* 노트북에서는 보이는 아이콘들 */}
          <div style={styles.rightContainer}>
            <li className="desktop-menu">
              <a
                href="https://www.instagram.com/dku_ac"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.icon}
              >
                <img src={instagramLogo} alt="Instagram" style={styles.icon} />
              </a>
            </li>
            <li className="desktop-menu">
              <a
                href="https://github.com/DKUAC"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.icon}
              >
                <img src={githubLogo} alt="GitHub" style={styles.icon} />
              </a>
            </li>
            <li className="desktop-menu">
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
            <li className="desktop-menu">
              {isLoggedIn ? (
                <img
                  src={logoutIcon}
                  alt="Logout"
                  style={styles.icon}
                  onClick={handleLogout}
                />
              ) : (
                <Link to="/login" style={styles.icon}>
                  <img src={loginLogo} alt="Login" style={styles.icon} />
                </Link>
              )}
            </li>
          </div>

          {/* 햄버거 메뉴 아이콘 */}
          <div style={styles.hamburgerIconContainer} onClick={toggleMenu}>
            <img src={hamburgerIcon} alt="Menu" style={styles.hamburgerIcon} />
          </div>

          {/* 메뉴가 열렸을 때 보이는 모바일 메뉴 */}
          {isMenuOpen && (
            <div style={styles.mobileMenu}>
              <li>
                <Link
                  to="/activities"
                  style={{
                    ...styles.navLink,
                    color:
                      location.pathname === "/activities" ? "black" : "white",
                  }}
                  onClick={toggleMenu} // 메뉴 클릭 시 닫기
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  to="/equipment"
                  style={{
                    ...styles.navLink,
                    color:
                      location.pathname === "/equipment" ? "black" : "white",
                  }}
                  onClick={toggleMenu}
                >
                  Equipment
                </Link>
              </li>
              <li>
                <Link
                  to="/people"
                  style={{
                    ...styles.navLink,
                    color: location.pathname === "/people" ? "black" : "white",
                  }}
                  onClick={toggleMenu}
                >
                  People
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{
                    ...styles.navLink,
                    color:
                      location.pathname === "/contact" ? "black" : "white",
                  }}
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <img
                    src={logoutIcon}
                    alt="Logout"
                    style={styles.icon}
                    onClick={handleLogout}
                  />
                ) : (
                  <Link to="/login" style={styles.icon}>
                    <img src={loginLogo} alt="Login" style={styles.icon} />
                  </Link>
                )}
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
