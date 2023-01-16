interface NotificationData {
  notificationData: {
    id: number,
    title: string,
    text: string,
    isRead: boolean
  }[]
}

const NotificationList = ({ notificationData }: NotificationData) => {
  return (
    <div
      className="absolute border-1 border-white
       overflow-auto rounded-b-lg bg-patternTwo 
       p-2 top-20 w-64 right-0 z-50"
    >
      {notificationData.map((data: any) => (
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
    </div>)
}

export default NotificationList