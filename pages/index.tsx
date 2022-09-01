import { Button, message, Pagination, Select, Spin, Tag } from "antd";
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

  const getAlerts = async () => {
    setLoading(true);
    let url = "/api/alerts";
    const page = String(router.query?.page || 1);
    const sensor = router.query?.sensorId;
    if (!!sensor) {
      url = `/api/sensor-alerts/${sensor}`;
    }

    const resp = await fetch(url + `?page=${page}&pageSize=${10}`);
    if (resp.ok) {
      const parsed = await resp.json();
      setAlerts(parsed);
    } else {
      message.error("Failed get alerts");
    }
    setLoading(false);
  };

  useEffect(() => {
    getAlerts();
  }, [router.query.sensorId, router.query.page]); // eslint-disable-line react-hooks/exhaustive-deps

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
          selected={String(router.query.sensorId || "All")}
          onChange={(val) => {
            if (!val || val === "All") {
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
            <Pagination
              current={Number(router.query.page) || 1}
              pageSize={Number(router.query.pageSize) || 10}
              onChange={(page) => {
                router.replace({
                  pathname: "/",
                  query: { page, sensorId: router.query.sensorId },
                });
              }}
              total={alerts.total}
              style={{ textAlign: "right", margin: 10 }}
            />
          </div>
          <div className={styles["alert-detail"]}></div>
        </div>
      </Spin>
    </div>
  );
};

export default Home;
