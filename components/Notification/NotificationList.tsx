import { Dispatch, SetStateAction } from "react";

export interface NotificationData {
  id: string,
  title: string,
  text: string,
  isRead: boolean
}

interface Props {
  setOpenNotification: Dispatch<SetStateAction<boolean>>;
  notificationData: NotificationData[];
}
const NotificationList = ({ notificationData, setOpenNotification }: Props) => {
  const reversedData = [...notificationData].reverse();

  const handleClickNotification = (notificationId: string) => {
    setOpenNotification(false);
  }

  return (
    <div
      className="absolute w-min-[90px] max-h-[268px]
        gap-4 overflow-auto rounded-xl bg-[#F0EBF8] 
        top-[68px] right-0 duration-500"
    >
      {
        reversedData.map((data: NotificationData) => (
          <button
            onClick={() => handleClickNotification(data.id)}
            key={data.id}
            className="flex flex-col text-[#683ab7d5] text-justify border-b
            w-full gap-1.5 py-1.5 cursor-pointer hover:bg-[#683ab715]"
          >
            <div className="w-full px-3 py-1">
              <span className="flex items-center gap-1">
                {data.isRead === false && (
                  <span className="p-1 h-1 w-1 rounded-full bg-red-600" />
                )}
                <p className="font-bold">{data.title}</p>
              </span>
              <p>{data.text}</p>
            </div>
          </button>
        ))
      }
    </div>)
}
