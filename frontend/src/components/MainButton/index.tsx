import { ReactNode, useEffect, useState } from "react";
import styles from "./MainButton.module.css";

interface MainButtonProps {
  content: ReactNode;
  action?: () => void;
  disabled?: boolean;
}

export default function MainButton({
  content,
  action,
  disabled,
}: MainButtonProps) {
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(
    disabled ? "#BBD3D5" : "#00585E"
  );

  useEffect(() => {
    setButtonBackgroundColor(disabled ? "#BBD3D5" : "#00585E");
  }, [disabled]);

  const handleMouseOver = () => {
    setButtonBackgroundColor(disabled ? "#BBD3D5" : "#067f87");
  };

  const handleMouseOut = () => {
    setButtonBackgroundColor(disabled ? "#BBD3D5" : "#00585E");
  };

  const style = { backgroundColor: buttonBackgroundColor };

  return (
    <button
      className={styles.button}
      onClick={!disabled ? action : () => {}}
      style={style}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {content}
    </button>
  );
}
