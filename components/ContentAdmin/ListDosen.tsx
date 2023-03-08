import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg, BsTrash } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { RiSortDesc, RiCloseLine, RiLoader5Line } from "react-icons/ri";
import { db } from "../Store/firebase";

export default function ListDosen() {
  const [hapus, setHapus] = useState<any>(false);
  const [buka, setBuka] = useState<any>(false);
  const [professor, setProfessor] = useState<any>([]);
  const [professorName, setProfessorName] = useState<string>("");
  const [professorId, setProfessorId] = useState<string>("");
  const [student, setStudent] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    const studentRef = query(
      collection(db, "studentsList"),
      where("statusApprove", "==", true)
    );

    try {
      const studentsData = (await getDocs(studentRef)).docs
        .map((item) => item)
        .map((item) => item.data());

      setStudent(studentsData);
    } catch (e) {
      console.log(e);
    }
  }, [student]);

  const getProf = async () => {
    setLoading(false);

    let unsubscribe = false;
    await getDocs(collection(db, "professorList"))
      .then((profRef) => {
        if (unsubscribe) return;
        const newProfData = profRef.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProfessor(newProfData);
        setLoading(true);
      })
      .catch((err) => {
        if (unsubscribe) return;
        console.error("Failed", err);
      });
    return () => (unsubscribe = true);
  };

  useEffect(() => {
    getProf();
    getData();
  }, []);

  const getProfName = (name: string) => {
    setBuka(true);
    setProfessorName(name);
    getData();
  };
  const getProfId = (id: any) => {
    setHapus(true);
    setProfessorId(id);
  };

  const deleteData = () => {
    let fieldEdit = doc(db, "professorList", professorId);

    deleteDoc(fieldEdit)
      .then(() => {
        alert("Data Berhasil Dihapus");
        setHapus(!hapus);
        getProf();
      })
      .catch((err) => {
        alert("Tidak Bisa Menghapus Data..");
      });
  };

  const deleteProfName = (uid: string, profOne: string, profTwo: string) => {
    const studentRef = doc(db, "studentsList", uid);

    if (profOne === professorName) {
      const valueUpdate = {
        profOne: "",
      };
      updateDoc(studentRef, valueUpdate).then(() => {
        window.alert("Data berhasil diganti");
        getData();
      });
    } else if (profTwo === professorName) {
      const valueUpdate = {
        profTwo: "",
      };
      updateDoc(studentRef, valueUpdate).then(() => {
        window.alert("Data berhasil diganti");
        getData();
      });
    }
  };

  return (
    <div>
      {buka && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-4/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <button
                onClick={() => setBuka(!buka)}
                type="button"
                className="absolute top-3 right-2.5 bg-red-600   text-white bg-transparent hover:opacity-50 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <RiCloseLine />
              </button>

              <div className="p-4 flex flex-col gap-2 ">
                <h1 className="block text-xl my-2 font-medium text-gray-900 ">
                  Daftar mahasiswa yang dibimbing
                </h1>

                <table className="text-sm text-left text-gray-900 capitalize  ">
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
                        <div className="flex items-center justify-center">
                          Judul
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center justify-center">
                          Sebagai
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex items-center justify-center">
                          Aksi
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {student ? (
                      student.map((data: any, index: any) => (
                        <tr
                          key={index}
                          className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto "
                        >
                          {data.profOne === professorName ||
                          data.profTwo === professorName ? (
                            <>
                              <th
                                scope="row"
                                className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
                              >
                                {data.name}
                              </th>
                              <td className="px-6 py-2 max-w-[20%]">
                                {data.nim}
                              </td>
                              <td className="px-6 py-2 max-w-[20%]">
                                {data.title[0].titleText}
                              </td>
                              <td className="px-6 py-2 max-w-[20%]">
                                {data.profOne === professorName ? (
                                  <p>Dosen pembimbing 1</p>
                                ) : (
                                  <p>Dosen pembimbing 2</p>
                                )}
                              </td>
                              <td className="px-6 py-2">
                                <button
                                  onClick={() =>
                                    deleteProfName(
                                      data.uid,
                                      data.profOne,
                                      data.profTwo
                                    )
                                  }
                                  className="font-medium text-white hover:opacity-50 duration-150 bg-[#D0312D] p-2 rounded-md"
                                >
                                  <FaTrash />
                                </button>
                              </td>
                            </>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto ">
                          <td
                            scope="row"
                            colSpan={4}
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
                className="absolute top-3 right-2.5 bg-red-600  hover:opacity-50  text-white bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <RiCloseLine />
              </button>

              <div className="p-4 flex flex-col gap-2">
                <p className="block text-xl mt-6 font-medium text-gray-900 ">
                  Apakah anda ingin menghapus data dosen pembimbing ini?
                </p>
                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    onClick={() => deleteData()}
                    type="button"
                    className=" text-white bg-green-500    rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3 hover:opacity-50 focus:z-10"
                  >
                    Iya
                  </button>
                  <button
                    onClick={() => setHapus(!hapus)}
                    type="button"
                    className=" text-white bg-red-500    rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3 hover:opacity-50 focus:z-10"
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
                  NIP
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>

              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">
                  Daftar Mahasiswa
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-center">Aksi</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              professor.map((data: any, index: any) => (
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
                  <td className="px-6 py-2 max-w-[20%]">{data.nip}</td>
                  <td className="px-6 py-2 max-w-[20%]">
                    <button
                      onClick={() => getProfName(data.name)}
                      className="font-medium text-white hover:opacity-50 duration-150 bg-[#59b42f] p-2 rounded-md"
                    >
                      Lihat daftar
                    </button>
                  </td>

                  <td className="px-6 py-2">
                    <button
                      onClick={() => getProfId(data.id)}
                      className="font-medium text-white hover:opacity-50 duration-150 bg-[#D0312D] p-2 rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <>
                <tr className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto ">
                  <td
                    scope="row"
                    colSpan={4}
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
  );
}
