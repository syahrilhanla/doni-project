import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { RiSortDesc } from 'react-icons/ri'
// import { useAuth } from '../Context/AuthContext';
import { db } from '../Store/firebase';
import { StudentsData } from '../../typings';
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

interface ActivityTable {
  user: StudentsData,
}
const TableActivity = ({ user }: ActivityTable) => {

  const [activity, setActivity] = useState<dataTable[]>([])
  const getActivity = useCallback(async () => {
    try {

      const titleArray1 = user.title[0].feedbackNoteByProfOne.map((item) => item);
      const titleArray2 = user.title[0].feedbackNoteByProfTwo.map((item) => item);
      const activityArray = [ ...titleArray1, ...titleArray2 ]
      const arrayFix = activityArray.map((item, index) => {
        return {
          id: index,
          date: item.feedbackDate,
          name: item.feedbackProfName,
          activity: item.feedbackActivity,
          feedbackNote: item.feedbackText
        }
      })
      console.log(arrayFix);
      
      setActivity(arrayFix)
      // const ActivityArray = { titleArray1, titleArray2, seminarDateArray1, seminarDateArray2, sidangDateArray1, sidangDateArray2 }
      // console.log(activity);
      // console.log(user);

    } catch (e) {
      console.log(e);

    }
  }, [user])


  useEffect(() => {
    console.log(user);
    getActivity()
  }, [user])
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
          {activity.map((data , index: number) => (
            <tr
              key={index}
              className="even:bg-[#f0ebf8d7] odd:bg-white border-b "
            >
              <th
                scope="row"
                className="px-6 py-2 font-medium   whitespace-nowrap max-w-[20%] "
              >
                {data.date}
              </th>
              <td className="px-6 py-2 text-center">{data.name}</td>
              <td className="py-1">
                {data.activity}
              </td>
              <td className="px-6 py-2">
                {data.feedbackNote}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableActivity