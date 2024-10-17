import useCommissionsDataContext from "@/pages/comissoes/hooks/useCommissionsDataContext";
import { IconSearch } from "@tabler/icons-react";
import DateInput from "../../../../components/DateInput";
import MainButton from "../../../../components/MainButton";

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
