import { message, Select } from "antd";
import { useEffect, useState } from "react";

const SensorSelector = (props: {
  selected?: string;
  onChange: (sensorId: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [sensors, setSensors] = useState([]);

  const getSensors = async () => {
    setLoading(true);
    const resp = await fetch("/api/sensors");
    if (resp.ok) {
      const parsed = await resp.json();

      setSensors(parsed);
    } else {
      message.error("Failed get sensor list");
    }
    setLoading(false);
  };

  useEffect(() => {
    getSensors();
  }, []);
  return (
    <Select
      value={props.selected}
      onChange={props.onChange}
      style={{ minWidth: 150 }}
      loading={loading}
      allowClear={props.selected !== "All"}
    >
      <Select.Option value="All">All</Select.Option>
      {sensors.map((sen: { id: string; name: string }) => (
        <Select.Option value={sen.id} key={sen.id}>
          {sen.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SensorSelector;
