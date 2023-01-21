import React, { useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
const FileSidang = () => {
	const [jadwal, setJadwal] = useState(false);
	return (
		<div className="h-screen px-4 w-5/6  overflow-auto py-4">
			<div className="py-4">
				<div className="flex justify-center">
					{jadwal ? (
						<div className="flex bg-[#f1e8f252] border-4 border-[#caf3e0] text-[#707070] flex-col justify-center my-3 items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-1/3 h-24 rounded-lg shadow-md">
							<div className=" flex justify-between items-center"> <p className="items-center mr-3"> Tanggal Sidang Akhir </p> <AiFillCheckCircle className="fill-[#72ea8c] items-center"  /></div>
							<div className=" text-2xl text-center"> 27 Januari 2023</div>
						</div>
					) : (
						<div className="flex flex-col bg-[#f1e8f252] border-4 border-[#ebb4b4] text-[#707070] justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-1/3 h-24  rounded-lg shadow-md">
														<div className=" flex justify-between items-center"> <p className="items-center mr-3"> Tanggal Sidang Akhir </p> <AiFillCloseCircle className="fill-[#d25858] items-center"  /></div>
							<div className=" text-2xl text-center italic"> Belum Ada</div>
						</div>
					)}
				</div>
				<div className="flex mb-6 xxs:max-sm:flex-col md:max-lg:flex-col sm:max-md:flex-col mt-5 mx-4">
					<div className="grid justify-center  xxs:max-sm:w-full md:max-lg:w-full sm:max-md:w-full mr-2 py-6 px-4 w-2/3 h-50 bg-[#f1e8f252] text-[#707070] rounded-2xl shadow-md">
						<div className="flex justify-center items-center">
							<BsFillPersonFill className="text-3xl" />
							<div className="text-xl">Dosen Penguji 1</div>
						</div>
						<div className="text-center font-bold text-2xl">
							{"Dr. Wicaksono Tirtanto, M. Pd."}
						</div>
					</div>
					<div className="grid justify-center  xxs:max-sm:w-full xxs:max-sm:my-2 md:max-lg:w-full md:max-lg:mt-3 sm:max-md:w-full  py-6 px-4 w-2/3 h-50 bg-[#f1e8f252] text-[#707070] rounded-2xl shadow-md">
						<div className="flex justify-center items-center">
							<div>
								<BsFillPersonFill className="text-3xl" />
							</div>
							<div className="text-xl">Dosen Penguji 2</div>
						</div>
						<div className="text-center font-bold text-2xl">
							{"Suparni Maul, M. T."}
						</div>
					</div>
				</div>
				<div className="flex flex-col mt-10  justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					<label className="block mb-2 text-2xl font-medium text-gray-900 ">
						Upload File Sidang Kamu
					</label>

					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
						aria-describedby="file_input_help"
						id="file_input"
						accept="application/pdf"
						type="file"
					/>
				</div>
			</div>
		</div>
	);
};

export default FileSidang;
