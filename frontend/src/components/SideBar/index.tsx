import useSalesDataContext from "@/pages/vendas/hooks/useSalesDataContext";
import { IconCalculator, IconReportMoney } from "@tabler/icons-react";
import { useRouter } from "next/router";
import SideBarButton from "./SideBarButton";

export default function SideBar() {
  const { setSelectedSale } = useSalesDataContext();
  const router = useRouter();

  function salesButtonAction() {
    setSelectedSale(null);
    router.push("/");
  }

  function commissionsButtonAction() {
    router.push("/comissoes/");
  }

  return (
    <div
      role="menu"
      style={{
        backgroundColor: "#F2F2F2",
        width: "20vw",
        height: "100%",
      }}
    >
      <SideBarButton action={salesButtonAction}>
        <IconReportMoney />
        Vendas
      </SideBarButton>
      <SideBarButton action={commissionsButtonAction}>
        <IconCalculator />
        Comissões
      </SideBarButton>
    </div>
  );
}
