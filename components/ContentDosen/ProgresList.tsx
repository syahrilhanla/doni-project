import React from "react";
import { RiSortDesc } from "react-icons/ri";
import seminar from "../../pages/seminar";

interface dataTable {
  id: number;
  name: string;
  title: string;
  bab1: string;
  bab2: string;
  bab3: string;
  bab4: string;
  bab5: string;
  seminarHasil: string;
  sidang: string;
  generation: number;
  seminarDate: string;
  sidangDate: string;
}

export default function ProgresList() {
  const content: dataTable[] = [
    {
      id: 1,
      name: "nama 1",
      title: "title 1",
      bab1: "cek",
      bab2: "cek",
      bab3: "cek",
      bab4: "cek",
      bab5: "cek",
      seminarHasil: "cek",
      sidang: "cek",
      generation: 1,
      seminarDate: "23 Jan 2023",
      sidangDate: "24 Jan 2023",
    },
    {
      id: 2,
      name: "nama 12",
      title: "title 12",
      bab1: "cek",
      bab2: "cek",
      bab3: "cek",
      bab4: "cek",
      bab5: "cek",
      seminarHasil: "cek",
      sidang: "cek",
      generation: 2,
      seminarDate: "23 Jan 2023",
      sidangDate: "24 Jan 2023",
    },
    {
      id: 3,
      name: "nama 13",
      title: "title 13",
      bab1: "cek",
      bab2: "cek",
      bab3: "cek",
      bab4: "cek",
      bab5: "cek",
      seminarHasil: "cek",
      sidang: "cek",
      generation: 3,
      seminarDate: "23 Jan 2023",
      sidangDate: "24 Jan 2023",
    },
    {
      id: 4,
      name: "nama 14",
      title: "title 14",
      bab1: "cek",
      bab2: "cek",
      bab3: "cek",
      bab4: "cek",
      bab5: "cek",
      seminarHasil: "cek",
      sidang: "cek",
      generation: 4,
      seminarDate: "23 Jan 2023",
      sidangDate: "24 Jan 2023",
    },
    {
      id: 5,
      name: "nama 15",
      title: "title 15",
      bab1: "cek",
      bab2: "cek",
      bab3: "cek",
      bab4: "cek",
      bab5: "cek",
      seminarHasil: "cek",
      sidang: "cek",
      generation: 5555,
      seminarDate: "23 Jan 2023",
      sidangDate: "24 Jan 2023",
    },
    {
      id: 6,
      name: "Dimas maulana muhammad",
      title: "Pengembangan media pembelajaran interaktif berbasis web",
      bab1: "cek",
      bab2: "cek",
      bab3: "cek",
      bab4: "cek",
      bab5: "cek",
      seminarHasil: "cek",
      sidang: "cek",
      generation: 6,
      seminarDate: "23 Jan 2023",
      sidangDate: "24 Jan 2023",
    },
  ];
  return (
    <div>
      <div className=" inline-block overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] max-w-[350px] sm:max-w-full ">
        <table className=" text-left table-auto text-sm capitalize  text-gray-900 ">
          <thead className="text-xs text-white  bg-patternTwo sticky top-0 z-50  ">
            <tr>
              <th scope="col" rowSpan={2} className="px-2 py-3">
                <div className="flex items-center gap-2 justify-center">
                  Nama
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-3 max-w-[20%]">
                <div className="flex items-center gap-2 justify-center">
                  Judul
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-3">
                <div className="flex items-center gap-2">
                  Angkatan
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th
                scope="col"
                colSpan={5}
                className="px-2 py-3 border-b-2 border-white"
              >
                <div className="flex items-center justify-center">
                  Berkas per Bab
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-3">
                <div className="flex items-center text-center gap-2">
                  Seminar Hasil
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-3">
                <div className="flex items-center text-center gap-2">
                  Sidang Akhir
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">I</div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">II</div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">III</div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">IV</div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">V</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {content.map((data) => (
              <tr
                key={data.id}
                className=" border-b even:bg-[#f0ebf8d7] odd:bg-white"
              >
                <td scope="row" className="px-4 py-2 font-medium   w-[20%]">
                  {data.name}
                </td>
                <td className=" px-2 py-2 w-[20%] text-center">{data.title}</td>
                <td className=" text-center px-2 py-2 w-[5%]">
                  {data.generation}
                </td>
                <td className=" text-center px-1.5 py-2">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab1}
                  </a>
                </td>
                <td className=" text-center px-1.5 py-2">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab2}
                  </a>
                </td>
                <td className=" text-center px-1.5 py-2">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab3}
                  </a>
                </td>
                <td className=" text-center px-1.5 py-2">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab4}
                  </a>
                </td>
                <td className=" text-center px-1.5 py-2">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab5}
                  </a>
                </td>
                <td className=" text-center py-1  w-[10%]">
                  <div className="flex flex-col gap-1">
                    {data.seminarDate}
                    <a
                      href="#"
                      className="hover:underline hover:text-black underline text-blue-400"
                    >
                      {data.seminarHasil}
                    </a>
                  </div>
                </td>
                <td className=" text-center w-[10%]">
                  <div className="flex flex-col gap-1">
                    {data.sidangDate}
                    <a
                      href="#"
                      className="hover:underline hover:text-black underline text-blue-400"
                    >
                      {data.sidang}
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
