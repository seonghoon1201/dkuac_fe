import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userInfoStore from "../../stores/userInfoStore";
import { basicAxios, authAxios } from "../../api/axios";
import axios from "axios";
import styles from "./styles";
import logoutUtil from "../../utils/logout-util";

const Equipment = () => {
  const clearUserInfoStorage = userInfoStore.persist.clearStorage;
  const { isLoggedIn, userId } = userInfoStore();
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [showRentPopup, setShowRentPopup] = useState(false);
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const [myRentSize, setMyRentSize] = useState(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await basicAxios.get(`/rent`);
      setSizes(response.data); // 백엔드에서 받은 데이터를 sizes 상태로 설정
    } catch (error) {
      console.error("데이터를 가져오는 데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePopupOpen = async (type) => {
    if (isLoggedIn) {
      setShowPopup(true);
      if (type === "rent") {
        setShowRentPopup(true);
        setShowReturnPopup(false);
      } else {
        try {
          const response = await authAxios.get(`/rent/my-rent-record`);
          setMyRentSize(response.data.data.size); // 사용자 대여 기록에서 사이즈 설정
        } catch (error) {
          console.error("사용자 대여 기록을 가져오는 데 실패했습니다:", error);
          logoutUtil();
          window.location.href = "/login";
        }
        setShowRentPopup(false);
        setShowReturnPopup(true);
      }
    } else {
      setShowLoginPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setShowRentPopup(false);
    setShowReturnPopup(false);
  };

  const handleLoginPopupClose = () => {
    setShowLoginPopup(false);
    navigate("/login");
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleRent = async () => {
    if (selectedSize) {
      try {
        const res = await axios.post(
          `https://dkuac.store/rent`,
          {
            size: selectedSize,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(res.data);
        alert("대여가 완료되었습니다!");
        handlePopupClose();
        fetchData();
      } catch (error) {
        console.error("대여 요청에 실패했습니다:", error);
        alert(error.response.data.message);
        // logoutUtil();
      }
    } else {
      alert("사이즈를 선택해주세요.");
    }
  };

  const handleReturn = async () => {
    if (myRentSize) {
      try {
        const response = await authAxios.post(`/rent/return`, {
          size: myRentSize,
        });
        console.log(response.data);
        alert("반납이 완료되었습니다!");
        handlePopupClose();
        fetchData();
      } catch (error) {
        console.error("반납 요청에 실패했습니다:", error);
        alert("반납 요청에 실패했습니다. 다시 시도해주세요.");
        // logoutUtil();
      }
    } else {
      alert("대여한 암벽화가 없습니다.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>암벽화 보유 현황</h1>
      <p style={styles.description}>
        암벽화는 정사이즈로 신으셔야 편합니다. <br />
        암벽화 착화 시 발가락이 조금 구부려져야 맞는 사이즈를 착화하신 것이니
        참고 부탁드립니다.
        <br />
        암벽화가 너무 작으면 발이 많이 아프고 암벽화가 크면 발로 홀드를 잡을 수
        없기 때문에 본인에게 맞는 사이즈로 대여 부탁드립니다.
      </p>
      <div style={styles.legend}>
        <div>
          <span style={styles.square("red")} /> = 남은 수량 0
        </div>
        <div>
          <span style={styles.square("yellow")} /> = 남은 수량 1
        </div>
        <div>
          <span style={styles.square("#90ee90")} /> = 남은 수량 2개 이상
        </div>
      </div>
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
              <td style={styles.sizeCell(item.rentable)}>{item.size}</td>
              <td style={styles.tableCell}>{item.count}</td>
              <td style={styles.tableCell}>{item.count - item.rentable}</td>
              <td style={styles.sizeCell(item.rentable)}>{item.rentable}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => handlePopupOpen("rent")}>
          암벽화 대여하기
        </button>
        <button
          style={{ ...styles.button, backgroundColor: "red" }}
          onClick={() => handlePopupOpen("return")}
        >
          암벽화 반납하기
        </button>
      </div>
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            {showRentPopup && (
              <>
                <h2 style={styles.popupTitle}>사이즈 선택</h2>
                <p style={styles.noticeText}>
                  암벽화 대여하신 분들은 모두 이번 주 금요일까지 암벽화 반납
                  부탁드립니다.
                </p>
                <div style={styles.popupContent}>
                  {sizes.map((item) => (
                    <button
                      key={item.size}
                      style={{
                        ...styles.sizeButton,
                        backgroundColor:
                          selectedSize === item.size
                            ? "blue"
                            : item.rentable <= 0
                            ? "gray"
                            : "initial",
                        color:
                          selectedSize === item.size
                            ? "white"
                            : item.rentable <= 0
                            ? "lightgray"
                            : "initial",
                        cursor: item.rentable <= 0 ? "not-allowed" : "pointer",
                      }}
                      onClick={() => handleSizeSelect(item.size)}
                      disabled={item.rentable <= 0} // 대여할 수 있는 암벽화가 없을 때 버튼 비활성화
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
                <div style={styles.buttonContainer}>
                  <button style={styles.rentButton} onClick={handleRent}>
                    대여하기
                  </button>
                  <button style={styles.closeButton} onClick={handlePopupClose}>
                    닫기
                  </button>
                </div>
              </>
            )}
            {showReturnPopup && (
              <>
                {myRentSize ? (
                  <p style={styles.returnMessage}>
                    반납할 암벽화 사이즈: {myRentSize}
                    <br />
                    <br />
                    암벽화를 반납하시겠습니까?
                  </p>
                ) : (
                  <p style={styles.returnMessage}>
                    대여하신 암벽화가 없습니다.
                  </p>
                )}
                <div style={styles.buttonContainer}>
                  <button style={styles.returnButton} onClick={handleReturn}>
                    반납하기
                  </button>
                  <button style={styles.closeButton} onClick={handlePopupClose}>
                    닫기
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showLoginPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2 style={styles.warnTitle}>로그인이 필요합니다</h2>
            <p style={styles.warnContent}>로그인을 먼저 해주세요!</p>
            <button style={styles.closeButton} onClick={handleLoginPopupClose}>
              로그인 페이지로 이동
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;
