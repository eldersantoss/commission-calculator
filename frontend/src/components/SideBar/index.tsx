import SideBarButton from "../SideBarButton";
import { IconCalculator, IconReportMoney } from "@tabler/icons-react";
import useSalesDataContext from "@/hooks/useSalesDataContext";
import { useRouter } from "next/router";

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
      style={{
        backgroundColor: "#F2F2F2",
        width: "20vw",
        height: "100vh",
        padding: "20px 0",
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
