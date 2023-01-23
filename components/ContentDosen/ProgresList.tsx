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
      generation: 5,
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
        <table className=" text-left table-auto text-sm  text-gray-900 ">
          <thead className="text-xs text-white uppercase bg-patternTwo sticky top-0 z-50  ">
            <tr>
              <th scope="col" rowSpan={2} className="px-6 py-3">
                <div className="flex items-center gap-2 justify-center">
                  Nama
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-6 py-3 max-w-[20%]">
                <div className="flex items-center gap-2 justify-center">
                  Judul
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-6 py-3">
                <div className="flex items-center gap-2">
                  Angkatan
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th
                scope="col"
                colSpan={5}
                className="px-6 py-3 border-b-2 border-white"
              >
                <div className="flex items-center justify-center">Berkas</div>
              </th>
              <th scope="col" rowSpan={2} className="px-6 py-3">
                <div className="flex items-center gap-2">
                  Seminar Hasil
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-6 py-3">
                <div className="flex items-center gap-2">
                  Sidang
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Bab 1</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Bab 2</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Bab 3</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Bab 4</div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Bab 5</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {content.map((data) => (
              <tr key={data.id} className="bg-gray-200 border-b ">
                <td scope="row" className="px-6 py-4 font-medium   max-w-[20%]">
                  {data.name}
                </td>
                <td className=" px-6 py-4 max-w-[20%]">{data.title}</td>
                <td className=" text-center px-6 py-4">{data.generation}</td>
                <td className=" text-center px-6 py-4">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab1}
                  </a>
                </td>
                <td className=" text-center px-6 py-4">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab2}
                  </a>
                </td>
                <td className=" text-center px-6 py-4">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab3}
                  </a>
                </td>
                <td className=" text-center px-6 py-4">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab4}
                  </a>
                </td>
                <td className=" text-center px-6 py-4">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.bab5}
                  </a>
                </td>
                <td className=" text-center px-6 py-4">
                  <div className="flex flex-col gap-2">
                    {data.seminarDate}
                    <a
                      href="#"
                      className="hover:underline hover:text-black underline text-blue-400"
                    >
                      {data.seminarHasil}
                    </a>
                  </div>
                </td>
                <td className=" text-center px-6 py-4">
                  <div className="flex flex-col gap-2">
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
