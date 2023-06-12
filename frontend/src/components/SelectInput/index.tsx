import Select, { StylesConfig } from "react-select";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

export interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  inputId: string;
  options: Option[];
  value?: Option;
  onChange: (param: any) => void;
  placeholder?: string;
}

export default function SelectInput({
  inputId,
  options,
  value,
  onChange,
  placeholder,
}: SelectInputProps) {
  const selectStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      padding: "3px 5px",
      border: "1px solid #C4C4C4",
      borderRadius: "3px",
      width: "100%",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <Select
      inputId={inputId}
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      styles={selectStyles}
      components={{
        DropdownIndicator: (props) =>
          props.selectProps.menuIsOpen ? (
            <IconChevronUp size={20} stroke={3} color="#888888" />
          ) : (
            <IconChevronDown size={20} stroke={3} color="#888888" />
          ),
      }}
    />
  );
}
