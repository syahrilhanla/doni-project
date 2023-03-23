import { useCallback, useEffect, useState } from "react";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { TfiBell } from "react-icons/tfi";
import NotificationList from "../Notification/NotificationList";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/router";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "../Store/firebase";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [openNotification, setOpenNotification] = useState(false);
  const router = useRouter();
  const [notification, setNotification] = useState([]);
  const [notificationdosen, setNotificationDosen] = useState<any>([]);
  const [student, setStudent] = useState<any>([]);

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

  return (
    <div className="flex flex-col top-12">
      <div
        className="flex justify-end items-center text-white p-8 shadow-md 
        gap-6 bg-patternTwo h-16 overflow-hidden"
      >
        <button
          onClick={() => setOpenNotification(!openNotification)}
          className="relative cursor-pointer hover:bg-white hover:font-extrabold
          hover:text-patternTwo p-2 rounded-full duration-200"
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
