import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
    },
    {
      href: "/berkas",
      title: "Berkas",
    },
    {
      href: "/seminar",
      title: "Seminar Hasil",
    },
    {
      href: "/sidang",
      title: "Sidang Akhir",
    },
  ];

  return (
    <div className="flex flex-1 z-50 absolute top-0 min-h-screen">
      {/* sidebar  */}
      <div className="bg-[#F0EBF8] p-2 min-w-[300px]">
        <ul className="space-y-2 mt-5">
          <li>
            <div className="flex flex-col gap-4 h-50 ml-2 mr-2 rounded-xl
              shadow-sm bg-[#faf8fd] py-12 mb-5 text-[#9F86C0]"
            >
              <div className="flex justify-center items-center">
                <div className="h-32 w-32 rounded-full relative
                  overflow-hidden mr-2">
                  <Image
                    alt="student picture"
                    src={"/reminz.jfif"}
                    fill
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center
                  font-normal text-lg">
                <p>
                  Muhammad Ridhoni
                </p>
                <p className="text-base font-normal">
                  1910131310029
                </p>
              </div>
            </div>
          </li>
        </ul>
        <ul className="flex flex-col gap-0 px-1.5">
          {menuItems.map(({ href, title }) => (
            <li key={title}>
              <Link href={href}>
                <div
                  className={`
                    flex justify-center bg-violet-10 items-center text-[#683ab7d5] 
                    px-2 py-4 text-base font-normal hover:text-[#683ab7d5] rounded-lg
                    hover:bg-[#683ab715] 
                    ${router.asPath === href && "bg-[#683ab715] text-white"}`}
                >
                  <span className="">{title}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* sidebar  */}
      {/* <div className="p-5 w-4/5">{children}</div> */}
    </div>)
}

export default Sidebar