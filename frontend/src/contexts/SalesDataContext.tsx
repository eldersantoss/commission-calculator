import {
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useCallback,
} from "react";

export interface Product {
  code: number;
  url: string;
  description: string;
  unit_price: string;
  commission_rate: string;
}

export interface SaleProduct {
  product: Product;
  quantity: number;
}

export interface SaleProductURL {
  product: string;
  quantity: number;
}

export interface Person {
  id: number;
  name: string;
  url: string;
}

export interface Sale {
  id: number;
  url: string;
  invoice_number: string;
  date_time: string;
  customer: string;
  customer_name: string;
  vendor: string;
  vendor_name: string;
  products: SaleProductURL[];
  total_value: number;
}

export interface SalesDataContextProps {
  salesData: Sale[];
  setSalesData: Dispatch<SetStateAction<Sale[]>>;
  fetchSalesData: () => void;
  vendorsData: Person[];
  fetchVendorsData: () => void;
  customersData: Person[];
  fetchCustomersData: () => void;
  productsData: Product[];
  fetchProductsData: () => void;
  selectedSale: Sale | null;
  setSelectedSale: Dispatch<SetStateAction<Sale | null>>;
}

export const SalesDataContext = createContext<SalesDataContextProps>({
  salesData: [],
  setSalesData: () => {},
  fetchSalesData: () => {},
  vendorsData: [],
  fetchVendorsData: () => {},
  customersData: [],
  fetchCustomersData: () => {},
  productsData: [],
  fetchProductsData: () => {},
  selectedSale: null,
  setSelectedSale: () => {},
});

export function SalesDataProvider({ children }: any) {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [vendorsData, setVendorsData] = useState<Person[]>([]);
  const [customersData, setCustomerData] = useState<Person[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const fetchSalesData = useCallback(
    () => fetchResourceData("sales/", setSalesData)(),
    []
  );

  const fetchVendorsData = useCallback(
    () => fetchResourceData("persons/vendors/", setVendorsData)(),
    []
  );

  const fetchCustomersData = useCallback(
    () => fetchResourceData("persons/customers/", setCustomerData)(),
    []
  );

  const fetchProductsData = useCallback(
    () => fetchResourceData("products/", setProductsData)(),
    []
  );

  function fetchResourceData(
    resource: string,
    setResource: (value: any[]) => void
  ) {
    return () => {
      const url = new URL(`${process.env.API_URL}/api/v1/${resource}/`);
      fetch(url)
        .then((response) => response.json())
        .then((data) => setResource(data?.results ?? []))
        .catch((error) => console.error(error));
    };
  }

  const values = {
    salesData,
    vendorsData,
    customersData,
    setSalesData,
    fetchSalesData,
    fetchVendorsData,
    fetchCustomersData,
    productsData,
    fetchProductsData,
    selectedSale,
    setSelectedSale,
  };

  return (
    <SalesDataContext.Provider value={values}>
      {children}
    </SalesDataContext.Provider>
  );
}
