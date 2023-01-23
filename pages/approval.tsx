import React from "react";
import LayoutDosen from "../components/Layout/LayoutDosen";
import ApprovalTable from "../components/ContentDosen/ApprovalTable";

export default function approval() {
  return (
    <LayoutDosen>
      <h1 className="text-4xl uppercase font-bold">
        Persetujuan Judul Skripsi
      </h1>

      <div className="flex p-4 flex-col justify-center items-center">
        <ApprovalTable></ApprovalTable>
      </div>
    </LayoutDosen>
  );
}
