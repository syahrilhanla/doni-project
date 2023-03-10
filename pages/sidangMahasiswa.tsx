import React from "react";
import SidangList from "../components/ContentDosen/SidangList";

import LayoutDosen from "../components/Layout/LayoutDosen";

export default function sidangMahasiswa() {
  return (
    <LayoutDosen>
      <h1 className="text-4xl uppercase font-bold">
        File Skripsi Sidang Akhir
      </h1>
      <div className="flex p-4 flex-col justify-center items-center">
        <SidangList></SidangList>
      </div>
    </LayoutDosen>
  );
}
