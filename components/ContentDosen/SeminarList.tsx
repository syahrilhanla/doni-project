import React from "react";
import { RiSortDesc } from "react-icons/ri";

interface dataTable {
  id: number;
  name: string;
  title: string;
  file: string;
  generation: number;
  seminarDate: string;
}

export default function SeminarList() {
  const content: dataTable[] = [
    {
      id: 1,
      name: "nama 1",
      title: "title 1",
      file: "cek",
      generation: 1,
      seminarDate: "23 Jan 2023",
    },
    {
      id: 2,
      name: "nama 12",
      title: "title 12",
      file: "cek",
      generation: 2,
      seminarDate: "23 Jan 2023",
    },
    {
      id: 3,
      name: "nama 13",
      title: "title 13",
      file: "cek",
      generation: 3,
      seminarDate: "23 Jan 2023",
    },
    {
      id: 4,
      name: "nama 14",
      title: "title 14",
      file: "cek",
      generation: 4,
      seminarDate: "23 Jan 2023",
    },
    {
      id: 5,
      name: "nama 15",
      title: "title 15",
      file: "cek",
      generation: 5,
      seminarDate: "23 Jan 2023",
    },
    {
      id: 6,
      name: "nama 16",
      title: "title 16",
      file: "cek",
      generation: 6,
      seminarDate: "23 Jan 2023",
    },
  ];
  return (
    <div>
      <div className=" inline-block overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] max-w-[350px] sm:max-w-full">
        <table className="text-sm text-left text-gray-900 capitalize ">
          <thead className="text-xs text-white  bg-patternTwo sticky top-0 z-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  Nama
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  Judul
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  Angkatan
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">Berkas</div>
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
                className="even:bg-[#f0ebf8d7] odd:bg-white border-b "
              >
                <th
                  scope="row"
                  className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
                >
                  {data.name}
                </th>
                <td className="px-6 py-2 max-w-[20%]">{data.title}</td>
                <td className="px-6 py-2 text-center">{data.generation}</td>
                <td className="py-1">
                  <div className="flex flex-col items-center">
                    {data.seminarDate}
                    <a
                      className="hover:underline hover:text-black underline text-blue-400"
                      href=""
                    >
                      {data.file}
                    </a>
                  </div>
                </td>

                <td className="px-6 py-2 text-right flex gap-2">
                  <a
                    href="#"
                    className="font-medium text-white hover:bg-white hover:text-green-500 bg-green-500 p-2 rounded-md"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="font-medium text-white  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md"
                  >
                    Hapus
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
