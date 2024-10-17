import { AppProvider } from "@/contexts/AppContext";
import { SalesDataProvider } from "@/pages/vendas/contexts/SalesDataContext";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <SalesDataProvider>
          <Component {...pageProps} />
        </SalesDataProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}
