import SalesPage from "./vendas";

export default function Home() {
  console.log("VARIÁVEIS DE AMBIENTE:", process.env);

  return <SalesPage />;
}
