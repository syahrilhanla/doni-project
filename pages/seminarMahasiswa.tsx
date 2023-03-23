import React from "react";
import SeminarList from "../components/ContentDosen/SeminarList";
import FilterSection from "../components/Layout/FilterSection";
import LayoutDosen from "../components/Layout/LayoutDosen";

export default function seminarMahasiswa() {
  return (
    <LayoutDosen>
      <h1 className="text-4xl uppercase font-bold">
        File Skripsi Seminar Hasil
      </h1>
      <FilterSection />

      <div className="flex p-4 flex-col justify-center items-center">
        <SeminarList />
      </div>
    </LayoutDosen>
  );
}
