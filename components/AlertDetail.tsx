import { Empty } from "antd";
import { AlertResponse } from "global";
import moment from "moment";
import styles from "../styles/AlertDetail.module.css";
import ReactAudioPlayer from "react-audio-player";
import { useEffect, useRef } from "react";
import Image from "next/image";

const AlertDetail = (props: { selected: null | AlertResponse }) => {
  const normalWaveUrl = "/sensor-sound-recordings/2.wav";
  const al = props.selected;
  const alertWaveContainerRef = useRef<HTMLDivElement | null>(null);
  const alertWaveRef = useRef<any>(false);
  const normalWaveContainerRef = useRef<HTMLDivElement | null>(null);
  const normalWaveRef = useRef<any>(false);

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
    } else {
      if (al?.soundUrl) {
        alertWaveRef.current.load(al?.soundUrl);
      }
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

  useEffect(() => {
    if (window?.WaveSurfer) {
      if (!!al?.id) {
        renderAlertWave();
      }
    }

    renderNormalWave();
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
        <h4>Alert ID {al.id}</h4>
        <p className={styles["subtitle"]}>Sensor ID #{al.sensor?.code}</p>
        <p className={styles["subtitle"]}>
          Detected at {moment(al.timestamp).format("DD MMM YYYY HH:mm")}
        </p>
      </div>
      <div className={styles.waveformContainer}>
        <div className={styles.wave}>
          <p>Anomaly Machine Output</p>
          <ReactAudioPlayer
            controls
            src={al.soundUrl}
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDetail;
