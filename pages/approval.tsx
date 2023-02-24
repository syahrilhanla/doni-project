import React from "react";
import LayoutDosen from "../components/Layout/LayoutDosen";
// import ApprovedProf from "../components/ContentDosen/ApprovedProf";
import ApprovalTable from "../components/ContentDosen/ApprovalTable";
import FilterSection from "../components/Layout/FilterSection";

export default function approval() {
  return (
    <LayoutDosen>
      <h1 className="text-4xl uppercase font-bold">
        Persetujuan Judul Skripsi
      </h1>
      <FilterSection />

      <div className="flex p-4 flex-col justify-center items-center">
        <ApprovalTable />
        {/* <ApprovedProf /> */}
      </div>
    </LayoutDosen>
  );
}
