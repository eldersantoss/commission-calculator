interface PageSubtitleProps {
  text: string;
}

export default function PageSubtitle({ text }: PageSubtitleProps) {
  return (
    <h3
      style={{
        fontSize: "24px",
        fontWeight: "600",
        color: "#00585E",
      }}
    >
      {text}
    </h3>
  );
}
