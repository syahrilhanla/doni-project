import React, { Key, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg, BsTrash } from "react-icons/bs";
import { RiSortDesc, RiCloseLine } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import FilterSection from "../Layout/FilterSection";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Store/firebase";
import { async } from "@firebase/util";

interface dataTable {
  id: number;
  name: string;
  nim: string;
  dosenSatu: string;
  dosenDua: string;
  seminar: string;
  sidang: string;
}

export default function ListMahasiswa() {
  const [student, setStudent] = useState<any>([]);
  const [useridSeminar, setUseridSeminar] = useState("");
  const [useridSidang, setUseridSidang] = useState("");

  const [hapus, setHapus] = useState<any>(false);
  const [examiner, setExaminer] = useState<any>([]);
  const [assignSeminar, setAssignSeminar] = useState<any>(false);
  const [assignSidang, setAssignSidang] = useState<any>(false);
  const [examinerOne, setExaminerOne] = useState("");
  const [examinerTwo, setExaminerTwo] = useState("");
  const [seminarDate, setSeminarDate] = useState<any>();
  const [sidangDate, setSidangDate] = useState<any>();
  // const [dosenacc1, setDosenacc1] = useState("27 February 2023");
  // const [dosenacc2, setDosenacc2] = useState("27 Maret 2023");
  // const content: dataTable[] = [
  //   {
  //     id: 1,
  //     name: "nama 1",
  //     nim: "1719201018173",
  //     dosenSatu: "dosen 1",
  //     dosenDua: "dosen 2",
  //     seminar: "27 February 2023",
  //     sidang: "27 Maret 2023",
  //   },
  //   {
  //     id: 2,
  //     name: "nama 12",
  //     nim: "1929182723111",
  //     dosenSatu: "dosen 1",
  //     dosenDua: "dosen 2",
  //     seminar: "Ajukan",
  //     sidang: "Belum",
  //   },
  //   {
  //     id: 3,
  //     name: "nama 13",
  //     nim: "2019182722222",
  //     dosenSatu: "dosen 1",
  //     dosenDua: "dosen 2",
  //     seminar: "27 February 2023",
  //     sidang: "Ajukan",
  //   },
  //   {
  //     id: 4,
  //     name: "nama 14",
  //     nim: "2192992822223",
  //     dosenSatu: "dosen 1",
  //     dosenDua: "dosen 2",
  //     seminar: "Belum",
  //     sidang: "Belum",
  //   },
  //   {
  //     id: 5,
  //     name: "nama 15",
  //     nim: "2209390029222",
  //     dosenSatu: "dosen 1",
  //     dosenDua: "dosen 2",
  //     seminar: "Belum",
  //     sidang: "Belum",
  //   },
  //   {
  //     id: 6,
  //     name: "nama 16",
  //     nim: "1821122222313",
  //     dosenSatu: "dosen 1",
  //     dosenDua: "dosen 2",
  //     seminar: "Belum",
  //     sidang: "Belum",
  //   },
  // ];

  const getData = async () => {
    const studentRef = query(
      collection(db, "studentsList"),
      where("statusApprove", "==", true)
    );
    try {
      await getDocs(studentRef).then((data) => {
        setStudent(
          data.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })
        );
      });
    } catch (e) {
      console.log(e);
    }
    console.log(student);
  };
  const getProf = async () => {
    let unsubscribe = false;
    await getDocs(collection(db, "professorList"))
      .then((profRef) => {
        if (unsubscribe) return;
        const newExaminerData = profRef.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setExaminer(newExaminerData);
      })
      .catch((err) => {
        if (unsubscribe) return;
        console.error("Failed", err);
      });
    return () => (unsubscribe = true);
  };
  useEffect(() => {
    if (!student) {
      getData();
      // getProf();
    }
  }, [student]);

  // const getStatusSeminar = (data: any) => {
  //   setAssignSeminar(true);
  //   setUseridSeminar(data);
  // };
  // const getStatusSidang = (data: any) => {
  //   setAssignSidang(true);
  //   setUseridSidang(data);
  // };
  // const getUpdateSeminar = async () => {
  //   const studentRef = doc(db, "studentsList", useridSeminar);
  //   const valueUpdate = {
  //     examinerOne: examinerOne,
  //     examinerTwo: examinerTwo,
  //     seminarDate: [
  //       {
  //         dateToBe: seminarDate,
  //         feedBackNote: seminarDate[0].feedBackNote,
  //         isApprovedByProfOne: seminarDate[0].isApprovedByProfOne,
  //         isApprovedByProfTwo: seminarDate[0].isApprovedByProfTwo,
  //       },
  //     ],
  //   };
  //   await updateDoc(studentRef, valueUpdate).then(() => {
  //     window.alert("Seminar hasil berhasil diatur");
  //     setAssignSeminar(false);
  //     setSeminarDate("");
  //     setExaminerOne("");
  //     setExaminerTwo("");
  //   });
  // };
  // const getUpdateSidang = async () => {
  //   const studentRef = doc(db, "studentsList", useridSidang);
  //   const valueUpdate = {
  //     examinerOne: examinerOne,
  //     examinerTwo: examinerTwo,
  //     sidangDate: [
  //       {
  //         dateToBe: sidangDate,
  //         feedBackNote: sidangDate[0].feedBackNote,
  //         isApprovedByProfOne: sidangDate[0].isApprovedByProfOne,
  //         isApprovedByProfTwo: sidangDate[0].isApprovedByProfTwo,
  //       },
  //     ],
  //   };
  //   await updateDoc(studentRef, valueUpdate).then(() => {
  //     window.alert("Sidang akhir berhasil diatur");
  //     setAssignSidang(false);
  //     setSidangDate("");
  //     setExaminerOne("");
  //     setExaminerTwo("");
  //   });
  // };
  return (
    <>
      <FilterSection />
      <div>
        {assignSeminar && (
          <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
            <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
            <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
              <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
                <button
                  onClick={() => setAssignSeminar(!assignSeminar)}
                  type="button"
                  className="absolute top-3 right-2.5 bg-red-600 hover:text-red-600 hover:bg-white text-white bg-transparent hover:ring-red-600 ring-1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <RiCloseLine />
                </button>

                <div className="p-4 flex flex-col mt-9 gap-2">
                  <div className="realtive xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <p className="text-justify">
                      Masukkan tanggal seminar hasil
                    </p>
                    <input
                      className="w-full bg-gray-200 p-2 my-2"
                      type="date"
                      onChange={(e) => setSeminarDate(e.target.value)}
                      value={seminarDate}
                    />
                    <select
                      className="bg-[#f1e8f252] focus:outline-none border-1 justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full  text-[#707070] w-full hover:bg-[#ebe6ea]  font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center"
                      onChange={(e) => setExaminerOne(e.target.value)}
                      value={examinerOne}
                    >
                      <option selected>Pilih Dosen Penguji 1</option>
                      {examiner.map((item: any, index: Key) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="realtive xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <select
                      className="bg-[#f1e8f252] focus:outline-none border-1 justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full  text-[#707070] w-full hover:bg-[#ebe6ea]  font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center"
                      onChange={(e) => setExaminerTwo(e.target.value)}
                      value={examinerTwo}
                    >
                      <option selected>Pilih Dosen Penguji 2</option>
                      {examiner.map((item: any, index: Key) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-4 flex gap-2 justify-end items-end">
                    <button
                      // onClick={getUpdateSeminar}
                      className=" text-white bg-green-500 ring-2  rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3  hover:text-green-500 hover:ring-green-500 hover:bg-white focus:z-10"
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {assignSidang && (
          <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
            <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
            <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
              <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
                <button
                  onClick={() => setAssignSidang(!assignSidang)}
                  type="button"
                  className="absolute top-3 right-2.5 bg-red-600 hover:text-red-600 hover:bg-white text-white bg-transparent hover:ring-red-600 ring-1 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                >
                  <RiCloseLine />
                </button>

                <div className="p-4 flex flex-col mt-9 gap-2">
                  <div className="realtive xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <p>Masukkan tanggal sidang akhir</p>
                    <input
                      type="date"
                      onChange={(e) => setSidangDate(e.target.value)}
                      value={sidangDate}
                    />
                    <select
                      className="bg-[#f1e8f252] focus:outline-none border-1 justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full  text-[#707070] w-full hover:bg-[#ebe6ea]  font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center"
                      onChange={(e) => setExaminerOne(e.target.value)}
                      value={examinerOne}
                    >
                      <option selected>Dosen Penguji 1</option>
                      {examiner.map((item: any, index: Key) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="realtive xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <select
                      className="bg-[#f1e8f252] focus:outline-none border-1 justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full  text-[#707070] w-full hover:bg-[#ebe6ea]  font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center"
                      onChange={(e) => setExaminerTwo(e.target.value)}
                      value={examinerTwo}
                    >
                      <option selected>Dosen Penguji 2</option>
                      {examiner.map((item: any, index: Key) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-4 flex gap-2 justify-end items-end">
                    <button
                      // onClick={getUpdateSidang}
                      className=" text-white bg-green-500 ring-2  rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3  hover:text-green-500 hover:ring-green-500 hover:bg-white focus:z-10"
                    >
                      Kirim
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                  <div className="flex items-center gap-2">
                    Dosen Pembimbing 1
                    <a href="#">
                      <RiSortDesc />
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    Dosen Pembimbing 2
                    <a href="#">
                      <RiSortDesc />
                    </a>
                  </div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    Seminar Hasil
                  </div>
                </th>

                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-center">
                    Sidang Akhir
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center justify-center">Aksi</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {student.map((data: any, index: any) => (
                <tr
                  key={index}
                  className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto "
                >
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
                  >
                    {data.name}
                  </th>
                  <td className="px-6 py-2 max-w-[20%]">{data.username}</td>
                  <td className="px-6 py-2 max-w-[20%]">{data.profOne}</td>
                  <td className="px-6 py-2 max-w-[20%]">{data.profTwo}</td>

                  <td className="px-6 py-2 text-center ">
                    {data.seminarDate[0].isApprovedByProfOne &&
                    data.seminarDate[0].isApprovedByProfTwo ? (
                      <button
                        // onClick={() => getStatusSeminar(data.id)}
                        className="font-medium text-white hover:opacity-80  bg-[#c282f6] focus:outline-none p-2 rounded-md"
                      >
                        Tanggal Seminar
                      </button>
                    ) : (
                      <p>Belum ditentukan</p>
                    )}
                  </td>
                  <td className="px-6 py-2 text-center ">
                    {data.sidangDate[0].isApproved ? (
                      <button
                        // onClick={() => getStatusSidang(data.id)}
                        className="font-medium text-white hover:opacity-80  bg-[#c282f6] focus:outline-none p-2 rounded-md"
                      >
                        Tanggal Sidang
                      </button>
                    ) : (
                      <p>Belum ditentukan</p>
                    )}
                  </td>
                  <td className="px-6 py-2">
                    <button
                      onClick={() => setHapus(!hapus)}
                      className="font-medium text-white hover:opacity-50 duration-150 bg-[#D0312D] p-2 rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
