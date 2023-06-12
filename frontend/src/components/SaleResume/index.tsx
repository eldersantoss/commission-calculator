import { SaleProduct } from "@/contexts/SalesDataContext";

interface SaleResumeProps {
  onTableSaleProducts: SaleProduct[];
}

export default function SaleResume({ onTableSaleProducts }: SaleResumeProps) {
  function getTotalSaleValue(onTableSaleProducts: SaleProduct[]) {
    const totalValue = onTableSaleProducts.reduce(
      (value, saleProduct) =>
        (value +=
          parseFloat(saleProduct.product.unit_price) * saleProduct.quantity),
      0
    );
    return totalValue;
  }

  return (
    <div style={{ justifyContent: "flex-end", margin: "300px 0 70px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p style={{ fontWeight: "600", fontSize: "18px" }}>
          Valor total da venda:
        </p>
        <p style={{ fontWeight: "800", fontSize: "28px" }}>
          {getTotalSaleValue(onTableSaleProducts).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </div>
  );
}
