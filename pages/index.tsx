import { Button, Select, Tag } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import MainHeader from "../components/Header";
import styles from "../styles/Home.module.css";
import AlertCard from "../components/AlertCard";

const Home: NextPage = () => {
  const [sensor, setSensor] = useState("CNC Machine");
  const [alerts, setAlerts] = useState<Array<Alert>>([
    {
      new: true,
      id: "00013211",
      severity: "moderate",
      anomaly_reason: "Unknown Anomaly",
      datetime: "2021-06-18 20:10:04",
      name: sensor,
    },
    {
      new: true,
      id: "00013212",
      severity: "moderate",
      anomaly_reason: "Unknown Anomaly",
      datetime: "2021-06-18 20:10:04",
      name: sensor,
    },
    {
      new: false,
      id: "00013213",
      severity: "moderate",
      anomaly_reason: "Unknown Anomaly",
      datetime: "2021-06-18 20:10:04",
      name: sensor,
    },
    {
      new: false,
      id: "00013214",
      severity: "moderate",
      anomaly_reason: "Unknown Anomaly",
      datetime: "2021-06-18 20:10:04",
      name: sensor,
    },
    {
      new: false,
      id: "00013215",
      severity: "mild",
      anomaly_reason: "Unknown Anomaly",
      datetime: "2021-06-18 20:10:04",
      name: sensor,
    },
    {
      new: false,
      id: "00013216",
      severity: "severe",
      anomaly_reason: "Unknown Anomaly",
      datetime: "2021-06-18 20:10:04",
      name: sensor,
    },
  ]);
  const newAlerts = alerts.filter((al) => al.new).length;

  return (
    <div className={styles.container}>
      <MainHeader />
      <Head>
        <title>Sound Sensor Monitor</title>
        <meta
          name="description"
          content="Dashboard of sounda data from our sensor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles["sensor-selector"]}>
        <Select value={sensor} onChange={(val) => setSensor(val)}>
          <Select.Option value="CNC Machine">CNC Machine</Select.Option>
          <Select.Option value="Compress Maching">
            Compressing Machine
          </Select.Option>
          <Select.Option value="Smelting Maching">
            Smelting Machine
          </Select.Option>
        </Select>
      </div>
      <div className={styles["page-content"]}>
        <div className={styles["alert-list"]}>
          <div className={styles["sensor-selector"]}>
            <Button
              type="text"
              icon={<CaretLeftOutlined />}
              style={{ padding: "4px 0" }}
            >
              Back
            </Button>
          </div>
          <div className={styles["sensor-selector"]}>
            {alerts.length} Alerts{" "}
            {!!newAlerts && (
              <Tag
                color="var(--primary-blue)"
                style={{ marginLeft: 15, borderRadius: 11.25 }}
              >
                {newAlerts} New
              </Tag>
            )}
          </div>
          <div className={styles["alert-list-container"]}>
            {alerts.map((al) => (
              <AlertCard alert={al} key={al.id} active={al.id === "00013211"} />
            ))}
          </div>
        </div>
        <div className={styles["alert-detail"]}></div>
      </div>
    </div>
  );
};

export default Home;
