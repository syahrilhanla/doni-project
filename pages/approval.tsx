import LayoutDosen from "../components/Layout/LayoutDosen";
import ApprovalTable from "../components/ContentDosen/ApprovalTable";
import FilterSection from "../components/Layout/FilterSection";
import { useState } from "react";

export default function approval() {
  const [selectedYear, setSelectedYear] = useState("");
  const [searchedName, setSearchedName] = useState("");

  return (
    <LayoutDosen>
      <div className="w-full flex flex-col justify-start xl:p-8">
        <h1 className="sm:text-4xl text-2xl text-[#9F86C4] text-left capitalize font-bold font-montserrat">
          Persetujuan Judul Skripsi
        </h1>

        <FilterSection
          setSearchedName={setSearchedName}
          setSelectedYear={setSelectedYear}
        />
      </div>

      <div className="w-full flex p-4 flex-col justify-center items-center">
        <ApprovalTable
          searchedName={searchedName}
          selectedYear={selectedYear}
        />
      </div>
    </LayoutDosen>
  );
}
