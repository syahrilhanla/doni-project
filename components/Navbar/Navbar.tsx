import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { TfiBell } from "react-icons/tfi";
import NotificationList, {
  NotificationData,
} from "../Notification/NotificationList";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/router";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../Store/firebase";
import { FaBars, FaTimes } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [openNotification, setOpenNotification] = useState(false);
  const router = useRouter();
  const [notification, setNotification] = useState([]);
  const [notificationdosen, setNotificationDosen] = useState<any>([]);
  const [student, setStudent] = useState<any>([]);
  const [navbar, setNavbar] = useState(false);

  const menuItemsMhs = [
    {
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      href: "/berkas",
      title: "Berkas",
    },
    {
      href: "/seminar",
      title: "Seminar Hasil",
    },
    {
      href: "/sidang",
      title: "Sidang Akhir",
    },
  ];

  const menuItemsDosen = [
    {
      href: "/approval",
      title: "Persetujuan Judul",
    },
    {
      href: "/progresMahasiswa",
      title: "Progres Mahasiswa",
    },
    {
      href: "/seminarMahasiswa",
      title: "Seminar Hasil Mahasiswa",
    },
    {
      href: "/sidangMahasiswa",
      title: "Sidang Akhir Mahasiswa",
    },
  ];

  const menuItemsAdmin = [
    {
      href: "/request",
      title: "Permintaan Pendaftaran Mahasiswa",
    },
    {
      href: "/daftarMahasiswa",
      title: "Daftar Mahasiswa Skripsi",
    },
    {
      href: "/daftarDosen",
      title: "Daftar Dosen Pembimbing",
    },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  const getNotifDosen = useCallback(async () => {
    try {
      const profRef = doc(db, "professorList", user.uid);
      const notifProf = await getDoc(profRef);
      setNotificationDosen(notifProf.data()?.notifications);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getNotifMahasiswa = useCallback(async () => {
    try {
      const studentsRef = doc(db, "studentsList", user.uid);
      const notifStudents = await getDoc(studentsRef);
      setNotification(notifStudents.data()?.notifications);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user.role === "mhs") {
      getNotifMahasiswa();
    } else if (user.role === "dosen") {
      getNotifDosen();
    }
  }, [user]);

  const setMobileNavbar = () => {
    if (!navbar) {
      return "lg:hidden absolute top-0 left-0 bg-patternTwo flex flex-col justify-center items-center h-screen w-screen ml-[-110%] duration-500";
    } else
      return "lg:hidden absolute top-0 left-0 bg-patternTwo flex flex-col justify-center items-center h-screen  w-screen duration-500 z-10";
  };

  return (
    <div className="flex flex-col top-12">
      <div
        className="flex justify-end items-center text-white p-8 shadow-md 
        gap-6 bg-patternTwo h-16 overflow-hidden"
      >
        <button
          onClick={() => setOpenNotification(!openNotification)}
          className="relative cursor-pointer hover:bg-white hover:font-extrabold
          hover:text-patternTwo p-2 rounded-full "
        >
          <TfiBell className="text-2xl" />
          <span className="absolute top-1 right-2 p-1.5 rounded-full bg-red-500" />
        </button>

        <button
          onClick={handleLogout}
          className="cursor-pointer hover:bg-white hover:font-extrabold
          hover:text-patternTwo p-2 rounded-full duration-200"
        >
          <RiLogoutBoxRLine className="text-2xl" />
        </button>

        <div className=" flex lg:hidden z-50 cursor-pointer">
          {navbar ? (
            <>
              <FaTimes
                className="text-2xl"
                onClick={() => setNavbar((prevValue) => !prevValue)}
              />
            </>
          ) : (
            <FaBars
              className="text-2xl"
              onClick={() => setNavbar((prevValue) => !prevValue)}
            />
          )}
        </div>
      </div>

      <div className={" flex flex-col justify-center p-2 " + setMobileNavbar()}>
        <ul className="space-y-2 mt-5">
          <li>
            <div
              className="flex flex-col gap-4 h-50 ml-2 mr-2 rounded-xl
              shadow-sm bg-[#faf8fd] p-6 mb-5 text-[#9F86C0]"
            >
              <div className="flex justify-center items-center">
                <div className="h-32 w-32 rounded-full flex items-center justify-center  overflow-hidden">
                  {/* <Image
                    alt="student picture"
                    src={"/reminz.jfif"}
                    fill
                    className="rounded-full"
                  /> */}
                  <BsPersonCircle className="h-32 w-32" />
                </div>
              </div>
              <div
                className="flex flex-col gap-2 justify-center items-center
                  font-normal text-lg"
              >
                <p>{user.name}</p>
                <p className="text-base font-normal">{user.username}</p>
              </div>
            </div>
          </li>
        </ul>
        {user.role === "mhs" ? (
          <ul className="flex flex-col gap-2 px-1.5 z-auto">
            {menuItemsMhs.map(({ href, title }) => (
              <li
                key={title}
                onClick={() => setNavbar((prevValue) => !prevValue)}
              >
                <Link href={href}>
                  <div
                    className={`
                flex justify-center  items-center text-white 
                px-2 py-4  font-normal  rounded-lg text-3xl
                hover:bg-[#683ab715]
                  ${router.asPath === href && "bg-[#683ab715]"}`}
                  >
                    <span>{title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : user.role === "dosen" ? (
          <ul className="flex flex-col gap-2 px-1.5 z-auto">
            {menuItemsDosen.map(({ href, title }) => (
              <li
                key={title}
                onClick={() => setNavbar((prevValue) => !prevValue)}
              >
                <Link href={href}>
                  <div
                    className={`
                flex justify-center  items-center text-white 
                px-2 py-4  font-normal  rounded-lg text-3xl
                hover:bg-[#683ab715]
                  ${router.asPath === href && "bg-[#683ab715]"}`}
                  >
                    <span>{title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col gap-2 px-1.5 z-auto">
            {menuItemsAdmin.map(({ href, title }) => (
              <li
                key={title}
                onClick={() => setNavbar((prevValue) => !prevValue)}
              >
                <Link href={href}>
                  <div
                    className={`
                flex justify-center  items-center text-white 
                px-2 py-4  font-normal  rounded-lg text-3xl
                hover:bg-[#683ab715]
                  ${router.asPath === href && "bg-[#683ab715]"}`}
                  >
                    <span>{title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {openNotification && (
        <>
          {user.role === "mhs" && (
            <NotificationList notificationData={notification} />
          )}
          {user.role === "dosen" && (
            <NotificationList notificationData={notificationdosen} />
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
