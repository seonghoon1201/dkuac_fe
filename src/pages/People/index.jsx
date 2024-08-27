import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import total from "../../images/정미르.png"; // 예시 이미지 경로
import climbing from "../../images/정성훈.png"; // 예시 이미지 경로
import hiking from "../../images/황인우.png"; // 예시 이미지 경로

const departments = [
  {
    name: "총괄부",
    image: total,
    description: (
      <>
        회장, 부회장, 총무가 속한 부서로<br /> 동아리 전반적인 운영을 담당합니다.
      </>
    ),
    link: "/departments/total",
  },
  {
    name: "클라이밍부",
    image: climbing,
    description: (
      <>
        동아리 전반적인 운영 및 <br /> 특히 클라이밍 활동을 담당합니다.
      </>
    ),
    link: "/departments/climbing",
  },
  {
    name: "등산부",
    image: hiking,
    description: (
      <>
        동아리 전반적인 운영 및 <br /> 특히 등산 활동을 담당합니다.
      </>
    ),
    link: "/departments/hiking",
  },
];

function People() {
  return (
    <div style={styles.peopleContainer}>
      {departments.map((department, index) => (
        <Link key={index} to={department.link} style={styles.departmentLink}>
          <div style={styles.department}>
            <img
              src={department.image}
              alt={department.name}
              style={styles.departmentImage}
            />
            <div style={styles.overlay}>
              <div style={styles.departmentName}>{department.name}</div>
              <div style={styles.departmentDescription}>
                {department.description}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default People;
