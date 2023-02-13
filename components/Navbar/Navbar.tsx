import React, { useEffect, useState } from "react";
import Link from "next/link";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { TfiBell } from "react-icons/tfi";
import NotificationList, {
  NotificationData,
} from "../Notification/NotificationList";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/router";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../Store/firebase";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [openNotification, setOpenNotification] = useState(false);
  const router = useRouter();
  const [roleuser, setRoleuser] = useState(user.role)
  const [notification, setNotification] = useState([])
  const [dospem1, setDospem1] = useState(user.profOne)
  const [dospem2, setDospem2] = useState(user.profTwo)
  const [titleapproveprofone, setTitleapproveprofone] = useState(null)
  const [titleapproveproftwo, setTitleapproveproftwo] = useState(null)
  const [seminarapproveone, setSeminarapproveone] = useState(null)
  const [seminarapprovetwo, setSeminarapprovetwo] = useState(null)
  const [sidangapproveone, setSidangapproveone] = useState(null)
  const [sidangapprovetwo, setSidangapprovetwo] = useState(null)
  const [penguji1, setPenguji1]= useState(user.examinerOne)
  const [penguji2, setPenguji2]= useState(null)
  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (user.title) {
      setTitleapproveprofone(user.title[0].isApprovedByProfOne)
      setTitleapproveproftwo(user.title[0].isApprovedByProfTwo)
    }
    if (user.seminarDate) {
      setSeminarapproveone(user.seminarDate[0].isApprovedByProfOne)
      setSeminarapprovetwo(user.seminarDate[0].isApprovedByProfTwo)
    }
    if (user.sidangDate) {
      setSidangapproveone(user.sidangDate[0].isApprovedByProfOne)
      setSidangapprovetwo(user.sidangDate[0].isApprovedByProfTwo)
    }
    const getApprove = async (user: User) => {
      try {        
        onSnapshot(doc(db, "studentsList", user.uid), (doc) => {
          setRoleuser(doc.data()?.role)
          setDospem1(doc.data()?.profOne)
          setDospem2(doc.data()?.profTwo)
          setPenguji1(doc.data()?.examinerOne)
          setPenguji2(doc.data()?.examinerTwo)
          setTitleapproveprofone(doc.data()?.title[0].isApprovedByProfOne)
          setTitleapproveproftwo(doc.data()?.title[0].isApprovedByProfTwo)
          setSeminarapproveone(doc.data()?.seminarDate[0].isApprovedByProfOne)
          setSeminarapprovetwo(doc.data()?.seminarDate[0].isApprovedByProfTwo)
          setSidangapproveone(doc.data()?.sidangDate[0].isApprovedByProfOne)
          setSidangapprovetwo(doc.data()?.sidangDate[0].isApprovedByProfTwo)
          setNotification(doc.data()?.notifications)
  
        })
      } catch (error) {
        console.log(error)
      }
    }
    { dospem1 && createNotifDosen1() }
    { dospem2 && createNotifDosen2() }
    { penguji1 && createNotifPenguji1() }
    { penguji2 && createNotifPenguji2() }
    { titleapproveprofone && notifApproveProfOne() }
    { titleapproveproftwo && notifApproveProfTwo() }
    { seminarapproveone && notifSeminarApproveProfOne() }
    { seminarapprovetwo && notifSeminarApproveProfTwo() }
    { sidangapproveone && notifSidangApproveProfOne() }
    { sidangapprovetwo && notifSidangApproveProfTwo() }
    if (user) {
      getApprove(user!);
    }
  }, [])

  const notificationData: NotificationData[] = [
    {
      id: 1,
      title: "title 1",
      text: "Text 1",
      isRead: true,
    },
    {
      id: 2,
      title: "title 2",
      text: "text 2",
      isRead: false,
    },
    {
      id: 11,
      title: "title 1",
      text: "Text 1",
      isRead: true,
    },
    {
      id: 22,
      title: "title 2",
      text: "text 2",
      isRead: false,
    },
    {
      id: 115,
      title: "title 1",
      text: "Text 1",
      isRead: true,
    },
    {
      id: 22,
      title: "title 2",
      text: "text 2",
      isRead: false,
    },

  ];

  // mahasiswa 

  const createNotifDosen1 = () => {
      const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Berhasil Mendapatkan Dosen Pembimbing 1",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
  const createNotifDosen2 = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Berhasil Mendapatkan Dosen Pembimbing 2",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
  const notifApproveProfOne = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Judul Skripsi Diterima Dospem 1",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
  const notifApproveProfTwo = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Judul Skripsi Diterima Dospem 2",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
  const notifSeminarApproveProfOne = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Kamu diperbolehkan Seminar Hasil Oleh Dospem 1",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
  const notifSeminarApproveProfTwo = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Kamu diperbolehkan Seminar Hasil Oleh Dospem 2",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
   const notifSidangApproveProfTwo = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Kamu diperbolehkan Sidang Akhir Oleh Dospem 2",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
     const notifSidangApproveProfOne = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Kamu diperbolehkan Sidang Akhir Oleh Dospem 1",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
    const createNotifPenguji1 = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Kamu Mendapatkan Dosen Penguji 1",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
    const createNotifPenguji2 = () => {
    const docRef = doc(db, "studentsList", user.uid);
    const notifValue = {
      notifications: arrayUnion(
        {
          id: user.uid,
          isRead: false,
          text: "Kamu Mendapatkan Dosen Penguji 2",
          title: "Selamat"
        }
      )
    };
    updateDoc(docRef, notifValue)
  }
  // mahasiswa 

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
          {roleuser !== "mhs" && <NotificationList notificationData={notificationData} />}
          {roleuser === "mhs" && <NotificationList notificationData={notification} />}


        </>
      )}
    </div>
  );
};

export default Navbar;
