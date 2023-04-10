import { useCallback, useEffect, useState } from "react";
import { RiSortDesc, RiLoader5Line } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import FilterSection from "../Layout/FilterSection";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  deleteDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../Store/firebase";
import { CloseButton, ErrorButton, SendButton } from "../Common/Buttons";
import Dropdown from "../Common/Dropdown";
import { useAuth } from "../Context/AuthContext";
import moment from "moment";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
interface dataTable {
  id: number;
  name: string;
  nim: string;
  dosenSatu: string;
  dosenDua: string;
  seminar: string;
  sidang: string;
}

interface Props {
  selectedYear: string;
  searchedName: string;
}

export interface FilterParams {
  filterType?: "searchedName" | "selectedYear";
  value?: string;
}

export default function ListMahasiswa({ searchedName, selectedYear }: Props) {
  const { user } = useAuth();

  const [student, setStudent] = useState<any>([]);
  const [useridSeminar, setUseridSeminar] = useState("");
  const [useridSidang, setUseridSidang] = useState("");
  const [studentId, setStudentId] = useState<any>();

  const [hapus, setHapus] = useState<any>(false);
  const [examiner, setExaminer] = useState<any>([]);
  const [assignSeminar, setAssignSeminar] = useState<any>(false);
  const [assignSidang, setAssignSidang] = useState<any>(false);
  const [examinerOne, setExaminerOne] = useState("");
  const [examinerTwo, setExaminerTwo] = useState("");
  const [seminarDate, setSeminarDate] = useState<any>();
  const [sidangDate, setSidangDate] = useState<any>();
  const [feedbackTextAreaSeminar, setFeedbackTextAreaSeminar] = useState("");
  const [feedbackTextAreaSidang, setFeedbackTextAreaSidang] = useState("");

  const [isApprovedByProfOneSeminar, setIsApprovedByProfOneSeminar] = useState<
    any
  >();
  const [isApprovedByProfTwoSeminar, setIsApprovedByProfTwoSeminar] = useState<
    any
  >();

  const [isApprovedByProfOneSidang, setIsApprovedByProfOneSidang] = useState<
    any
  >();
  const [isApprovedByProfTwoSidang, setIsApprovedByProfTwoSidang] = useState<
    any
  >();

  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async ({ filterType, value }: FilterParams) => {
    setLoading(false);

    const studentRef = filterType === "searchedName" && value ? query(
      collection(db, "studentsList"),
      where("statusApprove", "==", true),
      where("name", "==", value)
    ) : filterType === "selectedYear" && value ? query(
      collection(db, "studentsList"),
      where("statusApprove", "==", true),
      where("generation", "==", String(value))
    ) : query(
      collection(db, "studentsList"),
      where("statusApprove", "==", true)
    );

    try {
      const studentsData = (await getDocs(studentRef)).docs
        .map((item) => item)
        .map((item) => item.data());

      setStudent(studentsData);
      setLoading(true);
    } catch (e) {
      console.log(e);
      toast.error('Silahkan Muat Ulang Halaman', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [student]);

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
    getData({});
    getProf();
  }, [user]);

  useEffect(() => {
    getData({ filterType: "searchedName", value: searchedName });
  }, [searchedName]);

  useEffect(() => {
    getData({ filterType: "selectedYear", value: selectedYear });
  }, [selectedYear]);

  const getStatusSeminar = (
    uid: any,
    isApprovedByProfOne: any,
    isApprovedByProfTwo: any
  ) => {
    setAssignSeminar(true);
    setUseridSeminar(uid);
    setIsApprovedByProfOneSeminar(isApprovedByProfOne);
    setIsApprovedByProfTwoSeminar(isApprovedByProfTwo);
  };

  const getStatusSidang = (
    uid: any,
    isApprovedByProfOne: any,
    isApprovedByProfTwo: any
  ) => {
    setAssignSidang(true);
    setUseridSidang(uid);
    setIsApprovedByProfOneSidang(isApprovedByProfOne);
    setIsApprovedByProfTwoSidang(isApprovedByProfTwo);
  };

  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();

    const formattedDate = moment(newDate).format("DD MMM YYYY");
    return formattedDate;
  };

  const getUpdateSeminar = async () => {
    const examinerOneData: any = examinerOne;
    const examinerTwoData: any = examinerTwo;

    const studentRef = doc(db, "studentsList", useridSeminar);
    const valueUpdate = {
      examinerOne: examinerOneData.name,
      examinerTwo: examinerTwoData.name,
      activity: arrayUnion({
        feedbackDate: getCurrentDate(),
        feedbackText: feedbackTextAreaSeminar,
        feedbackProfName: user.name,
        feedbackActivity: "Menetapkan jadwal seminar hasil",
      }),
      seminarDate: [
        {
          dateToBe: seminarDate,
          isApprovedByProfOne: isApprovedByProfOneSeminar,
          isApprovedByProfTwo: isApprovedByProfTwoSeminar,
        },
      ],
    };

    const profOneRef = doc(db, "professorList", examinerOneData.uid);
    const notifProfOne = {
      notifications: arrayUnion({
        id: user.uid,
        isRead: false,
        text: "Anda ditetapkan sebagai penguji seminar hasil",
        title: "Pemberitahuan",
      }),
    };

    const profTwoRef = doc(db, "professorList", examinerTwoData.uid);
    const notifProfTwo = {
      notifications: arrayUnion({
        id: user.uid,
        isRead: false,
        text: "Anda ditetapkan sebagai pengujib seminar hasil",
        title: "Pemberitahuan",
      }),
    };
    await updateDoc(studentRef, valueUpdate).then(() => {
      updateDoc(profOneRef, notifProfOne);
      updateDoc(profTwoRef, notifProfTwo);
      toast.success('Seminar Hasil Berhasil Diatur', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setAssignSeminar(false);
      setSeminarDate("");
      setExaminerOne("");
      setExaminerTwo("");
    });

    getData({});
  };

  const getUpdateSidang = async () => {
    const examinerOneData: any = examinerOne;
    const examinerTwoData: any = examinerTwo;

    const studentRef = doc(db, "studentsList", useridSidang);
    const valueUpdate = {
      examinerOne: examinerOneData.name,
      examinerTwo: examinerTwoData.name,
      activity: arrayUnion({
        feedbackDate: getCurrentDate(),
        feedbackText: feedbackTextAreaSidang,
        feedbackProfName: user.name,
        feedbackActivity: "Menetapkan jadwal sidang akhir",
      }),
      sidangDate: [
        {
          dateToBe: sidangDate,
          isApprovedByProfOne: isApprovedByProfOneSidang,
          isApprovedByProfTwo: isApprovedByProfTwoSidang,
        },
      ],
    };

    const profOneRef = doc(db, "professorList", examinerOneData.uid);
    const notifProfOne = {
      notifications: arrayUnion({
        id: user.uid,
        isRead: false,
        text: "Anda ditetapkan sebagai penguji sidang akhir",
        title: "Pemberitahuan",
      }),
    };

    const profTwoRef = doc(db, "professorList", examinerTwoData.uid);
    const notifProfTwo = {
      notifications: arrayUnion({
        id: user.uid,
        isRead: false,
        text: "Anda ditetapkan sebagai penguji sidang akhir",
        title: "Pemberitahuan",
      }),
    };

    await updateDoc(studentRef, valueUpdate).then(() => {
      updateDoc(profOneRef, notifProfOne);
      updateDoc(profTwoRef, notifProfTwo);
      toast.success('Sidang Akhir Berhasil Diatur', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setAssignSidang(false);
      setSidangDate("");
      setExaminerOne("");
      setExaminerTwo("");
    });

    getData({});
  };

  const handleCloseSeminarModal = () => {
    setAssignSeminar(!assignSeminar);
    setExaminerOne("");
    setExaminerTwo("");
  };

  const handleCloseSidangModal = () => {
    setAssignSidang(!assignSidang);
    setExaminerOne("");
    setExaminerTwo("");
  };

  const handleAssignSeminar = () => {
    if (examinerOne && examinerTwo && seminarDate && feedbackTextAreaSeminar)
      getUpdateSeminar();
    else toast.error('Lengkapi data terlebih dahulu!', {
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

  const handleAssignSidang = () => {
    if (examinerOne && examinerTwo && sidangDate && feedbackTextAreaSidang)
      getUpdateSidang();
    else toast.error('Lengkapi data terlebih dahulu!', {
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

  const selectExaminerOne = (itemData: any) => {
    setExaminerOne(itemData);
  };

  const selectExaminerTwo = (itemData: any) => {
    setExaminerTwo(itemData);
  };

  const getStudentId = (uid: any) => {
    setHapus(true);
    setStudentId(uid);
  };
  const deleteData = () => {
    let fieldEdit = doc(db, "studentsList", studentId);

    deleteDoc(fieldEdit)
      .then(() => {
        toast.success('Data Berhasil Dihapus', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setHapus(!hapus);
        getData({});
      })
      .catch((err) => {
        toast.error('Tidak Dapat Menghapus Data!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div>
        {assignSeminar && (
          <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
            <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
            <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
              <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
                <CloseButton handleClick={handleCloseSeminarModal} />

                <div className="p-4 flex flex-col mt-9 gap-2">
                  <div className="relative xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <p className="text-justify">
                      Masukkan tanggal seminar hasil
                    </p>
                    <input
                      className="w-full bg-gray-200 p-2 my-2"
                      type="date"
                      onChange={(e) => setSeminarDate(e.target.value)}
                      value={seminarDate}
                    />
                    <Dropdown
                      displayText="Pilih Dosen Penguji 1"
                      handleClickItem={selectExaminerOne}
                      dropdownData={examiner}
                    />
                  </div>
                  <div className="relative xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <Dropdown
                      displayText="Pilih Dosen Penguji 2"
                      handleClickItem={selectExaminerTwo}
                      dropdownData={examiner}
                    />
                  </div>
                  <div className="relative xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <textarea
                      placeholder="Masukkan Catatan"
                      className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                      required
                      value={feedbackTextAreaSeminar}
                      onChange={(e) =>
                        setFeedbackTextAreaSeminar(e.target.value)
                      }
                    />
                  </div>
                  <div className="p-4 flex gap-2 justify-end items-end">
                    <SendButton handleClick={handleAssignSeminar} />
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
                <CloseButton handleClick={handleCloseSidangModal} />

                <div className="p-4 flex flex-col mt-9 gap-2">
                  <div className="relative xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <p className="text-justify">
                      Masukkan tanggal sidang akhir
                    </p>
                    <input
                      type="date"
                      className="w-full bg-gray-200 p-2 my-2"
                      onChange={(e) => setSidangDate(e.target.value)}
                      value={sidangDate}
                    />
                    <Dropdown
                      displayText="Pilih Dosen Penguji 1"
                      handleClickItem={selectExaminerOne}
                      dropdownData={examiner}
                    />
                  </div>
                  <div className="relative xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <Dropdown
                      displayText="Pilih Dosen Penguji 2"
                      handleClickItem={selectExaminerTwo}
                      dropdownData={examiner}
                    />
                  </div>
                  <div className="relative xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <textarea
                      placeholder="Masukkan Catatan"
                      className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                      required
                      value={feedbackTextAreaSidang}
                      onChange={(e) =>
                        setFeedbackTextAreaSidang(e.target.value)
                      }
                    />
                  </div>
                  <div className="p-4 flex gap-2 justify-end items-end">
                    <SendButton handleClick={handleAssignSidang} />
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
                <CloseButton handleClick={() => setHapus(false)} />

                <div className="p-4 flex flex-col gap-2 mt-4">
                  <p className="block text-xl mt-6 font-medium text-gray-900 ">
                    Apakah anda ingin menghapus data mahasiswa ini?
                  </p>
                  <div className="p-4 flex gap-2 justify-end items-end">
                    <ErrorButton
                      handleClick={() => deleteData()}
                      buttonText="Hapus"
                    />
                    <SendButton
                      handleClick={() => setHapus(false)}
                      buttonText="Batal"
                    />
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
              {
                loading ? (
                  student.map((data: any, index: any) => (
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

                      {data.seminarDate.map((item: any, index: any) => (
                        <td key={index} className="px-6 py-2 text-center ">
                          {
                            data.seminarDate[0].dateToBe !== ""
                              ? <div>
                                <p>{item.dateToBe}</p>
                                <button
                                  onClick={() =>
                                    getStatusSeminar(
                                      data.uid,
                                      item.isApprovedByProfOne,
                                      item.isApprovedByProfTwo
                                    )
                                  }
                                  className="font-medium text-white hover:opacity-80  bg-[#c282f6] focus:outline-none p-2 rounded-md"
                                >
                                  Tanggal Seminar
                                </button>
                              </div>
                              :
                              (item.isApprovedByProfOne !== "") &&
                                (item.isApprovedByProfTwo !== "") ? (
                                <button
                                  onClick={() =>
                                    getStatusSeminar(
                                      data.uid,
                                      item.isApprovedByProfOne,
                                      item.isApprovedByProfTwo
                                    )
                                  }
                                  className="font-medium text-white hover:opacity-80  bg-[#c282f6] focus:outline-none p-2 rounded-md"
                                >
                                  Tanggal Seminar
                                </button>
                              )
                                : (
                                  <p>Belum ditentukan</p>
                                )
                          }
                        </td>
                      ))}
                      {data.sidangDate.map((item: any, index: any) => (
                        <td key={index} className="px-6 py-2 text-center ">
                          {
                            data.sidangDate[0].dateToBe !== ""
                              ? <div>
                                <p>{item.dateToBe}</p>
                                <button
                                  onClick={() =>
                                    getStatusSidang(
                                      data.uid,
                                      item.isApprovedByProfOne,
                                      item.isApprovedByProfTwo
                                    )
                                  }
                                  className="font-medium text-white hover:opacity-80  bg-[#c282f6] focus:outline-none p-2 rounded-md"
                                >
                                  Tanggal Sidang
                                </button>
                              </div>
                              :
                              (item.isApprovedByProfOne !== "") &&
                                (item.isApprovedByProfTwo !== "") ? (
                                <button
                                  onClick={() =>
                                    getStatusSidang(
                                      data.uid,
                                      item.isApprovedByProfOne,
                                      item.isApprovedByProfTwo
                                    )
                                  }
                                  className="font-medium text-white hover:opacity-80  bg-[#c282f6] focus:outline-none p-2 rounded-md"
                                >
                                  Tanggal Sidang
                                </button>
                              ) : (
                                <p>Belum ditentukan</p>
                              )}
                        </td>
                      ))}
                      <td className="px-6 py-2">
                        <button
                          onClick={() => getStudentId(data.uid)}
                          className="font-medium text-white hover:opacity-50 duration-150 bg-[#D0312D] p-2 rounded-md"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) :
                  (
                    <>
                      <tr className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto ">
                        <td
                          scope="row"
                          colSpan={7}
                          className="text-center px-6 py-2 whitespace-nowrap max-w-[20%] "
                        >
                          <div className="flex items-center justify-center">
                            <RiLoader5Line className="animate-spin text-3xl my-5 " />
                          </div>
                        </td>
                      </tr>
                    </>
                  )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
