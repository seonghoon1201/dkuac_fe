import React from "react";
import styles from "./total_styles";
import jungmir from "../../images/정미르.png";
import jangsieun from "../../images/장시은.png";
import hwanginu from "../../images/황인우.png";

const totalMembers = [
  { name: "정미르", role: "회장", image: jungmir },
  { name: "황인우", role: "부회장", image: hwanginu },
  { name: "장시은", role: "총무", image: jangsieun },
];

function HikingDepartment() {
  return (
    <div className={styles.membersContainer}>
      {totalMembers.map((member, index) => (
        <div key={index} className={styles.member}>
          <img src={member.image} alt={member.name} className={styles.memberImage} />
          <div className={styles.memberName}>{member.name}</div>
          <div className={styles.memberRole}>{member.role}</div>
        </div>
      ))}
    </div>
  );
}

export default HikingDepartment;
