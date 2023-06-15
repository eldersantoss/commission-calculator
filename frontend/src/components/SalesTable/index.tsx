import useSalesDataContext from "@/hooks/useSalesDataContext";
import TableHeader from "../TableHeader";
import styles from "./SalesTable.module.css";
import { useCallback, useEffect, useState } from "react";
import { IconEdit, IconTrashFilled } from "@tabler/icons-react";
import OptionButton from "../OptionButton";
import { format } from "date-fns";
import { Sale, SaleProduct } from "@/contexts/SalesDataContext";
import { useRouter } from "next/router";
import useAppContext from "@/hooks/useAppContext";
import ProductTable from "../ProductTable";
import { loadSaleProductsTable } from "@/pages/vendas/alterar";
import DeleteConfirmModal from "../DeleteConfirmModal";

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

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [confirmSaleDeletion, setConfirmSaleDeletion] = useState(false);

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
    setSelectedSale(sale);
  }

  useEffect(() => {
    if (selectedSale !== null) router.push("/vendas/alterar");
  }, [selectedSale, router]);

  const closeModal = () => {
    setIsVisibleModal(false);
  };

  const openModal = (sale: Sale) => {
    setIsVisibleModal(true);
    setSaleToDelete(sale);
  };

  const removeSale = () => {
    setConfirmSaleDeletion(true);
  };

  const deleteSale = useCallback(
    (sale: Sale) => {
      fetch(sale.url.replace("http", "https"), { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setDisplayedMessagePopup("VENDA REMOVIDA COM SUCESSO!");
            setSalesData(salesData.filter((currSale) => currSale != sale));
            setConfirmSaleDeletion(false);
            setIsVisibleModal(false);
            setSaleToDelete(null);
          } else {
            console.error("Erro ao deletar venda", response);
          }
        })
        .catch((error) => console.error(error));
    },
    [salesData, setDisplayedMessagePopup, setSalesData]
  );

  useEffect(() => {
    confirmSaleDeletion && saleToDelete && deleteSale(saleToDelete);
  }, [saleToDelete, deleteSale, confirmSaleDeletion]);

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
              <OptionButton exclude action={() => openModal(sale)}>
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
      {isVisibleModal ? (
        <DeleteConfirmModal closeModal={closeModal} removeSale={removeSale} />
      ) : (
        false
      )}
    </div>
  );
}
