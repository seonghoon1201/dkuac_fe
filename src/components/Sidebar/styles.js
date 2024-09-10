const styles = {
  sidebar: {
    width: "150px", // 고정 너비로 설정
    backgroundColor: "#ffffff",
    padding: "2vw 1vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  sidebarLink: {
    color: "#3a5ba0",
    fontSize: "14px", // 고정 글씨 크기
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "2vw",
    position: "relative",
  },
  sidebarLinkText: {
    display: "flex",
    alignItems: "center",
  },
  caretIcon: {
    marginRight: "0.5vw",
  },
  termList: {
    marginTop: "1vw",
    paddingLeft: "1.8vw", // Ensure the terms are aligned under the "활동" text
    transition: "max-height 0.3s ease-in-out",
    maxHeight: "200px", // 드롭다운에 필요한 최대 높이
    overflow: "hidden",
  },
  termItem: {
    color: "#3a5ba0",
    fontSize: "12px", // 고정 글씨 크기
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0.5vw 0",
    transition: "opacity 0.3s ease", // 부드러운 나타나는 효과
  },
  rightCaret: {
    marginRight: "0.5vw",
  },
};

export default styles;
