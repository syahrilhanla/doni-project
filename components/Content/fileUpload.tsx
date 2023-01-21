import React from "react";

const FileUpload= () => {
	return (
		<div className="h-screen px-4 w-5/6 overflow-auto py-4">
			<div className="flex justify-center items-center font-extralight text-3xl">
				{" "}
				Upload Berkas Kamu Di sini
			</div>
			<div className="py-4">
        <div className="flex flex-col mt-2 mb-3 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md

        ">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					BAB 1
				</label>
				<input
					className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
					aria-describedby="file_input_help"
					id="file_input"
					type="file"
				/>
        </div>
        <div className="flex flex-col mt-2 mb-3 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					BAB 2
				</label>
				<input
					className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
					aria-describedby="file_input_help"
					id="file_input"
					type="file"
				/>
        </div>
        <div className="flex flex-col mt-2 mb-3 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					BAB 3
				</label>
				<input
					className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
					aria-describedby="file_input_help"
					id="file_input"
					type="file"
				/>
        </div>
        <div className="flex flex-col mt-2 mb-3 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					BAB 4
				</label>
				<input
					className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
					aria-describedby="file_input_help"
					id="file_input"
					type="file"
				/>
        </div>
        <div className="flex flex-col mt-2 mb-3 justify-center items-center xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 px-4 w-full h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
					BAB 5
				</label>
				<input
					className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
					aria-describedby="file_input_help"
					id="file_input"
					type="file"
				/>
        </div>
				
				<p
					className="mt-1 text-sm text-gray-500 dark:text-gray-300"
					id="file_input_help"
				>
					PDF (MAX. 2MB).
				</p>
			</div>
		</div>
	);
};

export default FileUpload;
