import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import useAppContext from "@/hooks/useAppContext";

export default function TopBar() {
  const { pageTitle, toggleSideBar } = useAppContext();

  return (
    <header
      style={{
        position: "relative",
        width: "100vw",
        height: "87px",
        backgroundColor: "#F0F0F0",
        color: "#00585E",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.12)",
      }}
    >
      <span style={{ position: "absolute", top: "16px", left: "50px" }}>
        <span style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              cursor: "pointer",
              marginRight: "30px",
              fontWeight: "bolder",
            }}
            onClick={toggleSideBar}
          >
            <IconMenu2 stroke={"3"} />
          </span>
          <span>
            <Image
              src="/logo.svg"
              width={202}
              height={58}
              alt="Logo"
              priority
            />
          </span>
        </span>
      </span>

      <h1 style={{ position: "absolute", top: "16px", left: "46%" }}>
        {pageTitle}
      </h1>
    </header>
  );
}
