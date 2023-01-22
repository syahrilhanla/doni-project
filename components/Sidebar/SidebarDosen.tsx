import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function SidebarDosen() {
  const router = useRouter();

  const menuItems = [
    {
      href: "/approval",
      title: "Approval",
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
      <div className="bg-[#F0EBF8] min-w-[300px] flex flex-col justify-center items-center">
        <ul className="flex flex-col gap-2 w-full">
          {menuItems.map(({ href, title }) => (
            <li key={title}>
              <Link href={href}>
                <div
                  className={`
                    flex justify-center bg-violet-10 items-center text-[#683ab7d5] 
                    px-2 py-4 text-base font-normal hover:text-[#683ab7d5] rounded-l-lg duration-500
                    hover:bg-white 
                    ${router.asPath === href && "bg-white text-[#683ab7d5]"}`}
                >
                  <span className="">{title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
