import { Button, message, Pagination, Spin, Tag } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import MainHeader from "../components/Header";
import styles from "../styles/Home.module.css";
import AlertCard from "../components/AlertCard";
import MachineSelector from "../components/MachineSelector";
import { useRouter } from "next/router";
import { AlertResponse } from "global";
import AlertDetail from "../components/AlertDetail";

const Home: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState<{
    items: AlertResponse[];
    page: number;
    pageSize: number;
    total: number;
    new: number;
  }>({
    items: [],
    page: 1,
    pageSize: 10,
    total: 0,
    new: 0,
  });
  const [selectedAlert, setSelectedAlert] = useState<null | AlertResponse>(
    null
  );

  const getAlerts = async () => {
    setLoading(true);
    let url = "/api/alerts";
    const page = String(router.query?.page || 1);
    const machine = router.query?.machineId;
    if (!!machine) {
      url = `/api/alerts/by-machine/${machine}`;
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

  const viewAlert = async (alertId: string) => {
    const resp = await fetch(`/api/alerts/${alertId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ viewed: true }),
    });

    if (resp.ok) {
      setAlerts((als) => ({
        ...als,
        items: als.items.map((al) => {
          if (al.id === alertId) {
            return { ...al, viewed: true };
          }

          return al;
        }),
        new: als.new - 1,
      }));
    } else {
      message.error("Failed update alert");
    }
  };

  useEffect(() => {
    getAlerts();
  }, [router.query.machineId, router.query.page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedAlert?.id && !selectedAlert?.viewed) {
      viewAlert(selectedAlert?.id);
    }
  }, [selectedAlert?.id]); // eslint-disable-line react-hooks/exhaustive-deps

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
        <MachineSelector
          selected={String(router.query.machineId || "All")}
          onChange={(val) => {
            if (!val || val === "All") {
              router.replace({
                pathname: "/",
              });
            } else {
              router.replace({
                pathname: "/",
                query: { machineId: val },
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
              {!!alerts.new && (
                <Tag
                  color="var(--primary-blue)"
                  style={{ marginLeft: 15, borderRadius: 11.25 }}
                >
                  {alerts.new} New
                </Tag>
              )}
            </div>
            <div className={styles["alert-list-container"]}>
              {alerts.items.map((al) => {
                return (
                  <AlertCard
                    alert={al}
                    key={al.id}
                    active={selectedAlert?.id === al.id}
                    onClick={() => {
                      setSelectedAlert(al);
                    }}
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
                  query: { page, machineId: router.query.machineId },
                });
              }}
              total={alerts.total}
              style={{ textAlign: "right", margin: 10 }}
            />
          </div>
          <div className={styles["alert-detail"]}>
            <AlertDetail
              selected={selectedAlert}
              setLoading={(loLoading) => setLoading(loLoading)}
              successUpdate={(newAlert) => {
                setAlerts((alAlerts) => ({
                  ...alAlerts,
                  items: alAlerts.items.map((al) => {
                    if (al.id === selectedAlert?.id) {
                      return newAlert;
                    }

                    return al;
                  }),
                }));
              }}
            />
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default Home;
