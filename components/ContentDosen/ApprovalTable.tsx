import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import {
  RiSortDesc,
  RiLoader5Line,
  RiCloseCircleLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import { StudentsData, TitleType } from "../../typings";
import { CloseButton, SendButton } from "../Common/Buttons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../Context/AuthContext";
import { db } from "../Store/firebase";

interface dataTable {
  id: number;
  name: string;
  title: string;
  generation: number;
}

interface Props {
  selectedYear: string;
  searchedName: string;
}

interface FilterParams {
  filterType?: "searchedName" | "selectedYear";
  value?: string;
}

export default function ApprovalTable({ searchedName, selectedYear }: Props) {
  const { user } = useAuth();
  const [setuju, setSetuju] = useState<boolean>(false);
  const [tolak, setTolak] = useState<boolean>(false);
  const [student, setStudent] = useState<DocumentData[] | StudentsData[]>([]);
  const [uidUser, setUidUser] = useState<string>("");
  const [profSatu, setProfSatu] = useState<string>("");
  const [profDua, setProfDua] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [newFeedback, setNewFeedBack] = useState("");
  const [isApprovedByProfOne, setIsApprovedByProfOne] = useState<string>("");
  const [isApprovedByProfTwo, setIsApprovedByProfTwo] = useState<string>("");
  const [titleTextUser, setTitleTextUser] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getStudent = useCallback(
    async ({ filterType, value }: FilterParams) => {
      setLoading(false);
      try {
        const studentRef1 =
          filterType === "searchedName" && value
            ? query(
              collection(db, "studentsList"),
              where("statusApprove", "==", true),
              where("profOne", "==", user.name),
              where("name", "==", value)
            )
            : filterType === "selectedYear" && value
              ? query(
                collection(db, "studentsList"),
                where("statusApprove", "==", true),
                where("profOne", "==", user.name),
                where("generation", "==", String(value))
              )
              : query(
                collection(db, "studentsList"),
                where("statusApprove", "==", true),
                where("profOne", "==", user.name)
              );

        const studentRef2 =
          filterType === "searchedName" && value
            ? query(
              collection(db, "studentsList"),
              where("statusApprove", "==", true),
              where("profTwo", "==", user.name),
              where("name", "==", value)
            )
            : filterType === "selectedYear" && value
              ? query(
                collection(db, "studentsList"),
                where("statusApprove", "==", true),
                where("profTwo", "==", user.name),
                where("generation", "==", String(value))
              )
              : query(
                collection(db, "studentsList"),
                where("statusApprove", "==", true),
                where("profTwo", "==", user.name)
              );
        const studentsData1 = (await getDocs(studentRef1)).docs
          .map((item) => item)
          .map((item) => item.data())
          .filter((item) => item.title[0].isApprovedByProfOne !== "Denied")
          .filter((item) => item.title[0].titleText !== "");
        const studentsData2 = (await getDocs(studentRef2)).docs
          .map((item) => item)
          .map((item) => item.data())
          .filter((item) => item.title[0].isApprovedByProfTwo !== "Denied")
          .filter((item) => item.title[0].titleText !== "");

        const arrayStudents = [...studentsData1, ...studentsData2].filter(
          (item) => item.profOne === user.name || item.profTwo === user.name
        );

        const fixArray = arrayStudents.filter((item) => {
          if (item.profOne === user.name) {
            if (item.title[0].isApprovedByProfOne !== user.name) return item;
          } else if (item.profTwo === user.name) {
            if (item.title[0].isApprovedByProfTwo !== user.name) return item;
          }
        });

        setStudent(fixArray);
        setLoading(true);
      } catch (e) {
        console.log(e);
      }
    },
    [user, searchedName, selectedYear]
  );

  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();

    const formattedDate = moment(newDate).format("DD MMM YYYY");
    return formattedDate;
  };

  const getValueApprove = (
    uid: string,
    name: string,
    profOne: string,
    profTwo: string,
    isApprovedByProfOne: string,
    isApprovedByProfTwo: string,
    titleText: string
  ) => {
    setSetuju(true);
    setUidUser(uid);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setIsApprovedByProfOne(isApprovedByProfOne);
    setIsApprovedByProfTwo(isApprovedByProfTwo);
    setTitleTextUser(titleText);
    setStudentName(name);
  };

  const getValueDenied = (
    uid: string,
    name: string,
    profOne: string,
    profTwo: string,
    isApprovedByProfOne: string,
    isApprovedByProfTwo: string,
    titleText: string
  ) => {
    setTolak(true);
    setUidUser(uid);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setIsApprovedByProfOne(isApprovedByProfOne);
    setIsApprovedByProfTwo(isApprovedByProfTwo);
    setTitleTextUser(titleText);
    setStudentName(name);
  };

  const updateApprove = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        title: [
          {
            isApprovedByProfOne: user.name,
            isApprovedByProfTwo: isApprovedByProfTwo,
            titleText: titleTextUser,
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "Judul Skripsi Kamu Telah Di Terima Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Judul Skripsi",
        }),
      };
      updateDoc(studentRef, value1);
      toast.success(
        "Berhasil Menerima Judul Skripsi Selaku Dosen Pembimbing 1",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setSetuju(false);
      const newStudentData = student.filter((item) => {
        return item.uid !== uidUser;
      });
      setStudent(newStudentData);
    } else if (profDua === user.name) {
      const value2 = {
        title: [
          {
            isApprovedByProfOne: isApprovedByProfOne,
            isApprovedByProfTwo: user.name,
            titleText: titleTextUser,
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "Judul Skripsi Kamu Telah Di Terima Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Judul Skripsi",
        }),
      };
      updateDoc(studentRef, value2);
      toast.success(
        "Berhasil Menerima Judul Skripsi Selaku Dosen Pembimbing 2",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setSetuju(false);
      const newStudentData = student.filter((item) => {
        return item.uid !== uidUser;
      });
      setStudent(newStudentData);
    }
  };

  const updateDenied = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        title: [
          {
            isApprovedByProfOne: "Denied",
            isApprovedByProfTwo: isApprovedByProfTwo,
            titleText: titleTextUser,
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "Judul Skripsi Kamu Di TOLAK Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Judul Skripsi",
        }),
      };
      updateDoc(studentRef, value1);
      toast.success(
        "Berhasil Menolak Judul Skripsi Selaku Dosen Pembimbing 1",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setTolak(false);
      const newStudentData = student.filter((item) => {
        return item.uid !== uidUser;
      });
      setStudent(newStudentData);
    } else if (profDua === user.name) {
      const value2 = {
        title: [
          {
            isApprovedByProfOne: isApprovedByProfOne,
            isApprovedByProfTwo: "Denied",
            titleText: titleTextUser,
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "Judul Skripsi Kamu Di TOLAK Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Judul Skripsi",
        }),
      };
      updateDoc(studentRef, value2);
      toast.success(
        "Berhasil Menolak Judul Skripsi Selaku Dosen Pembimbing 2",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setTolak(false);
      const newStudentData = student.filter((item) => {
        return item.uid !== uidUser;
      });
      setStudent(newStudentData);
    }
  };

  useEffect(() => {
    getStudent({});
  }, [user]);

  useEffect(() => {
    getStudent({ filterType: "selectedYear", value: selectedYear });
  }, [selectedYear]);

  useEffect(() => {
    getStudent({ filterType: "searchedName", value: searchedName });
  }, [searchedName]);

  const handleCloseModal = () => {
    setSetuju(!setuju);
    setNewFeedBack("");
  };

  const handleCloseModalTolak = () => {
    setTolak(!tolak);
    setNewFeedBack("");
  };

  const handleAssignTitle = async () => {
    if (newFeedback) {
      await updateApprove();
      setSetuju(false);
    } else
      toast.error("Lengkapi data terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  const handleDeniedTitle = () => {
    if (newFeedback) updateDenied();
    else
      toast.error("Lengkapi data terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  return (
    <div className="w-full">
      <ToastContainer />
      {setuju && (
        <div className="flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton handleClick={handleCloseModal} />
              <div className="p-4 flex flex-col gap-2 mt-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  {`Apakah anda ingin menyetujui judul skripsi ${studentName} ?`}
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <SendButton handleClick={handleAssignTitle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {tolak && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-full -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton handleClick={handleCloseModalTolak} />

              <div className="p-4 flex flex-col gap-2 mt-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  {`Apakah anda ingin menolak judul skripsi ${studentName} ?`}
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <SendButton handleClick={handleDeniedTitle} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="inline-block overflow-auto w-full px-12">
        <table className="text-sm text-left text-gray-900 shadow-md capitalize w-full">
          <thead className="text-xs text-white bg-patternTwo sticky top-0 z-auto rounded-tl-lg">
            <tr>
              <th scope="col" className="px-6 py-3 max-w-[20%] rounded-tl-lg">
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
                <div className="flex items-center gap-2">
                  Sebagai
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th scope="col" className="px-6 py-3 rounded-tr-lg">
                <div className="flex items-center justify-center">Aksi</div>
              </th>
            </tr>
          </thead>
          {!loading ? (
            <tr className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto ">
              <td
                scope="row"
                colSpan={7}
                className="text-center px-6 py-2 whitespace-nowrap max-w-[20%] "
              >
                <div className="flex items-center justify-center">
                  <RiLoader5Line className="text-center animate-spin text-3xl mt-5" />
                </div>
              </td>
            </tr>
          ) : (
            <tbody>
              {student.length > 0 ? (
                student.map((data, index) => (
                  <tr
                    key={index}
                    className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto "
                  >
                    <td
                      scope="row"
                      className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
                    >
                      {data.name}
                    </td>
                    {data.title.map((item: TitleType, index: number) => (
                      <td
                        key={index}
                        className="px-6 py-2 max-w-[20%] text-center"
                      >
                        {item.titleText ? item.titleText : "-"}
                      </td>
                    ))}
                    <td className="px-6 py-2">{data.generation}</td>
                    <td className="px-6 py-2">
                      {data.profOne === user.name
                        ? "Dospem 1"
                        : data.profTwo === user.name
                          ? "Dospem 2"
                          : "None"}
                    </td>
                    {data.title.map((item: TitleType, index: number) => (
                      <td
                        key={index}
                        className="px-6 py-2 flex justify-center gap-2"
                      >
                        {item.titleText !== "" ? (
                          <>
                            <button
                              onClick={() =>
                                getValueApprove(
                                  data.uid,
                                  data.name,
                                  data.profOne,
                                  data.profTwo,
                                  item.isApprovedByProfOne,
                                  item.isApprovedByProfTwo,
                                  item.titleText
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
                                  item.isApprovedByProfOne,
                                  item.isApprovedByProfTwo,
                                  item.titleText
                                )
                              }
                              className="font-medium text-white ring-1 hover:ring-red-600  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md"
                            >
                              <RiCloseCircleLine className="text-2xl" />
                            </button>
                          </>
                        ) : (
                          <p className="flex justify-center text-center">
                            {"-"}
                          </p>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto ">
                  <td
                    scope="row"
                    colSpan={7}
                    className="text-center px-6 py-2 whitespace-nowrap max-w-[20%] "
                  >
                    <div className="flex items-center justify-center">
                      Tidak Ada Judul Skripsi yang Diajukan
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
