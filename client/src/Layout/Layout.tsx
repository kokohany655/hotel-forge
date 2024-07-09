import React from "react";
import Header from "../Components/layout/Header";
import Hero from "../Components/layout/Hero";
import Footer from "../Components/layout/Footer";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const pathName = location.pathname;
  return (
    <div className=" flex flex-col min-h-screen">
      <Header />
      {pathName === "/" && <Hero />}

      <div className=" container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
