import Header from "@/Component/Header";
import Sidebar from "@/Component/Sidebar";
import React from "react";
import { useSelector } from "react-redux";

function Index({ children }) {
  const { sidebar } = useSelector((state) => state.fetchdata);

  return (
    <div className="axyz">
      <Header />
      <Sidebar />
      <div className={`other-component ${sidebar ? "" : "com-pde"}`}>
        {children}
      </div>
    </div>
  );
}

export default Index;
