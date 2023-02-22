import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { TfiBell } from "react-icons/tfi";
import NotificationList, {
  NotificationData,
} from "../Notification/NotificationList";
import { useAuth } from "../Context/AuthContext";
import { useRouter } from "next/router";
import { arrayUnion, collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../Store/firebase";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [openNotification, setOpenNotification] = useState(false);
  const router = useRouter();
  const [notification, setNotification] = useState([])
  const [notificationdosen, setNotificationDosen] = useState<any>([])
  const [dospem1, setDospem1] = useState(user.profOne)
  const [dospem2, setDospem2] = useState(user.profTwo)
  const [titleapproveprofone, setTitleapproveprofone] = useState<any>()
  const [titleapproveproftwo, setTitleapproveproftwo] = useState<any>()
  const [seminarapproveone, setSeminarapproveone] = useState<any>()
  const [seminarapprovetwo, setSeminarapprovetwo] = useState<any>()
  const [sidangapproveone, setSidangapproveone] = useState<any>()
  const [sidangapprovetwo, setSidangapprovetwo] = useState<any>()
  const [penguji1, setPenguji1] = useState(user.examinerOne)
  const [penguji2, setPenguji2] = useState(user.examinerTwo)
  const [student, setStudent] = useState<any>([])

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const getNotifDosen = useCallback(async () => {
    try {
      const profRef = doc(db, "professorList", user.uid)
      const notifProf = await getDoc(profRef)
      setNotificationDosen(notifProf.data()?.notifications);
    } catch (error) {
      console.log(error);
    }
  }, [])
  const getNotifMahasiswa = useCallback(async () => {
    try {
      const studentsRef = doc(db, "studentsList", user.uid)
      const notifStudents = await getDoc(studentsRef)
      setNotification(notifStudents.data()?.notifications);
    } catch (error) {
      console.log(error);
    }
  }, [])


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
    if (user.role === "mhs") {
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
      getNotifMahasiswa()
    } else if (user.role === "dosen") {

      getNotifDosen()
      getNotifDospem1()
      getNotifDospem2()
      getNotifStudentSeminar()
      getNotifStudentSidang()
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

  const createNotifDosen1 = useCallback(() => {
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
  }, [dospem1])
  const createNotifDosen2 = useCallback(() => {
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
  }, [dospem2])
  const notifApproveProfOne = useCallback(() => {
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
  }, [titleapproveprofone])
  const notifApproveProfTwo = useCallback(() => {
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
  }, [titleapproveproftwo])
  const notifSeminarApproveProfOne = useCallback(() => {
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
  }, [seminarapproveone])
  const notifSeminarApproveProfTwo = useCallback(() => {
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
  }, [seminarapprovetwo])
  const notifSidangApproveProfTwo = useCallback(() => {
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
  }, [sidangapprovetwo])
  const notifSidangApproveProfOne = useCallback(() => {
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
  }, [sidangapproveone])
  const createNotifPenguji1 = useCallback(() => {
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
  }, [penguji1])
  const createNotifPenguji2 = useCallback(() => {
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
  }, [penguji2])
  // mahasiswa
  // dosen   
  const getNotifDospem1 = useCallback(async () => {
    try {
      const docRef1 = doc(db, "professorList", user.uid);
      const studentRef1 = query(collection(db, "studentsList"), where("profOne", "==", user.name));
      (await getDocs(studentRef1)).forEach((doc) => {
        if (doc.data()?.title[0].titleText !== "") {
          const notifValue1 = {
            notifications: arrayUnion(
              {
                id: user.uid,
                isRead: false,
                text: `${doc.data()?.name} Mengajukan Judul Skripsi, Anda Sebagai Dosen Pembimbing 1`,
                title: "Pemberitahuan"
              }
            )
          };
          updateDoc(docRef1, notifValue1)
        }
      })

    } catch (e) {
      console.log(e)
    }
  }, [student])
  const getNotifDospem2 = useCallback(async () => {
    try {
      const docRef2 = doc(db, "professorList", user.uid);
      const studentRef2 = query(collection(db, "studentsList"), where("profTwo", "==", user.name));
      (await getDocs(studentRef2)).forEach((doc) => {
        if (doc.data()?.title[0].titleText !== "") {
          const notifValue2 = {
            notifications: arrayUnion(
              {
                id: user.uid,
                isRead: false,
                text: `${doc.data()?.name} Mengajukan Judul Skripsi, Anda Sebagai Dosen Pembimbing 2`,
                title: "Pemberitahuan"
              }
            )
          };
          updateDoc(docRef2, notifValue2)
        }
      })

    } catch (e) {
      console.log(e)
    }
  }, [student])
  const getNotifStudentSidang = useCallback(async () => {
    try {
      const docRefSidang = doc(db, "professorList", user.uid);
      const studentRefSidang = query(collection(db, "studentsList"), where("fileSidang", "!=", ""));
      (await getDocs(studentRefSidang)).forEach((doc) => {

        const notifSidang = {
          notifications: arrayUnion(
            {
              id: user.uid,
              isRead: false,
              text: `${doc.data()?.name} Mengajukan File Sidang Akhir`,
              title: "Pemberitahuan"
            }
          )
        };
        updateDoc(docRefSidang, notifSidang)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  const getNotifStudentSeminar = useCallback(async () => {
    try {
      const docRef2 = doc(db, "professorList", user.uid);
      const studentRef2 = query(collection(db, "studentsList"), where("fileSeminar", "!=", ""));
      (await getDocs(studentRef2)).forEach((doc) => {
        const notifValue2 = {
          notifications: arrayUnion(
            {
              id: user.uid,
              isRead: false,
              text: `${doc.data()?.name} Mengajukan File Seminar Hasil`,
              title: "Pemberitahuan"
            }
          )
        };
        updateDoc(docRef2, notifValue2)
      })
    } catch (e) {
      console.log(e)
    }
  }, [])
  // dosen
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
          {user.role === "mhs" && <NotificationList notificationData={notification} />}
          {user.role === "dosen" && <NotificationList notificationData={notificationdosen} />}


        </>
      )}
    </div>
  );
};

export default Navbar;
