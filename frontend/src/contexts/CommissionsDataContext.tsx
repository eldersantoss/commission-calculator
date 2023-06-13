import { Dispatch, SetStateAction, createContext, useState } from "react";

interface CommisionsDataContextProps {
  startPeriod: string;
  setStartPeriod: Dispatch<SetStateAction<string>>;
  endPeriod: string;
  setEndPeriod: Dispatch<SetStateAction<string>>;
  commissionsData: [];
  fetchCommissionsData: () => void;
}

export const CommisionsDataContext = createContext<CommisionsDataContextProps>({
  startPeriod: "",
  setStartPeriod: () => {},
  endPeriod: "",
  setEndPeriod: () => {},
  commissionsData: [],
  fetchCommissionsData: () => {},
});

export function CommissionsDataProvider({ children }: any) {
  const [startPeriod, setStartPeriod] = useState<string>("");
  const [endPeriod, setEndPeriod] = useState<string>("");
  const [commissionsData, setCommissionsData] = useState<[]>([]);

  function fetchCommissionsData() {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/persons/vendors/commissions/`
    );
    url.searchParams.append("start_period", startPeriod);
    url.searchParams.append("end_period", endPeriod);

    fetch(url)
      .then((response) => response.json())
      .then((data) => setCommissionsData(data?.results ?? []))
      .catch((error) => console.error(error));
  }

  const values = {
    startPeriod,
    setStartPeriod,
    endPeriod,
    setEndPeriod,
    commissionsData,
    fetchCommissionsData,
  };

  return (
    <CommisionsDataContext.Provider value={values}>
      {children}
    </CommisionsDataContext.Provider>
  );
}
