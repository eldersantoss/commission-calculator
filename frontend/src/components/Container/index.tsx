import { ReactNode } from "react";


interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps ) {
  return (
    <main style={{
      display: "flex",
      height: "100vh",
      width: "100vw",
    }}>
      {children}
    </main>
  )
}
