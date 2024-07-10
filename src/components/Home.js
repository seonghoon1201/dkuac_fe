import React from "react";
import teddyBear from "../images/teddy_bear.png";
import userInfoStore from "../stores/userInfoStore";

function Home() {
  const handleButtonClick = () => {
    window.location.href = "https://naver.me/5ch4sm44";
  };

  const styles = {
    home: {
      textAlign: "center",
      backgroundColor: "#3a5ba0",
      color: "white",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2vw", // 비율에 맞춘 padding
    },
    teddyBear: {
      maxWidth: "40vw", // 비율에 맞춘 width
      height: "auto",
    },
    textContainer: {
      marginLeft: "2vw", // 비율에 맞춘 margin
      textAlign: "center",
    },
    h1: {
      margin: 0,
      fontSize: "4vw", // 비율에 맞춘 font-size
    },
    h2: {
      margin: 0,
      fontSize: "4vw", // 비율에 맞춘 font-size
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
    },
    since: {
      fontSize: "1.5vw", // 비율에 맞춘 font-size
      marginLeft: "1vw", // 비율에 맞춘 margin
    },
    button: {
      backgroundColor: "white",
      color: "#3a5ba0",
      border: "none",
      padding: "1vw 2vw", // 비율에 맞춘 padding
      fontSize: "1.5vw", // 비율에 맞춘 font-size
      fontWeight: "800",
      cursor: "pointer",
      marginTop: "2vw", // 비율에 맞춘 margin
      borderRadius: "2vw", // 비율에 맞춘 border-radius
    },
  };

  return (
    <div style={styles.home}>
      <img src={teddyBear} alt="Teddy Bear" style={styles.teddyBear} />
      <div style={styles.textContainer}>
        <h1 style={styles.h1}>단국대학교</h1>
        <h1 style={styles.h1}>클라이밍 & 등산 동아리</h1>
        <h2 style={styles.h2}>
          DKUAC <span style={styles.since}>since 1975</span>
        </h2>
        <button style={styles.button} onClick={handleButtonClick}>
          지원하기
        </button>
      </div>
    </div>
  );
}

export default Home;
