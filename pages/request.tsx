import RequestTable from "../components/ContentAdmin/RequestTable";
import LayoutAdmin from "../components/Layout/LayoutAdmin";

export default function request() {
  return (
    <LayoutAdmin>
      <div className="w-full flex flex-col justify-start xl:p-8">
        <h1 className="sm:text-4xl text-2xl text-[#9F86C4] text-left capitalize font-bold font-montserrat">
          Permintaan Pendaftaran Mahasiswa{" "}
        </h1>
      </div>

      <div className="flex p-4 flex-col justify-center  my-12">
        <RequestTable />
      </div>
    </LayoutAdmin>
  );
}
