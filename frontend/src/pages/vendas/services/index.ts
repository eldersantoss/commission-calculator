import { fetchResourceData } from "@/infra/api/utils";
import { Dispatch, SetStateAction } from "react";
import { Person, Product, Sale } from "../contexts/SalesDataContext";

export const fetchSalesData = (
  setSalesData: Dispatch<SetStateAction<Sale[]>>
) => fetchResourceData("/sales/", setSalesData);

export const fetchVendorsData = (
  setVendorsData: Dispatch<SetStateAction<Person[]>>
) => fetchResourceData("/persons/vendors/", setVendorsData);

export const fetchCustomersData = (
  setCustomerData: Dispatch<SetStateAction<Person[]>>
) => fetchResourceData("/persons/customers/", setCustomerData);

export const fetchProductsData = (
  setProductsData: Dispatch<SetStateAction<Product[]>>
) => fetchResourceData("/products/", setProductsData);
