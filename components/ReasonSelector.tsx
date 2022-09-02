import { AlertReason } from "@prisma/client";
import { message, Select } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";

const ReasonSelector = (props: {
  value: null | string;
  onChange: (val: AlertReason["id"]) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<AlertReason[]>([]);

  const getReasons = async () => {
    setLoading(true);
    const resp = await fetch("/api/alert-reasons");

    if (resp.ok) {
      const parsed = await resp.json();
      setList(parsed);
    } else {
      message.error("Failed get alert reasons");
      setList([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    getReasons();
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
          {_.startCase(li.reason.toLowerCase())}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ReasonSelector;
