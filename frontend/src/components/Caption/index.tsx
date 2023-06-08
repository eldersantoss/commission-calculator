interface SubTitleProps {
  text: string
}

export default function Caption( { text }: SubTitleProps) {
  return (
    <h3 style={{
       fontSize: "24px",
       fontWeight: "600",
       color: "#00585E"
    }}>
      { text }
    </h3>
  )
}
