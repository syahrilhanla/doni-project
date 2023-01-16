import React from "react";
import FileSidang from "../components/Content/fileSidang";

const sidang = () => {
	return (
		<div className="flex h-full flex-col justify-center items-center">
			<h1 className="text-4xl mb-5 font-bold">Sidang</h1>
			<FileSidang />
		</div>
	);
};

export default sidang;
