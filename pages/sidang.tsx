import FileSidang from "../components/Content/FileSidang";
import Layout from "../components/Layout/Layout";

const Sidang = () => {
	return (
		<Layout>
			<div className="flex h-full flex-col justify-center items-center">
				<FileSidang />
			</div>
		</Layout>
	);
};

export default Sidang;
