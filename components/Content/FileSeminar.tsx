import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useAuth } from "../Context/AuthContext";
import { db } from "../Store/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FileSeminar = () => {
  const [jadwal, setJadwal] = useState<String>();
  const { user } = useAuth();
  const [file, setFile] = useState("");
  const [chapter5, setChapter5] = useState<any>();
  const [isApprovedByProf1Chapter5, setIsApprovedByProf1Chapter5] = useState<
    any
  >();
  const [isApprovedByProf2Chapter5, setIsApprovedByProf2Chapter5] = useState<
    any
  >();
  const [link1, setLink1] = useState("");
  const [enable, setEnable] = useState(false);
  useEffect(() => {
    if (user.files) {
      setChapter5(user.files[0].chapterFive.link);
      setIsApprovedByProf1Chapter5(
        user.files[0].chapterFive.isApprovedByProfOne
      );
      setIsApprovedByProf2Chapter5(
        user.files[0].chapterFive.isApprovedByProfTwo
      );
    }
    if (user.seminarDate) {
      setJadwal(user.seminarDate[0].dateToBe);
      setFile(user.fileSeminar);
      setEnable(user.fileSeminar ? false : true);
    }
    // console.log(user.fileSeminar);
  }, [user]);

  const handleLink1 = async () => {
    try {
      const docRef = doc(db, "studentsList", user.uid);
      const link1Value = {
        fileSeminar: link1,
        seminarDate: [
          {
            dateToBe: "",
            isApprovedByProfOne: "",
            isApprovedByProfTwo: "",
          },
        ],
      };
      setEnable(true);
      await updateDoc(docRef, link1Value);
      toast.success("Berhasil Mengunggah Berkas Seminar Hasil", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLink1("");
    } catch (error) {
      toast.error('Gagal Mengunggah File Seminar', {
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
  };

  return (
    <div className="h-screen px-4 w-5/6 overflow-auto py-4 mt-4">
      <ToastContainer />
      <div className="flex justify-center">
        {jadwal ? (
          <div className="flex bg-[#f1e8f252] border-4 border-[#caf3e0] text-[#707070] flex-col justify-center my-3 items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-1/3 h-24  rounded-lg shadow-md">
            <div className=" flex justify-between items-center">
              {" "}
              <p className="items-center mr-3"> Tanggal Seminar Hasil </p>{" "}
              <AiFillCheckCircle className="fill-[#72ea8c] items-center" />
            </div>
            <div className=" text-2xl text-center">{moment(String(jadwal)).format("DD MMMM YYYY")}</div>
          </div>
        ) : (
          <div className="flex flex-col bg-[#f1e8f252] border-4 border-[#ebb4b4] text-[#707070] justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-1/3 h-24  rounded-lg shadow-md">
            <div className=" flex justify-between items-center">
              {" "}
              <p className="items-center mr-3"> Tanggal Seminar Hasil </p>{" "}
              <AiFillCloseCircle className="fill-[#d25858] items-center" />
            </div>
            <div className=" text-2xl text-center italic"> Belum Ada</div>
          </div>
        )}
      </div>
      <div className="flex mb-6 xxs:max-sm:flex-col md:max-lg:flex-col sm:max-md:flex-col mt-5 mx-4">
        <div className="grid justify-center  xxs:max-sm:w-full md:max-lg:w-full sm:max-md:w-full mr-2 py-6 px-4 w-2/3 h-80 bg-[#f1e8f252] text-[#707070] rounded-2xl shadow-md">
          <div className="flex justify-center items-center">
            <BsFillPersonFill className="text-3xl" />
            <div className="text-xl">Dosen Penguji 1</div>
          </div>
          <div
            className={`text-center font-bold text-4xl ${!user.examinerOne && "text-sm italic text-gray-400"
              }`}
          >
            {!user.examinerOne && "Kamu Belum Mendapatkan Dosen Penguji 1"}
            {user.examinerOne}
          </div>
        </div>
        <div className="grid justify-center  xxs:max-sm:w-full xxs:max-sm:my-2 md:max-lg:w-full md:max-lg:mt-3 sm:max-md:w-full  py-6 px-4 w-2/3 h-80 bg-[#f1e8f252] text-[#707070] rounded-2xl shadow-md">
          <div className="flex justify-center items-center">
            <div>
              <BsFillPersonFill className="text-3xl" />
            </div>
            <div className="text-xl">Dosen Penguji 2</div>
          </div>
          <div
            className={`text-center font-bold text-4xl ${!user.examinerTwo && "text-sm italic text-gray-400"
              }`}
          >
            {!user.examinerTwo && "Kamu Belum Mendapatkan Dosen Penguji 1"}
            {user.examinerTwo}
          </div>
        </div>
      </div>

      <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-50 py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
        {!file && (
          <label className="block mt-2 text-sm font-medium text-gray-500 ">
            File Belum Ada
          </label>
        )}
        {/* {chapter1 && (
            
          )} */}
        {file && (
          <label className="block mt-1 text-sm font-medium text-gray-900 ">
            File Seminar
          </label>
        )}
        <div className="flex justify-between items-center w-full">
          {!file && (
            <>
              <input
                className="disabled:opacity-50 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                value={link1}
                onChange={(e) => setLink1(e.target.value)}
                type="text"
                placeholder="Link Google Drive"
                required
                disabled={
                  chapter5 === "" ||
                    isApprovedByProf1Chapter5 === "Denied" ||
                    isApprovedByProf1Chapter5 === "" ||
                    isApprovedByProf2Chapter5 === "Denied" ||
                    isApprovedByProf2Chapter5 === ""
                    ? true
                    : false
                }
              />
              <button
                onClick={handleLink1}
                disabled={
                  chapter5 === "" ||
                    isApprovedByProf1Chapter5 === "Denied" ||
                    isApprovedByProf1Chapter5 === "" ||
                    isApprovedByProf2Chapter5 === "Denied" ||
                    isApprovedByProf2Chapter5 === ""
                    ? true
                    : false
                }
                className="disabled:opacity-50 text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
              >
                Simpan
              </button>
            </>
          )}
          {file && (
            <>
              <input
                className="disabled:bg-slate-200 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                value={link1}
                onChange={(e) => setLink1(e.target.value)}
                type="text"
                placeholder={file}
                disabled={enable ? false : true}
              />

              {enable && (
                <>
                  <button
                    onClick={handleLink1}
                    className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => {
                      setEnable(false);
                      setLink1(file);
                    }}
                    className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                  >
                    Cancel
                  </button>
                </>
              )}

              {!enable && (
                <button
                  onClick={() => setEnable(true)}
                  className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                >
                  Edit
                </button>
              )}

              <Link
                target="_blank"
                href={`${file}`}
                className="tex  t-sm font-medium text-gray-900 hover:text-[#835876]"
              >
                <button className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10">
                  Cek
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileSeminar;
