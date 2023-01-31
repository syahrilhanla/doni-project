import React from "react";
import Navbar from "../Navbar/Navbar";
import ProtectedRoute from "../ProtectedRoute";
import SidebarDosen from "../Sidebar/SidebarDosen";
import FilterSection from "./FilterSection";

export default function LayoutDosen(props: any) {
  return (
    <ProtectedRoute>
    <div className="text-center flex flex-col min-h-screen relative">
      <Navbar />
      <div className="w-full min-h-[90vh] flex flex-row">
        <span className="hidden sm:block">
          <SidebarDosen />
        </span>
        <div className="w-full flex flex-col items-center p-4">
          <FilterSection />
          {props.children}
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
