import React, { useEffect, useState, useRef } from "react";
import activity1 from "../../images/activity1.png";
import activity2 from "../../images/activity2.png";
import activity3 from "../../images/activity3.png";
import styles from "./styles";
import Sidebar from "../../components/Sidebar";
import useActivitySemesterStore from "../../stores/useActivitySemesterStore";
import { authAxios } from "../../api/axios";

const defaultActivities = [
  { image: activity1, name: "아직 없음" },
  { image: activity2, name: "아직 없음" },
  { image: activity3, name: "아직 없음" },
];

function Activities() {
  const { activitySemester } = useActivitySemesterStore();
  const [activities, setActivities] = useState(defaultActivities);
  const activityRef = useRef(null);

  useEffect(() => {
    const fetchActivities = async () => {
      const [year, semester] = activitySemester.split("-");
      try {
        const response = await authAxios.get(`/activity/${year}/${semester}`);
        if (response.data.length > 0) {
          setActivities(response.data);
        } else {
          setActivities(defaultActivities);
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
        setActivities(defaultActivities);
      }
    };

    fetchActivities();
  }, [activitySemester]);

  return (
    <div style={{ ...styles.home, overflowX: "hidden" }}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.banner}>
          <div style={styles.bannerItem} ref={activityRef}>
            <div style={styles.bannerTitle}>{activitySemester} 활동</div>
            <div style={styles.activityContainer}>
              {activities.map((activity, index) => (
                <div key={index} style={styles.activityBox}>
                  <img
                    src={activity.image || defaultActivities[index].image}
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