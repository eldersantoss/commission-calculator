import { ReactNode } from "react";

interface SubtitleContainerProps {
  children: ReactNode;
}

export default function SubtitleContainer({
  children,
}: SubtitleContainerProps) {
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
