import React from "react";
import styles from "./total_styles";
import header from "../../images/정미르.png";  // 회장
import vice_chairman from "../../images/황인우.png";  // 부회장
import general_affair from "../../images/장시은.png"; // 총무
import exampleImage from "../../images/activity1.png"; // 예시 이미지 경로

const totalMembers = [
  { name: "정미르", role: "회장", image: header },
  { name: "황인우", role: "부회장", image: vice_chairman },
  { name: "장시은", role: "총무", image: general_affair },
];

function TotalDepartment() {
  return (
    <div className={styles.membersContainer}>
      {totalMembers.map((member, index) => (
        <div key={index} className={styles.member}>
          <img src={member.image} alt={member.name} className={styles.memberImage} />
          <div className={styles.memberOverlay}>
            <div className={styles.memberName}>{member.name}</div>
            <div className={styles.memberRole}>{member.role}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TotalDepartment;
