import { createContext, useCallback, useState } from "react";
import {
  fetchCustomersData,
  fetchProductsData,
  fetchSalesData,
  fetchVendorsData,
} from "../services";

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
  fetchSalesData: () => void;
  vendorsData: Person[];
  fetchVendorsData: () => void;
  customersData: Person[];
  fetchCustomersData: () => void;
  productsData: Product[];
  fetchProductsData: () => void;
  selectedSale: Sale | null;
  selectSale: (sale: Sale | null) => void;
}

export const SalesDataContext = createContext<SalesDataContextProps>({
  salesData: [],
  fetchSalesData: () => {},
  vendorsData: [],
  fetchVendorsData: () => {},
  customersData: [],
  fetchCustomersData: () => {},
  productsData: [],
  fetchProductsData: () => {},
  selectedSale: null,
  selectSale: () => {},
});

export function SalesDataProvider({ children }: any) {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [vendorsData, setVendorsData] = useState<Person[]>([]);
  const [customersData, setCustomerData] = useState<Person[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const values = {
    salesData,
    vendorsData,
    customersData,
    fetchSalesData: useCallback(() => fetchSalesData(setSalesData), []),
    fetchVendorsData: useCallback(() => fetchVendorsData(setVendorsData), []),
    fetchCustomersData: useCallback(
      () => fetchCustomersData(setCustomerData),
      []
    ),
    productsData,
    fetchProductsData: useCallback(
      () => fetchProductsData(setProductsData),
      []
    ),
    selectedSale,
    selectSale: (sale: Sale | null) => setSelectedSale(sale),
  };

  return (
    <SalesDataContext.Provider value={values}>
      {children}
    </SalesDataContext.Provider>
  );
}
