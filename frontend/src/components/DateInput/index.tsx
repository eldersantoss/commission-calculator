import { Dispatch, SetStateAction } from "react";

interface DateInputProps {
  name: string;
  placeholder: string;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
}

export default function DateInput({
  name,
  placeholder,
  date,
  setDate,
}: DateInputProps) {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  return (
    <input
      type="date"
      name={name}
      id={name}
      placeholder={placeholder}
      value={date}
      onChange={handleDateChange}
      style={{
        padding: "0 16px",
        height: "43px",
        width: "225px",
        marginRight: "15px",
        border: "1px solid #A6A6A6",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: "bold",
        outline: "none",
        cursor: "pointer",
      }}
    />
  );
}
