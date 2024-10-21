import { IconX } from "@tabler/icons-react";
import MainButton from "../MainButton";

interface DeleteConfirmModalProps {
  closeModal: () => void;
  removeSale: () => void;
}

export default function DeleteConfirmModal({
  closeModal,
  removeSale,
}: DeleteConfirmModalProps) {
  return (
    <div
      style={{
        marginTop: "25vh",
        width: "485px",
        height: "245px",
        boxShadow: "2px 5px 10px 5px rgba(0, 0, 0, 0.1)",
        padding: "13px 16px",
        borderRadius: "4px",
        position: "absolute",
        left: "50%",
        right: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #DADADA",
          padding: "5px 0 15px",
          fontWeight: "600",
          fontSize: "18px",
        }}
      >
        <span>Remover Venda</span>
        <span>
          <IconX
            style={{ cursor: "pointer" }}
            stroke={3}
            width={22}
            onClick={closeModal}
          />
        </span>
      </div>
      <span
        style={{
          display: "flex",
          flexGrow: "1",
          padding: "25px 0 0 10px",
          borderBottom: "1px solid #DADADA",
          width: "100%",
        }}
      >
        Deseja remover esta venda?
      </span>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <MainButton content={"Não"} ghost action={closeModal} />
          <MainButton content={"Sim"} action={removeSale} />
        </div>
      </div>
    </div>
  );
}
