import { message, Select } from "antd";
import { useEffect, useState } from "react";

const MachineSelector = (props: {
  selected?: string;
  onChange: (sensorId: string) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [machines, setMachines] = useState([]);

  const getMachines = async () => {
    setLoading(true);
    const resp = await fetch("/api/machines");
    if (resp.ok) {
      const parsed = await resp.json();

      setMachines(parsed);
    } else {
      message.error("Failed get sensor list");
    }
    setLoading(false);
  };

  useEffect(() => {
    getMachines();
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
      {machines.map((sen: { id: string; name: string }) => (
        <Select.Option value={sen.id} key={sen.id}>
          {sen.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MachineSelector;
