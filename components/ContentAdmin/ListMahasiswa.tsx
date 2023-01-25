import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg, BsTrash } from "react-icons/bs";
import { RiSortDesc, RiCloseLine } from "react-icons/ri";

interface dataTable {
  id: number;
  name: string;
  nim: string;
  seminar: boolean;
  sidang: boolean;
}

export default function ListMahasiswa() {
  const [hapus, setHapus] = useState<any>(false);
  const content: dataTable[] = [
    {
      id: 1,
      name: "nama 1",
      nim: "nim 1",
      seminar: true,
      sidang: false,
    },
    {
      id: 2,
      name: "nama 12",
      nim: "nim 12",
      seminar: true,
      sidang: false,
    },
    {
      id: 3,
      name: "nama 13",
      nim: "nim 13",
      seminar: false,
      sidang: false,
    },
    {
      id: 4,
      name: "nama 14",
      nim: "nim 14",
      seminar: true,
      sidang: true,
    },
    {
      id: 5,
      name: "nama 15",
      nim: "nim 15",
      seminar: true,
      sidang: true,
    },
    {
      id: 6,
      name: "nama 16",
      nim: "nim 16",
      seminar: false,
      sidang: true,
    },
  ];
  return (
    <div>
      {hapus && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <button
                onClick={() => setHapus(!hapus)}
                type="button"
                className="absolute top-3 right-2.5 bg-red-600 hover:text-red-600 hover:bg-white text-white bg-transparent hover:ring-red-600 ring-1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <RiCloseLine />
              </button>

              <div className="p-4 flex flex-col gap-2">
                <p className="block text-xl mt-6 font-medium text-gray-900 ">
                  Apakah anda ingin menghapus data mahasiswa ini?
                </p>
                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    type="button"
                    className=" text-white bg-green-500 ring-2  rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3  hover:text-green-500 hover:ring-green-500 hover:bg-white focus:z-10"
                  >
                    Iya
                  </button>
                  <button
                    type="button"
                    className=" text-white bg-red-500 ring-2  rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3  hover:text-red-500 hover:ring-red-500 hover:bg-white focus:z-10"
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="inline-block overflow-auto shadow-md sm:rounded-lg sm:max-w-full max-w-[350px] max-h-[500px] ">
        <table className="text-sm text-left text-gray-900 capitalize ">
          <thead className="text-xs text-white bg-patternTwo sticky top-0 z-auto ">
            <tr>
              <th scope="col" className="px-6 py-3 max-w-[20%]">
                <div className="flex items-center gap-2">
                  Nama
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  NIM
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>

              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">Seminar</div>
              </th>

              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">Sidang</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">Aksi</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {content.map((data) => (
              <tr
                key={data.id}
                className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto "
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
                >
                  {data.name}
                </th>
                <td className="px-6 py-2 max-w-[20%]">{data.nim}</td>

                <td className="px-6 py-2 justify-center items-center flex gap-2">
                  {data.seminar ? (
                    <button className="font-medium text-white ring-1 hover:ring-green-500 hover:bg-white  hover:text-green-500 bg-green-500 p-2 rounded-md">
                      <BsCheckLg />
                    </button>
                  ) : (
                    <button className="font-medium text-white ring-1 hover:ring-red-600  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md">
                      <AiOutlineClose />
                    </button>
                  )}
                </td>
                <td className="px-6 py-2 ">
                  {data.sidang ? (
                    <button className="font-medium text-white ring-1 hover:ring-green-500 hover:bg-white  hover:text-green-500 bg-green-500 p-2 rounded-md">
                      <BsCheckLg />
                    </button>
                  ) : (
                    <button className="font-medium text-white ring-1 hover:ring-red-600  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md">
                      <AiOutlineClose />
                    </button>
                  )}
                </td>
                <td className="px-6 py-2">
                  <button
                    onClick={() => setHapus(!hapus)}
                    className="font-medium text-white ring-1 hover:ring-red-600  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md"
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
