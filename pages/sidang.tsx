import React from "react";
import FileSidang from "../components/Content/fileSidang";
import Layout from "../components/Layout/Layout";

const sidang = () => {
	return (
		<Layout>
			<div className="flex h-full flex-col justify-center items-center">
				<FileSidang />
			</div>
		</Layout>
	);
};

export default sidang;
