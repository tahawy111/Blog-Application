import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import Loading from "../Loading";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <Loading />
      <Header />
      <div style={{ height: "calc(100vh - 195px)" }}> {children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
