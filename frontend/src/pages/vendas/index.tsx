import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import useAppContext from "@/hooks/useAppContext";
import { useEffect } from "react";

export default function SalesPage() {

  const { setPageTitle, openSideBar } = useAppContext()

  useEffect(
    () => {
      setPageTitle("Vendas")
    }, []
  )

  return (
    <div>
      <TopBar />
      { openSideBar && <SideBar /> }
    </div>
  )
}
