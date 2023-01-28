import React from "react";
import FileSeminar from "../components/Content/FileSeminar";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const seminar = () => {
	return (
		<ProtectedRoute>

		<Layout>
			<div className="flex h-full flex-col justify-center items-center">
				<FileSeminar />
			</div>
		</Layout>
		</ProtectedRoute>
	);
};

export default seminar;
