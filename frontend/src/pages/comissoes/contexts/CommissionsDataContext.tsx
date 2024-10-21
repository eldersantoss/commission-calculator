import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useState,
} from "react";
import { fetchCommissions } from "../services";

export interface VendorCommission {
  code: number;
  name: string;
  number_of_sales: number;
  commission_value: number;
}

interface CommisionsDataContextProps {
  startPeriod: string;
  setStartPeriod: Dispatch<SetStateAction<string>>;
  endPeriod: string;
  setEndPeriod: Dispatch<SetStateAction<string>>;
  vendorCommissions: VendorCommission[];
  fetchCommissionsData: () => void;
}

export const CommisionsDataContext = createContext<CommisionsDataContextProps>({
  startPeriod: "",
  setStartPeriod: () => {},
  endPeriod: "",
  setEndPeriod: () => {},
  vendorCommissions: [],
  fetchCommissionsData: () => {},
});

export function CommissionsDataProvider({ children }: any) {
  const [startPeriod, setStartPeriod] = useState<string>("");
  const [endPeriod, setEndPeriod] = useState<string>("");
  const [vendorCommissions, setVendorCommissions] = useState<
    VendorCommission[]
  >([]);

  const values = {
    startPeriod,
    setStartPeriod,
    endPeriod,
    setEndPeriod,
    vendorCommissions,
    fetchCommissionsData: useCallback(() => {
      fetchCommissions(setVendorCommissions, startPeriod, endPeriod);
    }, [startPeriod, endPeriod]),
  };

  return (
    <CommisionsDataContext.Provider value={values}>
      {children}
    </CommisionsDataContext.Provider>
  );
}
