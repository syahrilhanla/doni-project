import React from "react";
import SeminarList from "../components/ContentDosen/SeminarList";
import LayoutDosen from "../components/Layout/LayoutDosen";

export default function seminarMahasiswa() {
  return (
    <LayoutDosen>
      <h1 className="text-4xl uppercase font-bold">
        File Skripsi Seminar Hasil
      </h1>
      <div className="flex h-screen flex-col justify-center items-center">
        <SeminarList></SeminarList>
      </div>
    </LayoutDosen>
  );
}
