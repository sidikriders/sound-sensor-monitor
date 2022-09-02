import { Button, Empty, Input, message, Tag } from "antd";
import { AlertResponse } from "global";
import moment from "moment";
import styles from "../styles/AlertDetail.module.css";
import ReactAudioPlayer from "react-audio-player";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import _ from "lodash";
import ReasonSelector from "./ReasonSelector";
import ActionSelector from "./ActionSelector";

const severityColor: any = {
  MILD: "lightgreen",
  MODERATE: "#FCA034",
  SEVERE: "red",
};

const AlertDetail = (props: {
  selected: null | AlertResponse;
  setLoading: (loLoading: boolean) => void;
  successUpdate: (alAlert: AlertResponse) => void;
}) => {
  const normalWaveUrl = "/sensor-sound-recordings/2.wav";
  const alertWaveContainerRef = useRef<HTMLDivElement | null>(null);
  const alertWaveRef = useRef<any>(false);
  const normalWaveContainerRef = useRef<HTMLDivElement | null>(null);
  const normalWaveRef = useRef<any>(false);
  const [al, setAl] = useState<null | AlertResponse>(null);
  const disableUpdate =
    al?.reasonId === props.selected?.reasonId &&
    al?.actionId === props.selected?.actionId &&
    al?.comment === props.selected?.comment;

  const renderAlertWave = () => {
    if (alertWaveContainerRef.current && !alertWaveRef.current) {
      alertWaveRef.current = window.WaveSurfer.create({
        container: alertWaveContainerRef.current,
        waveColor: "#a2c0f9",
        progressColor: "#3478FC",
        cursorColor: "#3478FC",
        barWidth: 3,
        mediaControls: true,
      });

      renderAlertWave();
    } else if (al?.soundUrl) {
      alertWaveRef.current.load(al?.soundUrl);
    }
  };

  const renderNormalWave = () => {
    if (normalWaveContainerRef.current && !normalWaveRef.current) {
      normalWaveRef.current = window.WaveSurfer.create({
        container: normalWaveContainerRef.current,
        waveColor: "#a2c0f9",
        progressColor: "#3478FC",
        cursorColor: "#3478FC",
        barWidth: 3,
        mediaControls: true,
      });

      normalWaveRef.current.load(normalWaveUrl);
    }
  };

  const updateAlert = async () => {
    props.setLoading(true);
    const resp = await fetch(`/api/alerts/${al?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: al?.comment || "",
        reasonId: al?.reasonId || null,
        actionId: al?.actionId || null,
      }),
    });

    if (resp.ok) {
      const parsed = await resp.json();

      props.successUpdate(parsed);
    } else {
      message.error("Failed update alert");
    }
    props.setLoading(false);
  };

  useEffect(() => {
    if (props.selected?.id) {
      setAl(props.selected);
    }
  }, [props.selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (window.WaveSurfer) {
      renderAlertWave();
      renderNormalWave();
    }
  }, [al?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!al) {
    return (
      <div className={styles["nothing"]}>
        <Empty
          description="No Alert Selected"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className={styles["alert-detail-container"]}>
      <div className={styles["title"]}>
        <h4>
          Alert ID {al?.id}{" "}
          <Tag
            style={{ transform: "translateY(-4px)", marginLeft: 5 }}
            color={severityColor[String(al.severity)] || "black"}
          >
            {_.startCase(al.severity?.toLowerCase() || "")}
          </Tag>
        </h4>
        <p className={styles["subtitle"]}>Sensor ID #{al?.sensor?.code}</p>
        <p className={styles["subtitle"]}>
          Detected at {moment(al?.timestamp).format("DD MMM YYYY HH:mm")}
        </p>
      </div>
      <div className={styles.waveformContainer}>
        <div className={styles.wave}>
          <p>Anomaly Machine Output</p>
          <ReactAudioPlayer
            controls
            src={al?.soundUrl}
            style={{
              height: 35,
              width: 225,
              margin: "10px 0",
            }}
          />
          <div ref={alertWaveContainerRef} />
          <div className={styles.graphImage}>
            <Image
              alt="alert sound diagram"
              src="/sound-diagram/alert.png"
              layout="fill"
              objectFit="contain"
              objectPosition={"top left"}
            />
          </div>
        </div>
        <div className={styles.wave}>
          <p>Normal Machine Output</p>
          <ReactAudioPlayer
            controls
            src={normalWaveUrl}
            style={{
              height: 35,
              width: 225,
              margin: "10px 0",
            }}
          />
          <div ref={normalWaveContainerRef} />
          <div className={styles.graphImage}>
            <Image
              alt="normal sound diagram"
              src="/sound-diagram/normal.png"
              layout="fill"
              objectFit="contain"
              objectPosition={"top left"}
            />
          </div>
        </div>
      </div>
      <div className={styles.alertInfo}>
        <b>Equipment</b>
        <p>{al?.sensor?.machine?.name}</p>
      </div>
      <div className={styles.alertInfo}>
        <b>Suspected Reason</b>
        <ReasonSelector
          value={al.reasonId}
          onChange={(val) =>
            setAl((alAlert) => {
              if (!!alAlert) {
                return {
                  ...alAlert,
                  reasonId: val,
                };
              }

              return alAlert;
            })
          }
        />
      </div>
      <div className={styles.alertInfo}>
        <b>Action Required</b>
        <ActionSelector
          value={al.actionId}
          onChange={(val) =>
            setAl((alAlert) => {
              if (!!alAlert) {
                return {
                  ...alAlert,
                  actionId: val,
                };
              }

              return alAlert;
            })
          }
        />
      </div>
      <div className={styles.alertInfo} style={{ marginTop: 35 }}>
        <b>Comment</b>
        <Input.TextArea
          value={al?.comment || ""}
          onChange={(e) => {
            e.persist();
            setAl((alAlert) => {
              if (!!alAlert) {
                return {
                  ...alAlert,
                  comment: e.target?.value || "",
                };
              }

              return alAlert;
            });
          }}
          style={{ marginTop: 5 }}
        />
      </div>
      <Button
        type="primary"
        disabled={disableUpdate}
        style={{ marginTop: 35 }}
        onClick={() => updateAlert()}
      >
        Update
      </Button>
    </div>
  );
};

export default AlertDetail;
