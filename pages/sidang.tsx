import React from "react";
import FileSidang from "../components/Content/FileSidang";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const sidang = () => {
	return (
		<ProtectedRoute>
			
		<Layout>
			<div className="flex h-full flex-col justify-center items-center">
				<FileSidang />
			</div>
		</Layout>
		</ProtectedRoute>
	);
};

export default sidang;
