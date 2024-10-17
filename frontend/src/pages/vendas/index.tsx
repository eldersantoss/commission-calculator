import Layout from "@/components/Layout";
import MainButton from "@/components/MainButton";
import MessagePopup from "@/components/MessagePopup";
import PageSubtitle from "@/components/PageSubtitle";
import SubtitleContainer from "@/components/SubtitleContainer";
import useAppContext from "@/hooks/useAppContext";
import SalesTable from "@/pages/vendas/components/SalesTable";
import Link from "next/link";
import { useEffect } from "react";

export default function SalesPage() {
  const { setPageTitle, openSideBar, displayedMessagePopup, pageTitle } =
    useAppContext();

  useEffect(() => {
    if (pageTitle !== "Vendas") setPageTitle("Vendas");
  }, [pageTitle, setPageTitle]);

  return (
    <Layout>
      <SubtitleContainer>
        <PageSubtitle text="Relatório de Vendas" />
        {displayedMessagePopup ? (
          <MessagePopup />
        ) : (
          <Link href="/vendas/alterar">
            <MainButton content={"Inserir nova Venda"} />
          </Link>
        )}
      </SubtitleContainer>

      <SalesTable />
    </Layout>
  );
}
