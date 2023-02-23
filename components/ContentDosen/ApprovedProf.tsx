import { arrayUnion, collection, doc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";
import { userAgent } from "next/server";
import React, { useCallback, useEffect, useState } from "react";
import { RiSortDesc, RiCloseLine } from "react-icons/ri";
import { useAuth } from "../Context/AuthContext";
import { db } from "../Store/firebase";

interface dataTable {
 id: number;
 name: string;
 title: string;
 generation: number;
}

export default function ApprovalTable() {
 const { user } = useAuth()
 const [setuju, setSetuju] = useState<any>(false);
 const [tolak, setTolak] = useState<any>(false);
 const [student1, setStudent1] = useState<any>([]);
 const [student2, setStudent2] = useState<any>([]);
 const [uidUser, setUidUser] = useState<any>()
 const [profSatu, setProfSatu] = useState<any>()
 const [profDua, setProfDua] = useState<any>()
 const [feedbackNoteUser, setFeedbackNoteUser] = useState<any>()
 const [isApprovedByProfOne, setIsApprovedByProfOne] = useState<any>()
 const [isApprovedByProfTwo, setIsApprovedByProfTwo] = useState<any>()
 const [titleTextUser, setTitleTextuser] = useState<any>()
 
 const getStudent1 = useCallback(async () => {
  try {
   const studentRef1 = query(
    collection(db, "studentsList"),
    where("statusApprove", "==", true), where("profOne", "==", user.name)
   );
   const studentsData1 = (await getDocs(studentRef1)).docs
    .map((item) => item)
    .map((item) => item.data());
   setStudent1(studentsData1);
  } catch (e) {
   console.log(e);
  }
 }, [student1])
 const getStudent2 = useCallback(async () => {
  try {
   const studentRef2 = query(
    collection(db, "studentsList"),
    where("statusApprove", "==", true), where("profTwo", "==", user.name)
   );
   const studentsData2 = (await getDocs(studentRef2)).docs
    .map((item) => item)
    .map((item) => item.data());
   setStudent2(studentsData2);
  } catch (e) {
   console.log(e);
  }
 }, [student2])
 const getValue = (uid: any, profOne: any, profTwo: any, feedbackNote: any, isApprovedByProfOne: any, isApprovedByProfTwo: any, titleText: any) => {
  setSetuju(true)
  setUidUser(uid)
  setProfSatu(profOne)
  setProfDua(profTwo)
  setFeedbackNoteUser(feedbackNote)
  setIsApprovedByProfOne(isApprovedByProfOne)
  setIsApprovedByProfTwo(isApprovedByProfTwo)
  setTitleTextuser(titleText)
 }
 const updateApprove = async () => {
  const studentRef = doc(db, "studentsList", uidUser);
  if (profSatu === user.name) {
   const value1 = {
    title: [
     {
      feedbackNote: feedbackNoteUser,
      isApprovedByProfOne: true,
      isApprovedByProfTwo: isApprovedByProfTwo,
      titleText: titleTextUser
     },
    ],
    notifications: arrayUnion(
     {
      id: user.uid,
      isRead: false,
      text: "Judul Skripsi Kamu Telah Di Terima Dosen Pembimbing 1",
      title: "Pemberitahuan"
     }
    )
   }
   updateDoc(studentRef, value1)
   window.alert("Berhasil Menerima Judul Skripsi Selaku Dosen Pembimbing 1")
   setSetuju(false)
  }
  else if (profDua === user.name) {
   const value2 = {
    title: [
     {
      feedbackNote: feedbackNoteUser,
      isApprovedByProfOne: isApprovedByProfOne,
      isApprovedByProfTwo: true,
      titleText: titleTextUser
     },
    ],
    notifications: arrayUnion(
     {
      id: user.uid,
      isRead: false,
      text: "Judul Skripsi Kamu Telah Di Terima Dosen Pembimbing 2",
      title: "Pemberitahuan"
     }
    )
   }
   updateDoc(studentRef, value2)
   window.alert("Berhasil Menerima Judul Skripsi Selaku Dosen Pembimbing 2")
   setSetuju(false)
  }
 }
 useEffect(() => {
  getStudent1()
  getStudent2()
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
         Apakah anda ingin menyutujui judul skripsi ini?
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
         Apakah anda ingin menolak judul skripsi ini?
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
    <div className="text-xl"> Selaku Dosen Pembimbing 1</div>
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
        <div className="flex items-center gap-2">
         Sebagai
         <a href="#">
          <RiSortDesc />
         </a>
        </div>
       </th>
       <th scope="col" className="px-6 py-3">
        <div className="flex items-center justify-center">Aksi</div>
       </th>
      </tr>
     </thead>
     <tbody>
      {student1.length > 0 ? student1.map((data: any, index: any) => (
       <tr
        key={index}
        className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto "
       >
        {data.title[0].isApprovedByProfOne === false &&
         <>
          <td
           scope="row"
           className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
          >
           {data.name}
          </td>
          {data.title.map((item: any) => (
           <td className="px-6 py-2 max-w-[20%]">
            {item.titleText ? item.titleText : "-"}
           </td>
          ))}
          <td className="px-6 py-2">{data.generation}</td>
          <td className="px-6 py-2">
           {data.profOne === user.name ? "Dospem 1" : data.profTwo === user.name ? "Dospem 2" : "None"}
          </td>
          {data.title.map((item: any) => (
           <td className="px-6 py-2 text-right flex gap-2">
            {item.titleText !== "" ? (
             <>
              <button
               onClick={() => getValue(data.uid, data.profOne, data.profTwo, item.feedbackNote, item.isApprovedByProfOne, item.isApprovedByProfTwo, item.titleText)}
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
             </>
            ) : (
             <p className="text-center">{"-"}</p>
            )}
           </td>
          ))}
         </>    
        }

       </tr>
      )) : (<>NONEE</>)}
     </tbody>
    </table>
   </div>
   <div className="inline-block overflow-auto shadow-md sm:rounded-lg sm:max-w-full max-w-[350px] max-h-[500px] mt-4 ">
      <div className="text-xl "> Selaku Dosen Pembimbing 2</div>
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
        <div className="flex items-center gap-2">
         Sebagai
         <a href="#">
          <RiSortDesc />
         </a>
        </div>
       </th>
       <th scope="col" className="px-6 py-3">
        <div className="flex items-center justify-center">Aksi</div>
       </th>
      </tr>
     </thead>
     <tbody>
      {student2.length > 0 ? student2.map((data: any, index: any) => (
       <tr
        key={index}
        className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto "
       >
        {data.title[0].isApprovedByProfTwo === false &&
         <>
          <td
           scope="row"
           className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
          >
           {data.name}
          </td>
          {data.title.map((item: any) => (
           <td className="px-6 py-2 max-w-[20%]">
            {item.titleText ? item.titleText : "-"}
           </td>
          ))}
          <td className="px-6 py-2">{data.generation}</td>
          <td className="px-6 py-2">
           {data.profOne === user.name ? "Dospem 1" : data.profTwo === user.name ? "Dospem 2" : "None"}
          </td>
          {data.title.map((item: any) => (
           <td className="px-6 py-2 text-right flex gap-2">
            {item.titleText !== "" ? (
             <>
              <button
               onClick={() => getValue(data.uid, data.profOne, data.profTwo, item.feedbackNote, item.isApprovedByProfOne, item.isApprovedByProfTwo, item.titleText)}
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
             </>
            ) : (
             <p className="text-center">{"-"}</p>
            )}
           </td>
          ))}
         </>    
        }

       </tr>
      )) : (<>NONEE</>)}
     </tbody>
    </table>
   </div>
  </div>
 );
}
