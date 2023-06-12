import { ReactNode } from "react";
import styles from "./SimpleButton.module.css";

interface SimpleButtonProps {
  children: ReactNode;
  action: () => void;
  exclude?: boolean;
}

export default function OptionButton({
  children,
  action,
  exclude = false,
}: SimpleButtonProps) {
  return (
    <button
      className={styles.button}
      style={{ color: exclude ? "#BE0000" : "#00585E" }}
      onClick={action}
    >
      {children}
    </button>
  );
}
