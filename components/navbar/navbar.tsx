import React, { useState } from "react";
import Link from "next/link";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { TfiBell } from "react-icons/tfi";


export default function Navbar() {
  const [open, setOpen] = useState(false);

  const notificationData = [
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
      id: 3,
      title: "title 3",
      text: "text 3",
      isRead: false,
    },
  ];

  return (
    <div className="flex flex-col top-12">
      <div className="flex justify-end items-center text-white p-8 shadow-md 
        gap-6 bg-patternTwo h-16 overflow-hidden">
        <div
          onClick={() => setOpen(!open)}
          className="relative cursor-pointer hover:bg-white hover:text-patternTwo p-2 rounded-md"
        >
          <TfiBell className="text-2xl" />

          {notificationData.map((datas) =>
            datas.isRead ? (
              <p className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600"></p>
            ) : (
              ""
            )
          )}
        </div>
        <Link href="/dashboard">
          <button className="rounded-full p-2.5 hover:bg-purple-200">
            <RiLogoutBoxRLine className="text-2xl" />
          </button>
        </Link>
      </div>
      <div
        className={
          open
            ? " absolute h-52 border-1 border-white overflow-auto rounded-b-lg bg-patternTwo p-2 top-20 w-64 right-0 z-50"
            : "hidden"
        }
      >
        {notificationData.map((data) => (
          <div
            key={data.id}
            className="flex flex-col  gap-4 text-white text-justify mt-2"
          >
            <span className="flex items-center gap-2">
              {data.isRead && (
                <span className="p-1.5 h-1.5 w-1.5 rounded-full bg-red-600" />
              )}
              <p>Judul: {data.title}</p>
            </span>
            <p>Teks: {data.text}</p>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
