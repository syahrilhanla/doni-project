import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { doc, updateDoc, onSnapshot } from "firebase/firestore"
import { db } from "../Store/firebase"
import Link from "next/link";

const FileUpload = () => {
	const { user } = useAuth();
	const [chapter1, setChapter1] = useState<String>();
	const [chapter2, setChapter2] = useState<String>();
	const [link1, setLink1] = useState("")
	const [link2, setLink2] = useState("")
	useEffect(() => {
		if (user.files) setChapter1(user.files[0].chapterOne)
		if (user.files) setChapter2(user.files[0].chapterTwo)
		onSnapshot(doc(db, "studentsList", user.uid), (doc) => {
		setChapter1(doc.data()?.files[0].chapterOne)
		setChapter2(doc.data()?.files[0].chapterTwo)
	})
	}, [user.files])

	const handleLink1 = async () => {
		const docRef = doc(db, "studentsList", user.uid);
		const chapter1Value = {
			files: [
				{

					chapterOne: link1,
					chapterTwo: user.files[0].chapterTwo,
					chapterThree: user.files[0].chapterThree,
					chapterFour: user.files[0].chapterFour,
					chapterFive: user.files[0].chapterFive,
				}
			]
		}
		await updateDoc(docRef, chapter1Value)
		setLink1("")
	}
	const handleLink2 = async () => {
		const docRef = doc(db, "studentsList", user.uid);
		const chapter2Value = {
			files: [
				{
					chapterOne: user.files[0].chapterOne,
					chapterTwo: link2,
					chapterThree: user.files[0].chapterThree,
					chapterFour: user.files[0].chapterFour,
					chapterFive: user.files[0].chapterFive,
				}
			]
		}
		await updateDoc(docRef, chapter2Value)
		setLink2("")
	}


	return (
		<div className="h-screen px-4 w-5/6 overflow-auto py-4">
			<div className="flex justify-center items-center font-extralight text-3xl">
				{" "}
				Upload Link Berkas Kamu Di sini
			</div>
			<div className="py-4">
				<div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					{!chapter1 &&
						<label className="block mt-2 text-sm font-medium text-gray-900 ">
							File Belum Ada
						</label>
					}
					{chapter1 &&
						<Link target="_blank" href={`${user.files[0].chapterOne}`} className="block mt-2 text-sm font-medium text-gray-900 ">
							Silahkan Di Cek
						</Link>
					}
					<label className="block mt-1 text-sm font-medium text-gray-900 ">
						BAB 1
					</label>
					<div className="flex justify-between items-center w-full">
						<input
							className="bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
							value={link1}
							onChange={(e) => setLink1(e.target.value)}
							type="text"
							placeholder="Link Google Drive"
							required
						/>
						<button
							onClick={handleLink1}
							className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
						>
							Simpan
						</button>
					</div>
				</div>
				<div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-full py-2 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					{!chapter2 &&
						<label className="block mt-2 text-sm font-medium text-gray-900 ">
							File Belum Ada
						</label>
					}
					{chapter2 &&
						<Link target="_blank" href={`${user.files[0].chapterTwo}`} className="block mt-2 text-sm font-medium text-gray-900 ">
							Silahkan Di Cek
						</Link>
					}
					<label className="block mt-1 text-md font-medium text-gray-900 ">
						BAB 2
					</label>
					<div className="flex justify-between items-center w-full">
						<input
							className="bg-gray-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
							value={link2}
							onChange={(e) => setLink2(e.target.value)}
							type="text"
							placeholder="Link Google Drive"
							required
						/>
						<button
							onClick={handleLink2}
							type="button"
							className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
						>
							Simpan
						</button>
					</div>
				</div>
				<div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					<label className="block mt-1 text-md font-medium text-gray-900 ">
						BAB 3
					</label>
					<div className="flex justify-between items-center w-full">
						<input
							className="bg-gray-50 disabled:opacity-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
							type="text"
							placeholder="Link Google Drive"
							required
							disabled
						/>
						<button
							type="button"
							className=" text-white disabled:opacity-50 items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
							disabled>
							Simpan
						</button>
					</div>
				</div>
				<div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					<label className="block mt-1 text-md font-medium text-gray-900 ">
						BAB 4
					</label>
					<div className="flex justify-between items-center w-full">
						<input
							className="bg-gray-50 disabled:opacity-50 items-center border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
							type="text"
							placeholder="Link Google Drive"
							required
							disabled
						/>
						<button
							type="button"
							className=" text-white disabled:opacity-50 items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10"
							disabled>
							Simpan
						</button>
					</div>
				</div>
				<div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					<label className="block mt-1 text-md font-medium text-gray-900 ">
						BAB 5
					</label>
					<div className="flex justify-between items-center w-full">
						<input
							className="bg-gray-50 items-center
				 			disabled:opacity-50
							border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-200 block w-full p-2.5"
							type="text"
							placeholder="Link Google Drive"
							required
							disabled
						/>
						<button
							type="button"
							className=" text-white items-center bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm  px-5 min-h-[50px]  hover:text-white focus:z-10
				disabled:opacity-50
				"
							disabled>
							Simpan
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileUpload;
