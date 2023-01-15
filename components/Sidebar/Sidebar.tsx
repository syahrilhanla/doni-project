import Link from "next/link";
import React from "react";

const Sidebar = () => {
	return (
		<div className="bg-gradient-to-r from-violet-500 via-[#9F86C0] to-[#BE95C4] w-2/5">
			<ul className="space-y-2 mt-5">
				<li>
          <div className=" h-50 ml-2 mr-2  rounded-2xl bg-stone-100 py-4 mb-5">
					<div className="flex justify-center items-center">
						<img
							className="hidden h-24 w-24 rounded-full sm:block object-cover mr-2 border-4 border-[#9F86C0]"
							alt="Profile"
						/>

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
				<li>
					<Link href="/">
						<div className="flex justify-center bg-violet-10 items-center text-white p-2 text-base font-normal hover:text-[#9F86C0] rounded-lg  hover:bg-gray-100 ">
							
              <span className="">Dashboard</span>
						</div>
					</Link>
					<Link href="/berkas">
						<div className="flex justify-center bg-violet-10 items-center text-white p-2 text-base font-normal hover:text-[#9F86C0] rounded-lg  hover:bg-gray-100 ">
							<span className="">berkas</span>
						</div>
					</Link>
					<Link href="/seminar">
						<div className="flex justify-center bg-violet-10 items-center text-white p-2 text-base font-normal hover:text-[#9F86C0] rounded-lg  hover:bg-gray-100 ">
							<span className="">seminar</span>
						</div>
					</Link>
					<Link href="/sidang">
						<div className="flex justify-center bg-violet-10 items-center text-white p-2 text-base font-normal hover:text-[#9F86C0] rounded-lg  hover:bg-gray-100 ">
							<span className="">sidang</span>
						</div>
					</Link>
				</li>
        <li>
        <Link href="/#">
						<div className="flex justify-center bg-violet-10 items-center text-white p-2 text-base font-normal hover:text-[#9F86C0] rounded-lg  hover:bg-gray-100 mt-10">
							<div className="w-5 h-5"><svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path>
</svg></div>
              <span className="">Keluar</span>
						</div>
					</Link>
        </li>
			</ul>
		</div>
	);
};

export default Sidebar;
