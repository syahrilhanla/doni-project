import Router from "next/router";
import React from "react";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../Navbar/Navbar";
import ProtectedRoute from "../ProtectedRoute";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import FilterSection from "./FilterSection";

export default function LayoutAdmin(props: any) {
   const { user } = useAuth();
  if (user.role === "mhs") {
     Router.push("/dashboard")
    }
    else if (user.role === "dosen") {
     Router.push("/approval")   
  }
  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  );
}
