import React, { useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
// import { VscCloudUpload } from "react-icons/vsc"
import { BsFillPersonFill } from "react-icons/bs";
import { useAuth } from "../Context/AuthContext";
const FileSeminar = () => {
	const [jadwal, setJadwal] = useState(false);
	const { user } = useAuth();
	// const [dragActive, setDragActive] = useState(false)
	// const inputRef = React.useRef<HTMLInputElement>(null);

	// function handleFiles(files: any) {
	// 	alert("Number of files: " + files.length);
	// }

	// const handleDrag = function (e: any) {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	if (e.type === "dragenter" || e.type === "dragover") {
	// 		setDragActive(true);
	// 	} else if (e.type === "dragleave") {
	// 		setDragActive(false);
	// 	}
	// };
	// const handleDrop = function (e: any) {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	setDragActive(false);
	// 	if (e.dataTransfer.files && e.dataTransfer.files[0]) {
	// 		handleFiles(e.dataTransfer.files);
	// 	}
	// };
	// const handleChange = function (e: any) {
	// 	e.preventDefault();
	// 	if (e.target.files && e.target.files[0]) {
	// 		handleFiles(e.target.files);
	// 	}
	// };
	// const onButtonClick = () => {
	// 	inputRef.current?.click()
	// };
	return (

		<div className="h-screen px-4 w-5/6 overflow-auto py-4 mt-4">
			<div className="flex justify-center">
				{jadwal ? (
					<div className="flex bg-[#f1e8f252] border-4 border-[#caf3e0] text-[#707070] flex-col justify-center my-3 items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-1/3 h-24  rounded-lg shadow-md">
						<div className=" flex justify-between items-center"> <p className="items-center mr-3"> Tanggal Seminar Hasil </p> <AiFillCheckCircle className="fill-[#72ea8c] items-center" /></div>
						<div className=" text-2xl text-center"> 27 Januari 2023</div>
					</div>
				) : (
					<div className="flex flex-col bg-[#f1e8f252] border-4 border-[#ebb4b4] text-[#707070] justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-1/3 h-24  rounded-lg shadow-md">
						<div className=" flex justify-between items-center"> <p className="items-center mr-3"> Tanggal Seminar Hasil </p> <AiFillCloseCircle className="fill-[#d25858] items-center" /></div>
						<div className=" text-2xl text-center italic"> Belum Ada</div>
					</div>
				)}
			</div>
			<div className="flex mb-6 xxs:max-sm:flex-col md:max-lg:flex-col sm:max-md:flex-col mt-5 mx-4">
				<div className="grid justify-center  xxs:max-sm:w-full md:max-lg:w-full sm:max-md:w-full mr-2 py-6 px-4 w-2/3 h-80 bg-[#f1e8f252] text-[#707070] rounded-2xl shadow-md">
					<div className="flex justify-center items-center">
						<BsFillPersonFill className="text-3xl" />
						<div className="text-xl">Dosen Penguji 1</div>
					</div>
					<div className="text-center font-bold text-2xl">
						{"Dr. Wicaksono Tirtanto, M. Pd."}
					</div>
				</div>
				<div className="grid justify-center  xxs:max-sm:w-full xxs:max-sm:my-2 md:max-lg:w-full md:max-lg:mt-3 sm:max-md:w-full  py-6 px-4 w-2/3 h-80 bg-[#f1e8f252] text-[#707070] rounded-2xl shadow-md">
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

		<div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					<label className="block mt-1 text-md font-medium text-gray-900 ">
						Link File Seminar Hasil
					</label>
					<div className="flex justify-between items-center w-full">
						<input
							className="bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
							type="text"
							placeholder="Link Google Drive"
							required
						/>
						<button
							type="button"
							className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
						>
							Simpan
						</button>
					</div>
				</div>
		</div>
	);
};

export default FileSeminar;
