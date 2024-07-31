const styles = {
  home: {
    textAlign: "center",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2vw",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#3a5ba0",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  teddyBear: {
    maxWidth: "40vw",
    height: "auto",
  },
  textContainer: {
    marginLeft: "2vw",
    textAlign: "center",
  },
  h1: {
    margin: 0,
    fontSize: "4vw",
  },
  h2: {
    margin: 0,
    fontSize: "4vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
  },
  since: {
    fontSize: "1.5vw",
    marginLeft: "1vw",
  },
  button: {
    backgroundColor: "white",
    color: "#3a5ba0",
    border: "none",
    padding: "1vw 2vw",
    fontSize: "1.5vw",
    fontWeight: "800",
    cursor: "pointer",
    marginTop: "2vw",
    borderRadius: "2vw",
  },
  explainSection: {
    backgroundColor: "white",
    color: "#3a5ba0",
    textAlign: "center",
    padding: "2vw",
    minHeight: "50vh",
    marginTop: "4vw",
    width: "100%", // Ensure the section takes the full width of its container
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  explainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  explainImage: {
    maxWidth: "40vw",
    height: "auto",
    margin: "1vw",
  },
  sectionTitle: {
    fontSize: "3vw",
    margin: "2vw 0",
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  reviewsSection: {
    backgroundColor: "#3a5ba0", // 파란색 배경
    padding: "2vw",
    textAlign: "left", // 왼쪽 정렬
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  reviewsTitle: {
    fontSize: "3vw",
    color: "white",
    marginBottom: "2vw",
    marginLeft: "2vw", // 왼쪽에 위치하도록 마진 추가
    fontWeight: "600",
  },
  reviewContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "2vw",
    paddingBottom: "5vw", // 하단에 여백 추가
  },
  reviewBox: {
    backgroundColor: "white",
    color: "#3a5ba0",
    borderRadius: "1vw",
    padding: "2vw",
    position: "relative",
    width: "40%",
    minWidth: "300px",
    boxSizing: "border-box", // Padding을 포함하여 크기를 계산
  },
  quotationIcon: {
    position: "absolute",
    top: "1vw",
    left: "1vw",
    width: "2.5vw",
  },
  reviewText: {
    fontSize: "1.5vw", // 글씨 크기 조정
    marginTop: "1vw", // 큰따옴표 아래에 공간 추가
  },
  reviewAuthor: {
    marginTop: "1.5vw",
    fontSize: "1.2vw", // 글씨 크기 조정
    fontWeight: "bold",
  },
  reviewDepartment: {
    fontSize: "1vw", // 글씨 크기 조정
    marginTop: "0.5vw",
  },
  activitiesSection: {
    backgroundColor: "white",
    color: "#3a5ba0",
    padding: "2vw",
    textAlign: "left",
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  activitiesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2vw",
    padding: "0 2vw",
  },
  activitiesTitle: {
    fontSize: "3vw",
    color: "#3a5ba0",
    margin: "2vw 0",
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  moreButton: {
    backgroundColor: "white",
    color: "#3a5ba0",
    border: "4px solid #3a5ba0",
    padding: "0.5vw 1.5vw",
    fontSize: "1.5vw",
    fontWeight: "600",
    cursor: "pointer",
    borderRadius: "25px",
    textDecoration: "none", // 밑줄 제거
    display: "inline-block", // 인라인 블록 요소로 설정
    position: "relative", // 상대적 위치 설정
    overflow: "hidden", // 오버플로우 숨기기
    transition: "color 0.3s, background-color 0.3s", // 트랜지션 추가
  },
  activityContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "2vw",
  },
  activityBox: {
    textAlign: "center",
    width: "calc(33.33% - 2vw)",
    boxSizing: "border-box",
    marginBottom: "2vw",
  },
  activityImage: {
    width: "30vw",
    height: "30vw",
    objectFit: "cover",
    borderRadius: "1vw",
  },
  activityName: {
    fontSize: "2vw",
    fontWeight: "800",
    marginTop: "1vw",
  },
  faqSection: {
    backgroundColor: "#3a5ba0",
    color: "white",
    padding: "2vw",
    textAlign: "left",
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  faqTitle: {
    fontSize: "3vw",
    color: "white",
    marginBottom: "2vw",
    marginLeft: "2vw",
    fontWeight: "600",
  },
  faqContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "2vw",
  },
  faqItem: {
    backgroundColor: "#3a5ba0",
    borderRadius: "1vw",
    padding: "2vw",
    width: "calc(50% - 2vw)",
    marginBottom: "2vw",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  faqImage: {
    width: "2.5vw",
    height: "auto",
    marginRight: "1vw",
  },
  faqQuestion: {
    fontSize: "1.5vw",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  faqAnswer: {
    marginTop: "1vw",
    fontSize: "1.2vw",
  },
  faqHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "1vw 0",
  },
  faq_moreButton: {
    color: "white",
    textDecoration: "none",
    fontSize: "1.5vw",
    fontWeight: "bold",
    cursor: "pointer",
    border: "3px solid white",
    borderRadius: "25px",
    padding: "0.5vw 1.5vw",
    display: "inline-block",
    transition: "background-color 0.3s, color 0.3s",
  },
};

export default styles;
