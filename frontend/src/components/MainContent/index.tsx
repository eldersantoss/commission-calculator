import { ReactNode } from "react";

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "25px 50px",
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      {children}
    </div>
  );
}
