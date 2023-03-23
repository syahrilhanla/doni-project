import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { RiLoader5Line, RiSortDesc } from "react-icons/ri";
import { useAuth } from "../Context/AuthContext";
import { db } from "../Store/firebase";

export default function ProgresList() {
  const [student, setStudent] = useState<any>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    setLoading(true);

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

      const arrayStudents = [...studentsData1, ...studentsData2].filter(
        (item) => item.profOne === user.name || item.profTwo === user.name
      );

      console.log({ arrayStudents })
      setStudent(arrayStudents);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, [student]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className=" inline-block overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] max-w-[350px] sm:max-w-full ">
        <table className=" text-left table-auto text-sm capitalize  text-gray-900 ">
          <thead className="text-xs text-white  bg-patternTwo sticky top-0 z-20  ">
            <tr>
              <th scope="col" rowSpan={2} className="px-2 py-3">
                <div className="flex items-center gap-2 justify-center">
                  Nama
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-3 max-w-[20%]">
                <div className="flex items-center gap-2 justify-center">
                  Judul
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-3">
                <div className="flex items-center gap-2">
                  Angkatan
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th
                scope="col"
                colSpan={5}
                className="px-2 py-3 border-b-2 border-white"
              >
                <div className="flex items-center justify-center">
                  Berkas per Bab
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-3">
                <div className="flex items-center text-center gap-2">
                  Seminar Hasil
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
              <th scope="col" rowSpan={2} className="px-2 py-3">
                <div className="flex items-center text-center gap-2">
                  Sidang Akhir
                  <a href="#">
                    <RiSortDesc />
                  </a>
                </div>
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">I</div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">II</div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">III</div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">IV</div>
              </th>
              <th scope="col" className="px-2 py-3">
                <div className="flex items-center justify-center">V</div>
              </th>
            </tr>
          </thead>
          {loading ? (
            <tr className="even:bg-[#f0ebf8d7] odd:bg-white border-b z-auto ">
              <td
                scope="row"
                colSpan={10}
                className="text-center px-6 py-2 whitespace-nowrap max-w-[20%] "
              >
                <div className="flex items-center justify-center">
                  <RiLoader5Line className="animate-spin text-3xl my-5 " />
                </div>
              </td>
            </tr>
          ) : (
            <tbody>
              {student.map((data: any, index: any) => (
                <>
                  {data.profOne || data.profTwo === user.name ? (
                    <tr
                      key={index}
                      className=" border-b even:bg-[#f0ebf8d7] odd:bg-white"
                    >
                      <td
                        scope="row"
                        className="px-4 py-2 font-medium   w-[20%]"
                      >
                        {data.name}
                      </td>
                      <td className=" px-2 py-2 w-[20%] text-center">
                        {data.title[0].titleText}
                      </td>
                      <td className=" text-center px-2 py-2 w-[5%]">
                        {data.generation}
                      </td>
                      <td className=" text-center px-1.5 py-2">
                        {data.files[0].chapterOne ? (
                          <Link
                            target="_blank"
                            href={data.files[0].chapterOne}
                            className="hover:underline hover:text-black underline text-blue-400"
                          >
                            Cek
                          </Link>
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                      <td className=" text-center px-1.5 py-2">
                        {data.files[0].chapterTwo ? (
                          <Link
                            target="_blank"
                            href={data.files[0].chapterTwo}
                            className="hover:underline hover:text-black underline text-blue-400"
                          >
                            Cek
                          </Link>
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                      <td className=" text-center px-1.5 py-2">
                        {data.files[0].chapterThree ? (
                          <Link
                            target="_blank"
                            href={data.files[0].chapterThree}
                            className="hover:underline hover:text-black underline text-blue-400"
                          >
                            Cek
                          </Link>
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                      <td className=" text-center px-1.5 py-2">
                        {data.files[0].chapterFour ? (
                          <Link
                            target="_blank"
                            href={data.files[0].chapterFour}
                            className="hover:underline hover:text-black underline text-blue-400"
                          >
                            Cek
                          </Link>
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                      <td className=" text-center px-1.5 py-2">
                        {data.files[0].chapterFive ? (
                          <Link
                            target="_blank"
                            href={data.files[0].chapterFive}
                            className="hover:underline hover:text-black underline text-blue-400"
                          >
                            Cek
                          </Link>
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                      <td className=" text-center py-1  w-[10%]">
                        {data.seminarDate[0].dateToBe && data.fileSeminar ? (
                          <div className="flex flex-col gap-1">
                            {data.seminarDate[0].dateToBe}
                            <Link
                              target="_blank"
                              href={data.fileSeminar}
                              className="hover:underline hover:text-black underline text-blue-400"
                            >
                              Cek
                            </Link>
                          </div>
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                      <td className=" text-center w-[10%]">
                        {data.sidangDate[0].dateToBe && data.fileSidang ? (
                          <div className="flex flex-col gap-1">
                            {data.sidangDate[0].dateToBe}
                            <Link
                              target="_blank"
                              href={data.fileSidang}
                              className="hover:underline hover:text-black underline text-blue-400"
                            >
                              Cek
                            </Link>
                          </div>
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                    </tr>
                  ) : null}
                </>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
