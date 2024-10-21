import Layout from "@/components/Layout";
import PageSubtitle from "@/components/PageSubtitle";
import SubtitleContainer from "@/components/SubtitleContainer";
import useAppContext from "@/hooks/useAppContext";
import CommissionsTable from "@/pages/comissoes/components/CommissionsTable";
import DatePeriodForm from "@/pages/comissoes/components/DatePeriodForm";
import { CommissionsDataProvider } from "@/pages/comissoes/contexts/CommissionsDataContext";
import { useEffect } from "react";

export default function CommissionsPage() {
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle("Comissões");
  }, [setPageTitle]);

  return (
    <CommissionsDataProvider>
      <Layout>
        <SubtitleContainer>
          <PageSubtitle text="Relatório de Comissões" />
          <DatePeriodForm />
        </SubtitleContainer>

        <CommissionsTable />
      </Layout>
    </CommissionsDataProvider>
  );
}
