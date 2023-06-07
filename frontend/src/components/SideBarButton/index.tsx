import { IconChevronRight } from "@tabler/icons-react"
import styles from "./SideBarButton.module.css"


export default function SideBarButton({ children }: any) {

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
    alignItems: "center",
    width: "100%",
    cursor: "pointer",
  }

  return (
    <div style={containerStyle}>

      <span style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        { children }
      </span>

      <span style={{color: "##DADADA", fontWeight: "bold"}}>
        <IconChevronRight />
      </span>

    </div>
  )
}
