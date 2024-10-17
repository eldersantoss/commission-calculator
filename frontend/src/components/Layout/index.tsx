import useAppContext from "@/hooks/useAppContext";
import { ReactNode } from "react";
import MainContent from "../MainContent";
import SideBar from "../SideBar";
import TopBar from "../TopBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { openSideBar } = useAppContext();

  return (
    <>
      <TopBar />

      <main
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
        }}
      >
        {openSideBar && <SideBar />}

        <MainContent>{children}</MainContent>
      </main>
    </>
  );
}
