import ReactInputMask from "react-input-mask";

interface TimeStampInputProps {
  value: string;
  setValue: (param: any) => void;
}

export default function TimeStampInput({
  value,
  setValue,
}: TimeStampInputProps) {
  return (
    <ReactInputMask
      mask="99/99/9999 - 99:99"
      name="timeStamp"
      id="timeStamp"
      placeholder="dd/mm/yyy - hh:mm"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      style={{
        padding: "12px 14px",
        border: "1px solid #C4C4C4",
        borderRadius: "3px",
        width: "100%",
      }}
    />
  );
}
