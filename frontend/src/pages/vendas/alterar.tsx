import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";
import useAppContext from "@/hooks/useAppContext";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Container from "@/components/Container";
import MainContent from "@/components/MainContent";
import useSalesDataContext from "@/hooks/useSalesDataContext";
import ProductForm from "@/components/ProductForm";
import SaleForm, { getPersonSelectOptions } from "@/components/SaleForm";
import ProductTable from "@/components/ProductTable";
import VerticalSpacer from "@/components/VerticalSpacer";
import MainButton from "@/components/MainButton";
import { useRouter } from "next/router";
import {
  Person,
  Product,
  Sale,
  SaleProduct,
  SaleProductURL,
} from "@/contexts/SalesDataContext";
import SaleResume from "@/components/SaleResume";
import { parse, formatISO, format } from "date-fns";
import { Option } from "@/components/SelectInput";
import settings from "@/railway/config";

export default function CreateEditSalePage() {
  const { setPageTitle, openSideBar, setDisplayedMessagePopup } =
    useAppContext();
  const {
    selectedSale,
    setSelectedSale,
    vendorsData,
    customersData,
    productsData,
  } = useSalesDataContext();
  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);
  const [timeStampValue, setTimeStampValue] = useState("");

  const [productSelectedOption, setProductSelectedOption] = useState<Option>({
    value: "",
    label: "",
  });
  const [customerSelectedOption, setCustomerSelectedOption] = useState<Option>({
    value: "",
    label: "",
  });
  const [vendorSelectedOption, setVendorSelectedOption] = useState<Option>({
    value: "",
    label: "",
  });

  const [onTableSaleProducts, setOnTableSaleProducts] = useState<SaleProduct[]>(
    []
  );

  const [finishButtonDisabled, setFinishButtonDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    const buttonEnabled =
      timeStampValue !== "" &&
      customerSelectedOption.value !== "" &&
      vendorSelectedOption.value !== "" &&
      onTableSaleProducts.length > 0;
    setFinishButtonDisabled(!buttonEnabled);
  }, [
    timeStampValue,
    customerSelectedOption,
    vendorSelectedOption,
    onTableSaleProducts,
  ]);

  useEffect(() => {
    if (selectedSale !== null) {
      loadSaleData(
        selectedSale,
        productsData,
        setOnTableSaleProducts,
        setTimeStampValue,
        vendorsData,
        setVendorSelectedOption,
        customersData,
        setCustomerSelectedOption
      );
      setPageTitle(`Alterar Venda - Nº ${selectedSale?.invoice_number}`);
    } else {
      setPageTitle("Nova Venda");
    }
  }, [
    setPageTitle,
    selectedSale,
    productsData,
    setOnTableSaleProducts,
    setTimeStampValue,
    vendorsData,
    setVendorSelectedOption,
    customersData,
    setCustomerSelectedOption,
  ]);

  function createOrUpdateSale(
    timeStampValue: string,
    selectedCustomerURL: string,
    selectedVendorURL: string,
    onTableSaleProducts: SaleProduct[],
    selectedSale: Sale | null
  ) {
    let url = `${settings.API_URL}/api/v1/sales`;
    let method = "";
    let messagePopupContent = "";

    if (selectedSale) {
      url += `/${selectedSale.id}/`;
      method = "PUT";
      messagePopupContent = "VENDA ALTERADA COM SUCESSO!";
    } else {
      method = "POST";
      messagePopupContent = "VENDA REALIZADA COM SUCESSO!";
    }

    const products = onTableSaleProducts.map((saleProduct) => ({
      product: saleProduct.product.url,
      quantity: saleProduct.quantity,
    }));

    const date_time = formatISO(
      parse(timeStampValue, "dd/MM/yyyy - HH:mm", new Date())
    );

    const saleData = {
      date_time,
      customer: selectedCustomerURL,
      vendor: selectedVendorURL,
      products,
    };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saleData),
    })
      .then((response) => {
        if (response.ok) {
          router.push("/");
          setSelectedSale(null);
          setDisplayedMessagePopup(messagePopupContent);
        } else {
          console.error("Erro ao criar ou editar venda", response);
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <TopBar />
      <Container>
        {openSideBar && <SideBar />}
        <MainContent>
          <div style={{ display: "flex", width: "100%", height: "100%" }}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "65%" }}
            >
              <ProductForm
                productsData={productsData}
                onTableSaleProducts={onTableSaleProducts}
                setOnTableSaleProducts={setOnTableSaleProducts}
                productSelectedOption={productSelectedOption}
                setProductSelectedOption={setProductSelectedOption}
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <ProductTable
                onTableSaleProducts={onTableSaleProducts}
                setOnTableSaleProducts={setOnTableSaleProducts}
                saleProducts={onTableSaleProducts}
                allowEdit
              />
            </div>
            <VerticalSpacer />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "35%",
                height: "100%",
              }}
            >
              <SaleForm
                timeStampValue={timeStampValue}
                setTimeStampValue={setTimeStampValue}
                vendorSelectedOption={vendorSelectedOption}
                setVendorSelectedOption={setVendorSelectedOption}
                customerSelectedOption={customerSelectedOption}
                setCustomerSelectedOption={setCustomerSelectedOption}
              />
              <SaleResume onTableSaleProducts={onTableSaleProducts} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <MainButton
                  content={"Cancelar"}
                  action={() => {
                    setSelectedSale(null);
                    router.push("/");
                  }}
                />
                <MainButton
                  disabled={finishButtonDisabled}
                  content={"Finalizar"}
                  action={() => {
                    createOrUpdateSale(
                      timeStampValue,
                      customerSelectedOption.value,
                      vendorSelectedOption.value,
                      onTableSaleProducts,
                      selectedSale
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </MainContent>
      </Container>
    </div>
  );
}

function loadSaleData(
  selectedSale: Sale,
  productsData: Product[],
  setOnTableSaleProducts: Dispatch<SetStateAction<SaleProduct[]>>,
  setTimeStampValue: Dispatch<SetStateAction<string>>,
  vendorsData: Person[],
  setVendorSelectedOption: Dispatch<SetStateAction<Option>>,
  customersData: Person[],
  setCustomerSelectedOption: Dispatch<SetStateAction<Option>>
) {
  loadSaleProductsTable(selectedSale, productsData, setOnTableSaleProducts);
  loadTimeStampInputValue(selectedSale.date_time, setTimeStampValue);
  loadPersonInput(selectedSale.vendor, vendorsData, setVendorSelectedOption);
  loadPersonInput(
    selectedSale.customer,
    customersData,
    setCustomerSelectedOption
  );
}

export function loadSaleProductsTable(
  selectedSale: Sale,
  productsData: Product[],
  setOnTableSaleProducts: Dispatch<SetStateAction<SaleProduct[]>>
) {
  const selectedSaleProducts: SaleProductURL[] = selectedSale.products.map(
    (product) => ({ product: product.product, quantity: product.quantity })
  );

  const saleProductsToAdddOnTable: SaleProduct[] = selectedSaleProducts
    .map((selectedSaleProduct) => {
      const product = productsData.find(
        (product) => product.url === selectedSaleProduct.product
      );
      if (product) return { product, quantity: selectedSaleProduct.quantity };
      return null;
    })
    .filter((saleProduct): saleProduct is SaleProduct => saleProduct !== null);

  setOnTableSaleProducts(saleProductsToAdddOnTable);
}

function loadTimeStampInputValue(
  timeStampValue: string,
  setTimeStampValue: Dispatch<SetStateAction<string>>
) {
  setTimeStampValue(format(new Date(timeStampValue), "dd/MM/yyyy - HH:mm"));
}

function loadPersonInput(
  personURL: string,
  personData: Person[],
  setOptionFunction: Dispatch<SetStateAction<Option>>
) {
  const personOption = getPersonSelectOptions(
    personData.filter((person) => person.url === personURL)
  );
  setOptionFunction(personOption.pop() ?? { value: "", label: "" });
}
