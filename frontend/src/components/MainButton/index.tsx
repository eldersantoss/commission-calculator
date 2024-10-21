import { ReactNode, useEffect, useState } from "react";
import styles from "./MainButton.module.css";

interface MainButtonProps {
  content: ReactNode;
  action?: () => void;
  disabled?: boolean;
  ghost?: boolean;
}

export default function MainButton({
  content,
  action,
  disabled,
  ghost,
}: MainButtonProps) {
  const primaryBgColor = ghost ? "#FFFFFF" : "#00585E";
  const primaryFontColor = ghost ? "#067f87" : "#FFFFFF";
  const borderStyle = ghost ? "1px solid #067f87" : "none";
  const onHoverColor = ghost ? "#FFFFFF" : "#067f87";

  const [buttonBackgroundColor, setButtonBackgroundColor] = useState(
    disabled ? "#BBD3D5" : primaryBgColor
  );

  useEffect(() => {
    setButtonBackgroundColor(disabled ? "#BBD3D5" : primaryBgColor);
  }, [disabled, primaryBgColor]);

  const handleMouseOver = () => {
    setButtonBackgroundColor(disabled ? "#BBD3D5" : onHoverColor);
  };

  const handleMouseOut = () => {
    setButtonBackgroundColor(disabled ? "#BBD3D5" : primaryBgColor);
  };

  const style = {
    backgroundColor: buttonBackgroundColor,
    color: primaryFontColor,
    border: borderStyle,
    transition: "background-color 0.3s",
  };

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
