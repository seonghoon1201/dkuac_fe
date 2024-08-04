import React, { useEffect, useState, useRef } from "react";
import activity1 from "../../images/activity1.png";
import activity2 from "../../images/activity2.png";
import activity3 from "../../images/activity3.png";
import styles from "./styles";
import Sidebar from "../../components/Sidebar";
import useActivitySemesterStore from "../../stores/useActivitySemesterStore";
import userInfoStore from "../../stores/userInfoStore";
import { authAxios } from "../../api/axios";

const defaultActivities = [
  { images: activity1, title: "아직 없음" },
  { images: activity2, title: "아직 없음" },
  { images: activity3, title: "아직 없음" },
];

function Activities() {
  const { activitySemester } = useActivitySemesterStore();
  const { isStaff, isLoggedIn } = userInfoStore();
  const [activities, setActivities] = useState(defaultActivities);
  const [showForm, setShowForm] = useState(false);
  const [showActivityPopup, setShowActivityPopup] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({
    id: null,
    title: "",
    content: "",
    images: "",
    comments: [], // 초기값을 빈 배열로 설정
  });
  const [newActivity, setNewActivity] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [newComment, setNewComment] = useState("");
  const activityRef = useRef(null);

  {/* 활동 데이터 가져오기*/}
  const fetchActivities = async () => {
    const [year, semester] = activitySemester.split("-");
    try {
      const response = await authAxios.get(`/activity/${year}/${semester}`);
      if (response.data.length > 0) {
        response.data.forEach((activity) => {
          if (activity.images[0].includes("https")) {
            activity.images[0] = `${activity.images[0]}`.replace(
              "/public/activity/",
              ""
            );
          } else {
            activity.images[0] = `${process.env.REACT_APP_BACKEND_API_URL}${activity.images[0]}`;
          }
        });
        setActivities(response.data);
      } else {
        setActivities(defaultActivities);
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error);
      setActivities(defaultActivities);
    }
  };

  {/* 댓글 데이터 가져오기*/}
  const fetchComments = async (activityId) => {
    try {
      const response = await authAxios.get(`/activity/${activityId}/comment`);
      if (Array.isArray(response.data)) {
        setSelectedActivity((prev) => ({
          ...prev,
          comments: response.data,
        }));
      } else {
        console.error("Invalid comments data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      setSelectedActivity((prev) => ({
        ...prev,
        comments: [],
      }));
    }
  };

  {/* 컴포넌트 마운트 시 활동 데이터 가져오기 */}
  useEffect(() => {
    fetchActivities();
  }, [activitySemester]);

  {/* 입력 필드 값 변경 처리 */}
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  {/* 이미지 파일 선택 처리 */}
  const handleImageChange = (e) => {
    setNewActivity((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  {/* 활동 제출 처리 */}
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
        fetchActivities();
      } else {
        alert("활동 추가에 실패했습니다.");
      }
    } catch (error) {
      console.error("Failed to submit activity:", error);
      alert("활동 추가 중 오류가 발생했습니다.");
    }
  };

  {/* 활동 클릭 처리 */}
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    fetchComments(activity.id); // 댓글을 불러오는 요청 추가
    setShowActivityPopup(true);
  };

  {/* 댓글 제출 처리 */}
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
          comments: Array.isArray(prev.comments)
            ? [...prev.comments, response.data]
            : [response.data],
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
                    src={activity.images || defaultActivities[index].images}
                    alt={activity.title}
                    style={styles.activityImage}
                  />
                  <div style={styles.activityName}>{activity.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

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

        {showActivityPopup && selectedActivity && (
          <div style={styles.popupOverlay}>
            <div style={styles.activityPopup}>
              <div style={styles.activityPopupImage}>
                <img
                  src={selectedActivity.images}
                  alt={selectedActivity.title}
                  style={styles.activityPopupImageStyle}
                />
              </div>
              <div style={styles.activityPopupContent}>
                <h2 style={styles.activityTitle}>{selectedActivity.title}</h2>
                <p style={styles.activityContent}>{selectedActivity.content}</p>
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
              </div>
              <button
                style={styles.closeButton}
                onClick={() => setShowActivityPopup(false)}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activities;