import { Col, Input, Row, Select } from "@douyinfe/semi-ui";
import { useEffect, useRef } from "react";
import { ConfigItemProps } from "../ConfigItemProps";
import styled from "styled-components";
import { IconHash } from "@douyinfe/semi-icons";
import ConfigObject from "./ConfigObject";
import { If } from "../utils/If";

export type ConfigSelectOptions = {
  label: string;
  value: string;
}[];

export type ConfigSelectProps = ConfigItemProps<"select", ConfigSelectOptions>;

export default function ConfigSelect(props: ConfigSelectProps) {
  const {
    field,
    label,
    default: defaultValue,
    value,
    tip,
    onChange,
    target,
    options = [],
  } = props;

  useEffect(() => {
    if (!value && defaultValue) {
      onChange(target, field, defaultValue);
    } else if (
      !options?.find((item) => item.value === value) &&
      options?.length
    ) {
      onChange(target, field, options?.[0]?.value);
    }
  }, []);

  const renderSelectedItem = (p: any) => {
    return (
      <div>
        <div>{p.label}</div>
      </div>
    );
  };

  const renderOptionItem = (p: any) => {
    return (
      <SelectItem
        style={{
          width: "97%",
          padding: "3px 8px",
          margin: "2px 5px",
          background: p.selected ? "#f1f1fc" : "",
          borderRadius: "4px",
        }}
        onClick={p.onClick}
      >
        <IconHash style={{ color: "#666", marginRight: 8 }}></IconHash>
        <div>{p.label}</div>
      </SelectItem>
    );
  };

  return (
    <Col span={24} style={{ paddingTop: "10px" }}>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#333",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>{label}</div>
        <div id={`${field}-right`}></div>
      </div>
      <If condition={value}>
        <Select
          prefix={<IconHash style={{ color: "#666" }}></IconHash>}
          placeholder="请选择"
          style={{ width: "100%", marginTop: "5px" }}
          onChange={(v) => onChange(target, field, v)}
          defaultValue={value}
          renderSelectedItem={renderSelectedItem}
          renderOptionItem={renderOptionItem}
        >
          {options?.map((item, index) => (
            <Select.Option
              key={item.value}
              value={item.value}
              label={item.label}
            ></Select.Option>
          ))}
        </Select>
      </If>
      <div style={{ fontSize: "12px", marginTop: "2px", color: "#666" }}>
        {tip}
      </div>
    </Col>
  );
}

const SelectItem = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;