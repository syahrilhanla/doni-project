import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { BsFillPersonFill } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useAuth } from "../components/Context/AuthContext";

const Dashboard = () => {
	const [judul, setJudul] = useState(false);
	const [ajukan, setAjukan] = useState(false);
	  const { user } = useAuth();
	console.log(user);
	
	return (
	
		<Layout>
			<div className="h-screen px-4 overflow-auto py-4">
				<div className="flex lg:space-between xxs:max-sm:flex-col sm:max-md:flex-col md:max-lg:flex-col  mt-5 mb-2 mx-4">
					<div className="grid justify-items-start xxs:max-sm:w-full sm:max-md:w-full  md:max-lg:w-full md:max-lg:space-between mr-2 py-4 px-3 w-2/5 h-24 bg-[#f1e8f252]  text-[#707070] rounded-lg shadow-md">
						<div className=" text-lg text-center font-sans">Selamat Datang {user.name?user.name:""} </div>
						<div className="font-black ">1910131310039</div>
					</div>
					<div className="flex justify-center xxs:w-full items-center sm:max-md:w-full  md:max-lg:w-full  md:max-lg:mt-3 w-3/5 h-24 bg-[#f2e8f24f] text-[#683ab7d5] rounded-lg shadow-md">
						{judul ? (
							<>
								<div className="flex justify-items-center font-sans italic">
									<p>
										Judul Skripsi Pengembangan Media Pembelajaran Berbasis Web
										dengan Pendekatan Blablablabla
									</p>
								</div>
							</>
						) : (
							<>
								<div className="flex justify-between w-full mx-7">
                  
									<div className="text-lg items-center text-gray-500  font-sans">
										Judul Skripsi Belum Ada 
									</div>
									<div>
										<button
											className="text-white  bg-patternTwo hover:text-gray-900 hover:bg-[#c9c2d2] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
											onClick={() => setAjukan(!ajukan)}
										>
											Ajukan Judul
										</button>
                  </div>
             
									{ajukan && (
											<>
												<div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
													<div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
													<div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
														<div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
															<button
																onClick={() => setAjukan(!ajukan)}
																type="button"
																className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-red-500 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
															>
																<RiCloseLine className="text-black hover:text-white"/>
															</button>
																		<label className="block text-xl mt-4 font-medium text-gray-900 ">
																			Judul Skripsi
																		</label>
															<div className="px-8 py-7 flex flex-col items-center">
																<form action="" className="px-2 w-full">
																		<textarea
                                    placeholder="Masukkan Judul Skripsi"
																			className="min-h-[100px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none block w-full p-2.5"
																		required
																		
																		/>
																	</form>
																<button
																	type="button"
																	className=" text-white bg-patternTwo focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 min-h-[50px] mt-3  hover:text-white focus:z-10"
																>
																	Ajukan
																</button>
															</div>
                              
														</div>
													</div>
												</div>
											</>
										)}
									
								</div>
							</>
						)}
					</div>
				</div>
        {/* dospem */}
				<div className="flex space-between xxs:max-sm:flex-col md:max-lg:flex-col sm:max-md:flex-col mt-5 mx-4">
					<div className="grid justify-center xxs:max-sm:w-full md:max-lg:w-full sm:max-md:w-full mr-2 py-6 px-4 w-2/3 h-80 bg-[#f1e8f252] text-[#707070] rounded-2xl shadow-xl">
          <div className="flex justify-center items-center">
							<BsFillPersonFill className="text-3xl" />
						<div className="text-2xl">Dosen Pembimbing 1</div>
						</div>
						<div className="text-center font-bold text-4xl">
							{"Dr. Wicaksono Tirtanto, M. Pd."}
						</div>
					</div>
					<div className="grid justify-center xxs:max-sm:w-full xxs:max-sm:my-2 md:max-lg:w-full md:max-lg:mt-3 sm:max-md:w-full  py-6 px-4 w-2/3 h-80 bg-[#f1e8f252] text-[#707070] rounded-2xl shadow-xl">
						<div className="flex justify-center items-center">
							<div><BsFillPersonFill className="text-3xl" /></div>
						<div className="text-2xl">Dosen Pembimbing 2</div>
						</div>
						<div className="text-center font-bold text-4xl">{"Suparni Maul, M. T."}</div>
					</div>
				</div>
        {/* dospem */}
        {/* sempro,seminar,sidang  */}
				<div className="flex justify-center xxs:max-sm:flex-col sm:max-md:flex-col md:max-lg:flex-col mt-7 mx-3">
					<div className="grid justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full mr-2 py-6 px-4 w-1/3 h-40 bg-[#f1e8f252] border-4 border-[#caf3e0] text-[#707070] rounded-2xl shadow-xl">
           <div className=" text-xl flex justify-center items-center"><p className="mx-2">Tanggal Seminar Proposal</p> <AiFillCheckCircle className="fill-[#6bae8f]" /></div>
						<p className="text-3xl font-light">20 Januari 2023</p>
					</div>
					<div className="grid justify-center xxs:max-sm:w-full xxs:max-sm:my-3 sm:max-md:w-full sm:max-md:my-3 md:max-lg:w-full md:max-lg:my-3 mr-2 py-5 px-4 w-1/3 h-40 bg-[#f1e8f252] border-4 border-[#f3caca] text-[#707070] rounded-2xl shadow-xl">
          <div className=" text-xl flex justify-center items-center "><p className="mx-2">Tanggal Seminar Hasil</p> <AiFillCloseCircle className="fill-[#d25858]" /></div>
						<p className=" italic font-light">
							Anda belum mengajukan seminar hasil, lengkapi file upload di
							halaman berkas terlebih dahulu.
						</p>
					</div>
					<div className="grid justify-center xxs:max-sm:w-full sm:max-md:w-full md:max-lg:w-full mr-2 py-5 px-4 w-1/3 h-40 bg-[#f1e8f252] border-4 border-[#f3caca] text-[#707070] rounded-2xl shadow-xl">
          <div className=" text-xl flex justify-center items-center "><p className="mx-2">Tanggal Sidang Akhir</p> <AiFillCloseCircle className="fill-[#d25858]"  /></div>
						<p className=" italic font-light">
							Anda belum mengajukan sidang akhir, lakukan seminar hasil terlebih
							dahulu.
						</p>
					</div>
				</div>

			</div>
			</Layout>
				
	);
};

export default Dashboard;
