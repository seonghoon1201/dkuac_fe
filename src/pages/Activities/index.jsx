import React, { useEffect, useState, useRef } from "react";
import activity1 from "../../images/activity1.png";
import activity2 from "../../images/activity2.png";
import activity3 from "../../images/activity3.png";
import styles from "./styles";
import Sidebar from "../../components/Sidebar";
import useActivitySemesterStore from "../../stores/useActivitySemesterStore";
import userInfoStore from "../../stores/userInfoStore"; // userInfoStore 가져오기
import { authAxios } from "../../api/axios";

const defaultActivities = [
  { image: activity1, name: "아직 없음" },
  { image: activity2, name: "아직 없음" },
  { image: activity3, name: "아직 없음" },
];

function Activities() {
  const { activitySemester } = useActivitySemesterStore();
  const { isStaff, isLoggedIn } = userInfoStore(); // 스태프 여부와 로그인 상태 확인
  const [activities, setActivities] = useState(defaultActivities);
  const [showForm, setShowForm] = useState(false); // 폼 표시 여부 상태
  const [showActivityPopup, setShowActivityPopup] = useState(false); // 활동 팝업 표시 여부 상태
  const [selectedActivity, setSelectedActivity] = useState(null); // 선택된 활동 상태
  const [newActivity, setNewActivity] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 상태
  const activityRef = useRef(null);

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

  useEffect(() => {
    fetchActivities();
  }, [activitySemester]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewActivity((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newActivity.title);
    formData.append("content", newActivity.content);
    formData.append("images", newActivity.image);

    const currentDate = new Date().toISOString().split("T")[0];
    formData.append("date", currentDate);

    try {
      const response = await authAxios.post("/activity", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("활동이 성공적으로 추가되었습니다.");
        setShowForm(false);
        setNewActivity({ title: "", content: "", image: null });
        // 활동 리스트를 새로고침하거나 업데이트합니다.
        fetchActivities();
      } else {
        alert("활동 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to submit activity:", error);
      alert("활동 추가 중 오류가 발생했습니다.");
    }
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setShowActivityPopup(true);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await authAxios.post(
        `/activity/${selectedActivity.id}/comment`,
        { content: newComment }
      );

      if (response.status === 201) {
        setSelectedActivity((prev) => ({
          ...prev,
          comments: [...prev.comments, response.data],
        }));
        setNewComment("");
      } else {
        alert("댓글 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ ...styles.home, overflowX: "hidden" }}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.banner}>
          <div style={styles.bannerItem} ref={activityRef}>
            <div style={styles.bannerTitle}>
              {activitySemester} 활동
              {isLoggedIn && isStaff && (
                <button
                  style={styles.addActivityButton}
                  onClick={() => setShowForm(true)}
                >
                  + 글 작성
                </button>
              )}
            </div>
            <div style={styles.activityContainer}>
              {activities.map((activity, index) => (
                <div
                  key={index}
                  style={styles.activityBox}
                  onClick={() => handleActivityClick(activity)}
                >
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

        {/* 활동 추가 폼 */}
        {showForm && (
          <div style={styles.popupOverlay}>
            <div style={styles.popup}>
              <h2>활동 추가하기</h2>
              <input
                type="text"
                name="title"
                placeholder="활동 제목"
                value={newActivity.title}
                onChange={handleInputChange}
                style={styles.input}
              />
              <textarea
                name="content"
                placeholder="활동 내용"
                value={newActivity.content}
                onChange={handleInputChange}
                style={styles.textarea}
              />
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                style={styles.input}
              />
              <div style={styles.popupButtonsContainer}>
                <button style={styles.submitButton} onClick={handleSubmit}>
                  작성하기
                </button>
                <button
                  style={styles.cancelButton}
                  onClick={() => setShowForm(false)}
                >
                  취소하기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 활동 상세 팝업 */}
        {showActivityPopup && selectedActivity && (
          <div style={styles.popupOverlay}>
            <div style={styles.activityPopup}>
              <div style={styles.activityPopupImage}>
                <img
                  src={selectedActivity.image}
                  alt={selectedActivity.name}
                  style={styles.activityPopupImageStyle}
                />
              </div>
              <div style={styles.activityPopupContent}>
                <h2>{selectedActivity.title}</h2>
                <p>{selectedActivity.content}</p>
                <div style={styles.commentsContainer}>
                  {selectedActivity.comments?.map((comment, index) => (
                    <div key={index} style={styles.comment}>
                      {comment.content}
                    </div>
                  ))}
                </div>
                {isLoggedIn && (
                  <div style={styles.commentInputContainer}>
                    <input
                      type="text"
                      placeholder="댓글을 입력하세요"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      style={styles.commentInput}
                    />
                    <button
                      style={styles.commentButton}
                      onClick={handleCommentSubmit}
                    >
                      작성
                    </button>
                  </div>
                )}
                <button
                  style={styles.cancelButton}
                  onClick={() => setShowActivityPopup(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;
