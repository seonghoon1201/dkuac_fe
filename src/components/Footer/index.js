import React from "react";
import styles from "./styles";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <p style={styles.footerText}>© DKUAC. All rights reserved.</p>
        <p style={styles.footerText}>단국대학교 클라이밍 & 등산 동아리 DKUAC</p>
      </div>
    </footer>
  );
}

export default Footer;
