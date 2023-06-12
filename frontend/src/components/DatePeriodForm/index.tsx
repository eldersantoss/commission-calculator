import DateInput from "../DateInput";
import MainButton from "../MainButton";
import { IconSearch } from "@tabler/icons-react";
import useCommissionsDataContext from "@/hooks/useCommissionsDataContext";

export default function DatePeriodForm() {
  const {
    startPeriod,
    setStartPeriod,
    endPeriod,
    setEndPeriod,
    fetchCommissionsData,
  } = useCommissionsDataContext();

  function handleClick() {
    fetchCommissionsData();
  }

  return (
    <span style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
      <DateInput
        name="start-period"
        placeholder="Período de início"
        date={startPeriod}
        setDate={setStartPeriod}
      />
      <DateInput
        name="start-period"
        placeholder="Período de fim"
        date={endPeriod}
        setDate={setEndPeriod}
      />
      <MainButton
        action={handleClick}
        content={<IconSearch height={"16px"} stroke={"4"} />}
      />
    </span>
  );
}
