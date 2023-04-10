import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../Context/AuthContext";
import { doc, getDoc, } from "firebase/firestore";
import { db } from "../Store/firebase";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Notification from "../Notification/Notification";
import MobileSidebar from "../Sidebar/MobileSidebar";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const [notificationData, setNotificationData] = useState([]);
  const [navbar, setNavbar] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificationData = useCallback(async () => {
    if (user.role) {
      const userRole = `${user.role === "mhs"
        ? "studentsList" : user.role === "dosen"
          ? "professorList" : ""
        }`;

      const userRef = doc(db, userRole, user.uid);

      const notifications = await getDoc(userRef);
      setNotificationData(notifications.data()?.notifications);
    }

  }, [user, openNotification]);

  useEffect(() => {
    getNotificationData();
  }, [user, openNotification]);

  return (
    <div className="flex flex-col top-12">
      <div
        className="flex justify-end items-center text-white p-8 shadow-md 
        gap-6 bg-patternTwo h-16 overflow-hidden"
      >
        <Notification
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
          notificationData={notificationData}
        />

        <button
          onClick={handleLogout}
          className="cursor-pointer hover:bg-white hover:font-extrabold
          hover:text-patternTwo p-2 rounded-full duration-200"
        >
          <RiLogoutBoxRLine className="text-2xl" />
        </button>

        <div className="flex lg:hidden z-50 cursor-pointer">
          {navbar ? (
            <>
              <FaTimes
                className="text-2xl fixed top-7 right-10"
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

      <MobileSidebar
        navbar={navbar}
        setNavbar={setNavbar}
        user={user}
      />
    </div>
  );
};

export default Navbar;
