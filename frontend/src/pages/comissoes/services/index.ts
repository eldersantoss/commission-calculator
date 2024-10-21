import { fetchResourceData } from "@/infra/api/utils";
import { Dispatch, SetStateAction } from "react";
import { VendorCommission } from "../contexts/CommissionsDataContext";

export function fetchCommissions(
  setCommissionsData: Dispatch<SetStateAction<VendorCommission[]>>,
  startPeriod: string,
  endPeriod: string
) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/persons/vendors/commissions/`
  );
  url.searchParams.append("start_period", startPeriod);
  url.searchParams.append("end_period", endPeriod);

  fetchResourceData(url.toString(), setCommissionsData);
}
