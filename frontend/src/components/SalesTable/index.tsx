import useSalesDataContext from "@/hooks/useSalesDataContext";
import TableHeader from "../TableHeader";
import styles from "./SalesTable.module.css";
import { useEffect, useState } from "react";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import OptionButton from "../OptionButton";
import { format } from "date-fns";
import { Sale, SaleProduct } from "@/contexts/SalesDataContext";
import { useRouter } from "next/router";
import useAppContext from "@/hooks/useAppContext";
import ProductTable from "../ProductTable";
import { loadSaleProductsTable } from "@/pages/vendas/alterar";

export default function SaleTable() {
  const { setDisplayedMessagePopup } = useAppContext();
  const {
    salesData,
    setSalesData,
    fetchSalesData,
    selectedSale,
    setSelectedSale,
    productsData,
    fetchProductsData,
  } = useSalesDataContext();

  const [tableIndexToToggle, setTableIndexToToggle] = useState(-1);
  const [onTableSaleProducts, setOnTableSaleProducts] = useState<SaleProduct[]>(
    []
  );

  const router = useRouter();

  const headers = [
    "Nota Fiscal",
    "Cliente",
    "Vendedor",
    "Data da Venda",
    "Valor Total",
    "Opções",
  ];

  useEffect(() => {
    fetchSalesData();
  }, [fetchSalesData]);

  useEffect(() => {
    if (!productsData.length) {
      fetchProductsData();
    }
  }, [fetchProductsData, productsData]);

  function renderTable(headers: string[], data: any[]) {
    return (
      <div style={{ flexGrow: "1", width: "100%" }}>
        <table className={styles.mainTable}>
          <TableHeader headers={headers}></TableHeader>
          <tbody>{renderTableData(data)}</tbody>
        </table>
      </div>
    );
  }

  function renderTableData(data: Sale[]) {
    return data.map((sale: Sale, index) => {
      return (
        <>
          <tr key={`sale-${sale.invoice_number}`}>
            <td>{sale.invoice_number.padStart(10, "0")}</td>
            <td>{sale.customer_name}</td>
            <td>{sale.vendor_name}</td>
            <td>{format(new Date(sale.date_time), "dd/MM/yyyy - HH:mm")}</td>
            <td>
              {sale.total_value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td style={{ display: "flex", justifyContent: "center" }}>
              <OptionButton action={() => toggleProductTable(index)}>
                {index === tableIndexToToggle ? "Fechar" : "Ver itens"}
              </OptionButton>
              <OptionButton action={() => editSaleAction(sale)}>
                <IconEdit />
              </OptionButton>
              <OptionButton exclude action={() => deleteSaleAction(sale)}>
                <IconTrashFilled />
              </OptionButton>
            </td>
          </tr>
          {index === tableIndexToToggle ? (
            <tr key={`products-${sale.invoice_number}`}>
              <td colSpan={6}>
                <ProductTable
                  onTableSaleProducts={onTableSaleProducts}
                  setOnTableSaleProducts={setOnTableSaleProducts}
                  saleProducts={onTableSaleProducts}
                  showCommissionRate
                  resumeLine
                />
              </td>
            </tr>
          ) : (
            false
          )}
        </>
      );
    });
  }

  function toggleProductTable(tableIndex: number) {
    if (tableIndex === tableIndexToToggle) {
      setTableIndexToToggle(-1);
    } else {
      setTableIndexToToggle(tableIndex);
      loadSaleProductsTable(
        salesData[tableIndex],
        productsData,
        setOnTableSaleProducts
      );
    }
  }

  function editSaleAction(sale: Sale) {
    setSelectedSale(sale);
  }

  useEffect(() => {
    if (selectedSale !== null) router.push("/vendas/alterar");
  }, [selectedSale, router]);

  function deleteSaleAction(sale: Sale) {
    console.log(`DELETANDO VENDA ${sale.url}...`);

    fetch(sale.url, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setDisplayedMessagePopup("VENDA REMOVIDA COM SUCESSO!");
          setSalesData(salesData.filter((currSale) => currSale != sale));
        } else {
          console.error("Erro ao deletar venda", response);
        }
      })
      .catch((error) => console.error(error));
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
        overflow: "auto",
      }}
    >
      {renderTable(headers, salesData)}
    </div>
  );
}
