import { Button, message, Select, Spin, Tag } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import MainHeader from "../components/Header";
import styles from "../styles/Home.module.css";
import AlertCard from "../components/AlertCard";
import SensorSelector from "../components/SensorSelector";
import { useRouter } from "next/router";
import { AlertResponse } from "global";

const Home: NextPage = () => {
  const router = useRouter();
  const [sensor, setSensor] = useState("All");
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<{
    items: AlertResponse[];
    page: number;
    pageSize: number;
    total: number;
  }>({
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const newAlerts = 6;

  const getAlerts = async (page = 1, pageSize = 10) => {
    setLoading(true);
    let url = "/api/alerts";
    if (sensor !== "All") {
      url = `/api/sensor-alerts/${sensor}`;
    }

    const resp = await fetch(url);
    if (resp.ok) {
      const parsed = await resp.json();
      setAlerts(parsed);
    } else {
      message.error("Failed get alerts");
    }
    setLoading(false);
  };

  useEffect(() => {
    setSensor(String(router.query.sensorId || "All"));
    getAlerts();
  }, [router.query.sensorId]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <SensorSelector
          selected={sensor}
          onChange={(val) => {
            if (!val) {
              router.replace({
                pathname: "/",
              });
            } else {
              router.replace({
                pathname: "/",
                query: { sensorId: val },
              });
            }
          }}
        />
      </div>
      <Spin spinning={loading}>
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
              {alerts.total} Alerts{" "}
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
              {alerts.items.map((al) => {
                return (
                  <AlertCard
                    alert={al}
                    key={al.id}
                    active={al.id === "00013211"}
                  />
                );
              })}
            </div>
          </div>
          <div className={styles["alert-detail"]}></div>
        </div>
      </Spin>
    </div>
  );
};

export default Home;
