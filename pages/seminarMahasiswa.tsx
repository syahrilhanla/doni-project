import { useState } from "react";
import SeminarList from "../components/ContentDosen/SeminarList";
import FilterSection from "../components/Layout/FilterSection";
import LayoutDosen from "../components/Layout/LayoutDosen";

export default function seminarMahasiswa() {
  const [selectedYear, setSelectedYear] = useState("");
  const [searchedName, setSearchedName] = useState("");

  return (
    <LayoutDosen>
      <div className="w-full flex flex-col justify-start xl:p-8">
        <h1 className="sm:text-4xl text-xl text-[#9F86C4] text-left capitalize font-bold font-montserrat">
          Persetujuan Skripsi Seminar Hasil
        </h1>

        <FilterSection
          setSearchedName={setSearchedName}
          setSelectedYear={setSelectedYear}
        />
      </div>

      <div className="flex p-4 flex-col justify-center items-center">
        <SeminarList
          searchedName={searchedName}
          selectedYear={selectedYear}
        />
      </div>
    </LayoutDosen>
  );
}
