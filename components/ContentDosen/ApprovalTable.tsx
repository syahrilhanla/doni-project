import React from "react";
import { RiSortDesc } from "react-icons/ri";

interface dataTable {
  id: number;
  name: string;
  title: string;
  generation: number;
}

export default function ApprovalTable() {
  const content: dataTable[] = [
    {
      id: 1,
      name: "nama 1",
      title: "title 1",
      generation: 1,
    },
    {
      id: 2,
      name: "nama 12",
      title: "title 12",
      generation: 2,
    },
    {
      id: 3,
      name: "nama 13",
      title: "title 13",
      generation: 3,
    },
    {
      id: 4,
      name: "nama 14",
      title: "title 14",
      generation: 4,
    },
    {
      id: 5,
      name: "nama 15",
      title: "title 15",
      generation: 5,
    },
    {
      id: 6,
      name: "nama 16",
      title: "title 16",
      generation: 6,
    },
  ];
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] ">
        <table className="text-sm text-left text-gray-900 w-full ">
          <thead className="text-xs text-white uppercase bg-patternTwo sticky top-0 z-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Judul
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Angkatan
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Aksi
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {content.map((data) => (
              <tr key={data.id} className="bg-gray-200 border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium   whitespace-nowrap "
                >
                  {data.name}
                </th>
                <td className="px-6 py-4">{data.title}</td>
                <td className="px-6 py-4">{data.generation}</td>

                <td className="px-6 py-4 text-right flex gap-2">
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
