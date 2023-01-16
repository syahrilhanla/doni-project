import React from "react";
import Layout from "../components/Layout/Layout";

const SideMenu = () => {
	return (
		<Layout>
			<div>
				<div className="h-screen">
					<div className="flex mt-5">
						<div className="w-full max-w-sm bg-red-200 rounded-lg shadow-2xl ">
							<div className="px-5 pb-5">
								1
							</div>
						</div>
						<div className="w-full max-w-sm bg-yellow-200 rounded-lg shadow-2xl ">
							<div className="px-5 pb-5">
								2
							</div>
						</div>
						<div className="w-full max-w-sm bg-blue-200 rounded-lg shadow-2xl ">
							<div className="px-5 pb-5">
								3
							</div>
						</div>
						<div className="w-full max-w-sm bg-green-200 rounded-lg shadow-2xl ">
							<div className="px-5 pb-5">
								4
							</div>
						</div>

					</div>
				</div>
			</div>
		</Layout>
	);
};

export default SideMenu;
