import React, { useState } from "react";
import styles from "./styles";
import header from "../../images/정성훈.png"; // 클라이밍부장
import vice_chairman from "../../images/황인우.png"; // 부회장
import general_affair from "../../images/장시은.png"; // 총무

const totalMembers = [
  { name: "정성훈", role: "클라이밍부장", image: header, department: "SW융합학부", major: "소프트웨어학과", year: "19학번" },
  { name: "황인우", role: "부회장", image: vice_chairman, department: "경영경제대학", major: "경제학과", year: "22학번" },
  { name: "장시은", role: "총무", image: general_affair, department: "음악학부", major: "피아노전공(부전공 경영학과)", year: "20학번" },
];

function TotalDepartment() {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (member) => {
    setSelectedMember(member);
  };

  const closeModal = () => {
    setSelectedMember(null);
  };

  return (
    <div style={styles.membersContainer}>
      {totalMembers.map((member, index) => (
        <div key={index} style={styles.member} onClick={() => handleMemberClick(member)}>
          <img src={member.image} alt={member.name} style={styles.memberImage} />
          <div style={styles.memberOverlay}>
            <div style={styles.memberName}>{member.name}</div>
            <div style={styles.memberRole}>{member.role}</div>
          </div>
        </div>
      ))}

      {selectedMember && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedMember.image} alt={selectedMember.name} style={styles.modalImage} />
            <div style={styles.modalTextContainer}>
              <h2 style={styles.modalRole}>{selectedMember.role}</h2>
              <h2 style={styles.modalName}>{selectedMember.name}</h2>
              <p style={styles.modalDepartment}>
                {selectedMember.department}<br />{selectedMember.major}
              </p>
              <p style={styles.modalYear}>{selectedMember.year}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TotalDepartment;
