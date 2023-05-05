import Header from "@/Component/Header";
import Sidebar from "@/Component/Sidebar";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

function Index({ children }) {
  const { sidebar } = useSelector((state) => state.fetchdata);
const {locale } = useRouter()
  return (
    <div className={locale=="ar" ? "arabic-wrapper":""}>

    
    <div className="axyz">
      <Header />
      <Sidebar />
      <div className={`other-component ${sidebar ? "" : "com-pde"}`}>
        {children}
      </div>
      </div>
    </div>
  );
}

export default Index;
