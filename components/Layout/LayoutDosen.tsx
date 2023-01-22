import React from "react";
import Navbar from "../Navbar/Navbar";
import SidebarDosen from "../Sidebar/SidebarDosen";

export default function LayoutDosen(props: any) {
  return (
    <div className="text-center flex flex-col min-h-screen relative">
      <Navbar />
      <div className="w-full min-h-[90vh] flex flex-row">
        <span className="hidden sm:block">
          <SidebarDosen />
        </span>
        <div className="w-full">{props.children}</div>
      </div>
    </div>
  );
}
