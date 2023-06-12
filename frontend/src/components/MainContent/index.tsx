import { ReactNode } from "react";


interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps ) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "50px",
      height: "100%",
      width: "100%"
    }}>
      {children}
    </div>
  )
}
