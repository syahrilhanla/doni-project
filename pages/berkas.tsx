import FileUpload from "../components/Content/FileUpload";
import Layout from "../components/Layout/Layout";


const berkas = () => {
	return (


		<Layout>
			<div className="flex h-full py-4 justify-center items-center">
				<FileUpload />
			</div>
		</Layout>

	);
};

export default berkas;
