import React from "react";
import RequestTable from "../components/ContentAdmin/RequestTable";
import LayoutAdmin from "../components/Layout/LayoutAdmin";

export default function request() {
  return (
    <LayoutAdmin>
      <h1 className="text-4xl uppercase font-bold">
        Permintaan Pendaftaran Mahasiswa
      </h1>

      <div className="flex p-4 flex-col justify-center items-center">
        <RequestTable />
      </div>
    </LayoutAdmin>
  );
}
