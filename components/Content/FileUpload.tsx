import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Store/firebase";
import Link from "next/link";
import { User } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FileUpload = () => {
  const { user } = useAuth();
  const [chapter1, setChapter1] = useState<any>();
  const [chapter2, setChapter2] = useState<any>();
  const [chapter3, setChapter3] = useState<any>();
  const [chapter4, setChapter4] = useState<any>();
  const [chapter5, setChapter5] = useState<any>();
  const [isApprovedByProf1Chapter1, setIsApprovedByProf1Chapter1] = useState<
    any
  >();
  const [isApprovedByProf1Chapter2, setIsApprovedByProf1Chapter2] = useState<
    any
  >();
  const [isApprovedByProf1Chapter3, setIsApprovedByProf1Chapter3] = useState<
    any
  >();
  const [isApprovedByProf1Chapter4, setIsApprovedByProf1Chapter4] = useState<
    any
  >();
  const [isApprovedByProf1Chapter5, setIsApprovedByProf1Chapter5] = useState<
    any
  >();
  const [isApprovedByProf2Chapter1, setIsApprovedByProf2Chapter1] = useState<
    any
  >();
  const [isApprovedByProf2Chapter2, setIsApprovedByProf2Chapter2] = useState<
    any
  >();
  const [isApprovedByProf2Chapter3, setIsApprovedByProf2Chapter3] = useState<
    any
  >();
  const [isApprovedByProf2Chapter4, setIsApprovedByProf2Chapter4] = useState<
    any
  >();
  const [isApprovedByProf2Chapter5, setIsApprovedByProf2Chapter5] = useState<
    any
  >();
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");
  const [link4, setLink4] = useState("");
  const [link5, setLink5] = useState("");
  const [enable1, setEnable1] = useState(false);
  const [enable2, setEnable2] = useState(false);
  const [enable3, setEnable3] = useState(false);
  const [enable4, setEnable4] = useState(false);
  const [enable5, setEnable5] = useState(false);

  useEffect(() => {
    if (user.files) {
      setChapter1(user.files[0].chapterOne.link);
      setChapter2(user.files[0].chapterTwo.link);
      setChapter3(user.files[0].chapterThree.link);
      setChapter4(user.files[0].chapterFour.link);
      setChapter5(user.files[0].chapterFive.link);
      setIsApprovedByProf1Chapter1(
        user.files[0].chapterOne.isApprovedByProfOne
      );
      setIsApprovedByProf1Chapter2(
        user.files[0].chapterTwo.isApprovedByProfOne
      );
      setIsApprovedByProf1Chapter3(
        user.files[0].chapterThree.isApprovedByProfOne
      );
      setIsApprovedByProf1Chapter4(
        user.files[0].chapterFour.isApprovedByProfOne
      );
      setIsApprovedByProf1Chapter5(
        user.files[0].chapterFive.isApprovedByProfOne
      );
      setIsApprovedByProf2Chapter1(
        user.files[0].chapterOne.isApprovedByProfTwo
      );
      setIsApprovedByProf2Chapter2(
        user.files[0].chapterTwo.isApprovedByProfTwo
      );
      setIsApprovedByProf2Chapter3(
        user.files[0].chapterThree.isApprovedByProfTwo
      );
      setIsApprovedByProf2Chapter4(
        user.files[0].chapterFour.isApprovedByProfTwo
      );
      setIsApprovedByProf2Chapter5(
        user.files[0].chapterFive.isApprovedByProfTwo
      );
      setEnable1(user.files[0].chapterOne.link ? false : true);
      setEnable2(user.files[0].chapterTwo.link ? false : true);
      setEnable3(user.files[0].chapterThree.link ? false : true);
      setEnable4(user.files[0].chapterFour.link ? false : true);
      setEnable5(user.files[0].chapterFive.link ? false : true);
    }
  }, [user]);

  const handleLink1 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter1Value = {
      files: [
        {
          chapterOne: {
            isApprovedByProfOne: user.files[0].chapterOne.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterOne.isApprovedByProfTwo,
            link: link1,
          },
          chapterTwo: {
            isApprovedByProfOne: user.files[0].chapterTwo.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterTwo.isApprovedByProfTwo,
            link: user.files[0].chapterTwo.link,
          },
          chapterThree: {
            isApprovedByProfOne: user.files[0].chapterThree.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterThree.isApprovedByProfTwo,
            link: user.files[0].chapterThree.link,
          },
          chapterFour: {
            isApprovedByProfOne: user.files[0].chapterFour.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFour.isApprovedByProfTwo,
            link: user.files[0].chapterFour.link,
          },
          chapterFive: {
            isApprovedByProfOne: user.files[0].chapterFive.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFive.isApprovedByProfTwo,
            link: user.files[0].chapterFive.link,
          },
        },
      ],
    };
    setEnable1(true);
    await updateDoc(docRef, chapter1Value);
    toast.success("Berhasil Mengunggah Bab 1", {
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
  };
  const handleLink2 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter2Value = {
      files: [
        {
          chapterOne: {
            isApprovedByProfOne: user.files[0].chapterOne.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterOne.isApprovedByProfTwo,
            link: user.files[0].chapterOne.link,
          },
          chapterTwo: {
            isApprovedByProfOne: user.files[0].chapterTwo.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterTwo.isApprovedByProfTwo,
            link: link2,
          },
          chapterThree: {
            isApprovedByProfOne: user.files[0].chapterThree.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterThree.isApprovedByProfTwo,
            link: user.files[0].chapterThree.link,
          },
          chapterFour: {
            isApprovedByProfOne: user.files[0].chapterFour.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFour.isApprovedByProfTwo,
            link: user.files[0].chapterFour.link,
          },
          chapterFive: {
            isApprovedByProfOne: user.files[0].chapterFive.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFive.isApprovedByProfTwo,
            link: user.files[0].chapterFive.link,
          },
        },
      ],
    };
    setEnable2(true);
    await updateDoc(docRef, chapter2Value);
    toast.success("Berhasil Mengunggah Bab 2", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setLink2("");
  };
  const handleLink3 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter3Value = {
      files: [
        {
          chapterOne: {
            isApprovedByProfOne: user.files[0].chapterOne.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterOne.isApprovedByProfTwo,
            link: user.files[0].chapterOne.link,
          },
          chapterTwo: {
            isApprovedByProfOne: user.files[0].chapterTwo.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterTwo.isApprovedByProfTwo,
            link: user.files[0].chapterTwo.link,
          },
          chapterThree: {
            isApprovedByProfOne: user.files[0].chapterThree.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterThree.isApprovedByProfTwo,
            link: link3,
          },
          chapterFour: {
            isApprovedByProfOne: user.files[0].chapterFour.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFour.isApprovedByProfTwo,
            link: user.files[0].chapterFour.link,
          },
          chapterFive: {
            isApprovedByProfOne: user.files[0].chapterFive.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFive.isApprovedByProfTwo,
            link: user.files[0].chapterFive.link,
          },
        },
      ],
    };
    setEnable3(true);
    await updateDoc(docRef, chapter3Value);
    toast.success("Berhasil Mengunggah Bab 3", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setLink3("");
  };
  const handleLink4 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter4Value = {
      files: [
        {
          chapterOne: {
            isApprovedByProfOne: user.files[0].chapterOne.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterOne.isApprovedByProfTwo,
            link: user.files[0].chapterOne.link,
          },
          chapterTwo: {
            isApprovedByProfOne: user.files[0].chapterTwo.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterTwo.isApprovedByProfTwo,
            link: user.files[0].chapterTwo.link,
          },
          chapterThree: {
            isApprovedByProfOne: user.files[0].chapterThree.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterThree.isApprovedByProfTwo,
            link: user.files[0].chapterThree.link,
          },
          chapterFour: {
            isApprovedByProfOne: user.files[0].chapterFour.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFour.isApprovedByProfTwo,
            link: link4,
          },
          chapterFive: {
            isApprovedByProfOne: user.files[0].chapterFive.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFive.isApprovedByProfTwo,
            link: user.files[0].chapterFive.link,
          },
        },
      ],
    };
    setEnable4(true);
    await updateDoc(docRef, chapter4Value);
    toast.success("Berhasil Mengunggah Bab 4", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setLink4("");
  };
  const handleLink5 = async () => {
    const docRef = doc(db, "studentsList", user.uid);
    const chapter5Value = {
      files: [
        {
          chapterOne: {
            isApprovedByProfOne: user.files[0].chapterOne.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterOne.isApprovedByProfTwo,
            link: user.files[0].chapterOne.link,
          },
          chapterTwo: {
            isApprovedByProfOne: user.files[0].chapterTwo.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterTwo.isApprovedByProfTwo,
            link: user.files[0].chapterTwo.link,
          },
          chapterThree: {
            isApprovedByProfOne: user.files[0].chapterThree.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterThree.isApprovedByProfTwo,
            link: user.files[0].chapterThree.link,
          },
          chapterFour: {
            isApprovedByProfOne: user.files[0].chapterFour.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFour.isApprovedByProfTwo,
            link: user.files[0].chapterFour.link,
          },
          chapterFive: {
            isApprovedByProfOne: user.files[0].chapterFive.isApprovedByProfOne,
            isApprovedByProfTwo: user.files[0].chapterFive.isApprovedByProfTwo,
            link: link5,
          },
        },
      ],
    };
    setEnable5(true);
    await updateDoc(docRef, chapter5Value);
    toast.success("Berhasil Mengunggah Bab 5", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setLink5("");
  };

  return (
    <div className="h-screen px-4 w-5/6 overflow-auto py-4">
      <ToastContainer />
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
          {/* {chapter1 && (
            
          )} */}
          <label className="block mt-1 text-sm font-medium text-gray-900 ">
            BAB 1
          </label>
          <div className="flex justify-between items-center w-full">
            {!chapter1 && (
              <>
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
              </>
            )}
            {chapter1 && (
              <>
                <input
                  className="disabled:bg-slate-200 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link1}
                  onChange={(e) => setLink1(e.target.value)}
                  type="text"
                  placeholder={chapter1}
                  disabled={enable1 ? false : true}
                />

                {enable1 && (
                  <>
                    <button
                      onClick={handleLink1}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setEnable1(false);
                        setLink1(chapter1);
                      }}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {!enable1 && (
                  <button
                    onClick={() => setEnable1(true)}
                    className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                  >
                    Edit
                  </button>
                )}

                <Link
                  target="_blank"
                  href={`${chapter1}`}
                  className="text-sm font-medium text-gray-900 hover:text-[#835876]"
                >
                  <button className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10">
                    Cek
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter2 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {/* {chapter1 && (
            
          )} */}
          <label className="block mt-1 text-sm font-medium text-gray-900 ">
            BAB 2
          </label>
          <div className="flex justify-between items-center w-full">
            {!chapter2 && (
              <>
                <input
                  className="disabled:opacity-50 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link2}
                  onChange={(e) => setLink2(e.target.value)}
                  type="text"
                  placeholder="Link Google Drive"
                  required
                  disabled={
                    chapter1 === "" ||
                    isApprovedByProf1Chapter1 === "Denied" ||
                    isApprovedByProf1Chapter1 === "" ||
                    isApprovedByProf2Chapter1 === "Denied" ||
                    isApprovedByProf2Chapter1 === ""
                      ? true
                      : false
                  }
                />
                <button
                  onClick={handleLink2}
                  disabled={
                    chapter1 === "" ||
                    isApprovedByProf1Chapter1 === "Denied" ||
                    isApprovedByProf1Chapter1 === "" ||
                    isApprovedByProf2Chapter1 === "Denied" ||
                    isApprovedByProf2Chapter1 === ""
                      ? true
                      : false
                  }
                  className=" disabled:opacity-50 text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                >
                  Simpan
                </button>
              </>
            )}
            {chapter2 && (
              <>
                <input
                  className="disabled:bg-slate-200 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link2}
                  onChange={(e) => setLink2(e.target.value)}
                  type="text"
                  placeholder={chapter2}
                  disabled={enable2 ? false : true}
                />

                {enable2 && (
                  <>
                    <button
                      onClick={handleLink2}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setEnable2(false);
                        setLink2(chapter2);
                      }}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {!enable2 && (
                  <button
                    onClick={() => setEnable2(true)}
                    className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                  >
                    Edit
                  </button>
                )}

                <Link
                  target="_blank"
                  href={`${chapter2}`}
                  className="text-sm font-medium text-gray-900 hover:text-[#835876]"
                >
                  <button className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10">
                    Cek
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter3 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {/* {chapter1 && (
            
          )} */}
          <label className="block mt-1 text-sm font-medium text-gray-900 ">
            BAB 3
          </label>
          <div className="flex justify-between items-center w-full">
            {!chapter3 && (
              <>
                <input
                  className="disabled:opacity-50 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link3}
                  onChange={(e) => setLink3(e.target.value)}
                  type="text"
                  placeholder="Link Google Drive"
                  required
                  disabled={
                    chapter2 === "" ||
                    isApprovedByProf1Chapter2 === "Denied" ||
                    isApprovedByProf1Chapter2 === "" ||
                    isApprovedByProf2Chapter2 === "Denied" ||
                    isApprovedByProf2Chapter2 === ""
                      ? true
                      : false
                  }
                />
                <button
                  onClick={handleLink3}
                  disabled={
                    chapter2 === "" ||
                    isApprovedByProf1Chapter2 === "Denied" ||
                    isApprovedByProf1Chapter2 === "" ||
                    isApprovedByProf2Chapter2 === "Denied" ||
                    isApprovedByProf2Chapter2 === ""
                      ? true
                      : false
                  }
                  className="disabled:opacity-50 text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                >
                  Simpan
                </button>
              </>
            )}
            {chapter3 && (
              <>
                <input
                  className="disabled:bg-slate-200 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link3}
                  onChange={(e) => setLink3(e.target.value)}
                  type="text"
                  placeholder={chapter3}
                  disabled={enable3 ? false : true}
                />

                {enable3 && (
                  <>
                    <button
                      onClick={() => handleLink3()}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setEnable3(false);
                        setLink3(chapter3);
                      }}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {!enable3 && (
                  <button
                    onClick={() => setEnable3(true)}
                    className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                  >
                    Edit
                  </button>
                )}

                <Link
                  target="_blank"
                  href={`${chapter3}`}
                  className="text-sm font-medium text-gray-900 hover:text-[#835876]"
                >
                  <button className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10">
                    Cek
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter4 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {/* {chapter1 && (
            
          )} */}
          <label className="block mt-1 text-sm font-medium text-gray-900 ">
            BAB 4
          </label>
          <div className="flex justify-between items-center w-full">
            {!chapter4 && (
              <>
                <input
                  className="disabled:opacity-50 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link4}
                  onChange={(e) => setLink4(e.target.value)}
                  type="text"
                  placeholder="Link Google Drive"
                  required
                  disabled={
                    chapter3 === "" ||
                    isApprovedByProf1Chapter3 === "Denied" ||
                    isApprovedByProf1Chapter3 === "" ||
                    isApprovedByProf2Chapter3 === "Denied" ||
                    isApprovedByProf2Chapter3 === ""
                      ? true
                      : false
                  }
                />
                <button
                  onClick={handleLink4}
                  disabled={
                    chapter3 === "" ||
                    isApprovedByProf1Chapter3 === "Denied" ||
                    isApprovedByProf1Chapter3 === "" ||
                    isApprovedByProf2Chapter3 === "Denied" ||
                    isApprovedByProf2Chapter3 === ""
                      ? true
                      : false
                  }
                  className="disabled:opacity-50 text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                >
                  Simpan
                </button>
              </>
            )}
            {chapter4 && (
              <>
                <input
                  className="disabled:bg-slate-200 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link4}
                  onChange={(e) => setLink4(e.target.value)}
                  type="text"
                  placeholder={chapter4}
                  disabled={enable4 ? false : true}
                />

                {enable4 && (
                  <>
                    <button
                      onClick={() => handleLink4()}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setEnable4(false);
                        setLink4(chapter4);
                      }}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {!enable4 && (
                  <button
                    onClick={() => setEnable4(true)}
                    className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                  >
                    Edit
                  </button>
                )}

                <Link
                  target="_blank"
                  href={`${chapter4}`}
                  className="text-sm font-medium text-gray-900 hover:text-[#835876]"
                >
                  <button className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10">
                    Cek
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
          {!chapter5 && (
            <label className="block mt-2 text-sm font-medium text-gray-500 ">
              File Belum Ada
            </label>
          )}
          {/* {chapter1 && (
            
          )} */}
          <label className="block mt-1 text-sm font-medium text-gray-900 ">
            BAB 5
          </label>
          <div className="flex justify-between items-center w-full">
            {!chapter5 && (
              <>
                <input
                  className="disabled:opacity-50 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link5}
                  onChange={(e) => setLink5(e.target.value)}
                  type="text"
                  placeholder="Link Google Drive"
                  required
                  disabled={
                    chapter4 === "" ||
                    isApprovedByProf1Chapter4 === "Denied" ||
                    isApprovedByProf1Chapter4 === "" ||
                    isApprovedByProf2Chapter4 === "Denied" ||
                    isApprovedByProf2Chapter4 === ""
                      ? true
                      : false
                  }
                />
                <button
                  onClick={handleLink5}
                  disabled={
                    chapter4 === "" ||
                    isApprovedByProf1Chapter4 === "Denied" ||
                    isApprovedByProf1Chapter4 === "" ||
                    isApprovedByProf2Chapter4 === "Denied" ||
                    isApprovedByProf2Chapter4 === ""
                      ? true
                      : false
                  }
                  className="disabled:opacity-50 text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                >
                  Simpan
                </button>
              </>
            )}
            {chapter5 && (
              <>
                <input
                  className="disabled:bg-slate-200 bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
                  value={link5}
                  onChange={(e) => setLink5(e.target.value)}
                  type="text"
                  placeholder={chapter5}
                  disabled={enable5 ? false : true}
                />

                {enable5 && (
                  <>
                    <button
                      onClick={() => handleLink5()}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => {
                        setEnable5(false);
                        setLink5(chapter5);
                      }}
                      className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {!enable5 && (
                  <button
                    onClick={() => setEnable5(true)}
                    className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
                  >
                    Edit
                  </button>
                )}

                <Link
                  target="_blank"
                  href={`${chapter5}`}
                  className="text-sm font-medium text-gray-900 hover:text-[#835876]"
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
    </div>
  );
};

export default FileUpload;
