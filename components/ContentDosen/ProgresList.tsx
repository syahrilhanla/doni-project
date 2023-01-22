import React from "react";
import { RiSortDesc } from "react-icons/ri";

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
}

export default function ProgresList() {
  const content: dataTable[] = [
    {
      id: 1,
      name: "nama 1",
      title: "title 1",
      bab1: "here",
      bab2: "here",
      bab3: "here",
      bab4: "here",
      bab5: "here",
      seminarHasil: "here",
      sidang: "here",
      generation: 1,
    },
    {
      id: 2,
      name: "nama 12",
      title: "title 12",
      bab1: "here",
      bab2: "here",
      bab3: "here",
      bab4: "here",
      bab5: "here",
      seminarHasil: "here",
      sidang: "here",
      generation: 2,
    },
    {
      id: 3,
      name: "nama 13",
      title: "title 13",
      bab1: "here",
      bab2: "here",
      bab3: "here",
      bab4: "here",
      bab5: "here",
      seminarHasil: "here",
      sidang: "here",
      generation: 3,
    },
    {
      id: 4,
      name: "nama 14",
      title: "title 14",
      bab1: "here",
      bab2: "here",
      bab3: "here",
      bab4: "here",
      bab5: "here",
      seminarHasil: "here",
      sidang: "here",
      generation: 4,
    },
    {
      id: 5,
      name: "nama 15",
      title: "title 15",
      bab1: "here",
      bab2: "here",
      bab3: "here",
      bab4: "here",
      bab5: "here",
      seminarHasil: "here",
      sidang: "here",
      generation: 5,
    },
    {
      id: 6,
      name: "nama 16",
      title: "title 16",
      bab1: "here",
      bab2: "here",
      bab3: "here",
      bab4: "here",
      bab5: "here",
      seminarHasil: "here",
      sidang: "here",
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
                  Bab 1
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Bab 2
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Bab 3
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Bab 4
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Bab 5
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Seminar Hasil
                  <a href="#">
                    <RiSortDesc></RiSortDesc>
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Sidang
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
                <td className=" text-center px-6 py-4">{data.title}</td>
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
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.seminarHasil}
                  </a>
                </td>
                <td className=" text-center px-6 py-4">
                  <a
                    href="#"
                    className="hover:underline hover:text-black underline text-blue-400"
                  >
                    {data.sidang}
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
