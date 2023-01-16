import React from "react";

const fileSeminar = () => {
	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
				Upload File Semhas Kamu
			</label>
			<input
				className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
				aria-describedby="file_input_help"
				id="file_input"
				type="file"
			/>
		
		</div>
	);
};

export default fileSeminar;
