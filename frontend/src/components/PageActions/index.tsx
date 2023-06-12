import { ReactNode } from "react";

interface PageActionsProps {
  children: ReactNode;
}

export default function PageActions({ children }: PageActionsProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "70px",
      }}
    >
      {children}
    </div>
  );
}
