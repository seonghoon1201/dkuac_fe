import React, { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./styles";

const terms = ["2024-1", "2024-2"]; // 2024 학기만 표시

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false); // 마우스 오버 상태 관리
  const navigate = useNavigate();

  // 마우스 오버 시 드롭다운 표시
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // 학기 선택 시 해당 페이지로 이동
  const handleTermClick = (term) => {
    navigate(`/activities?semester=${term}`);
  };

  const handleCalendarToggle = () => {
    navigate("/schedules");
  };

  return (
    <div style={styles.sidebar}>
      {/* 활동 메뉴 */}
      <div
        style={styles.sidebarLink}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div style={styles.sidebarLinkText}>
          {isHovered ? (
            <FaCaretDown style={styles.caretIcon} />
          ) : (
            <FaCaretRight style={styles.caretIcon} />
          )}
          <span>활동</span>
        </div>
        {/* 드롭다운 학기 목록 */}
        {isHovered && (
          <div style={styles.termList}>
            {terms.map((term, index) => (
              <div
                key={index}
                style={styles.termItem}
                onClick={() => handleTermClick(term)} // 학기 클릭 시 호출
              >
                <FaCaretRight style={styles.rightCaret} />
                <span>{term}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 캘린더 메뉴 */}
      <div style={styles.sidebarLink} onClick={handleCalendarToggle}>
        <FaCaretRight style={styles.rightCaret} />
        <span>캘린더</span>
      </div>
    </div>
  );
}

export default Sidebar;
