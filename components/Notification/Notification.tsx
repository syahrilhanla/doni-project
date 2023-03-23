import { useRef, useState } from "react";

import { TfiBell } from "react-icons/tfi";
import { NotificationData } from "./NotificationList";
import NotificationList from "./NotificationList";

import useOnClickOutside from "./hooks/useOnClickOutside";

interface Props {
  notificationData: NotificationData[]
}

const Notification = ({ notificationData }: Props) => {
  const [openNotification, setOpenNotification] = useState(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpenNotification(false));

  return (
    <div ref={ref}>
      <button
        onClick={() => setOpenNotification(!openNotification)}
        className="relative cursor-pointer hover:bg-white hover:font-extrabold
          hover:text-patternTwo p-2 rounded-full duration-200"
      >
        <TfiBell className="text-2xl" />
        <span className="absolute top-1 right-2 p-1.5 rounded-full bg-red-500" />
      </button>

      {openNotification && (
        <>
          <NotificationList notificationData={notificationData} />
        </>
      )}
    </div>
  )
}

export default Notification