import { useState } from "react";
import ListMahasiswa from "../components/ContentAdmin/ListMahasiswa";
import LayoutAdmin from "../components/Layout/LayoutAdmin";
import FilterSection from "../components/Layout/FilterSection";

export default function daftarMahasiswa() {
  const [selectedYear, setSelectedYear] = useState("");
  const [searchedName, setSearchedName] = useState("");

  return (
    <LayoutAdmin>
      <div className="w-full flex flex-col justify-start xl:p-8">
        <h1 className="text-4xl text-[#9F86C4] text-left capitalize font-bold font-montserrat">
          Daftar Mahasiswa Skripsi
        </h1>

        <FilterSection
          setSearchedName={setSearchedName}
          setSelectedYear={setSelectedYear}
        />
      </div>

      <div className="flex p-4 flex-col justify-center items-center">
        <ListMahasiswa
          searchedName={searchedName}
          selectedYear={selectedYear}
        />
      </div>
    </LayoutAdmin>
  );
}
