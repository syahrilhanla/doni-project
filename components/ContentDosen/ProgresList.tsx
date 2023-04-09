import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { RiLoader5Line, RiSortDesc } from "react-icons/ri";
import { useAuth } from "../Context/AuthContext";
import { db } from "../Store/firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CloseButton, SendButton } from "../Common/Buttons";
export default function ProgresList() {
  const [student, setStudent] = useState<any>([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [uidUser, setUidUser] = useState<any>();
  const [profSatu, setProfSatu] = useState<any>();
  const [profDua, setProfDua] = useState<any>();
  const [newFeedback, setNewFeedBack] = useState("");
  const [openModalOne, setOpenModalOne] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false);
  const [openModalThree, setOpenModalThree] = useState(false);
  const [openModalFour, setOpenModalFour] = useState(false);
  const [openModalFive, setOpenModalFive] = useState(false);
  const [approveChapterOne, setApproveChapterOne] = useState(false);
  const [approveChapterTwo, setApproveChapterTwo] = useState(false);
  const [approveChapterThree, setApproveChapterThree] = useState(false);
  const [approveChapterFour, setApproveChapterFour] = useState(false);
  const [approveChapterFive, setApproveChapterFive] = useState(false);
  const [denyChapterOne, setDenyChapterOne] = useState(false);
  const [denyChapterTwo, setDenyChapterTwo] = useState(false);
  const [denyChapterThree, setDenyChapterThree] = useState(false);
  const [denyChapterFour, setDenyChapterFour] = useState(false);
  const [denyChapterFive, setDenyChapterFive] = useState(false);
  const [
    isApprovedByProfOneChaptOne,
    setIsApprovedByProfOneChaptOne,
  ] = useState<any>();
  const [
    isApprovedByProfOneChaptTwo,
    setIsApprovedByProfOneChaptTwo,
  ] = useState<any>();
  const [
    isApprovedByProfOneChaptThree,
    setIsApprovedByProfOneChaptThree,
  ] = useState<any>();
  const [
    isApprovedByProfOneChaptFour,
    setIsApprovedByProfOneChaptFour,
  ] = useState<any>();
  const [
    isApprovedByProfOneChaptFive,
    setIsApprovedByProfOneChaptFive,
  ] = useState<any>();
  const [
    isApprovedByProfTwoChaptOne,
    setIsApprovedByProfTwoChaptOne,
  ] = useState<any>();
  const [
    isApprovedByProfTwoChaptTwo,
    setIsApprovedByProfTwoChaptTwo,
  ] = useState<any>();
  const [
    isApprovedByProfTwoChaptThree,
    setIsApprovedByProfTwoChaptThree,
  ] = useState<any>();
  const [
    isApprovedByProfTwoChaptFour,
    setIsApprovedByProfTwoChaptFour,
  ] = useState<any>();
  const [
    isApprovedByProfTwoChaptFive,
    setIsApprovedByProfTwoChaptFive,
  ] = useState<any>();
  const [linkChapterOne, setLinkChapterOne] = useState<any>();
  const [linkChapterTwo, setLinkChapterTwo] = useState<any>();
  const [linkChapterThree, setLinkChapterThree] = useState<any>();
  const [linkChapterFour, setLinkChapterFour] = useState<any>();
  const [linkChapterFive, setLinkChapterFive] = useState<any>();

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

      setStudent(arrayStudents);
      setLoading(false);
    } catch (e) {
      console.log(e);
      toast.error("Silahkan Muat Ulang Halaman", {
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
  }, [user]);

  useEffect(() => {
    getData();
  }, [user]);

  const getCurrentDate = (separator = "-") => {
    let newDate = new Date();

    const formattedDate = moment(newDate).format("DD MMM YYYY");
    return formattedDate;
  };

  // Chapter One
  const getValueApproveChapOne = (
    uid: any,
    profOne: any,
    profTwo: any,
    isApprovedByProfOneChapOne: any,
    isApprovedByProfTwoChapOne: any,
    linkChapOne: any,
    isApprovedByProfOneChapTwo: any,
    isApprovedByProfTwoChapTwo: any,
    linkChapTwo: any,
    isApprovedByProfOneChapThree: any,
    isApprovedByProfTwoChapThree: any,
    linkChapThree: any,
    isApprovedByProfOneChapFour: any,
    isApprovedByProfTwoChapFour: any,
    linkChapFour: any,
    isApprovedByProfOneChapFive: any,
    isApprovedByProfTwoChapFive: any,
    linkChapFive: any
  ) => {
    setOpenModalOne(true);
    setUidUser(uid);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setIsApprovedByProfOneChaptOne(isApprovedByProfOneChapOne);
    setIsApprovedByProfTwoChaptOne(isApprovedByProfTwoChapOne);
    setLinkChapterOne(linkChapOne);
    setIsApprovedByProfOneChaptTwo(isApprovedByProfOneChapTwo);
    setIsApprovedByProfTwoChaptTwo(isApprovedByProfTwoChapTwo);
    setLinkChapterTwo(linkChapTwo);
    setIsApprovedByProfOneChaptThree(isApprovedByProfOneChapThree);
    setIsApprovedByProfTwoChaptThree(isApprovedByProfTwoChapThree);
    setLinkChapterThree(linkChapThree);
    setIsApprovedByProfOneChaptFour(isApprovedByProfOneChapFour);
    setIsApprovedByProfTwoChaptFour(isApprovedByProfTwoChapFour);
    setLinkChapterFour(linkChapFour);
    setIsApprovedByProfOneChaptFive(isApprovedByProfOneChapFive);
    setIsApprovedByProfTwoChaptFive(isApprovedByProfTwoChapFive);
    setLinkChapterFive(linkChapFive);
  };

  const updateApproveChapOne = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: user.name,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab I Kamu Telah Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab I",
        }),
      };
      updateDoc(studentRef, value1);
      toast.success(
        "Berhasil Menyetujui File Bab I Selaku Dosen Pembimbing 1",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterOne(false);
      setOpenModalOne(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: user.name,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab I Kamu Telah Disetujui Oleh Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab I",
        }),
      };
      updateDoc(studentRef, value2);
      toast.success(
        "Berhasil Menyetujui File Bab I Selaku Dosen Pembimbing 2",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterOne(false);
      setOpenModalOne(false);
      setNewFeedBack("");
    }
  };

  const updateDeniedChapOne = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: "Denied",
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab I Kamu Tidak Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan File Bab I",
        }),
      };
      updateDoc(studentRef, value1);
      toast.error("Berhasil Menolak File Bab I Selaku Dosen Pembimbing  1", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterOne(false);
      setOpenModalOne(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: "Denied",
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab I Kamu Tidak Disetujui Oleh Dosen Pembimbing 2",

          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan Seminar Hasil",
        }),
      };
      updateDoc(studentRef, value2);
      toast.error("Berhasil Menolak File Bab I Selaku Dosen Pembimbing 2", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterOne(false);
      setOpenModalOne(false);
      setNewFeedBack("");
    }
  };

  const handleCloseModalOne = () => {
    setOpenModalOne(!openModalOne);
    setNewFeedBack("");
  };

  const handleApproveChapOne = () => {
    if (newFeedback) updateApproveChapOne();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };
  const handleDenyChapOne = () => {
    if (newFeedback) updateDeniedChapOne();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  const getApproveModalChapOne = () => {
    setApproveChapterOne(true);
  };
  const getDenyModalChapOne = () => {
    setDenyChapterOne(true);
  };

  // Chapter Two

  const getValueApproveChapTwo = (
    uid: any,
    profOne: any,
    profTwo: any,
    isApprovedByProfOneChapOne: any,
    isApprovedByProfTwoChapOne: any,
    linkChapOne: any,
    isApprovedByProfOneChapTwo: any,
    isApprovedByProfTwoChapTwo: any,
    linkChapTwo: any,
    isApprovedByProfOneChapThree: any,
    isApprovedByProfTwoChapThree: any,
    linkChapThree: any,
    isApprovedByProfOneChapFour: any,
    isApprovedByProfTwoChapFour: any,
    linkChapFour: any,
    isApprovedByProfOneChapFive: any,
    isApprovedByProfTwoChapFive: any,
    linkChapFive: any
  ) => {
    setOpenModalTwo(true);
    setUidUser(uid);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setIsApprovedByProfOneChaptOne(isApprovedByProfOneChapOne);
    setIsApprovedByProfTwoChaptOne(isApprovedByProfTwoChapOne);
    setLinkChapterOne(linkChapOne);
    setIsApprovedByProfOneChaptTwo(isApprovedByProfOneChapTwo);
    setIsApprovedByProfTwoChaptTwo(isApprovedByProfTwoChapTwo);
    setLinkChapterTwo(linkChapTwo);
    setIsApprovedByProfOneChaptThree(isApprovedByProfOneChapThree);
    setIsApprovedByProfTwoChaptThree(isApprovedByProfTwoChapThree);
    setLinkChapterThree(linkChapThree);
    setIsApprovedByProfOneChaptFour(isApprovedByProfOneChapFour);
    setIsApprovedByProfTwoChaptFour(isApprovedByProfTwoChapFour);
    setLinkChapterFour(linkChapFour);
    setIsApprovedByProfOneChaptFive(isApprovedByProfOneChapFive);
    setIsApprovedByProfTwoChaptFive(isApprovedByProfTwoChapFive);
    setLinkChapterFive(linkChapFive);
  };

  const updateApproveChapTwo = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: user.name,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab II Kamu Telah Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab II",
        }),
      };
      updateDoc(studentRef, value1);
      toast.success(
        "Berhasil Menyetujui File Bab II Selaku Dosen Pembimbing 1",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterTwo(false);
      setOpenModalTwo(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: user.name,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab II Kamu Telah Disetujui Oleh Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab II",
        }),
      };
      updateDoc(studentRef, value2);
      toast.success(
        "Berhasil Menyetujui File Bab II Selaku Dosen Pembimbing 2",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterTwo(false);
      setOpenModalTwo(false);
      setNewFeedBack("");
    }
  };

  const updateDeniedChapTwo = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: "Denied",
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab II Kamu Tidak Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan File Bab II",
        }),
      };
      updateDoc(studentRef, value1);
      toast.error("Berhasil Menolak File Bab II Selaku Dosen Pembimbing  1", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterTwo(false);
      setOpenModalTwo(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: "Denied",
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab II Kamu Tidak Disetujui Oleh Dosen Pembimbing 2",

          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan Seminar Hasil",
        }),
      };
      updateDoc(studentRef, value2);
      toast.error("Berhasil Menolak File Bab II Selaku Dosen Pembimbing 2", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterTwo(false);
      setOpenModalTwo(false);
      setNewFeedBack("");
    }
  };

  const handleCloseModalTwo = () => {
    setOpenModalTwo(!openModalTwo);
    setNewFeedBack("");
  };

  const handleApproveChapTwo = () => {
    if (newFeedback) updateApproveChapTwo();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };
  const handleDenyChapTwo = () => {
    if (newFeedback) updateDeniedChapTwo();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  const getApproveModalChapTwo = () => {
    setApproveChapterTwo(true);
  };
  const getDenyModalChapTwo = () => {
    setDenyChapterTwo(true);
  };

  // Chapter Three

  const getValueApproveChapThree = (
    uid: any,
    profOne: any,
    profTwo: any,
    isApprovedByProfOneChapOne: any,
    isApprovedByProfTwoChapOne: any,
    linkChapOne: any,
    isApprovedByProfOneChapTwo: any,
    isApprovedByProfTwoChapTwo: any,
    linkChapTwo: any,
    isApprovedByProfOneChapThree: any,
    isApprovedByProfTwoChapThree: any,
    linkChapThree: any,
    isApprovedByProfOneChapFour: any,
    isApprovedByProfTwoChapFour: any,
    linkChapFour: any,
    isApprovedByProfOneChapFive: any,
    isApprovedByProfTwoChapFive: any,
    linkChapFive: any
  ) => {
    setOpenModalThree(true);
    setUidUser(uid);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setIsApprovedByProfOneChaptOne(isApprovedByProfOneChapOne);
    setIsApprovedByProfTwoChaptOne(isApprovedByProfTwoChapOne);
    setLinkChapterOne(linkChapOne);
    setIsApprovedByProfOneChaptTwo(isApprovedByProfOneChapTwo);
    setIsApprovedByProfTwoChaptTwo(isApprovedByProfTwoChapTwo);
    setLinkChapterTwo(linkChapTwo);
    setIsApprovedByProfOneChaptThree(isApprovedByProfOneChapThree);
    setIsApprovedByProfTwoChaptThree(isApprovedByProfTwoChapThree);
    setLinkChapterThree(linkChapThree);
    setIsApprovedByProfOneChaptFour(isApprovedByProfOneChapFour);
    setIsApprovedByProfTwoChaptFour(isApprovedByProfTwoChapFour);
    setLinkChapterFour(linkChapFour);
    setIsApprovedByProfOneChaptFive(isApprovedByProfOneChapFive);
    setIsApprovedByProfTwoChaptFive(isApprovedByProfTwoChapFive);
    setLinkChapterFive(linkChapFive);
  };

  const updateApproveChapThree = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: user.name,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab III Kamu Telah Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab III",
        }),
      };
      updateDoc(studentRef, value1);
      toast.success(
        "Berhasil Menyetujui File Bab III Selaku Dosen Pembimbing 1",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterThree(false);
      setOpenModalThree(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: user.name,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab III Kamu Telah Disetujui Oleh Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab III",
        }),
      };
      updateDoc(studentRef, value2);
      toast.success(
        "Berhasil Menyetujui File Bab III Selaku Dosen Pembimbing 2",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterThree(false);
      setOpenModalThree(false);
      setNewFeedBack("");
    }
  };

  const updateDeniedChapThree = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: "Denied",
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab III Kamu Tidak Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan File Bab III",
        }),
      };
      updateDoc(studentRef, value1);
      toast.error("Berhasil Menolak File Bab III Selaku Dosen Pembimbing  1", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterThree(false);
      setOpenModalThree(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: "Denied",
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab III Kamu Tidak Disetujui Oleh Dosen Pembimbing 2",

          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan Seminar Hasil",
        }),
      };
      updateDoc(studentRef, value2);
      toast.error("Berhasil Menolak File Bab III Selaku Dosen Pembimbing 2", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterThree(false);
      setOpenModalThree(false);
      setNewFeedBack("");
    }
  };

  const handleCloseModalThree = () => {
    setOpenModalThree(!openModalThree);
    setNewFeedBack("");
  };

  const handleApproveChapThree = () => {
    if (newFeedback) updateApproveChapThree();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };
  const handleDenyChapThree = () => {
    if (newFeedback) updateDeniedChapThree();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  const getApproveModalChapThree = () => {
    setApproveChapterThree(true);
  };
  const getDenyModalChapThree = () => {
    setDenyChapterThree(true);
  };

  // Chapter Four

  const getValueApproveChapFour = (
    uid: any,
    profOne: any,
    profTwo: any,
    isApprovedByProfOneChapOne: any,
    isApprovedByProfTwoChapOne: any,
    linkChapOne: any,
    isApprovedByProfOneChapTwo: any,
    isApprovedByProfTwoChapTwo: any,
    linkChapTwo: any,
    isApprovedByProfOneChapThree: any,
    isApprovedByProfTwoChapThree: any,
    linkChapThree: any,
    isApprovedByProfOneChapFour: any,
    isApprovedByProfTwoChapFour: any,
    linkChapFour: any,
    isApprovedByProfOneChapFive: any,
    isApprovedByProfTwoChapFive: any,
    linkChapFive: any
  ) => {
    setOpenModalFour(true);
    setUidUser(uid);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setIsApprovedByProfOneChaptOne(isApprovedByProfOneChapOne);
    setIsApprovedByProfTwoChaptOne(isApprovedByProfTwoChapOne);
    setLinkChapterOne(linkChapOne);
    setIsApprovedByProfOneChaptTwo(isApprovedByProfOneChapTwo);
    setIsApprovedByProfTwoChaptTwo(isApprovedByProfTwoChapTwo);
    setLinkChapterTwo(linkChapTwo);
    setIsApprovedByProfOneChaptThree(isApprovedByProfOneChapThree);
    setIsApprovedByProfTwoChaptThree(isApprovedByProfTwoChapThree);
    setLinkChapterThree(linkChapThree);
    setIsApprovedByProfOneChaptFour(isApprovedByProfOneChapFour);
    setIsApprovedByProfTwoChaptFour(isApprovedByProfTwoChapFour);
    setLinkChapterFour(linkChapFour);
    setIsApprovedByProfOneChaptFive(isApprovedByProfOneChapFive);
    setIsApprovedByProfTwoChaptFive(isApprovedByProfTwoChapFive);
    setLinkChapterFive(linkChapFive);
  };

  const updateApproveChapFour = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: user.name,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab IV Kamu Telah Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab IV",
        }),
      };
      updateDoc(studentRef, value1);
      toast.success(
        "Berhasil Menyetujui File Bab IV Selaku Dosen Pembimbing 1",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterFour(false);
      setOpenModalFour(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: user.name,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab IV Kamu Telah Disetujui Oleh Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab IV",
        }),
      };
      updateDoc(studentRef, value2);
      toast.success(
        "Berhasil Menyetujui File Bab IV Selaku Dosen Pembimbing 2",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterFour(false);
      setOpenModalFour(false);
      setNewFeedBack("");
    }
  };

  const updateDeniedChapFour = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: "Denied",
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab IV Kamu Tidak Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan File Bab IV",
        }),
      };
      updateDoc(studentRef, value1);
      toast.error("Berhasil Menolak File Bab IV Selaku Dosen Pembimbing  1", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterFour(false);
      setOpenModalFour(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: "Denied",
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab IV Kamu Tidak Disetujui Oleh Dosen Pembimbing 2",

          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan Seminar Hasil",
        }),
      };
      updateDoc(studentRef, value2);
      toast.error("Berhasil Menolak File Bab IV Selaku Dosen Pembimbing 2", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterFour(false);
      setOpenModalFour(false);
      setNewFeedBack("");
    }
  };

  const handleCloseModalFour = () => {
    setOpenModalFour(!openModalFour);
    setNewFeedBack("");
  };

  const handleApproveChapFour = () => {
    if (newFeedback) updateApproveChapFour();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };
  const handleDenyChapFour = () => {
    if (newFeedback) updateDeniedChapFour();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  const getApproveModalChapFour = () => {
    setApproveChapterFour(true);
  };
  const getDenyModalChapFour = () => {
    setDenyChapterFour(true);
  };

  // Chapter Five

  const getValueApproveChapFive = (
    uid: any,
    profOne: any,
    profTwo: any,
    isApprovedByProfOneChapOne: any,
    isApprovedByProfTwoChapOne: any,
    linkChapOne: any,
    isApprovedByProfOneChapTwo: any,
    isApprovedByProfTwoChapTwo: any,
    linkChapTwo: any,
    isApprovedByProfOneChapThree: any,
    isApprovedByProfTwoChapThree: any,
    linkChapThree: any,
    isApprovedByProfOneChapFour: any,
    isApprovedByProfTwoChapFour: any,
    linkChapFour: any,
    isApprovedByProfOneChapFive: any,
    isApprovedByProfTwoChapFive: any,
    linkChapFive: any
  ) => {
    setOpenModalFive(true);
    setUidUser(uid);
    setProfSatu(profOne);
    setProfDua(profTwo);
    setIsApprovedByProfOneChaptOne(isApprovedByProfOneChapOne);
    setIsApprovedByProfTwoChaptOne(isApprovedByProfTwoChapOne);
    setLinkChapterOne(linkChapOne);
    setIsApprovedByProfOneChaptTwo(isApprovedByProfOneChapTwo);
    setIsApprovedByProfTwoChaptTwo(isApprovedByProfTwoChapTwo);
    setLinkChapterTwo(linkChapTwo);
    setIsApprovedByProfOneChaptThree(isApprovedByProfOneChapThree);
    setIsApprovedByProfTwoChaptThree(isApprovedByProfTwoChapThree);
    setLinkChapterThree(linkChapThree);
    setIsApprovedByProfOneChaptFour(isApprovedByProfOneChapFour);
    setIsApprovedByProfTwoChaptFour(isApprovedByProfTwoChapFour);
    setLinkChapterFour(linkChapFour);
    setIsApprovedByProfOneChaptFive(isApprovedByProfOneChapFive);
    setIsApprovedByProfTwoChaptFive(isApprovedByProfTwoChapFive);
    setLinkChapterFive(linkChapFive);
  };

  const updateApproveChapFive = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: user.name,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab V Kamu Telah Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab V",
        }),
      };
      updateDoc(studentRef, value1);
      toast.success(
        "Berhasil Menyetujui File Bab V Selaku Dosen Pembimbing 1",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterFive(false);
      setOpenModalFive(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: user.name,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab V Kamu Telah Disetujui Oleh Dosen Pembimbing 2",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menerima Pengajuan File Bab V",
        }),
      };
      updateDoc(studentRef, value2);
      toast.success(
        "Berhasil Menyetujui File Bab V Selaku Dosen Pembimbing 2",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      setApproveChapterFive(false);
      setOpenModalFive(false);
      setNewFeedBack("");
    }
  };

  const updateDeniedChapFive = async () => {
    const studentRef = doc(db, "studentsList", uidUser);
    if (profSatu === user.name) {
      const value1 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: "Denied",
              isApprovedByProfTwo: isApprovedByProfTwoChaptFive,
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab V Kamu Tidak Disetujui Oleh Dosen Pembimbing 1",
          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan File Bab V",
        }),
      };
      updateDoc(studentRef, value1);
      toast.error("Berhasil Menolak File Bab V Selaku Dosen Pembimbing  1", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterFive(false);
      setOpenModalFive(false);
      setNewFeedBack("");
    } else if (profDua === user.name) {
      const value2 = {
        files: [
          {
            chapterOne: {
              isApprovedByProfOne: isApprovedByProfOneChaptOne,
              isApprovedByProfTwo: isApprovedByProfTwoChaptOne,
              link: linkChapterOne,
            },
            chapterTwo: {
              isApprovedByProfOne: isApprovedByProfOneChaptTwo,
              isApprovedByProfTwo: isApprovedByProfTwoChaptTwo,
              link: linkChapterTwo,
            },
            chapterThree: {
              isApprovedByProfOne: isApprovedByProfOneChaptThree,
              isApprovedByProfTwo: isApprovedByProfTwoChaptThree,
              link: linkChapterThree,
            },
            chapterFour: {
              isApprovedByProfOne: isApprovedByProfOneChaptFour,
              isApprovedByProfTwo: isApprovedByProfTwoChaptFour,
              link: linkChapterFour,
            },
            chapterFive: {
              isApprovedByProfOne: isApprovedByProfOneChaptFive,
              isApprovedByProfTwo: "Denied",
              link: linkChapterFive,
            },
          },
        ],
        notifications: arrayUnion({
          id: user.uid,
          isRead: false,
          text: "File Bab V Kamu Tidak Disetujui Oleh Dosen Pembimbing 2",

          title: "Pemberitahuan",
        }),
        activity: arrayUnion({
          feedbackDate: getCurrentDate(),
          feedbackText: newFeedback,
          feedbackProfName: user.name,
          feedbackActivity: "Menolak Pengajuan Seminar Hasil",
        }),
      };
      updateDoc(studentRef, value2);
      toast.error("Berhasil Menolak File Bab V Selaku Dosen Pembimbing 2", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setDenyChapterFive(false);
      setOpenModalFive(false);
      setNewFeedBack("");
    }
  };

  const handleCloseModalFive = () => {
    setOpenModalFive(!openModalFive);
    setNewFeedBack("");
  };

  const handleApproveChapFive = () => {
    if (newFeedback) updateApproveChapFive();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };
  const handleDenyChapFive = () => {
    if (newFeedback) updateDeniedChapFive();
    else
      toast.error("Berikan feedback terlebih dahulu!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };

  const getApproveModalChapFive = () => {
    setApproveChapterFive(true);
  };
  const getDenyModalChapFive = () => {
    setDenyChapterFive(true);
  };

  return (
    <div>
      <ToastContainer />

      {/* Chapter One */}
      {openModalOne && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton handleClick={handleCloseModalOne} />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Persetujuan Bab I
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={getApproveModalChapOne}
                  >
                    Setujui
                  </button>
                  <button className="red-button" onClick={getDenyModalChapOne}>
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {approveChapterOne && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setApproveChapterOne(!approveChapterOne)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda ingin menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={handleApproveChapOne}
                  >
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setApproveChapterOne(!approveChapterOne)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {denyChapterOne && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setDenyChapterOne(denyChapterOne)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda tidak menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button className="purple-button" onClick={handleDenyChapOne}>
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setDenyChapterOne(!denyChapterOne)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Two */}

      {openModalTwo && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton handleClick={handleCloseModalTwo} />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Persetujuan Bab II
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={getApproveModalChapTwo}
                  >
                    Setujui
                  </button>
                  <button className="red-button" onClick={getDenyModalChapTwo}>
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {approveChapterTwo && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setApproveChapterTwo(!approveChapterTwo)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda ingin menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={handleApproveChapTwo}
                  >
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setApproveChapterTwo(!approveChapterTwo)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {denyChapterTwo && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setDenyChapterTwo(denyChapterTwo)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda tidak menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button className="purple-button" onClick={handleDenyChapTwo}>
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setDenyChapterTwo(!denyChapterTwo)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Three */}
      {openModalThree && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton handleClick={handleCloseModalThree} />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Persetujuan Bab III
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={getApproveModalChapThree}
                  >
                    Setujui
                  </button>
                  <button
                    className="red-button"
                    onClick={getDenyModalChapThree}
                  >
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {approveChapterThree && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setApproveChapterThree(!approveChapterThree)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda ingin menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={handleApproveChapThree}
                  >
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setApproveChapterThree(!approveChapterThree)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {denyChapterThree && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setDenyChapterThree(denyChapterThree)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda tidak menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={handleDenyChapThree}
                  >
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setDenyChapterThree(!denyChapterThree)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Four  */}

      {openModalFour && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton handleClick={handleCloseModalFour} />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Persetujuan Bab IV
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={getApproveModalChapFour}
                  >
                    Setujui
                  </button>
                  <button className="red-button" onClick={getDenyModalChapFour}>
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {approveChapterFour && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setApproveChapterFour(!approveChapterFour)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda ingin menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={handleApproveChapFour}
                  >
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setApproveChapterFour(!approveChapterFour)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {denyChapterFour && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setDenyChapterFour(denyChapterFour)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda tidak menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={handleDenyChapFour}
                  >
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setDenyChapterFour(!denyChapterFour)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chapter Five */}

      {openModalFive && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton handleClick={handleCloseModalFive} />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Persetujuan Bab V
                </p>
                <textarea
                  placeholder="Berikan Masukkan Untuk Mahasiswa Bimbingan"
                  className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
                  required
                  value={newFeedback}
                  onChange={(e) => setNewFeedBack(e.target.value)}
                />
                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={getApproveModalChapFive}
                  >
                    Setujui
                  </button>
                  <button className="red-button" onClick={getDenyModalChapFive}>
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {approveChapterFive && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setApproveChapterFive(!approveChapterFive)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda ingin menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={handleApproveChapFive}
                  >
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setApproveChapterFive(!approveChapterFive)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {denyChapterFive && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <CloseButton
                handleClick={() => setDenyChapterFive(denyChapterFive)}
              />
              <div className="p-4 flex flex-col gap-2">
                <p className="block text-lg mt-6 font-medium text-gray-900 ">
                  Apakah anda tidak menyetujui bab ini?
                </p>

                <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    className="purple-button"
                    onClick={handleDenyChapFive}
                  >
                    Iya
                  </button>
                  <button
                    className="red-button"
                    onClick={() => setDenyChapterFive(!denyChapterFive)}
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" inline-block overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] max-w-[350px] sm:max-w-full ">
        <table className=" text-left table-auto text-sm capitalize w-full  text-gray-900 ">
          <thead className="text-xs text-white  bg-patternTwo sticky top-0 z-auto">
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
                        className="px-4 py-2 font-medium   w-[15%]"
                      >
                        {data.name}
                      </td>
                      <td className=" px-2 py-2 w-[20%] text-center">
                        {data.title[0].titleText}
                      </td>
                      <td className=" text-center px-2 py-2 w-[5%]">
                        {data.generation}
                      </td>
                      {data.files.map((item: any, index: any) => (
                        <td
                          key={index}
                          className=" text-center px-1.5 py-2 w-[12%]"
                        >
                          {item.chapterOne.link ? (
                            <div>
                              <Link
                                target="_blank"
                                href={item.chapterOne.link}
                                className="hover:underline hover:text-black underline text-blue-400"
                              >
                                File
                              </Link>{" "}
                              |{" "}
                              <button
                                className="hover:underline hover:text-black underline text-blue-400"
                                onClick={() =>
                                  getValueApproveChapOne(
                                    data.uid,
                                    data.profOne,
                                    data.profTwo,
                                    item.chapterOne.isApprovedByProfOne,
                                    item.chapterOne.isApprovedByProfTwo,
                                    item.chapterOne.link,
                                    item.chapterTwo.isApprovedByProfOne,
                                    item.chapterTwo.isApprovedByProfTwo,
                                    item.chapterTwo.link,
                                    item.chapterThree.isApprovedByProfOne,
                                    item.chapterThree.isApprovedByProfTwo,
                                    item.chapterThree.link,
                                    item.chapterFour.isApprovedByProfOne,
                                    item.chapterFour.isApprovedByProfTwo,
                                    item.chapterFour.link,
                                    item.chapterFive.isApprovedByProfOne,
                                    item.chapterFive.isApprovedByProfTwo,
                                    item.chapterFive.link
                                  )
                                }
                              >
                                Persetujuan
                              </button>
                            </div>
                          ) : (
                            <p>-</p>
                          )}
                        </td>
                      ))}
                      {data.files.map((item: any, index: any) => (
                        <td
                          key={index}
                          className=" text-center px-1.5 py-2 w-[12%]"
                        >
                          {item.chapterTwo.link ? (
                            <div>
                              <Link
                                target="_blank"
                                href={item.chapterTwo.link}
                                className="hover:underline hover:text-black underline text-blue-400"
                              >
                                File
                              </Link>{" "}
                              |{" "}
                              <button
                                className="hover:underline hover:text-black underline text-blue-400"
                                onClick={() =>
                                  getValueApproveChapTwo(
                                    data.uid,
                                    data.profOne,
                                    data.profTwo,
                                    item.chapterOne.isApprovedByProfOne,
                                    item.chapterOne.isApprovedByProfTwo,
                                    item.chapterOne.link,
                                    item.chapterTwo.isApprovedByProfOne,
                                    item.chapterTwo.isApprovedByProfTwo,
                                    item.chapterTwo.link,
                                    item.chapterThree.isApprovedByProfOne,
                                    item.chapterThree.isApprovedByProfTwo,
                                    item.chapterThree.link,
                                    item.chapterFour.isApprovedByProfOne,
                                    item.chapterFour.isApprovedByProfTwo,
                                    item.chapterFour.link,
                                    item.chapterFive.isApprovedByProfOne,
                                    item.chapterFive.isApprovedByProfTwo,
                                    item.chapterFive.link
                                  )
                                }
                              >
                                Persetujuan
                              </button>
                            </div>
                          ) : (
                            <p>-</p>
                          )}
                        </td>
                      ))}
                      {data.files.map((item: any, index: any) => (
                        <td
                          key={index}
                          className=" text-center px-1.5 py-2 w-[12%]"
                        >
                          {item.chapterThree.link ? (
                            <div>
                              <Link
                                target="_blank"
                                href={item.chapterThree.link}
                                className="hover:underline hover:text-black underline text-blue-400"
                              >
                                File
                              </Link>{" "}
                              |{" "}
                              <button
                                className="hover:underline hover:text-black underline text-blue-400"
                                onClick={() =>
                                  getValueApproveChapThree(
                                    data.uid,
                                    data.profOne,
                                    data.profTwo,
                                    item.chapterOne.isApprovedByProfOne,
                                    item.chapterOne.isApprovedByProfTwo,
                                    item.chapterOne.link,
                                    item.chapterTwo.isApprovedByProfOne,
                                    item.chapterTwo.isApprovedByProfTwo,
                                    item.chapterTwo.link,
                                    item.chapterThree.isApprovedByProfOne,
                                    item.chapterThree.isApprovedByProfTwo,
                                    item.chapterThree.link,
                                    item.chapterFour.isApprovedByProfOne,
                                    item.chapterFour.isApprovedByProfTwo,
                                    item.chapterFour.link,
                                    item.chapterFive.isApprovedByProfOne,
                                    item.chapterFive.isApprovedByProfTwo,
                                    item.chapterFive.link
                                  )
                                }
                              >
                                Persetujuan
                              </button>
                            </div>
                          ) : (
                            <p>-</p>
                          )}
                        </td>
                      ))}
                      {data.files.map((item: any, index: any) => (
                        <td
                          key={index}
                          className=" text-center px-1.5 py-2 w-[12%]"
                        >
                          {item.chapterFour.link ? (
                            <div>
                              <Link
                                target="_blank"
                                href={item.chapterFour.link}
                                className="hover:underline hover:text-black underline text-blue-400"
                              >
                                File
                              </Link>{" "}
                              |{" "}
                              <button
                                className="hover:underline hover:text-black underline text-blue-400"
                                onClick={() =>
                                  getValueApproveChapFour(
                                    data.uid,
                                    data.profOne,
                                    data.profTwo,
                                    item.chapterOne.isApprovedByProfOne,
                                    item.chapterOne.isApprovedByProfTwo,
                                    item.chapterOne.link,
                                    item.chapterTwo.isApprovedByProfOne,
                                    item.chapterTwo.isApprovedByProfTwo,
                                    item.chapterTwo.link,
                                    item.chapterThree.isApprovedByProfOne,
                                    item.chapterThree.isApprovedByProfTwo,
                                    item.chapterThree.link,
                                    item.chapterFour.isApprovedByProfOne,
                                    item.chapterFour.isApprovedByProfTwo,
                                    item.chapterFour.link,
                                    item.chapterFive.isApprovedByProfOne,
                                    item.chapterFive.isApprovedByProfTwo,
                                    item.chapterFive.link
                                  )
                                }
                              >
                                Persetujuan
                              </button>
                            </div>
                          ) : (
                            <p>-</p>
                          )}
                        </td>
                      ))}
                      {data.files.map((item: any, index: any) => (
                        <td
                          key={index}
                          className=" text-center px-1.5 py-2 w-[12%]"
                        >
                          {item.chapterFive.link ? (
                            <div>
                              <Link
                                target="_blank"
                                href={item.chapterFive.link}
                                className="hover:underline hover:text-black underline text-blue-400"
                              >
                                File
                              </Link>{" "}
                              |{" "}
                              <button
                                className="hover:underline hover:text-black underline text-blue-400"
                                onClick={() =>
                                  getValueApproveChapFive(
                                    data.uid,
                                    data.profOne,
                                    data.profTwo,
                                    item.chapterOne.isApprovedByProfOne,
                                    item.chapterOne.isApprovedByProfTwo,
                                    item.chapterOne.link,
                                    item.chapterTwo.isApprovedByProfOne,
                                    item.chapterTwo.isApprovedByProfTwo,
                                    item.chapterTwo.link,
                                    item.chapterThree.isApprovedByProfOne,
                                    item.chapterThree.isApprovedByProfTwo,
                                    item.chapterThree.link,
                                    item.chapterFour.isApprovedByProfOne,
                                    item.chapterFour.isApprovedByProfTwo,
                                    item.chapterFour.link,
                                    item.chapterFive.isApprovedByProfOne,
                                    item.chapterFive.isApprovedByProfTwo,
                                    item.chapterFive.link
                                  )
                                }
                              >
                                Persetujuan
                              </button>
                            </div>
                          ) : (
                            <p>-</p>
                          )}
                        </td>
                      ))}
                      <td className=" text-center py-1  w-[10%]">
                        {data.seminarDate[0].dateToBe && data.fileSeminar ? (
                          <div className="flex flex-col gap-1">
                            {moment(data.seminarDate[0].dateToBe).format(
                              "DD MMM YYYY"
                            )}
                            <Link
                              target="_blank"
                              href={data.fileSeminar}
                              className="hover:underline hover:text-black underline text-blue-400"
                            >
                              File
                            </Link>
                          </div>
                        ) : (
                          <p>-</p>
                        )}
                      </td>
                      <td className=" text-center w-[10%]">
                        {data.sidangDate[0].dateToBe && data.fileSidang ? (
                          <div className="flex flex-col gap-1">
                            {moment(data.sidangDate[0].dateToBe).format(
                              "DD MMM YYYY"
                            )}
                            <Link
                              target="_blank"
                              href={data.fileSidang}
                              className="hover:underline hover:text-black underline text-blue-400"
                            >
                              File
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
