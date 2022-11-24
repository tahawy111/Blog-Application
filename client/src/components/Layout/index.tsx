import React from "react";
import Header from "../Header";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
