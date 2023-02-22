import React from "react";
import ProgresList from "../components/ContentDosen/ProgresList";
import FilterSection from "../components/Layout/FilterSection";
import LayoutDosen from "../components/Layout/LayoutDosen";

export default function progresMahasiswa() {
  return (
    <LayoutDosen>
      <h1 className="text-4xl uppercase font-bold">
        Progres Skripsi Mahasiswa
      </h1>
      <FilterSection />

      <div className="flex p-4 flex-col justify-center items-center">
        <ProgresList />
      </div>
    </LayoutDosen>
  );
}
