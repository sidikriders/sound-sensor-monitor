import { Tag } from "antd";
import { AlertResponse } from "global";
import moment from "moment";
import styles from "../styles/AlertCard.module.css";

const severityColor: any = {
  MILD: "lightgreen",
  MODERATE: "#FCA034",
  SEVERE: "red",
};

const AlertCard = (props: {
  alert: AlertResponse;
  active: boolean;
  onClick?: () => void;
}) => {
  const { alert: al } = props;

  return (
    <div
      className={
        styles["alert-card"] + (props.active ? ` ${styles["active"]}` : "")
      }
      onClick={() => !!props?.onClick && props?.onClick()}
    >
      <Tag
        className={styles["severity"]}
        color={severityColor[String(al.severity)] || "black"}
      >
        {al.severity}
      </Tag>
      <div className={styles["alert-id"]}>
        <span>ID #{al.sensor?.code}</span>{" "}
        {!al.viewed && <div className={styles["new-dot"]} />}
      </div>
      <b className={styles["reason"]}>
        {al.reason?.reason || "Unknown Reason"}
      </b>
      <p className={styles["datetime"]}>
        Detected at {moment.utc(al.timestamp).format("YYYY-MM-DD HH:mm:ss")}
      </p>
      <p className={styles["sensor-name"]}>{al.sensor?.name}</p>
    </div>
  );
};

export default AlertCard;
