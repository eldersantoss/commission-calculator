import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import Caption from "@/components/Caption";
import useAppContext from "@/hooks/useAppContext";
import { useEffect } from "react";
import Container from "@/components/Container";
import MainContent from "@/components/MainContent";
import DatePeriodForm from "@/components/DatePeriodForm";
import CommissionsTable from "@/components/CommissionsTable";
import { CommissionsDataProvider } from "@/contexts/CommissionsDataContext";
import PageActions from "@/components/PageActions";

export default function CommissionsPage() {
  const { setPageTitle, openSideBar } = useAppContext();

  useEffect(() => {
    setPageTitle("Comissões");
  }, [setPageTitle]);

  return (
    <div>
      <TopBar />
      <Container>
        {openSideBar && <SideBar />}
        <CommissionsDataProvider>
          <MainContent>
            <PageActions>
              <Caption text="Relatório de Comissões" />
              <DatePeriodForm />
            </PageActions>
            <CommissionsTable />
          </MainContent>
        </CommissionsDataProvider>
      </Container>
    </div>
  );
}
