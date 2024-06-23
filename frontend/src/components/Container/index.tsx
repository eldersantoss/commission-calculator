import useAppContext from "@/hooks/useAppContext";
import { ReactNode } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  const { openSideBar } = useAppContext();

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
      }}
    >
      <TopBar />
      <div
        style={{
          display: "flex",
          height: "100%",
        }}
      >
        {openSideBar && <SideBar />}
        {children}
      </div>
    </main>
  );
}
