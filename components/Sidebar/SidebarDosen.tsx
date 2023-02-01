import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RiCheckFill } from "react-icons/ri";
import { GiProgression, GiFinishLine } from "react-icons/gi";
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { useAuth } from "../Context/AuthContext";

export default function SidebarDosen() {
  const router = useRouter();
const { user } = useAuth();
  const menuItems = [
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
  return (
    <div className="flex flex-1 z-50 min-h-full">
      {/* sidebar  */}
      <div className="bg-[#F0EBF8] min-w-[300px] flex flex-col justify-center p-2 ">
        <ul className="space-y-2 mt-5">
          <li>
            <div className="flex flex-col gap-4 h-50 ml-2 mr-2 rounded-xl
              shadow-sm bg-[#faf8fd] py-12 mb-5 text-[#9F86C0]"
            >
              <div className="flex justify-center items-center">
                <div className="h-32 w-32 rounded-full relative
                  overflow-hidden mr-2">
                  <Image
                    alt="student picture"
                    src={"/reminz.jfif"}
                    fill
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center
                  font-normal text-lg">
                <p>
                  {user.name}
                </p>
                <p className="text-base font-normal">
                  {user.username}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <ul className="flex flex-col gap-2 px-1.5">
          {menuItems.map(({ href, title }) => (
            <li key={title}>
              <Link href={href}>
                <div
                  className={`
                  flex justify-center bg-violet-10 items-center text-[#683ab7d5] 
                  px-2 py-4 text-base font-normal hover:text-[#683ab7d5] rounded-lg
                  hover:bg-[#683ab715]
                    ${router.asPath === href && "bg-[#683ab715]"}`}
                >
                  <span>{title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
