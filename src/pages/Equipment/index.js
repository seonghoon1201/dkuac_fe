import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles";
import userInfoStore from "../../stores/userInfoStore";

const Equipment = () => {
    const { isLoggedIn } = userInfoStore();
    const [showPopup, setShowPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sizes, setSizes] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/rent`);
          console.log(response);
          setSizes(response.data); // 백엔드에서 받은 데이터를 sizes 상태로 설정
        } catch (error) {
          console.error("데이터를 가져오는 데 실패했습니다:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const handlePopupOpen = () => {
      if (isLoggedIn) {
        setShowPopup(true);
      } else {
        setShowLoginPopup(true);
      }
    };
  
    const handlePopupClose = () => {
      setShowPopup(false);
    };
  
    const handleLoginPopupClose = () => {
      setShowLoginPopup(false);
      navigate("/login");
    };
  
    const handleSizeSelect = (size) => {
      setSelectedSize(size);
      handlePopupClose();
    };
  
    return (
      <div>
        <div style={styles.container}>
          <h1 style={styles.title}>암벽화 보유 현황</h1>
          <p style={styles.description}>
            암벽화는 정사이즈로 신으셔야 편합니다. 암벽화 착화 시 발가락이 조금 구부려져야 맞는 사이즈를 착화하신 것이니 참고 부탁드립니다.
            암벽화가 너무 작으면 발이 많이 아프고 암벽화가 크면 발로 홀드를 잡을 수 없기 때문에 본인에게 맞는 사이즈로 대여 부탁드립니다.
          </p>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>사이즈</th>
                <th style={styles.tableHeader}>총 개수</th>
                <th style={styles.tableHeader}>대여 중</th>
                <th style={styles.tableHeader}>남은 개수</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((item) => (
                <tr key={item.size}>
                  <td style={styles.tableCell}>{item.size}</td>
                  <td style={styles.tableCell}>{item.count}</td>
                  <td style={styles.tableCell}>{item.count - item.rentable}</td>
                  <td style={styles.tableCell}>{item.rentable}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button style={styles.button} onClick={handlePopupOpen}>암벽화 대여하기</button>
          {showPopup && (
            <div style={styles.popupOverlay}>
              <div style={styles.popup}>
                <h2 style={styles.popupTitle}>사이즈 선택</h2>
                <div style={styles.popupContent}>
                  {sizes.map((item) => (
                    <button 
                      key={item.size} 
                      style={styles.sizeButton} 
                      onClick={() => handleSizeSelect(item.size)}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
                <button style={styles.closeButton} onClick={handlePopupClose}>닫기</button>
              </div>
            </div>
          )}
          {showLoginPopup && (
            <div style={styles.popupOverlay}>
              <div style={styles.popup}>
                <h2 style={styles.warnTitle}>로그인이 필요합니다</h2>
                <p style={styles.warnContent}>로그인을 먼저 해주세요!</p>
                <button style={styles.closeButton} onClick={handleLoginPopupClose}>로그인 페이지로 이동</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default Equipment;  