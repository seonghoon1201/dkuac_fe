import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles";
import Sidebar from "../../components/Sidebar";
import userInfoStore from "../../stores/userInfoStore";
import { basicAxios } from "../../api/axios";

function Activities() {
  const { isLoggedIn, isStaff } = userInfoStore();
  const [activities, setActivities] = useState([]);
  const location = useLocation();

  // URL에서 학기 정보 가져오기
  const searchParams = new URLSearchParams(location.search);
  const semester = searchParams.get('semester');

  // 활동 데이터 가져오기
  const fetchActivities = async () => {
    const [year, semesterTerm] = semester.split("-");
    try {
      const response = await basicAxios.get(`/activity?year=${year}&semester=${semesterTerm}`);
      if (response.data.length > 0) {
        const activitiesWithFormattedImages = response.data.map((activity) => {
          let imageUrl = activity.images[0];
          if (!imageUrl.includes("https")) {
            imageUrl = `${process.env.REACT_APP_BACKEND_API_URL}${imageUrl}`;
          }
          return { ...activity, images: imageUrl };
        });
        setActivities(activitiesWithFormattedImages);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setActivities([]);
    }
  };

  // 학기 정보가 변경될 때마다 활동 데이터를 불러옴
  useEffect(() => {
    if (semester) {
      fetchActivities();
    }
  }, [semester]);

  return (
    <div style={{ ...styles.home, overflowX: "hidden" }}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.banner}>
          <div style={styles.bannerItem}>
            <div style={styles.bannerTitle}>{semester} 활동</div>
            <div style={styles.activityContainer}>
              {activities.map((activity, index) => (
                <div key={activity.id || index} style={styles.activityBox}>
                  <img src={activity.images} alt={activity.title} style={styles.activityImage} />
                  <div style={styles.activityName}>{activity.title}</div>
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
