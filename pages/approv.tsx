import React from "react";
import TableApproval from "../components/Content/tableApproval";
const approv = () => {
	return (
		<div className="flex h-full flex-col justify-center items-center">
			<h1 className="text-4xl mb-5 font-bold">Approv</h1>
			<TableApproval />
		</div>
	);
};

export default approv;
