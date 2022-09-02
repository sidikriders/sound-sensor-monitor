import { AlertAction } from "@prisma/client";
import { message, Select } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";

const ActionSelector = (props: {
  value: null | string;
  onChange: (val: AlertAction["id"]) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<AlertAction[]>([]);

  const getActions = async () => {
    setLoading(true);
    const resp = await fetch("/api/alert-actions");

    if (resp.ok) {
      const parsed = await resp.json();
      setList(parsed);
    } else {
      message.error("Failed get alert actions");
      setList([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getActions();
  }, []);

  return (
    <Select
      style={{ width: "100%", marginTop: 5 }}
      value={props.value || undefined}
      onChange={(val) => props.onChange(val)}
      allowClear
      loading={loading}
      placeholder="Select Anomality Reason"
    >
      {list.map((li) => (
        <Select.Option key={li.id} value={li.id}>
          {_.startCase(li.action.toLowerCase())}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ActionSelector;
