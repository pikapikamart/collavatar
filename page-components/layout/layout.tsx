import { ReactNode } from "react";
import HTMLHead from "./head";


interface LayoutChildren {
  children: ReactNode
}

const Layout = ({ children }: LayoutChildren) =>{
  return (
    <>
      <HTMLHead />
      {children}
    </>
  );
}


export default Layout;