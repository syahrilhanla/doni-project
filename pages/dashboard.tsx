import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
interface IFormInput {
	username: string;
	password: string;
}
const schema = yup
	.object({
		username: yup.string().required(),
		password: yup.string().required(),
	})
	.required();
const Dashboard = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(schema),
	});
	const onSubmit = (data: IFormInput) => window.alert("Login Berhasil");
	// const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
	return (
		<div>
			<section className="bg-gradient-to-r from-[#5E548E] via-[#9F86C0] to-[#BE95C4] h-screen">
				<div className="px-6 h-full text-gray-800">
					<div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
						<div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-2 md:mb-0 rounded-2xl bg-white">
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="mx-5">
									<div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
										<p className="text-center text-[#5E548E] font-semibold mx-4 mb-0 text-4xl">
											Login
										</p>
									</div>
									<div className="mb-6">
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Username
										</label>
										<input
											type="text"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="ex: 1910131310012"
											{...register("username", {
												required: true,
												maxLength: 13,
											})}
										/>
										{errors.username && errors.username.type === "required" && (
											<p className="bg-red-100 mt-1 text-red-900 text-sm rounded-lg block w-full p-2.5 font-semibold">
												Lengkapi dan sesuaikan username kamu !
											</p>
										)}
									</div>
									<div className="mb-6">
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
											Password
										</label>

										<input
											type="password"
											id="password"
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											{...register("password", { required: true })}
										/>
										{errors.password && errors.password.type === "required" && (
											<p className="bg-red-100 mt-1 text-red-900 text-sm rounded-lg block w-full p-2.5 font-semibold">
												Sesuaikan password kamu !
											</p>
										)}
									</div>
									<div className="flex items-start mb-6">
										<div className="flex items-center h-5">
											<input
												type="checkbox"
												id="remember"
												value=""
												className="w-4 h-4 border accent-[#9F86C0]  border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-[#BE95C4] dark:bg-[#BE95C4] dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
												required
											/>
										</div>
										<label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
											Remember me
										</label>
									</div>
									<button
										type="submit"
										className="text-white bg-[#5E548E] hover:bg-[#231942] focus:ring-4 focus:outline-none focus:ring-navy-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#E0B1CB] dark:hover:bg-[#BE95C4] dark:focus:ring-blue-800"
									>
										LOGIN
									</button>
									<div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" />
									<div className="text-center">
										<p className="text-sm font-semibold mt-2 pt-1 mb-6">
											Belum punya akun?
											<a
												href="#!"
												className="text-[#BE95C4] hover:text-[#5E548E] focus:text-red-700 transition duration-200 ease-in-out"
											>
												Register
											</a>
										</p>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Dashboard;
