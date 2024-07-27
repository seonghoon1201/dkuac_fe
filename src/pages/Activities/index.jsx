import React, { useState, useRef, useEffect } from "react";
import "react-calendar/dist/Calendar.css"; // 캘린더 기본 스타일 가져오기
import activity1 from "../../images/activity1.png";
import activity2 from "../../images/activity2.png";
import activity3 from "../../images/activity3.png";
import styles from "./styles";
import { basicAxios, authAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function Activities() {
  const [selectedTerm, setSelectedTerm] = useState("2024-1");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dayEvents, setDayEvents] = useState([]); // 선택된 날짜의 일정 상태
  const activityRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  const fetchEvents = async () => {
    try {
      const response = await basicAxios.get("/schedule/day", {
        date: selectedDate.toISOString().split("T")[0],
      });
      setDayEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
      setDayEvents([]); // 일정이 없는 경우 dayEvents를 빈 배열로 설정
    }
  };

  const terms = ["2023-1", "2023-2", "2024-1"];

  const activities = {
    "2023-1": [
      { image: activity1, name: "외벽" },
      { image: activity2, name: "등산" },
      { image: activity3, name: "MT" },
    ],
    "2023-2": [
      { image: activity2, name: "등산" },
      { image: activity3, name: "MT" },
      { image: activity1, name: "외벽" },
    ],
    "2024-1": [
      { image: activity3, name: "MT" },
      { image: activity1, name: "외벽" },
      { image: activity2, name: "등산" },
    ],
  };

  return (
    <div style={{ ...styles.home, overflowX: "hidden" }}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.banner}>
          <div style={styles.bannerItem} ref={activityRef}>
            <div style={styles.bannerTitle}>{selectedTerm} 활동</div>
            <div style={styles.activityContainer}>
              {activities[selectedTerm].map((activity, index) => (
                <div key={index} style={styles.activityBox}>
                  <img
                    src={activity.image}
                    alt={activity.name}
                    style={styles.activityImage}
                  />
                  <div style={styles.activityName}>{activity.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activities;
