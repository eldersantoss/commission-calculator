import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import Caption from "@/components/Caption";
import useAppContext from "@/hooks/useAppContext";
import { useEffect } from "react";
import Container from "@/components/Container";
import MainContent from "@/components/MainContent";
import SalesTable from "@/components/SalesTable";
import MainButton from "@/components/MainButton";
import PageActions from "@/components/PageActions";
import Link from "next/link";
import MessagePopup from "@/components/MessagePopup";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

export default function SalesPage() {
  const { setPageTitle, openSideBar, displayedMessagePopup, pageTitle } =
    useAppContext();

  useEffect(() => {
    if (pageTitle !== "Vendas") setPageTitle("Vendas");
  }, [pageTitle, setPageTitle]);

  return (
    <div>
      <Container>
        <MainContent>
          <PageActions>
            <Caption text="Relatório de Vendas" />
            {displayedMessagePopup ? (
              <MessagePopup />
            ) : (
              <Link href="/vendas/alterar">
                <MainButton content={"Inserir nova Venda"} />
              </Link>
            )}
          </PageActions>
          <SalesTable />
        </MainContent>
      </Container>
    </div>
  );
}
