import quotation from "../../images/quotation.png"; // 큰따옴표 이미지 추가
import styles from "./styles";

function ReviewBox(props) {
  const { r, index } = props;
  return (
    <div
      className="reviewBox"
      key={index}
      style={{
        ...styles.reviewBox,
        transform: index % 2 === 0 ? "translateY(0)" : "translateY(2vw)",
      }}
    >
      <img src={quotation} alt="Quotation" style={styles.quotationIcon} />
      <div style={styles.reviewText}>{r.text}</div>
      <div style={styles.reviewAuthor}>{r.author}</div>
      <div style={styles.reviewDepartment}>{r.department}</div>
    </div>
  );
}

export default ReviewBox;
