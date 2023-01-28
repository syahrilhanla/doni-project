import React from "react";
import FileUpload from "../components/Content/FileUpload";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";

const berkas = () => {
	return (
		<ProtectedRoute>

		<Layout>
			<div className="flex h-full py-4 justify-center items-center">
			<FileUpload />
			</div>
		</Layout>
		</ProtectedRoute>
	);
};

export default berkas;
