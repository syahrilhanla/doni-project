import React from "react";
import ListMahasiswa from "../components/ContentAdmin/ListMahasiswa";
import LayoutAdmin from "../components/Layout/LayoutAdmin";

export default function daftarMahasiswa() {
  return (
    <LayoutAdmin>
      <h1 className="text-4xl uppercase font-bold">Daftar Mahasiswa Skripsi</h1>

      <div className="flex p-4 flex-col justify-center items-center">
        <ListMahasiswa />
      </div>
    </LayoutAdmin>
  );
}
