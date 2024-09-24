import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import styles from "./styles";
import Sidebar from "../../components/Sidebar";
import userInfoStore from "../../stores/userInfoStore";
import { authAxios, basicAxios, formDataAxios } from "../../api/axios";
import logoutUtil from "../../utils/logout-util";

function Activities() {
  const { isLoggedIn, isStaff, name } = userInfoStore();
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showActivityPopup, setShowActivityPopup] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({
    id: null,
    title: "",
    content: "",
    images: "",
    comments: [],
  });
  const [newActivity, setNewActivity] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [newComment, setNewComment] = useState("");
  const location = useLocation();
  const activityRef = useRef(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");

  // URL에서 학기 정보 가져오기
  const searchParams = new URLSearchParams(location.search);
  const semester = searchParams.get("semester");

  // 활동 데이터 가져오기
  const fetchActivities = async () => {
    const [year, semesterTerm] = semester.split("-");
    try {
      const response = await basicAxios.get(
        `/activity?year=${year}&semester=${semesterTerm}`
      );
      if (response.data.length > 0) {
        const activitiesWithFormattedImages = response.data.map((activity) => {
          // imageUrl이 문자열인지 확인하고 아니면 빈 문자열로 설정
          let imageUrl = activity.images[0] || "";
          if (typeof imageUrl !== "string") {
            imageUrl = "";
          }

          // 이미지 URL에서 '/public/activity/' 부분 제거
          if (imageUrl.includes("/public/activity/")) {
            imageUrl = imageUrl.replace("/public/activity/", "");
          }

          // URL이 https로 시작하지 않는 경우 백엔드 URL을 추가
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
      console.error("활동 데이터를 가져오는 데 실패했습니다:", error);
      setActivities([]);
    }
  };

  // 댓글 데이터 가져오기
  const fetchComments = async (activityId) => {
    try {
      const response = await basicAxios.get(
        `/activity/${activityId}/comments`
      );
      if (Array.isArray(response.data)) {
        setSelectedActivity((prev) => ({
          ...prev,
          comments: response.data,
        }));
      } else {
        console.error("댓글 데이터가 유효하지 않습니다:", response.data);
      }
    } catch (error) {
      console.error("댓글을 가져오는 데 실패했습니다:", error);
      setSelectedActivity((prev) => ({
        ...prev,
        comments: [],
      }));
    }
  };

  // 학기 정보가 변경될 때마다 활동 데이터를 불러옴
  useEffect(() => {
    if (semester) {
      fetchActivities();
    }
  }, [semester]);

  // 입력 필드 값 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({ ...prev, [name]: value }));
  };

  // 이미지 파일 선택 처리
  const handleImageChange = (e) => {
    setNewActivity((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // 활동 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", newActivity.title);
    formData.append("content", newActivity.content);
    formData.append("images", newActivity.image);

    const currentDate = new Date().toISOString().split("T")[0];
    formData.append("date", currentDate);

    try {
      const response = await formDataAxios.post("/activity", formData);

      if (response.status === 201) {
        alert("활동이 성공적으로 추가되었습니다.");
        setShowForm(false);
        setNewActivity({ title: "", content: "", image: null });
        fetchActivities();
      } else {
        alert("활동 추가에 실패했습니다.");
      }
    } catch (error) {
      console.log(error);
      console.error("활동 제출 중 오류가 발생했습니다:", error);
      alert("활동 추가 중 오류가 발생했습니다.");
      logoutUtil();
    }
  };

  // 활동 클릭 처리
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    fetchComments(activity.id); // 댓글을 불러오는 요청 추가
    setShowActivityPopup(true);
  };

  // 활동 삭제 처리 함수 추가
  const handleActivityDelete = async () => {
    try {
      const response = await authAxios.delete(
        `/activity/${selectedActivity.id}`
      );

      if (response.status === 200) {
        alert("활동이 삭제되었습니다.");
        setShowActivityPopup(false);
        fetchActivities(); // 삭제 후 활동 목록을 다시 불러옵니다.
      } else {
        alert("활동 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.log("활동 삭제 중 오류가 발생했습니다:", error);
      alert("활동 삭제 중 오류가 발생했습니다.");
      logoutUtil();
    }
  };

  // 댓글 제출 처리
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    setSelectedActivity((prev) => ({
      ...prev,
      comments: [...prev.comments, { content: newComment, Author: { name } }],
    }));
    try {
      const response = await authAxios.post(
        `/activity/${selectedActivity.id}/comments`,
        {
          content: newComment,
        }
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
      console.log("댓글 제출 중 오류가 발생했습니다:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
      logoutUtil();
    }
  };

  // 댓글 삭제 처리 함수
  const handleCommentDelete = async (commentId) => {
    try {
      const response = await authAxios.delete(
        `/activity/${selectedActivity.id}/comments/${commentId}`
      );

      if (response.status === 200) {
        setSelectedActivity((prev) => ({
          ...prev,
          comments: prev.comments.filter((comment) => comment.id !== commentId),
        }));
        alert("댓글이 삭제되었습니다.");
      } else {
        alert("댓글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.log("댓글 삭제 중 오류가 발생했습니다:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
      logoutUtil();
    }
  };

  // 댓글 수정 요청 처리 함수
  const handleCommentEdit = async (commentId) => {
    try {
      const response = await authAxios.put(
        `/activity/${selectedActivity.id}/comments/${commentId}`,
        { content: editedComment }
      );

      if (response.status === 200) {
        setSelectedActivity((prev) => ({
          ...prev,
          comments: prev.comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: editedComment }
              : comment
          ),
        }));
        setEditingCommentId(null);
        setEditedComment("");
        alert("댓글이 수정되었습니다.");
      } else {
        alert("댓글 수정에 실패했습니다.");
      }
    } catch (error) {
      console.log("댓글 수정 중 오류가 발생했습니다:", error);
      alert("댓글 수정 중 오류가 발생했습니다.");
      logoutUtil();
    }
  };

  // 수정 버튼 클릭 시, 댓글을 수정 모드로 전환
  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditedComment(comment.content); // 기존 댓글 내용을 수정란에 미리 채움
  };

  // 수정 취소 처리
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  // 팝업 바깥쪽 클릭 시 팝업 닫기 처리 함수
  const handleOverlayClick = (e) => {
    // e.target이 팝업 자체가 아니라 오버레이일 경우에만 팝업을 닫음
    if (e.target.className.includes('popupOverlay')) {
      setShowActivityPopup(false);
    }
  };

  return (
    <div style={{ ...styles.home, overflowX: "hidden" }}>
      <Sidebar />
      <div style={styles.content}>
        <div style={styles.banner}>
          <div style={styles.bannerItem} ref={activityRef}>
            <div style={styles.bannerTitle}>
              {semester} 활동
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
                  key={activity.id || index}
                  style={styles.activityBox}
                  onClick={() => handleActivityClick(activity)}
                >
                  <img
                    src={activity.images}
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
          <div
            style={styles.popupOverlay}
            onClick={handleOverlayClick} // 팝업 바깥쪽 클릭 시 팝업을 닫음
            className="popupOverlay"
          >
            <div
              style={styles.activityPopup}
              onClick={(e) => e.stopPropagation()} // 팝업 내부 클릭 시 이벤트 전파 방지
            >
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
                <div
                  className="commentContainer"
                  style={styles.commentsContainer}
                >
                  {selectedActivity.comments?.map((comment, index) =>
                    comment.content && (
                      <div className="comment" key={index} style={styles.comment}>
                        <div style={styles.commentHeader}>
                          <div style={styles.commentAuthor}>
                            {comment.Author?.name}
                          </div>
                          {isLoggedIn && isStaff && (
                            <div style={styles.commentActions}>
                              <button
                                style={styles.commentEdit}
                                onClick={() => handleEditClick(comment)}
                              >
                                수정
                              </button>
                              <button
                                style={styles.commentDelete}
                                onClick={() => handleCommentDelete(comment.id)}
                              >
                                삭제
                              </button>
                            </div>
                          )}
                        </div>
                        {/* 수정 모드일 때 */}
                        {editingCommentId === comment.id ? (
                          <div style={styles.editContainer}>
                            <input
                              type="text"
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                              style={styles.commentInput}
                            />
                            <div style={styles.editButtonsContainer}>
                              <button
                                style={styles.commentButton}
                                onClick={() => handleCommentEdit(comment.id)}
                              >
                                수정
                              </button>
                              <button
                                style={styles.commentButton}
                                onClick={handleCancelEdit}
                              >
                                취소
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>{comment.content}</div>
                        )}
                      </div>
                    )
                  )}
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
              {/* 삭제 버튼 및 닫기 버튼 */}
              <button style={styles.deleteButton} onClick={handleActivityDelete}>
                삭제
              </button>
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

