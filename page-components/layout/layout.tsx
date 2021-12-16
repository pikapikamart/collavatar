import { ReactNode } from "react";
import HTMLHead from "./head";
import { Header } from "@/components/layout/header";


interface LayoutChildren {
  children: ReactNode
}

const Layout = ({ children }: LayoutChildren) =>{
  return (
    <>
      <HTMLHead />
      <Header />
      {children}
    </>
  );
}


export default Layout;