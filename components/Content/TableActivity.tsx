import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { RiSortDesc } from 'react-icons/ri'
import { useAuth } from '../Context/AuthContext';
import { db } from '../Store/firebase';
interface dataTable {
  id: number;
  date: string;
  name: string;
  activity: string;
  feedbackNote: string;
}
const content: dataTable[] = [
  {
    id: 1,
    date: "27-02-2023",
    name: "Dosen 1",
    activity: "Menerima Judul Skripsi",
    feedbackNote: "Perbaiki kata-kata yang salah"
  },
  {
    id: 2,
    date: "27-02-2023",
    name: "Dosen 1",
    activity: "Menerima Seminar Hasil",
    feedbackNote: "Perbaiki kata-kata yang salah"
  },
  {
    id: 3,
    date: "27-02-2023",
    name: "Dosen 1",
    activity: "Menerima Sidang Akhir",
    feedbackNote: "Perbaiki kata-kata yang salah"
  },
  {
    id: 4,
    date: "27-02-2023",
    name: "Dosen 1",
    activity: "Menerima Sidang Akhir",
    feedbackNote: "Perbaiki kata-kata yang salah"
  },
  {
    id: 5,
    date: "27-02-2023",
    name: "Dosen 1",
    activity: "Menerima Sidang Akhir",
    feedbackNote: "Perbaiki kata-kata yang salah"
  }

];

const TableActivity = () => {
  const { user } = useAuth();
  const [activity, setActivity] = useState<any>([])
  const getActivity = useCallback(async () => {
    try {
      const docRef = doc(db, "studentsList", user.uid)
      const titleArray1 = (await getDoc(docRef)).data()?.title[0].feedbackNoteByProfOne;
      const titleArray2 = (await getDoc(docRef)).data()?.title[0].feedbackNoteByProfTwo;
      const seminarDateArray1 = (await getDoc(docRef)).data()?.seminarDate[0].feedbackNoteByProfOne;
      const seminarDateArray2 = (await getDoc(docRef)).data()?.seminarDate[0].feedbackNoteByProfTwo;
      const sidangDateArray1 = (await getDoc(docRef)).data()?.sidangDate[0].feedbackNoteByProfOne;
      const sidangDateArray2 = (await getDoc(docRef)).data()?.sidangDate[0].feedbackNoteByProfTwo;
      const ActivityArray = [titleArray1, titleArray2, seminarDateArray1, seminarDateArray2, sidangDateArray1, sidangDateArray2]
      setActivity(ActivityArray)

    } catch (e) {
      console.log(e);

    }
  }, [user])

  useEffect(() => {
    getActivity()
  }, [])
  return (
    <div className=" inline-block overflow-x-auto overflow-y-scroll shadow-md sm:rounded-lg max-h-[150px] w-full">
      <table className="text-sm text-left text-gray-900 capitalize w-full ">
        <thead className="text-xs text-white  bg-[#a589c7f8] sticky top-0 z-auto ">
          <tr>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center gap-2">
                Tanggal
                <a href="#">
                  <RiSortDesc />
                </a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center justify-center  gap-2">
                Nama Dosen
                <a href="#">
                  <RiSortDesc />
                </a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center gap-2">
                Jenis Aktifitas
                <a href="#">
                  <RiSortDesc />
                </a>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center ">Feedback Note</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {activity.map((data: any, index: number) => (
            <tr
              key={index}
              className="even:bg-[#f0ebf8d7] odd:bg-white border-b "
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
              >
                {data.feedbackDate}
              </th>
              <td className="px-6 py-2 text-center">{data.feedbackProfName}</td>
              <td className="py-1">
                {data.feedbackActivity}
              </td>
              <td className="px-6 py-2">
                {data.feedbackText}
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  )
}

export default TableActivity