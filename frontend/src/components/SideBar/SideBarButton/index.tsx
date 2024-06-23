import { IconChevronRight } from "@tabler/icons-react";
import { ReactNode } from "react";

interface SideBarButtonProps {
  children: ReactNode;
  action: () => void;
}

export default function SideBarButton({
  children,
  action,
}: SideBarButtonProps) {
  const containerStyle = {
    backgroundColor: "#fff",
    color: "#2B7D83",
    fontWeight: "800",
    fontSize: "15px",
    lineHeight: "133.19%",
    marginTop: "3px",
    padding: "11px 7px 11px 32px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    cursor: "pointer",
    border: "none",
  };

  return (
    <button style={containerStyle} onClick={action}>
      <span style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {children}
      </span>
      <span style={{ color: "##DADADA", fontWeight: "bold" }}>
        <IconChevronRight stroke={4} color="#DADADA" />
      </span>
    </button>
  );
}
