import React, { useCallback, useEffect, useState } from "react";
import {
  RiCloseLine,
  RiSortDesc,
  RiLoader5Line,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
} from "react-icons/ri";
import { useAuth } from "../Context/AuthContext";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Store/firebase";

import Link from "next/link";
import { CloseButton, SendButton } from "../Common/Buttons";
interface dataTable {
  id: number;
  name: string;
  title: string;
  file: string;
  generation: number;
  seminarDate: string;
}

export default function SeminarList() {
  const { user } = useAuth();
  const [setuju, setSetuju] = useState<any>(false);
  const [tolak, setTolak] = useState<any>(false);
  const [student, setStudent] = useState<any>([]);
  const [uidUser, setUidUser] = useState<any>();
  const [profSatu, setProfSatu] = useState<any>();
  const [profDua, setProfDua] = useState<any>();
  const [studentName, setStudentName] = useState<any>();
  const [newFeedback, setNewFeedBack] = useState("");
  const [feedbackNoteUser1, setFeedbackNoteUser1] = useState<any>();
  const [feedbackNoteUser2, setFeedbackNoteUser2] = useState<any>();
  const [isApprovedByProfOne, setIsApprovedByProfOne] = useState<any>();
  const [isApprovedByProfTwo, setIsApprovedByProfTwo] = useState<any>();
  const [dateToBe, setDateToBe] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getStudent = useCallback(async () => {
    setLoading(false);
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
        .map((item) => item.data())
        .filter((item) => item.seminarDate[0].isApprovedByProfOne !== "Denied");

      const studentsData2 = (await getDocs(studentRef2)).docs
        .map((item) => item)
        .map((item) => item.data())
        .filter((item) => item.seminarDate[0].isApprovedByProfTwo !== "Denied");

      const arrayStudents = [...studentsData1, ...studentsData2].filter(
        (item: any) => item.profOne === user.name || item.profTwo === user.name
      );

      const fixArray = arrayStudents
        .map((item: any) => {
          if (item.profOne === user.name) {
            if (item.seminarDate[0].isApprovedByProfOne !== user.name)
              return item;
          } else if (item.profTwo === user.name) {
            if (item.seminarDate[0].isApprovedByProfTwo !== user.name)
              return item;
          }
        })
        .filter((item: any) => item !== undefined);
      setStudent(fixArray);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  }, [user]);
  const getValueApprove = (
    uid: any,
    name: any,
    profOne: any,
    profTwo: any,
    feedbackNote1: any,
    feedbackNote2: any,
    isApprovedByProfOne: any,
    isApprovedByProfTwo: any,
    dateToBe: any
  ) => {
    setSetuju(true);
    setUidUser(uid);
    setStudentName(name);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setFeedbackNoteUser1(feedbackNote1);
    setFeedbackNoteUser2(feedbackNote2);
    setIsApprovedByProfOne(isApprovedByProfOne);
    setIsApprovedByProfTwo(isApprovedByProfTwo);
    setDateToBe(dateToBe);
  };
  const getValueDenied = (
    uid: any,
    name: any,
    profOne: any,
    profTwo: any,
    feedbackNote1: any,
    feedbackNote2: any,
    isApprovedByProfOne: any,
    isApprovedByProfTwo: any,
    dateToBe: any
  ) => {
    setTolak(true);
    setUidUser(uid);
    setStudentName(name);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setFeedbackNoteUser1(feedbackNote1);
    setFeedbackNoteUser2(feedbackNote2);
    setIsApprovedByProfOne(isApprovedByProfOne);
    setIsApprovedByProfTwo(isApprovedByProfTwo);
    setDateToBe(dateToBe);
  };
  const updateApprove = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        seminarDate: [
          {
            feedbackNoteByProfOne: newFeedback,
            feedbackNoteByProfTwo: feedbackNoteUser2,
            isApprovedByProfOne: user.name,
            isApprovedByProfTwo: isApprovedByProfTwo,
            dateToBe: dateToBe,
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text:
            "Kamu Telah Diperbolehkan Seminar Hasil Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
      };
      updateDoc(studentRef, value1);
      window.alert("Berhasil Menerima Seminar Hasil Selaku Dosen Pembimbing 1");
      setSetuju(false);
      const newStudentData = student.filter((item: any) => {
        return item.uid !== uidUser;
      });
      setStudent(newStudentData);
    } else if (profDua === user.name) {
      const value2 = {
        seminarDate: [
          {
            feedbackNoteByProfOne: feedbackNoteUser1,
            feedbackNoteByProfTwo: newFeedback,
            isApprovedByProfOne: isApprovedByProfOne,
            isApprovedByProfTwo: user.name,
            dateToBe: dateToBe,
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text:
            "Kamu Telah Diperbolehkan Seminar Hasil Oleh Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
      };
      updateDoc(studentRef, value2);
      window.alert("Berhasil Menerima Seminar Hasil Selaku Dosen Pembimbing 2");
      setSetuju(false);
      const newStudentData = student.filter((item: any) => {
        return item.uid !== uidUser;
      });
      setStudent(newStudentData);
    }
  };
  const updateDenied = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        seminarDate: [
          {
            feedbackNoteByProfOne: newFeedback,
            feedbackNoteByProfTwo: feedbackNoteUser2,
            isApprovedByProfOne: "Denied",
            isApprovedByProfTwo: isApprovedByProfTwo,
            dateToBe: dateToBe,
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text:
            "Kamu TIDAK DI PERBOLEHKAN Seminar Hasil Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
      };
      updateDoc(studentRef, value1);
      window.alert("Berhasil Menolak Seminar Hasil Selaku Dosen Pembimbing 1");
      setTolak(false);
      const newStudentData = student.filter((item: any) => {
        return item.uid !== uidUser;
      });
      setStudent(newStudentData);
    } else if (profDua === user.name) {
      const value2 = {
        seminarDate: [
          {
            feedbackNoteByProfOne: feedbackNoteUser1,
            feedbackNoteByProfTwo: newFeedback,
            isApprovedByProfOne: isApprovedByProfOne,
            isApprovedByProfTwo: "Denied",
            dateToBe: dateToBe,
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text:
            "Kamu TIDAK DI PERBOLEHKAN Diperbolehkan Seminar Hasil Oleh Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
      };
      updateDoc(studentRef, value2);
      window.alert("Berhasil Menolak Seminar Hasil Selaku Dosen Pembimbing 2");
      setTolak(false);
      const newStudentData = student.filter((item: any) => {
        return item.uid !== uidUser;
      });
      setStudent(newStudentData);
    }
  };
  useEffect(() => {
    getStudent();
  }, []);
  const handleCloseModal = () => {
    setSetuju(!setuju);
    setNewFeedBack("");
  };
  const handleCloseModalTolak = () => {
    setTolak(!tolak);
    setNewFeedBack("");
  };
  const handleAssignSeminarDate = () => {
    if (newFeedback) updateApprove();
    else alert("Lengkapi data terlebih dahulu!");
  };
  const handleDeniedSeminarDate = () => {
    if (newFeedback) updateDenied();
    else alert("Lengkapi data terlebih dahulu!");
  };
  return (
    <div>
      {setuju && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton handleClick={handleCloseModal} />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  {`Apakah anda ingin menyetujui ${studentName} melakukan seminar hasil?`}
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <SendButton handleClick={handleAssignSeminarDate} />
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
              <CloseButton handleClick={handleCloseModalTolak} />

              <div className="p-4 flex flex-col gap-2 mt-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  {`Apakah anda ingin tidak menginjinkan ${studentName} melakukan seminar hasil ?`}
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <SendButton handleClick={handleDeniedSeminarDate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading ? (
        <RiLoader5Line className="animate-spin text-3xl mt-5" />
      ) : (
        <div className=" inline-block overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] max-w-[350px] sm:max-w-full">
          <table className="text-sm text-left text-gray-900 capitalize ">
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
                  <div className="flex items-center justify-center  gap-2">
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
                  <td className="px-6 py-2 max-w-[20%] text-center">
                    {data.title[0].titleText ? data.title[0].titleText : "-"}
                  </td>
                  <td className="px-6 py-2 text-center">{data.generation}</td>
                  <td className="py-1">
                    <div className="flex flex-col items-center">
                      {data.seminarDate[0].dateToBe
                        ? data.seminarDate[0].dateToBe
                        : "-"}
                      <Link
                        target="_blank"
                        className="hover:underline hover:text-black underline:none text-purple-500"
                        href={`${data.fileSeminar}`}
                      >
                        {data.fileSeminar ? "Cek" : ""}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-2">
                    {data.profOne === user.name
                      ? "Dospem 1"
                      : data.profTwo === user.name
                      ? "Dospem 2"
                      : "None"}
                  </td>
                  {data.fileSeminar ? (
                    <td className="px-6 py-2 text-right flex gap-2">
                      <button
                        onClick={() =>
                          getValueApprove(
                            data.uid,
                            data.name,
                            data.profOne,
                            data.profTwo,
                            data.seminarDate[0].feedbackNoteByProfOne,
                            data.seminarDate[0].feedbackNoteByProfTwo,
                            data.seminarDate[0].isApprovedByProfOne,
                            data.seminarDate[0].isApprovedByProfTwo,
                            data.seminarDate[0].dateToBe
                          )
                        }
                        className="font-medium text-white ring-1 hover:ring-green-500 hover:bg-white hover:text-green-500 bg-green-500 p-2 rounded-md"
                      >
                        <RiCheckboxCircleLine className="text-2xl" />
                      </button>
                      <button
                        onClick={() =>
                          getValueDenied(
                            data.uid,
                            data.name,
                            data.profOne,
                            data.profTwo,
                            data.seminarDate[0].feedbackNoteByProfOne,
                            data.seminarDate[0].feedbackNoteByProfTwo,
                            data.seminarDate[0].isApprovedByProfOne,
                            data.seminarDate[0].isApprovedByProfTwo,
                            data.seminarDate[0].dateToBe
                          )
                        }
                        className="font-medium text-white ring-1 hover:ring-red-600  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md"
                      >
                        <RiCloseCircleLine className="text-2xl" />
                      </button>
                    </td>
                  ) : (
                    <td className="text-center">{"-"}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
