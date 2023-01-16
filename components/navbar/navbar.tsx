import React, { useState } from "react";
import Link from "next/link";

import { RiLogoutBoxRLine } from "react-icons/ri";
import { TfiBell } from "react-icons/tfi";
import NotificationList, { NotificationData } from "../Notification/NotificationList";

export default function Navbar() {
  const [openNotification, setOpenNotification] = useState(false);

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

  return (
    <div className="flex flex-col top-12">
      <div className="flex justify-end items-center text-white p-8 shadow-md 
        gap-6 bg-patternTwo h-16 overflow-hidden">
        <button
          onClick={() => setOpenNotification(!openNotification)}
          className="relative cursor-pointer hover:bg-white hover:font-extrabold
          hover:text-patternTwo p-2 rounded-full duration-200"
        >
          <TfiBell className="text-2xl" />
          {notificationData.map((data) =>
            data.isRead && (
              <span className="absolute top-1 right-2 p-1.5 rounded-full bg-red-500" />
            )
          )}
        </button>
        <Link href="/dashboard">
          <button
            className="cursor-pointer hover:bg-white hover:font-extrabold
          hover:text-patternTwo p-2 rounded-full duration-200"
          >
            <RiLogoutBoxRLine className="text-2xl" />
          </button>
        </Link>
      </div>

      {openNotification && (
        <NotificationList notificationData={notificationData} />
      )}
    </div>
  );
}
