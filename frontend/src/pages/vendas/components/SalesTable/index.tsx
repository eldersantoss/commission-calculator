import useAppContext from "@/hooks/useAppContext";
import { loadSaleProductsTable } from "@/pages/vendas/alterar";
import { Sale, SaleProduct } from "@/pages/vendas/contexts/SalesDataContext";
import useSalesDataContext from "@/pages/vendas/hooks/useSalesDataContext";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DeleteConfirmModal from "../../../../components/DeleteConfirmModal";
import OptionButton from "../../../../components/OptionButton";
import TableHeader from "../../../../components/TableHeader";
import ProductTable from "../ProductTable";
import styles from "./SalesTable.module.css";

export default function SaleTable() {
  const { setDisplayedMessagePopup } = useAppContext();
  const {
    salesData,
    fetchSalesData,
    selectedSale,
    productsData,
    fetchProductsData,
    selectSale,
  } = useSalesDataContext();

  const [tableIndexToToggle, setTableIndexToToggle] = useState(-1);
  const [onTableSaleProducts, setOnTableSaleProducts] = useState<SaleProduct[]>(
    []
  );
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);

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

  function editSaleAction(sale: Sale) {
    selectSale(sale);
  }

  useEffect(() => {
    if (selectedSale !== null) router.push("/vendas/alterar");
  }, [selectedSale, router]);

  // TODO: fix - should replace http by https only in production env
  function removeSale(sale: Sale) {
    fetch(sale.url, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          setDisplayedMessagePopup("VENDA REMOVIDA COM SUCESSO!");
          fetchSalesData();
          setSaleToDelete(null);
        } else {
          console.error("Erro ao deletar venda", response);
        }
      })
      .catch((error) => console.error(error));
  }

  function renderTable(headers: string[], data: any[]) {
    return (
      <table className={styles.mainTable}>
        <TableHeader headers={headers}></TableHeader>
        <tbody>{renderTableData(data)}</tbody>
      </table>
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
              <OptionButton exclude action={() => setSaleToDelete(sale)}>
                <IconTrashFilled />
              </OptionButton>
            </td>
          </tr>

          {index === tableIndexToToggle && (
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

  return (
    <>
      {renderTable(headers, salesData)}

      {saleToDelete && (
        <DeleteConfirmModal
          closeModal={() => setSaleToDelete(null)}
          removeSale={() => removeSale(saleToDelete)}
        />
      )}
    </>
  );
}
