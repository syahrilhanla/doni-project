import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { BsPersonCircle } from "react-icons/bs";

interface Props {
  user: any;
  setNavbar: Dispatch<SetStateAction<boolean>>;
  navbar: boolean;
}

const MobileSidebar = ({ navbar, setNavbar, user }: Props) => {
  const router = useRouter();

  const setMobileNavbar = () => {
    if (!navbar) {
      return "lg:hidden fixed top-0 left-0 bg-patternTwo flex flex-col justify-center items-center h-screen w-screen ml-[-110%] duration-500";
    } else
      return "lg:hidden fixed top-0 left-0 bg-patternTwo flex flex-col justify-center items-center h-screen  w-screen duration-500 z-10";
  };

  return (
    <>
      <div className={"flex flex-col justify-center p-2 " + setMobileNavbar()}>
        <ul className="space-y-2 mt-5">
          <li>
            <div
              className="flex flex-col gap-4 h-50 ml-2 mr-2 rounded-xl
              shadow-sm bg-[#faf8fd] p-6 mb-5 text-[#9F86C0]"
            >
              <div className="flex justify-center items-center">
                <div className="h-32 w-32 rounded-full flex items-center justify-center  overflow-hidden">
                  {/* <Image
                    alt="student picture"
                    src={"/reminz.jfif"}
                    fill
                    className="rounded-full"
                  /> */}
                  <BsPersonCircle className="h-32 w-32" />
                </div>
              </div>
              <div
                className="flex flex-col gap-2 justify-center items-center
                  font-normal text-lg"
              >
                <p>{user.name}</p>
                <p className="text-base font-normal">{user.username}</p>
              </div>
            </div>
          </li>
        </ul>
        {user.role === "mhs" ? (
          <ul className="flex flex-col gap-2 px-1.5 z-auto">
            {menuItemsMhs.map(({ href, title }) => (
              <li
                key={title}
                onClick={() => setNavbar((prevValue) => !prevValue)}
              >
                <Link href={href}>
                  <div
                    className={`
                flex justify-center  items-center text-white 
                px-2 py-4  font-normal  rounded-lg text-3xl
                hover:bg-[#683ab715]
                  ${router.asPath === href && "bg-[#683ab715]"}`}
                  >
                    <span>{title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : user.role === "dosen" ? (
          <ul className="flex flex-col gap-2 px-1.5 z-auto">
            {menuItemsDosen.map(({ href, title }) => (
              <li
                key={title}
                onClick={() => setNavbar((prevValue) => !prevValue)}
              >
                <Link href={href}>
                  <div
                    className={`
                flex justify-center  items-center text-white 
                px-2 py-4  font-normal  rounded-lg text-3xl
                hover:bg-[#683ab715]
                  ${router.asPath === href && "bg-[#683ab715]"}`}
                  >
                    <span>{title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col gap-2 px-1.5 z-auto">
            {menuItemsAdmin.map(({ href, title }) => (
              <li
                key={title}
                onClick={() => setNavbar((prevValue) => !prevValue)}
              >
                <Link href={href}>
                  <div
                    className={`
                flex justify-center  items-center text-white 
                px-2 py-4  font-normal  rounded-lg text-3xl
                hover:bg-[#683ab715]
                  ${router.asPath === href && "bg-[#683ab715]"}`}
                  >
                    <span>{title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default MobileSidebar;

const menuItemsMhs = [
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

const menuItemsDosen = [
  {
    href: "/approval",
    title: "Persetujuan Judul",
  },
  {
    href: "/progresMahasiswa",
    title: "Progres Mahasiswa",
  },
  {
    href: "/seminarMahasiswa",
    title: "Seminar Hasil Mahasiswa",
  },
  {
    href: "/sidangMahasiswa",
    title: "Sidang Akhir Mahasiswa",
  },
];

const menuItemsAdmin = [
  {
    href: "/request",
    title: "Permintaan Pendaftaran Mahasiswa",
  },
  {
    href: "/daftarMahasiswa",
    title: "Daftar Mahasiswa Skripsi",
  },
  {
    href: "/daftarDosen",
    title: "Daftar Dosen Pembimbing",
  },
];