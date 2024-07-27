import React, { useRef } from "react";
import "react-calendar/dist/Calendar.css"; // 캘린더 기본 스타일 가져오기
import activity1 from "../../images/activity1.png";
import activity2 from "../../images/activity2.png";
import activity3 from "../../images/activity3.png";
import styles from "./styles";
import Sidebar from "../../components/Sidebar";
import useActivitySemesterStore from "../../stores/useActivitySemesterStore";

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

function Activities() {
  const { activitySemester } = useActivitySemesterStore();
  const activityRef = useRef(null);

  return (
    <div style={{ ...styles.home, overflowX: "hidden" }}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.banner}>
          <div style={styles.bannerItem} ref={activityRef}>
            <div style={styles.bannerTitle}>{activitySemester} 활동</div>
            <div style={styles.activityContainer}>
              {activities[activitySemester].map((activity, index) => (
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
