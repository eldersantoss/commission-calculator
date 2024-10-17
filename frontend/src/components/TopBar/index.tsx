import useAppContext from "@/hooks/useAppContext";
import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

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
      <div style={{ position: "absolute", top: "16px", left: "50px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{
              cursor: "pointer",
              marginRight: "30px",
              fontWeight: "bolder",
              border: "none",
            }}
            onClick={toggleSideBar}
            aria-label="Expandir SideBar"
          >
            <IconMenu2 stroke={"3"} />
          </button>

          <Link href="/">
            <Image
              src="/logo.svg"
              width={202}
              height={58}
              alt="Logo"
              priority
            />
          </Link>
        </div>
      </div>

      <h1 style={{ position: "absolute", top: "25px", left: "46%" }}>
        {pageTitle}
      </h1>
    </header>
  );
}
