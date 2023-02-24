import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Store/firebase";
import Link from "next/link";
import { User } from "firebase/auth";

const FileUpload = () => {
  const { user } = useAuth();
  const [chapter1, setChapter1] = useState<any>();
  const [chapter2, setChapter2] = useState<any>();
  const [chapter3, setChapter3] = useState<any>();
  const [chapter4, setChapter4] = useState<any>();
  const [chapter5, setChapter5] = useState<any>();
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");
  const [link4, setLink4] = useState("");
  const [link5, setLink5] = useState("");
  useEffect(() => {
    if (user.files) {
      setChapter1(user.files[0].chapterOne);
      setChapter2(user.files[0].chapterTwo);
      setChapter3(user.files[0].chapterThree);
      setChapter4(user.files[0].chapterFour);
      setChapter5(user.files[0].chapterFive);
    }
  }, [user]);

  const handleLink1 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter1Value = {
      files: [
        {
          chapterOne: link1,
          chapterTwo: user.files[0].chapterTwo,
          chapterThree: user.files[0].chapterThree,
          chapterFour: user.files[0].chapterFour,
          chapterFive: user.files[0].chapterFive,
        },
      ],
    };
    await updateDoc(docRef, chapter1Value);
    setLink1("");
  };
  const handleLink2 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter2Value = {
      files: [
        {
          chapterOne: user.files[0].chapterOne,
          chapterTwo: link2,
          chapterThree: user.files[0].chapterThree,
          chapterFour: user.files[0].chapterFour,
          chapterFive: user.files[0].chapterFive,
        },
      ],
    };
    await updateDoc(docRef, chapter2Value);
    setLink2("");
  };
  const handleLink3 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter3Value = {
      files: [
        {
          chapterOne: user.files[0].chapterOne,
          chapterTwo: user.files[0].chapterTwo,
          chapterThree: link3,
          chapterFour: user.files[0].chapterFour,
          chapterFive: user.files[0].chapterFive,
        },
      ],
    };
    await updateDoc(docRef, chapter3Value);
    setLink3("");
  };
  const handleLink4 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter4Value = {
      files: [
        {
          chapterOne: user.files[0].chapterOne,
          chapterTwo: user.files[0].chapterTwo,
          chapterThree: user.files[0].chapterThree,
          chapterFour: link4,
          chapterFive: user.files[0].chapterFive,
        },
      ],
    };
    await updateDoc(docRef, chapter4Value);
    setLink4("");
  };
  const handleLink5 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter5Value = {
      files: [
        {
          chapterOne: user.files[0].chapterOne,
          chapterTwo: user.files[0].chapterTwo,
          chapterThree: user.files[0].chapterThree,
          chapterFour: user.files[0].chapterFour,
          chapterFive: link5,
        },
      ],
    };
    await updateDoc(docRef, chapter5Value);
    setLink5("");
  };

  return (
    <div className="h-screen px-4 w-5/6 overflow-auto py-4">
      <div className="flex justify-center items-center font-extralight text-3xl">
        {" "}
        Upload Link Berkas Kamu Di sini
      </div>
      <div className="py-4">
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter1 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {chapter1 && (
            <Link
              target="_blank"
              href={`${chapter1}`}
              className="block mt-2 text-sm font-medium text-gray-900 hover:text-[#835876]"
            >
              Silahkan Di Cek
            </Link>
          )}
          <label className="block mt-1 text-sm font-medium text-gray-900 ">
            BAB 1
          </label>
          <div className="flex justify-between items-center w-full">
            <input
              className="bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
              value={link1}
              onChange={(e) => setLink1(e.target.value)}
              type="text"
              placeholder="Link Google Drive"
              required
            />
            <button
              onClick={handleLink1}
              className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
            >
              Simpan
            </button>
          </div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter2 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {chapter2 && (
            <Link
              target="_blank"
              href={`${chapter2}`}
              className="block mt-2 text-sm font-medium text-gray-900 hover:text-[#835876] "
            >
              Silahkan Di Cek
            </Link>
          )}
          <label className="block mt-1 text-md font-medium text-gray-900 ">
            BAB 2
          </label>
          <div className="flex justify-between items-center w-full">
            <input
              className="bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
              value={link2}
              onChange={(e) => setLink2(e.target.value)}
              type="text"
              placeholder="Link Google Drive"
              required
            />
            <button
              onClick={handleLink2}
              type="button"
              className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
            >
              Simpan
            </button>
          </div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter3 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {chapter3 && (
            <Link
              target="_blank"
              href={`${chapter3}`}
              className="block mt-2 hover:text-[#835876] text-sm font-medium text-gray-900 "
            >
              Silahkan Di Cek
            </Link>
          )}
          <label className="block mt-1 text-md font-medium text-gray-900 ">
            BAB 3
          </label>
          <div className="flex justify-between items-center w-full">
            <input
              className="bg-gray-50 disabled:opacity-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
              value={link3}
              onChange={(e) => setLink3(e.target.value)}
              type="text"
              placeholder="Link Google Drive"
              required
              disabled={!chapter1 && !chapter2}
            />
            <button
              onClick={handleLink3}
              className=" text-white disabled:opacity-50 items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
              disabled={!chapter1 && !chapter2}
            >
              Simpan
            </button>
          </div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter4 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {chapter4 && (
            <Link
              target="_blank"
              href={`${chapter4}`}
              className="block mt-2 text-sm hover:text-[#835876] font-medium text-gray-900 "
            >
              Silahkan Di Cek
            </Link>
          )}
          <label className="block mt-1 text-md font-medium text-gray-900 ">
            BAB 4
          </label>
          <div className="flex justify-between items-center w-full">
            <input
              className="bg-gray-50 disabled:opacity-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
              type="text"
              value={link4}
              onChange={(e) => setLink4(e.target.value)}
              placeholder="Link Google Drive"
              required
              disabled={!chapter1 && !chapter2 && !chapter3}
            />
            <button
              onClick={handleLink4}
              className=" text-white disabled:opacity-50 items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
              disabled={!chapter1 && !chapter2 && !chapter3}
            >
              Simpan
            </button>
          </div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter5 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {chapter5 && (
            <Link
              target="_blank"
              href={`${chapter5}`}
              className="block mt-2 text-sm font-medium hover:text-[#835876] text-gray-900 "
            >
              Silahkan Di Cek
            </Link>
          )}
          <label className="block mt-1 text-md font-medium text-gray-900 ">
            BAB 5
          </label>
          <div className="flex justify-between items-center w-full">
            <input
              className="bg-gray-50 items-center
				 			disabled:opacity-50
							border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
              type="text"
              value={link5}
              onChange={(e) => setLink5(e.target.value)}
              placeholder="Link Google Drive"
              required
              disabled={!chapter1 && !chapter2 && !chapter3 && !chapter4}
            />
            <button
              onClick={handleLink5}
              className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10
				disabled:opacity-50"
              disabled={!chapter1 && !chapter2 && !chapter3 && !chapter4}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
