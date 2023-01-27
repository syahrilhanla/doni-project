import React from "react";
import Navbar from "../Navbar/Navbar";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import FilterSection from "./FilterSection";

export default function LayoutAdmin(props: any) {
  return (
    <div className="text-center flex flex-col min-h-screen relative">
      <Navbar />
      <div className="w-full min-h-[90vh] flex flex-row">
        <span className="hidden sm:block">
          <SidebarAdmin />
        </span>
        <div className="w-full flex flex-col items-center p-4">
          {props.children}
        </div>
      </div>
    </div>
  );
}
