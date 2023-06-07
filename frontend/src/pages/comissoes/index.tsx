import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import useAppContext from "@/hooks/useAppContext";
import { useEffect } from "react";

export default function CommissionsPage() {

  const { setPageTitle, openSideBar } = useAppContext()

  useEffect(
    () => {
      setPageTitle("Comissões")
    }, []
  )

  return (
    <div>
      <TopBar />
      { openSideBar && <SideBar /> }
    </div>
  )
}
