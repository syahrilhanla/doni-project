import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../Context/AuthContext";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "../Store/firebase";

import { RiLogoutBoxRLine } from "react-icons/ri";
import Notification from "../Notification/Notification";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [notificationData, setNotificationData] = useState([]);

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
      setNotificationData(notifProf.data()?.notifications);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getNotifMahasiswa = useCallback(async () => {
    try {
      const studentsRef = doc(db, "studentsList", user.uid);
      const notifStudents = await getDoc(studentsRef);
      setNotificationData(notifStudents.data()?.notifications);
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

  return (
    <div className="flex flex-col top-12">
      <div
        className="flex justify-end items-center text-white p-8 shadow-md 
        gap-6 bg-patternTwo h-16 overflow-hidden"
      >
        <Notification notificationData={notificationData} />

        <button
          onClick={handleLogout}
          className="cursor-pointer hover:bg-white hover:font-extrabold
          hover:text-patternTwo p-2 rounded-full duration-200"
        >
          <RiLogoutBoxRLine className="text-2xl" />
        </button>
      </div>


    </div>
  );
};

export default Navbar;
