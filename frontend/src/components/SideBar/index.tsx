import Link from "next/link"
import SideBarButton from "../SideBarButton"
import { IconCalculator, IconReportMoney } from "@tabler/icons-react"

export default function SideBar() {
  return (
    <div style={{
      backgroundColor: "#F2F2F2",
      width: "273px",
      height: "100vh",
      padding: "20px 0",
    }}>
      <Link href="/vendas/">
        <SideBarButton>
          <IconReportMoney />
          Vendas
        </ SideBarButton>
      </Link>
      <Link href="/comissoes/">
        <SideBarButton>
          <IconCalculator />
          Comissões
        </ SideBarButton>
      </Link>
    </div>
  )
}
