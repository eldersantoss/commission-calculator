import { CommisionsDataContext } from "@/pages/comissoes/contexts/CommissionsDataContext";
import { useContext } from "react";

const useCommissionsDataContext = () => useContext(CommisionsDataContext);

export default useCommissionsDataContext;
