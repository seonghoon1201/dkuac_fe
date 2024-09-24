const styles = {
  home: {
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
    display: "flex",
    backgroundColor: "#3a5ba0",
    color: "white",
  },
  sidebar: {
    width: "150px",
    backgroundColor: "#ffffff",
    padding: "2vw 1vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  content: {
    flex: 1,
    padding: "2vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  banner: {
    backgroundColor: "#ffffff",
    borderRadius: "1vw",
    padding: "2vw",
    boxShadow: "0 0.5vw 1vw rgba(0, 0, 0, 0.1)",
    color: "#3a5ba0",
    width: "100%",
  },
  bannerItem: {
    marginBottom: "2vw",
    color: "#3a5ba0",
  },
  bannerTitle: {
    fontSize: "2vw",
    fontWeight: "bold",
    color: "#3a5ba0",
    marginBottom: "1vw",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addActivityButton: {
    fontSize: "2vw",
    padding: "0.5vw 1vw",
    backgroundColor: "#3a5ba0",
    color: "white",
    border: "none",
    borderRadius: "0.5vw",
    cursor: "pointer",
    marginLeft: "1vw",
  },
  activityContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "1vw",
  },
  activityBox: {
    width: "30%",
    backgroundColor: "#f1f1f1",
    borderRadius: "1vw",
    padding: "1vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 0.5vw 1vw rgba(0, 0, 0, 0.1)",
    marginBottom: "1vw",
  },
  activityImage: {
    width: "100%",
    height: "100%",
    borderRadius: "0.5vw",
  },
  activityName: {
    fontSize: "1.2vw",
    fontWeight: "bold",
    color: "#3a5ba0",
    marginTop: "0.5vw",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "50vw",
    backgroundColor: "#ffffff",
    color: "#3a5ba0",
    padding: "2vw",
    borderRadius: "1vw",
    boxShadow: "0 1vw 2vw rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "1vw",
    fontSize: "1vw",
    marginBottom: "1vw",
    borderRadius: "0.5vw",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "1vw",
    fontSize: "1vw",
    marginBottom: "1vw",
    borderRadius: "0.5vw",
    border: "1px solid #ccc",
    minHeight: "8vw",
  },
  popupButtonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "1vw",
  },
  submitButton: {
    padding: "0.5vw 2vw",
    backgroundColor: "#3a5ba0",
    color: "white",
    border: "none",
    borderRadius: "0.5vw",
    cursor: "pointer",
    fontSize: "1vw",
  },
  cancelButton: {
    padding: "0.5vw 2vw",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    borderRadius: "0.5vw",
    cursor: "pointer",
    fontSize: "1vw",
  },
  activityPopup: {
    position: "relative",
    display: "flex",
    flexDirection: "row", // 이미지를 왼쪽에, 콘텐츠를 오른쪽에 배치
    maxWidth: "90vw",
    maxHeight: "90vh",
    backgroundColor: "#ffffff",
    borderRadius: "1vw",
    boxShadow: "0 1vw 2vw rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  },
  activityPopupImage: {
    flex: "1", // 이미지를 가능한 최대 크기로 설정
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // 이미지가 박스 내에서 넘치지 않도록 설정
  },
  activityPopupImageStyle: {
    width: "100%", // 이미지를 전체 넓이에 맞추기
    height: "auto",
    objectFit: "contain", // 이미지를 잘리지 않고 비율을 유지하면서 크기를 조정
  },
  activityPopupContent: {
    flex: 1,
    padding: "2vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflowY: "auto", // 내용이 많을 경우 스크롤 가능하도록 설정
  },
  activityTitle: {
    fontSize: "2vw",
    fontWeight: "bold",
    marginBottom: "1vw",
    color: "#3a5ba0",
  },
  activityContent: {
    fontSize: "1.2vw",
    marginBottom: "2vw",
    color: "#3a5ba0",
  },
  commentsContainer: {
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "1vw",
    marginBottom: "1vw",
  },
  comment: {
    padding: "1vw",
    borderRadius: "0.5vw",
    marginBottom: "0.5vw",
    fontSize: "1vw",
    color: "#3a5ba0",
  },
  commentInputContainer: {
    display: "flex",
    alignItems: "center", // 입력 박스와 버튼을 같은 높이에 위치
    marginTop: "1vw",
  },
  commentInput: {
    flexGrow: 1,
    padding: "1vw 2vw",
    fontSize: "1vw",
    borderRadius: "0.5vw",
    border: "1px solid #ccc",
    marginRight: "1vw", // 버튼과 간격을 위해 여백 추가
  },
  commentButton: {
    padding: "1vw 2vw", // 입력 박스와 같은 높이로 버튼 패딩 조정
    backgroundColor: "#3a5ba0",
    color: "white",
    border: "none",
    borderRadius: "0.5vw",
    cursor: "pointer",
    fontSize: "1vw",
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: "0.5vw",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
  },
  commentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  commentActions: {
    display: "flex",
    alignItems: "center", // 버튼을 같은 줄에 위치
    gap: "0.3vw", // 버튼 사이 간격 조정
  },
  editContainer: {
    display: "flex",
    flexDirection: "column", // 수정 입력 칸과 버튼을 위아래로 배치
    gap: "1vw",
  },
  editButtonsContainer: {
    display: "flex",
    justifyContent: "space-between", // 수정과 취소 버튼을 양옆으로 배치
    gap: "0.5vw", // 버튼 사이 간격
  },
  commentEdit: {
    fontSize: "0.8vw",  // 댓글 크기와 맞추기
    color: "#3a5ba0",   // 기존 글씨 색과 동일
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  commentDelete: {
    fontSize: "0.8vw",  // 댓글 크기와 맞추기
    color: "#3a5ba0",   // 기존 글씨 색과 동일
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  closeButton: {
    position: "absolute",
    top: "0.5vw",
    left: "0.5vw",  // 왼쪽 위로 위치 변경
    backgroundColor: "transparent",
    border: "none",
    color: "#000",
    fontSize: "2vw",
    fontWeight: "bold",
    cursor: "pointer",
  },
  deleteButton: {
    position: "absolute",
    top: "0.5vw",
    right: "0.5vw", // 오른쪽 위에 위치
    backgroundColor: "red",
    color: "white",
    border: "none",
    fontSize: "1.5vw",
    borderRadius: "0.5vw",
    cursor: "pointer",
    padding: "0.3vw 0.8vw",
  },
};

export default styles;