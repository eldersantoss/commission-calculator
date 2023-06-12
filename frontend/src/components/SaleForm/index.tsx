import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectInput, { Option } from "../SelectInput";
import TimeStampInput from "../TimeStampInput";
import { Person } from "@/contexts/SalesDataContext";
import useSalesDataContext from "@/hooks/useSalesDataContext";

interface SaleFormProps {
  timeStampValue: string;
  setTimeStampValue: Dispatch<SetStateAction<string>>;
  vendorSelectedOption: Option;
  setVendorSelectedOption: Dispatch<SetStateAction<Option>>;
  customerSelectedOption: Option;
  setCustomerSelectedOption: Dispatch<SetStateAction<Option>>;
}

export function getPersonSelectOptions(persons: Person[]): Option[] {
  if (!persons) return [];

  return persons.map((person) => {
    return {
      value: person.url,
      label: `${person.id.toString().padStart(3, "0")} - ${person.name}`,
    };
  });
}

export default function SaleForm({
  timeStampValue,
  setTimeStampValue,
  vendorSelectedOption,
  setVendorSelectedOption,
  customerSelectedOption,
  setCustomerSelectedOption,
}: SaleFormProps) {
  const { customersData, fetchCustomersData, vendorsData, fetchVendorsData } =
    useSalesDataContext();

  const [vendorOptions, setVendorOptions] = useState<Option[]>([]);
  const [customerOptions, setCustomerOptions] = useState<Option[]>([]);

  useEffect(() => {
    console.log("CARREGANDO DADOS DO FORMULARIO DE VENDA...");
    if (!vendorsData.length && !customersData.length) {
      fetchVendorsData();
      fetchCustomersData();
    }
  }, [vendorsData, customersData, fetchVendorsData, fetchCustomersData]);

  useEffect(() => {
    setVendorOptions(getPersonSelectOptions(vendorsData));
    setCustomerOptions(getPersonSelectOptions(customersData));
  }, [vendorsData, customersData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ marginBottom: "20px" }}>Dados da venda</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "30px",
          }}
        >
          <label htmlFor="timeStamp" style={{ marginBottom: "10px" }}>
            Data e Hora da Venda
          </label>
          <TimeStampInput value={timeStampValue} setValue={setTimeStampValue} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "30px",
          }}
        >
          <label htmlFor="vendor" style={{ marginBottom: "10px" }}>
            Escolha um vendedor
          </label>
          <SelectInput
            inputId="vendor-select"
            options={vendorOptions}
            value={vendorSelectedOption}
            onChange={(option: Option) => setVendorSelectedOption(option)}
            placeholder="Selecione o nome"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "30px",
          }}
        >
          <label htmlFor="customer" style={{ marginBottom: "10px" }}>
            Escolha um cliente
          </label>
          <SelectInput
            inputId="consumer-select"
            options={customerOptions}
            value={customerSelectedOption}
            onChange={(option: Option) => setCustomerSelectedOption(option)}
            placeholder="Selecione o nome"
          />
        </div>
      </div>
    </div>
  );
}
