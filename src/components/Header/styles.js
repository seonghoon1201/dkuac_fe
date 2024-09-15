const styles = {
  header: {
    backgroundColor: "#3a5ba0",
    color: "white",
    padding: "8px",
    position: "relative", // 햄버거 메뉴 위치 조정
  },
  navList: {
    listStyle: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    padding: 0,
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
  },
  logoContainer: {
    marginRight: "15px",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  logo: {
    maxWidth: "50px",
    height: "auto",
    marginRight: "10px",
  },
  logoText: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "white",
    textDecoration: "none",
    lineHeight: "1.2",
    marginTop: "5px",
    marginBottom: "10px",
    marginRight: "10px",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "16px",
    marginRight: "30px",
  },
  rightContainer: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    maxWidth: "30px",
    height: "auto",
    marginLeft: "8px",
    cursor: "pointer",
  },
  hamburgerIconContainer: {
    display: "none", // 기본적으로 숨김 (모바일에서만 보이도록 설정)
    cursor: "pointer",
  },
  hamburgerIcon: {
    maxWidth: "30px",
    height: "auto",
  },
  mobileMenu: {
    position: "absolute",
    top: "60px", // 헤더 아래에 메뉴가 표시되도록 위치 설정
    right: "0",
    backgroundColor: "#3a5ba0",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  mobileMenuLink: {
    color: "white",
    fontSize: "16px",
    marginBottom: "10px",
    textDecoration: "none",
  },
  // 반응형 설정
  '@media (max-width: 768px)': {
    navList: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    hamburgerIconContainer: {
      display: "block", // 화면 크기가 768px 이하일 때 햄버거 아이콘 표시
    },
    desktopMenu: {
      display: "none", // 화면 크기가 768px 이하일 때 일반 메뉴 숨김
    },
  },
  // 노트북 화면 이상에서는 원래 메뉴가 보여야 함
  '@media (min-width: 769px)': {
    hamburgerIconContainer: {
      display: "none", // 768px 이상에서는 햄버거 아이콘 숨김
    },
    desktopMenu: {
      display: "block", // 768px 이상에서는 일반 메뉴가 보임
    },
  },
};

export default styles;
