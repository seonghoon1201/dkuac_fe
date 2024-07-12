import React from "react";
import teddyBear from "../images/teddy_bear.png";
import explain1 from "../images/explain_1.png";
import explain2 from "../images/explain_2.png";
import userInfoStore from "../stores/userInfoStore";

function Home() {
  const handleButtonClick = () => {
    window.location.href = "https://naver.me/5ch4sm44";
  };

  const styles = {
    home: {
      textAlign: "center",
      color: "white",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2vw",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#3a5ba0",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    teddyBear: {
      maxWidth: "40vw",
      height: "auto",
    },
    textContainer: {
      marginLeft: "2vw",
      textAlign: "center",
    },
    h1: {
      margin: 0,
      fontSize: "4vw",
    },
    h2: {
      margin: 0,
      fontSize: "4vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
    },
    since: {
      fontSize: "1.5vw",
      marginLeft: "1vw",
    },
    button: {
      backgroundColor: "white",
      color: "#3a5ba0",
      border: "none",
      padding: "1vw 2vw",
      fontSize: "1.5vw",
      fontWeight: "800",
      cursor: "pointer",
      marginTop: "2vw",
      borderRadius: "2vw",
    },
    imageSection: {
      backgroundColor: "white",
      color: "#3a5ba0",
      textAlign: "center",
      padding: "2vw",
      marginTop: "4vw",
      width: "100%", // Ensure the section takes the full width of its container
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    imagesContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    explainImage: {
      maxWidth: "40vw",
      height: "auto",
      margin: "1vw",
    },
    sectionTitle: {
      fontSize: "3vw",
      margin: "2vw 0",
      alignSelf: "flex-start",
      fontWeight: "600",
    },
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <div style={styles.home}>
        <div style={styles.content}>
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
      </div>
      <div style={styles.imageSection}>
        <div style={styles.sectionTitle}>저희 동아리는요</div>
        <div style={styles.imagesContainer}>
          <img src={explain1} alt="Explain 1" style={styles.explainImage} />
          <img src={explain2} alt="Explain 2" style={styles.explainImage} />
        </div>
      </div>
    </div>
  );
}

export default Home;
