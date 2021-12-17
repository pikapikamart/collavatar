import { ReactNode } from "react";
import HTMLHead from "./head";
import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";


interface LayoutChildren {
  children: ReactNode
}

const Layout = ({ children }: LayoutChildren) =>{
  return (
    <>
      <HTMLHead />
      <Header />
      {/* add sidebar in here */}
      <div className="interface-wrapper">
        <Sidebar />
        {children}
      </div>
    </>
  );
}


export default Layout;