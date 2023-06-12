import { Dispatch, SetStateAction, useEffect, useState } from "react";
import MainButton from "../MainButton";
import SelectInput, { Option } from "../SelectInput";
import { Product, SaleProduct } from "@/contexts/SalesDataContext";

interface ProductFormProps {
  productsData: Product[];
  onTableSaleProducts: SaleProduct[];
  setOnTableSaleProducts: Dispatch<SetStateAction<SaleProduct[]>>;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  productSelectedOption: Option;
  setProductSelectedOption: Dispatch<SetStateAction<Option>>;
}

export default function ProductForm({
  productsData,
  onTableSaleProducts,
  setOnTableSaleProducts,
  productSelectedOption,
  setProductSelectedOption,
  quantity,
  setQuantity,
}: ProductFormProps) {
  const [productOptions, setProductOptions] = useState<Option[]>([]);

  useEffect(() => {
    setProductOptions(getProductSelectOptions(productsData));
  }, [productsData]);

  function getProductSelectOptions(products: Product[]): Option[] {
    if (!products) return [];

    return products.map((product) => {
      return {
        value: product.url,
        label: `${product.code.toString().padStart(3, "0")} - ${
          product.description
        }`,
      };
    });
  }

  function addProductToSale(
    selectedProductURL: string,
    quantity: number,
    productsData: Product[]
  ) {
    const productAlreadyInTable = onTableSaleProducts.find(
      (saleProduct) => saleProduct.product.url === selectedProductURL
    );

    productAlreadyInTable
      ? updateProductAlreadyInTabel(productAlreadyInTable, quantity)
      : addNewProductToTable(selectedProductURL, quantity, productsData);
  }

  function updateProductAlreadyInTabel(
    productAlreadyInTable: SaleProduct,
    quantity: number
  ) {
    const newQuantity = productAlreadyInTable.quantity + quantity;
    const updatedProduct: SaleProduct = {
      ...productAlreadyInTable,
      quantity: newQuantity,
    };

    setOnTableSaleProducts([
      ...onTableSaleProducts.filter(
        (saleProduct) =>
          saleProduct.product.url !== productAlreadyInTable.product.url
      ),
      updatedProduct,
    ]);
  }

  function addNewProductToTable(
    selectedProductURL: string,
    quantity: number,
    productsData: Product[]
  ) {
    const productToAppendInTable = productsData.find(
      (product) => product.url === selectedProductURL
    );

    productToAppendInTable
      ? setOnTableSaleProducts([
          ...onTableSaleProducts,
          { product: productToAppendInTable, quantity },
        ])
      : console.error("Produto não encontrado");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: "70px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Produtos</h2>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <div style={{ display: "flex", flexDirection: "column", width: "60%" }}>
          <label htmlFor="productSearch" style={{ marginBottom: "10px" }}>
            Buscar pelo código de barras ou descrição
          </label>
          <SelectInput
            inputId="vendor-select"
            options={productOptions}
            onChange={(option: Option) => setProductSelectedOption(option)}
            placeholder="Digite o código ou nome do produto"
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "0 20px",
          }}
        >
          <label htmlFor="numberOfItems" style={{ marginBottom: "10px" }}>
            Quantidade de itens
          </label>
          <input
            type="text"
            name="numberOfItems"
            id="numberOfItems"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
            style={{
              padding: "12px 14px",
              border: "1px solid #C4C4C4",
              borderRadius: "3px",
            }}
          />
        </div>

        <MainButton
          content={"Adicionar"}
          action={() => {
            addProductToSale(
              productSelectedOption.value,
              quantity,
              productsData
            );
          }}
        />
      </div>
    </div>
  );
}
