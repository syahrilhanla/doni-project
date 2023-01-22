import React from "react";

const FileUpload = () => {
	return (
		<div className="h-screen px-4 w-5/6 overflow-auto py-4">
			<div className="flex justify-center items-center font-extralight text-3xl">
				{" "}
				Upload Link Berkas Kamu Di sini
			</div>
			<div className="py-4">
				<div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					<label className="block mt-1 text-md font-medium text-gray-900 ">
						BAB 1
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
				<div className="flex flex-col my-4 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
					<label className="block mt-1 text-md font-medium text-gray-900 ">
						BAB 2
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
