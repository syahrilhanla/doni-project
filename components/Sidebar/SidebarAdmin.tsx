import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RiCheckFill } from "react-icons/ri";
import { GiProgression, GiFinishLine } from "react-icons/gi";
import { HiOutlinePresentationChartBar } from "react-icons/hi";

export default function SidebarAdmin() {
  const router = useRouter();

  const menuItems = [
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
  return (
    <div className="flex flex-1 z-50 min-h-full">
      {/* sidebar  */}
      <div className="bg-[#F0EBF8] min-w-[300px] flex flex-col justify-center p-2 ">
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
