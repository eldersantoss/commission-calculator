import { SalesDataContext } from "@/pages/vendas/contexts/SalesDataContext";
import { useContext } from "react";

const useSalesDataContext = () => useContext(SalesDataContext);

export default useSalesDataContext;
