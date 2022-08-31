import type { NextPage } from "next";
import Head from "next/head";
import MainHeader from "../components/Header";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
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
      <div className="sensor-selector">
        <select value="CNC" placeholder="Select Machine">
          <option value="CNC">CNC Machine</option>
          <option value="Compress">Compressing Machine</option>
          <option value="Smelting">Smelting Machine</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
