import React from 'react';
import './Home.css';
import teddyBear from '../images/teddy_bear.png';

function Home() {
  const handleButtonClick = () => {
    window.location.href = 'https://naver.me/5ch4sm44';
  };

  return (
    <div className="home">
      <img src={teddyBear} alt="Teddy Bear" className="teddy-bear" />
      <div className="text-container">
        <h1>단국대학교</h1>
        <h1>클라이밍 & 등산 동아리</h1>
        <h2>DKUAC <span className="since">since 1975</span></h2>
        <button onClick={handleButtonClick}>지원하기</button>
      </div>
    </div>
  );
}

export default Home;
