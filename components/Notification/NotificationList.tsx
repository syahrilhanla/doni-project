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
      className="absolute border-1 border-white
       overflow-auto rounded-lg  bg-[#F0EBF8] 
       p-2 top-16 w-64 right-0 z-50"
    >
      {notificationData.map((data: any) => (
        <div
          key={data.id}
          className="flex flex-col  gap-4 text-[#683ab7d5]  text-justify mt-2"
        >
          <span className="flex items-center gap-1">
            {data.isRead && (
              <span className="p-1 h-1 w-1 rounded-full bg-red-600" />
            )}
            <p>Judul: {data.title}</p>
          </span>
          <p>Teks: {data.text}</p>
          <hr />
        </div>
      ))}
    </div>)
}

export default NotificationList