import React from "react";
import ListDosen from "../components/ContentAdmin/ListDosen";
import LayoutAdmin from "../components/Layout/LayoutAdmin";

export default function daftarDosen() {
  return (
    <LayoutAdmin>
      <h1 className="text-4xl uppercase font-bold">Daftar Dosen Pembimbing</h1>

      <div className="flex p-4 flex-col justify-center items-center my-auto">
        <ListDosen />
      </div>
    </LayoutAdmin>
  );
}
