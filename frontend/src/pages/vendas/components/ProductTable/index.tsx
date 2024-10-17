import { SaleProduct } from "@/pages/vendas/contexts/SalesDataContext";
import { IconTrashFilled } from "@tabler/icons-react";
import { Dispatch, SetStateAction } from "react";

interface ProductTableProps {
  saleProducts: SaleProduct[];
  onTableSaleProducts: SaleProduct[];
  setOnTableSaleProducts: Dispatch<SetStateAction<SaleProduct[]>>;
  showCommissionRate?: boolean;
  allowEdit?: boolean;
  resumeLine?: boolean;
}

export default function ProductTable({
  saleProducts,
  onTableSaleProducts,
  setOnTableSaleProducts,
  showCommissionRate,
  allowEdit,
  resumeLine,
}: ProductTableProps) {
  const baseHeaders = [
    "Produto/Serviço",
    "Quantidade",
    "Preço unitário",
    "Total",
  ];

  let headers: string[] = [];

  showCommissionRate
    ? (headers = [...baseHeaders, "% de Comissão", "Comissão"])
    : (headers = [...baseHeaders]);

  function renderTableHeader(headers: string[]) {
    return (
      <tr style={{ borderBottom: "1px solid #888888" }}>
        {headers.map((header, index) => (
          <th
            key={index}
            style={{
              padding: "10px",
              textAlign: `${index == 0 ? "left" : "center"}`,
            }}
          >
            {header}
          </th>
        ))}
      </tr>
    );
  }

  function renderProducts(saleProducts: SaleProduct[]) {
    return (
      <>
        {saleProducts.map((saleProduct, index) => (
          <tr key={index} style={{ textAlign: "center" }}>
            <td
              style={{
                padding: "5px 10px",
                textAlign: "left",
              }}
            >
              {saleProduct.product.code} - {saleProduct.product.description}
            </td>
            <td style={{ padding: "5px 10px" }}>{saleProduct.quantity}</td>
            <td style={{ padding: "5px 10px" }}>
              {parseFloat(
                saleProduct.product.unit_price.toString()
              ).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            <td style={{ padding: "5px 10px" }}>
              {(
                parseFloat(saleProduct.product.unit_price) *
                saleProduct.quantity
              ).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </td>
            {showCommissionRate && (
              <>
                <td style={{ padding: "5px 10px" }}>
                  {parseFloat(
                    saleProduct.product.commission_rate
                  ).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td style={{ padding: "5px 10px" }}>
                  {(
                    parseFloat(saleProduct.product.commission_rate) *
                    parseFloat(saleProduct.product.unit_price) *
                    saleProduct.quantity
                  ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>
              </>
            )}
            {allowEdit && (
              <td style={{ padding: "5px 10px" }}>
                <button
                  style={{
                    color: "#BE0000",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => removeProductFromTable(saleProduct)}
                >
                  <IconTrashFilled width={20} />
                </button>
              </td>
            )}
          </tr>
        ))}
      </>
    );
  }

  function renderResumeSaleLine(saleProducts: SaleProduct[]) {
    return (
      <tr style={{ color: "#003538", fontWeight: "bold" }}>
        <td
          style={{
            padding: "5px 10px",
            textAlign: "left",
          }}
        >
          Total da venda
        </td>
        <td>
          {saleProducts.reduce(
            (sum, saleProduct) => sum + saleProduct.quantity,
            0
          )}
        </td>
        <td></td>
        <td>
          {saleProducts
            .reduce(
              (sum, saleProduct) =>
                sum +
                parseFloat(saleProduct.product.unit_price) *
                  saleProduct.quantity,
              0
            )
            .toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
        </td>
        <td></td>
        <td>
          {saleProducts
            .reduce(
              (sum, saleProduct) =>
                sum +
                parseFloat(saleProduct.product.commission_rate) *
                  parseFloat(saleProduct.product.unit_price) *
                  saleProduct.quantity,
              0
            )
            .toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
        </td>
      </tr>
    );
  }

  function removeProductFromTable(saleProductToRemove: SaleProduct) {
    setOnTableSaleProducts([
      ...onTableSaleProducts.filter(
        (saleProduct) =>
          saleProduct.product.url !== saleProductToRemove.product.url
      ),
    ]);
  }

  return (
    <div>
      <table style={{ width: "100%" }}>
        <thead>{renderTableHeader(headers)}</thead>
        <tbody>
          {saleProducts && renderProducts(saleProducts)}
          {resumeLine && renderResumeSaleLine(saleProducts)}
        </tbody>
      </table>
    </div>
  );
}
