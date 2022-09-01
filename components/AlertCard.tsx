import { Tag } from "antd";
import moment from "moment";
import styles from "../styles/AlertCard.module.css";

const severityColor = {
  mild: "lightgreen",
  moderate: "#FCA034",
  severe: "red",
};

const AlertCard = (props: { alert: Alert; active: boolean }) => {
  const { alert: al } = props;

  return (
    <div
      className={
        styles["alert-card"] + (props.active ? ` ${styles["active"]}` : "")
      }
    >
      <div className={styles["alert-id"]}>
        <span>ID #{al.id}</span>{" "}
        {al.new && <div className={styles["new-dot"]} />}
      </div>
      <Tag className={styles["severity"]} color={severityColor[al.severity]}>
        {al.severity}
      </Tag>
      <b className={styles["reason"]}>{al.anomaly_reason}</b>
      <p className={styles["datetime"]}>
        Detected at {moment.utc(al.datetime).format("YYYY-MM-DD HH:mm:ss")}
      </p>
      <p className={styles["sensor-name"]}>{al.name}</p>
    </div>
  );
};

export default AlertCard;
