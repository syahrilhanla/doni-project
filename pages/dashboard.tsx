import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import {BsFillPersonFill} from "react-icons/bs";

const Dashboard = () => {
	const [judul, setJudul] = useState(false);
	return (
		<Layout>
			<div className="h-screen">
				<div className="flex space-between mt-5 mb-2 mx-4">
					<div className="grid justify-items-start mr-2 px-4 w-1/3 h-24 bg-[#f1e8f252]  text-[#683ab7d5] rounded-lg shadow-md">
						<div className=" text-lg text-center">Selamat Datang</div>
						<div className="font-serif font-black">Muhammad Ridhoni</div>
						<div className="font-serif font-black">1910131310039</div>
					</div>
					<div className="flex justify-center items-center w-2/3 h-24 bg-[#f2e8f24f] text-[#683ab7d5] rounded-lg shadow-md">
						{judul ? (
							<>
								<div className="flex justify-items-center font-semibold italic">
									<p>
										Judul Skripsi Pengembangan Media Pembelajaran Berbasis Web
										dengan Pendekatan Blablablabla
									</p>
								</div>
							</>
						) : (
							<>
								<div className="flex space-between">
									<div className="font-semibold text-red-500 mr-5 flex items-center">
										Judul Skripsi Belum Ada
									</div>
									<div>
										<button
											data-modal-target="popup1-modal"
											data-modal-toggle="popup1-modal"
											className="text-white flex items-center bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
											type="button"
										>
											Ajukan
										</button>

									</div>
								</div>
							</>
						)}
					</div>
				</div>
        <div className="flex justify-center mt-5 mx-4">
          <div className="grid justify-center mr-2 py-4 px-4 w-1/3 h-80 bg-[#8d91d3] text-white rounded-2xl shadow-xl">
            <div className="text-center font-extrabold">Dosen Pembimbing 1</div>
            <div className=""><BsFillPersonFill className="flex justify-center items-center text-9xl" /></div>
            <div className="text-center font-bold">{"Dr. Wicaksono Tirtanto, M. Pd."}</div>
          </div>
          <div className="grid justify-center py-4 px-4 w-1/3 h-80 bg-[#8d91d3] text-white rounded-2xl shadow-xl">
          <div className="text-center font-extrabold">Dosen Pembimbing 2</div>
            <div className=""><BsFillPersonFill className="flex justify-center items-center text-9xl" /></div>
            <div className="text-center font-bold">{"Suparni Maul, M. T."}</div>
          </div>
        </div>
        <div className="flex justify-center mt-6 mx-3">
        <div className="grid justify-center mr-2 py-5 px-4 w-1/3 h-40 bg-[#40916c] text-[#fffcfc] rounded-2xl shadow-xl">
            <p className=" text-xl font-mono">Tanggal Seminar Proposal</p>
            <p className="text-3xl font-light">20 Januari 2023</p>
          </div>
        <div className="grid justify-center mr-2 py-5 px-4 w-1/3 h-40 bg-[#e5383b] text-[#fffcfc] rounded-2xl shadow-xl">
            <p className=" text-xl font-mono">Tanggal Seminar Hasil</p>
            <p className=" italic font-light">Anda belum mengajukan seminar hasil, lengkapi file upload di halaman berkas terlebih dahulu.</p>
          </div>
        <div className="grid justify-center mr-2 py-5 px-4 w-1/3 h-40 bg-[#e5383b] text-[#fffcfc] rounded-2xl shadow-xl">
            <p className=" text-xl font-mono">Tanggal Sidang Akhir</p>
            <p className=" italic font-light">Anda belum mengajukan sidang akhir, lakukan seminar hasil terlebih dahulu.</p>
          </div>
        
        </div>
			</div>
		</Layout>
	);
};

export default Dashboard;
