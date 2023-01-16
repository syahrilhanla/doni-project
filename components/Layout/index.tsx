import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../navbar/navbar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const menuItems = [
  {
    href: "/approv",
    title: "Approv",
  },
  {
    href: "/berkas",
    title: "Berkas",
  },
  {
    href: "/seminar",
    title: "Seminar",
  },
  {
    href: "/sidang",
    title: "Sidang",
  },
];

export default function Layout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  return (
    <div className="text-center flex flex-col min-h-screen color-red-50">
      <Navbar></Navbar>
      <div className="flex flex-1">
        {/* sidebar  */}
        <div className="bg-[#F0EBF8] p-2 w-[20vw]">
          <ul className="space-y-2 mt-5">
            <li>
              <div className=" h-50 ml-2 mr-2  rounded-2xl bg-[#faf8fd]  shadow-lg py-4 mb-5">
                <div className="flex justify-center items-center">
                  <div className="hidden h-24 w-24 rounded-full sm:block object-cover mr-2 border-4 border-[#9F86C0]" />
                </div>
                <div className="flex justify-center items-center">
                  <p className="font-bold text-base text-[#9F86C0] mt-5 ">
                    Mahasiswa
                  </p>
                </div>
                <div className="flex justify-center items-center mb-10">
                  <p className="font-bold text-base text-[#9F86C0] ">
                    NIM 1910131310029
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            {menuItems.map(({ href, title }) => (
              <li key={title}>
                <Link href={href}>
                  <div
                    className={`flex justify-center bg-violet-10 items-center text-[#683ab7d5] p-2 text-base font-normal hover:text-[#683ab7d5] rounded-lg  hover:bg-[#683ab722] ${
                      router.asPath === href && "bg-[#683ab753] text-white"
                      //   router.asPath === href && 'bg-fuchsia-600 text-white'
                    }`}
                  >
                    <span className="">{title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            <li>
              <Link href="/#">
                <div className="flex justify-center bg-violet-10 items-center text-white p-2 text-base font-normal hover:text-[#9F86C0] rounded-lg  hover:bg-gray-100 mt-10">
                  <div className="w-5 h-5">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-[#683ab7d5]">Keluar</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        {/* sidebar  */}
        <div className="p-5 w-4/5">{children}</div>
      </div>
    </div>
  );
}
