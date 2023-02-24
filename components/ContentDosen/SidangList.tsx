import React, { useCallback, useEffect, useState } from "react";
import { RiCloseLine, RiSortDesc } from "react-icons/ri";
import { useAuth } from "../Context/AuthContext";
import { arrayUnion, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../Store/firebase";
import Link from "next/link";
interface dataTable {
 id: number;
 name: string;
 title: string;
 file: string;
 generation: number;
 sidangDate: string;
}

export default function SidangList() {
 const { user } = useAuth()
 const [setuju, setSetuju] = useState<any>(false);
 const [tolak, setTolak] = useState<any>(false);
 const [student, setStudent] = useState<any>([]);
 const [uidUser, setUidUser] = useState<any>()
 const [profSatu, setProfSatu] = useState<any>()
 const [profDua, setProfDua] = useState<any>()
 const [feedbackNoteUser, setFeedbackNoteUser] = useState<any>()
 const [isApprovedByProfOne, setIsApprovedByProfOne] = useState<any>()
 const [isApprovedByProfTwo, setIsApprovedByProfTwo] = useState<any>()
 const [dateToBe, setDateToBe] = useState<any>()
 const content: dataTable[] = [
  {
   id: 1,
   name: "nama 1",
   title: "title 1",
   file: "cek",
   generation: 1,
   sidangDate: "24 Jan 2023",
  },
  {
   id: 2,
   name: "nama 12",
   title: "title 12",
   file: "cek",
   generation: 2,
   sidangDate: "24 Jan 2023",
  },
  {
   id: 3,
   name: "nama 13",
   title: "title 13",
   file: "cek",
   generation: 3,
   sidangDate: "24 Jan 2023",
  },
  {
   id: 4,
   name: "nama 14",
   title: "title 14",
   file: "cek",
   generation: 4,
   sidangDate: "24 Jan 2023",
  },
  {
   id: 5,
   name: "nama 15",
   title: "title 15",
   file: "cek",
   generation: 5,
   sidangDate: "24 Jan 2023",
  },
  {
   id: 6,
   name: "nama 16",
   title: "title 16",
   file: "cek",
   generation: 6,
   sidangDate: "24 Jan 2023",
  },
 ];
 const getStudent = useCallback(async () => {
  try {
   const studentRef1 = query(
    collection(db, "studentsList"),
    where("statusApprove", "==", true),
    where("profOne", "==", user.name)
   );
   const studentRef2 = query(
    collection(db, "studentsList"),
    where("statusApprove", "==", true),
    where("profTwo", "==", user.name)
   );

   const studentsData1 = (await getDocs(studentRef1)).docs
    .map((item) => item)
    .map((item) => item.data());

   const studentsData2 = (await getDocs(studentRef2)).docs
    .map((item) => item)
    .map((item) => item.data());

   const arrayStudents = [...studentsData1, ...studentsData2].filter((item: any) => item.profOne === user.name || item.profTwo === user.name)

   const fixArray = arrayStudents.map((item: any) => {
    if (item.profOne === user.name) {
     if (item.sidangDate[0].isApprovedByProfOne !== user.name) return item;
    }
    else if (item.profTwo === user.name) {
     if (item.sidangDate[0].isApprovedByProfTwo !== user.name) return item;
    }
   }
   ).filter((item: any) => item !== undefined)
   setStudent(fixArray);


  } catch (e) {
   console.log(e);
  }
 }, [student])
 const getValue = (uid: any, profOne: any, profTwo: any, feedbackNote: any, isApprovedByProfOne: any, isApprovedByProfTwo: any, dateToBe: any) => {
  setSetuju(true)
  setUidUser(uid)
  setProfSatu(profOne)
  setProfDua(profTwo)
  setFeedbackNoteUser(feedbackNote)
  setIsApprovedByProfOne(isApprovedByProfOne)
  setIsApprovedByProfTwo(isApprovedByProfTwo)
  setDateToBe(dateToBe)
 }
 const updateApprove = async () => {
  const studentRef = doc(db, "studentsList", uidUser);
  if (profSatu === user.name) {
   const value1 = {
    sidangDate: [
     {
      feedbackNote: feedbackNoteUser,
      isApprovedByProfOne: user.name,
      isApprovedByProfTwo: isApprovedByProfTwo,
      dateToBe: dateToBe
     },
    ],
    notifications: arrayUnion(
     {
      id: user.uid,
      isRead: false,
      text: "Kamu Telah Diperbolehkan Sidang Akhir Oleh Dosen Pembimbing 1",
      title: "Pemberitahuan"
     }
    )
   }
   updateDoc(studentRef, value1)
   window.alert("Berhasil Menerima Sidang Akhir Selaku Dosen Pembimbing 1")
   setSetuju(false)
   const newStudentData = student.filter((item: any) => {
    return item.uid !== uidUser
   })
   setStudent(newStudentData);

  }
  else if (profDua === user.name) {
   const value2 = {
    sidangDate: [
     {
      feedbackNote: feedbackNoteUser,
      isApprovedByProfOne: isApprovedByProfOne,
      isApprovedByProfTwo: user.name,
      dateToBe: dateToBe
     },
    ],
    notifications: arrayUnion(
     {
      id: user.uid,
      isRead: false,
      text: "Kamu Telah Diperbolehkan Sidang Akhir Oleh Dosen Pembimbing 2",
      title: "Pemberitahuan"
     }
    )
   }
   updateDoc(studentRef, value2)
   window.alert("Berhasil Menerima Sidang Akhir Selaku Dosen Pembimbing 2")
   setSetuju(false)
   const newStudentData = student.filter((item: any) => {
    return item.uid !== uidUser
   })
   setStudent(newStudentData);
  }
 }
 useEffect(() => {
  getStudent()
 }, [])
 return (
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
         Apakah anda ingin menyutujui sidang akhir untuk mahasiswa ini?
        </p>
        <div className="p-4 flex gap-2 justify-end items-end">
         <button
          onClick={updateApprove}
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
         Apakah anda ingin menolak sidang akhir untuk mahasiswa ini?
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

   <div className=" inline-block overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] max-w-[350px] sm:max-w-full ">
    <table className="table-auto text-sm text-left text-gray-900 capitalize ">
     <thead className="text-xs text-white  bg-patternTwo sticky top-0 z-auto ">
      <tr>
       <th scope="col" className="px-6 py-3">
        <div className="flex items-center gap-2">
         Nama
         <a href="#">
          <RiSortDesc />
         </a>
        </div>
       </th>
       <th scope="col" className="px-6 py-3">
        <div className="flex items-center justify-center gap-2">
         Judul
         <a href="#">
          <RiSortDesc />
         </a>
        </div>
       </th>
       <th scope="col" className="px-6 py-3">
        <div className="flex items-center gap-2">
         Angkatan
         <a href="#">
          <RiSortDesc />
         </a>
        </div>
       </th>
       <th scope="col" className="px-6 py-3">
        <div className="flex items-center">Berkas</div>
       </th>
       <th scope="col" className="px-6 py-3">
        <div className="flex items-center">Sebagai</div>
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
        className="even:bg-[#f0ebf8d7] odd:bg-white border-b "
       >
        <th
         scope="row"
         className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
        >
         {data.name}
        </th>
        <td className="px-6 py-2 max-w-[20%] text-center">{data.title[0].titleText ? data.title[0].titleText : "-"}</td>
        <td className="px-6 py-2 text-center">{data.generation}</td>
        <td className="py-1">
         <div className="flex flex-col items-center">
          {data.sidangDate[0].dateToBe ? data.sidangDate[0].dateToBe : "-"}
          <Link
           className="hover:underline hover:text-black underline:none text-purple-500"
           href={`${data.fileSidang}`}
          >
           {data.fileSidang ? "Cek" : ""}
          </Link>
         </div>
        </td>
        <td className="px-6 py-2">
         {data.profOne === user.name ? "Dospem 1" : data.profTwo === user.name ? "Dospem 2" : "None"}
        </td>
        {data.fileSidang ?
         <td className="px-6 py-2 text-right flex gap-2">
          <button
           onClick={() => getValue(data.uid, data.profOne, data.profTwo, data.sidangDate[0].feedbackNote, data.sidangDate[0].isApprovedByProfOne, data.sidangDate[0].isApprovedByProfTwo, data.sidangDate[0].dateToBe)}
           className="font-medium text-white ring-1 hover:ring-green-500 hover:bg-white hover:text-green-500 bg-green-500 p-2 rounded-md"
          >
           Setuju
          </button>
          <button
           onClick={() => setTolak(!tolak)}
           className="font-medium text-white ring-1 hover:ring-red-600  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md"
          >
           Tolak
          </button>
         </td>
         :
         <td className="text-center">{"-"}</td>
        }

       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}
