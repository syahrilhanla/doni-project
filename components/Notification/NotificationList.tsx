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
      className="absolute w-64 max-h-[268px] py-2 px-5
       gap-4 overflow-auto rounded-2xl bg-[#F0EBF8] 
        top-[68px] right-20 z-50"
    >
      {notificationData.map((data: any) => (
        <div
          key={data.id}
          className="flex flex-col text-[#683ab7d5] text-justify
            w-full gap-1.5 py-1.5"
        >
          <span className="flex items-center gap-1">
            {data.isRead && (
              <span className="p-1 h-1 w-1 rounded-full bg-red-600" />
            )}
            <p>{data.title}</p>
          </span>
          <p>{data.text}</p>
          <hr />
        </div>
      ))}
    </div>)
}

export default NotificationList