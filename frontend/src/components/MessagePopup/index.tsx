import useAppContext from "@/hooks/useAppContext";
import { useEffect } from "react";
import { IconSquareRoundedXFilled } from "@tabler/icons-react";

export default function MessagePopup() {
  const { displayedMessagePopup, setDisplayedMessagePopup } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedMessagePopup("");
    }, 7500);
    return () => clearTimeout(timer);
  }, [setDisplayedMessagePopup]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#B7E0D1",
        padding: "25px 116px",
        borderRadius: "5px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.12)",
        position: "relative",
      }}
    >
      <p style={{ fontSize: "24px", fontWeight: "600" }}>
        {displayedMessagePopup}
      </p>
      <IconSquareRoundedXFilled
        style={{
          position: "absolute",
          right: "10",
          top: "10",
          cursor: "pointer",
        }}
        onClick={() => {
          setDisplayedMessagePopup("");
        }}
      />
    </div>
  );
}
