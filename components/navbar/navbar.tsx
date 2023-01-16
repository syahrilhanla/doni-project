import Link from "next/link";
import React, { useState } from "react";

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
    <div className="flex flex-col">
      <div className="flex justify-end items-center text-white p-8 gap-10 bg-patternTwo h-20 overflow-hidden">
        <div
          onClick={() => setOpen(!open)}
          className="relative cursor-pointer hover:bg-white hover:text-patternTwo p-2 rounded-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"></path>
          </svg>

          {notificationData.map((datas) =>
            datas.isRead ? (
              <p className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600"></p>
            ) : (
              ""
            )
          )}
        </div>
        <Link href="/dashboard">
          <div className=" cursor-pointer hover:bg-white hover:text-patternTwo p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"></path>
              <path d="M11 2h2v10h-2z"></path>
            </svg>
          </div>
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
