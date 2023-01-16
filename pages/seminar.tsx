import React from "react";
import FileSeminar from "../components/Content/fileSeminar";
import Layout from "../components/Layout/Layout";

const seminar = () => {
	return (
		<Layout>
			<div className="flex h-full flex-col justify-center items-center">
				<h1 className="text-4xl mb-5 font-bold">Seminar</h1>
				<FileSeminar />
			</div>
		</Layout>
	);
};

export default seminar;
