import React from "react";
import FileSeminar from "../components/Content/FileSeminar";
import Layout from "../components/Layout/Layout";

const seminar = () => {
	return (
		<Layout>
			<div className="flex h-full flex-col justify-center items-center">
				<FileSeminar />
			</div>
		</Layout>
	);
};

export default seminar;
