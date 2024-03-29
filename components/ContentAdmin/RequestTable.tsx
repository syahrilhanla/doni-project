import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { Key, useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import { RiSortDesc, RiCloseLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterSection from "../Layout/FilterSection";
import { db } from "../Store/firebase";
import { FilterParams } from "./ListMahasiswa";

interface dataTable {
  id: number;
  name: string;
  nim: string;
  status: boolean;
}

export interface Props {
  selectedYear: string;
  searchedName: string;
}

export default function RequestTable({ searchedName, selectedYear }: Props) {
  const [setuju, setSetuju] = useState<any>(false);
  const [tolak, setTolak] = useState<any>(false);
  const [student, setStudent] = useState<any>([]);
  const [prof, setProf] = useState<any>([]);
  const [dosen1, setDosen1] = useState("");
  const [dosen2, setDosen2] = useState("");
  const [userid, setUserid] = useState("");

  const getData = useCallback(async ({ filterType, value }: FilterParams) => {
    const studentRef = filterType === "searchedName" && value ? query(
      collection(db, "studentsList"),
      where("statusApprove", "==", false),
      where("name", "==", value)
    ) : filterType === "selectedYear" && value ? query(
      collection(db, "studentsList"),
      where("statusApprove", "==", false),
      where("generation", "==", String(value))
    ) : query(
      collection(db, "studentsList"),
      where("statusApprove", "==", false)
    );

    try {
      const studentsData = (await getDocs(studentRef)).docs
        .map((item) => item)
        .map((item) => item.data());

      setStudent(studentsData);
      console.log({ studentsData });
    }

    catch (e) {
      console.log(e);

      toast.error("Silahkan Muat Ulang Halaman", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
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
        const newProfDataArray = profRef.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProf(newProfDataArray);
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
  }, []);

  useEffect(() => {
    getData({ filterType: "selectedYear", value: selectedYear });
  }, [selectedYear]);

  useEffect(() => {
    getData({ filterType: "searchedName", value: searchedName });
  }, [searchedName]);

  const getStatus = (uid: any) => {
    setSetuju(true);
    setUserid(uid);
  };

  const getUpdate = () => {
    const studentRef = doc(db, "studentsList", userid);

    const valueUpdate = {
      statusApprove: true,
      profOne: dosen1,
      profTwo: dosen2,
    };

    updateDoc(studentRef, valueUpdate).then(() => {
      toast.success("Mahasiswa berhasil di terima", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setSetuju(false);
      setDosen1("");
      setDosen2("");
    });
  };

  const handleReject = () => {
    const studentRef = doc(db, "studentsList", userid);

    const valueUpdate = {
      statusApprove: null,
    };

    updateDoc(studentRef, valueUpdate).then(() => {
      toast.success("Mahasiswa telah ditolak", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTolak(false);
    }).catch(e => {
      toast.error("Gagal menolak mahasiswa", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTolak(false);
    });
  }

  return (
    <>
      <ToastContainer />
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

                <div className="p-4 flex flex-col mt-9 gap-2">
                  <div className="realtive xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <select
                      className="bg-[#f1e8f252] focus:outline-none border-1 justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full  text-[#707070] w-full hover:bg-[#ebe6ea]  font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center"
                      onChange={(e) => setDosen1(e.target.value)}
                      value={dosen1}
                    >
                      <option selected>Dosen Pembimbing 1</option>
                      {prof.map((item: any, index: Key) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="realtive xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full">
                    <select
                      className="bg-[#f1e8f252] focus:outline-none border-1 justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full  text-[#707070] w-full hover:bg-[#ebe6ea]  font-medium rounded-lg text-sm px-4 py-2.5 text-center items-center"
                      onChange={(e) => setDosen2(e.target.value)}
                      value={dosen2}
                    >
                      <option selected>Dosen Pembimbing 2</option>
                      {prof.map((item: any, index: Key) => (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="p-4 flex gap-2 justify-end items-end">
                    <button
                      onClick={getUpdate}
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
                      onClick={() => {
                        handleReject();
                      }}
                    >
                      Iya
                    </button>
                    <button
                      type="button"
                      className=" text-white bg-red-500 ring-2  rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3  hover:text-red-500 hover:ring-red-500 hover:bg-white focus:z-10"
                      onClick={() => {
                        setTolak(false);
                      }}
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
              {student.length > 0 ? (
                student.map((data: any, index: Key) => (
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
                    <td className="px-6 py-2 max-w-[20%]">{data.username}</td>

                    <td className="px-6 py-2 text-right flex gap-2">
                      <button
                        onClick={() => getStatus(data.uid)}
                        className="font-medium text-white ring-1 hover:ring-green-500 hover:bg-white  hover:text-green-500 bg-green-500 p-2 rounded-md"
                      >
                        <BsCheckLg />
                      </button>
                      <button
                        onClick={() => {
                          setUserid(data.uid);
                          setTolak(!tolak)
                        }}
                        className="font-medium text-white ring-1 hover:ring-red-600  hover:bg-white hover:text-red-600 bg-red-600 p-2 rounded-md"
                      >
                        <AiOutlineClose />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <>
                  <tr className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto ">
                    <td
                      scope="row"
                      colSpan={3}
                      className="text-center px-6 py-2 whitespace-nowrap max-w-[20%] "
                    >
                      Tidak ada data untuk ditampilkan
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
