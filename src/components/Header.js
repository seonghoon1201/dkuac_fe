import React from 'react';
import { Link } from 'react-router-dom';
import instagramLogo from '../images/instagram.png';
import githubLogo from '../images/github.png';
import dankookLogo from '../images/dankook.png';
import dkuacLogo from '../images/dkuac.png';
import loginLogo from '../images/login.png'; // login.png 이미지 import

const Header = () => {
  const styles = {
    header: {
      backgroundColor: '#3a5ba0',
      color: 'white',
      padding: '2.5vw',
    },
    navList: {
      listStyle: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: 0,
      padding: 0,
    },
    leftContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    logoContainer: {
      marginRight: '2vw', // 왼쪽 메뉴들 사이의 간격
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
    },
    logo: {
      maxWidth: '6vw',
      height: 'auto',
      marginRight: '1vw',
    },
    logoText: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: 'white',
      textDecoration: 'none',
      lineHeight: '1.2', // DKUAC 글자와 로고의 높이를 맞추기 위해 조정
      marginTop: '0.5vw', // 로고 텍스트의 상단 여백 조정
      marginBottom: '1vw',
      marginRight: '2vw',
    },
    navLink: {
      textDecoration: 'none',
      color: 'white',
      fontSize: '1rem',
      marginRight: '3vw', // 왼쪽 메뉴들 사이의 간격
    },
    rightContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      maxWidth: '30px',
      height: 'auto',
      marginLeft: '10px', // 오른쪽 아이콘들 사이의 간격
    },
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
            <li><Link to="/activities" style={styles.navLink}>Activities</Link></li>
            <li><Link to="/people" style={styles.navLink}>People</Link></li>
            <li><Link to="/contact" style={styles.navLink}>Contact</Link></li>
          </div>
          <div style={styles.rightContainer}>
            <li>
              <a href="https://www.instagram.com/dku_ac" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <img src={instagramLogo} alt="Instagram" style={styles.icon} />
              </a>
            </li>
            <li>
              <a href="https://github.com/DKUAC" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <img src={githubLogo} alt="GitHub" style={styles.icon} />
              </a>
            </li>
            <li>
              <a href="https://www.dankook.ac.kr" target="_blank" rel="noopener noreferrer" style={styles.icon}>
                <img src={dankookLogo} alt="Dankook University" style={styles.icon} />
              </a>
            </li>
            <li>
              <Link to="/login" style={styles.icon}>
                <img src={loginLogo} alt="Login" style={styles.icon} />
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
