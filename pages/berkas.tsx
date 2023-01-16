import React from "react";
import FileUpload from "../components/Content/fileUpload";

const berkas = () => {
	return (
		<div className="flex h-full flex-col justify-center items-center">
			<h1 className="text-4xl mb-5 font-bold">Berkas</h1>
			<FileUpload />
		</div>
	);
};

export default berkas;
