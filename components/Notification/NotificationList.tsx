export interface NotificationData {
  id: number,
  title: string,
  text: string,
  isRead: boolean
}

interface Props {
  notificationData: NotificationData[]
}

const NotificationList = ({ notificationData }: Props) => {
  return (
    <div
      className="absolute w-64 max-h-[268px]
        gap-4 overflow-auto rounded-xl bg-[#F0EBF8] 
        top-[68px] right-20 z-50"
    >
      {notificationData.map((data: NotificationData) => (
        <div
          key={data.id}
          className="flex flex-col text-[#683ab7d5] text-justify border-b
            w-full gap-1.5 py-1.5 cursor-pointer hover:bg-[#683ab715]"
        >
          <div className="w-full px-3 py-1">
            <span className="flex items-center gap-1">
              {data.isRead && (
                <span className="p-1 h-1 w-1 rounded-full bg-red-600" />
              )}
              <p>{data.title}</p>
            </span>
            <p>{data.text}</p>
          </div>
        </div>
      ))}
    </div>)
}

export default NotificationList