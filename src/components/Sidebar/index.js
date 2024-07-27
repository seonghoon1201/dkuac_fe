import React, { useRef } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa"; // 아이콘 추가
import { useNavigate } from "react-router-dom";
import useActivitySemesterStore from "../../stores/useActivitySemesterStore";
import styles from "./styles";

const terms = ["2023-1", "2023-2", "2024-1"];

function Sidebar() {
  const { setActivitySemester } = useActivitySemesterStore();
  const activityRef = useRef(null);
  const navigate = useNavigate();
  const handleTermChange = (term) => {
    setActivitySemester(term);
    if (activityRef.current) {
      activityRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCalendarToggle = () => {
    navigate("/schedules");
  };

  const handleActivityToggle = () => {
    navigate("/activities");
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarLink} onClick={handleActivityToggle}>
        <div style={styles.sidebarLinkText}>
          <FaCaretDown style={styles.caretIcon} />
          <span>활동</span>
        </div>
        <div style={styles.termList}>
          {terms.map((term, index) => (
            <div
              key={index}
              style={styles.termItem}
              onClick={() => handleTermChange(term)}
            >
              <FaCaretRight style={styles.rightCaret} />
              <span>{term}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={styles.sidebarLink} onClick={handleCalendarToggle}>
        <FaCaretRight style={styles.rightCaret} />
        <span>캘린더</span>
      </div>
    </div>
  );
}

export default Sidebar;
