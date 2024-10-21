import { SaleProduct } from "@/pages/vendas/contexts/SalesDataContext";

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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <p style={{ fontWeight: "400" }}>Valor total da venda:</p>
      <p style={{ fontWeight: "600" }}>
        {getTotalSaleValue(onTableSaleProducts).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  );
}
