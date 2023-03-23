import SidangList from "../components/ContentDosen/SidangList";
import FilterSection from "../components/Layout/FilterSection";

import LayoutDosen from "../components/Layout/LayoutDosen";

export default function sidangMahasiswa() {
  return (
    <LayoutDosen>
      <div className="w-full flex flex-col justify-start xl:p-8">
        <h1 className="text-4xl text-[#9F86C4] text-left capitalize font-bold font-montserrat">
          Persetujuan Skripsi Sidang Akhir
        </h1>

        {/* <FilterSection /> */}
      </div>

      <div className="flex p-4 flex-col justify-center items-center">
        <SidangList />
      </div>
    </LayoutDosen>
  );
}
