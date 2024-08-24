import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles";
import exampleImage from "../../images/activity1.png"; // 예시 이미지 경로

const departments = [
  {
    name: "총괄부",
    image: exampleImage,
    description: "총괄부 설명 예시입니다.",
    link: "/departments/total",
  },
  {
    name: "클라이밍부",
    image: exampleImage,
    description: "클라이밍부 설명 예시입니다.",
    link: "/departments/climbing",
  },
  {
    name: "등산부",
    image: exampleImage,
    description: "등산부 설명 예시입니다.",
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
