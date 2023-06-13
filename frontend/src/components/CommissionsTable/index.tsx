import useCommissionsDataContext from "@/hooks/useCommissionsDataContext";
import TableHeader from "../TableHeader";
import styles from "./CommissionsTable.module.css";

export default function CommissionsTable() {
  const { commissionsData } = useCommissionsDataContext();
  const headers = ["Cód.", "Vendedor", "Total de vendas", "Total de comissões"];

  function renderMessage() {
    return (
      <p style={{ fontWeight: "500", fontSize: "16px", marginBottom: "200px" }}>
        Para visualizar o relatório, selecione um período nos campos acima.
      </p>
    );
  }

  function renderTable(headers: string[], data: any[]) {
    return (
      <div style={{ flexGrow: "1", width: "100%" }}>
        <table className={styles.mainTable}>
          <TableHeader headers={headers}></TableHeader>
          <tbody>
            {renderTableData(data)}
            {renderTotalizationRow(data)}
          </tbody>
        </table>
      </div>
    );
  }

  function renderTableData(data: any[]) {
    return data.map((row: any) => {
      return (
        <tr key={row.code}>
          <td>{row.code.toString().padStart(3, "0")}</td>
          <td>{row.name}</td>
          <td>{row.number_of_sales}</td>
          <td>
            {row.commission_value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </td>
        </tr>
      );
    });
  }

  function renderTotalizationRow(data: any[]) {
    const totalCommissionValue = data.reduce((acc, cur) => {
      return acc + cur.commission_value;
    }, 0);
    return (
      <tr style={{ fontWeight: "500" }}>
        <td colSpan={3} style={{ textAlign: "left", paddingLeft: "35px" }}>
          Total de Comissões do Período
        </td>
        <td>
          {totalCommissionValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </td>
      </tr>
    );
  }

  return (
    <div
      style={{
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {commissionsData.length > 0
        ? renderTable(headers, commissionsData)
        : renderMessage()}
    </div>
  );
}
