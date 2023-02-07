import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { Key, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { RiSortDesc, RiCloseLine } from "react-icons/ri";

import FilterSection from "../Layout/FilterSection";
import { db } from "../Store/firebase";

interface dataTable {
  id: number;
  name: string;
  nim: string;
  status: boolean;
}

export default function RequestTable() {
  const [setuju, setSetuju] = useState<any>(false);
  const [tolak, setTolak] = useState<any>(false);
  const [student, setStudent] = useState<any>(null);

  const content: dataTable[] = [
    {
      id: 1,
      name: "nama 1",
      nim: "nim 1",
      status: true,
    },
    {
      id: 2,
      name: "nama 12",
      nim: "nim 12",
      status: true,
    },
    {
      id: 3,
      name: "nama 13",
      nim: "nim 13",
      status: true,
    },
    {
      id: 4,
      name: "nama 14",
      nim: "nim 14",
      status: true,
    },
    {
      id: 5,
      name: "nama 15",
      nim: "nim 15",
      status: true,
    },
    {
      id: 6,
      name: "nama 16",
      nim: "nim 16",
      status: true,
    },
  ];
  const getData = async () => {
    const studentRef = query(collection(db, "studentsList"), where("statusApprove", "==", false))
    try {
      const data = await getDocs(studentRef)
      data.forEach((doc) => {
      //  console.log(doc.data().username)
       setStudent(doc.data())
      })
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getData()
 },[])
  return (
    <>
      <FilterSection />
      <div>
        {setuju && (
          <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
            <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
            <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
              <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
                <button
                  onClick={() => setSetuju(!setuju)}
                  type="button"
                  className="absolute top-3 right-2.5 bg-red-600 hover:text-red-600 hover:bg-white text-white bg-transparent hover:ring-red-600 ring-1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <RiCloseLine />
                </button>

                <div className="p-4 flex flex-col gap-2">
                  <p className="block text-xl mt-6 font-medium text-gray-900 ">
                    Apakah anda ingin menyetujui permintaan ini?
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
        {tolak && (
          <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
            <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
            <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
              <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
                <button
                  onClick={() => setTolak(!tolak)}
                  type="button"
                  className="absolute top-3 right-2.5 bg-red-600 hover:text-red-600 hover:bg-white text-white bg-transparent hover:ring-red-600 ring-1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <RiCloseLine />
                </button>

                <div className="p-4 flex flex-col gap-2">
                  <p className="block text-xl mt-6 font-medium text-gray-900 ">
                    Apakah anda ingin menolak permintaan ini?
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
                      <RiSortDesc></RiSortDesc>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    NIM
                    <a href="#">
                      <RiSortDesc></RiSortDesc>
                    </a>
                  </div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-center">Status</div>
                </th>
              </tr>
            </thead>
            <tbody>
            {
             student.map((data:any) => (
                <tr
                  className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto "
                >
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
                  >
                    {data.name}
                  </th>
                  <td className="px-6 py-2 max-w-[20%]">{data.NIM}</td>

                  <td className="px-6 py-2 text-right flex gap-2">
                    <button
                      onClick={() => setSetuju(!setuju)}
                      className="font-medium text-white ring-1 hover:ring-green-500 hover:bg-white  hover:text-green-500 bg-green-500 p-2 rounded-md"
                    >
                      <BsCheckLg className="" />
                    </button>
                    <button
                      onClick={() => setTolak(!tolak)}
                      className="font-medium text-white ring-1 hover:ring-red-600  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md"
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              ))
            }
               
             

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
