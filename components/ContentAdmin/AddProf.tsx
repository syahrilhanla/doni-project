import Link from "next/link";
import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { SendButton } from "../Common/Buttons";
import { useAuth } from "../Context/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import router from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";

interface formInput {
  name: String;
  username: String;
  email: String;
  password: String;
}

export default function AddProf() {
  const { registerProf } = useAuth();

  const [addProf, setAddProf] = useState<boolean>(false);

  const handleAddProf = () => {
    setAddProf(true);
  };

  const schema = yup.object().shape({
    name: yup.string().required("Nama lengkap diperlukan"),
    username: yup
      .string()
      .min(18, "NIP minimal 18 karakter")
      .max(18, "NIP maksimal 18 karakter")
      .required("NIP diperlukan"),
    email: yup
      .string()
      .email("Harus email yang tepat")
      .required("Email diperlukan"),

    password: yup
      .string()
      .min(6, "Kata sandi harus memiliki minimal 6 karakter")
      .required("Kata sandi diperlukan"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      await registerProf(data.email, data.password, data.username, data.name);
      setAddProf(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <SendButton
        handleClick={() => handleAddProf()}
        buttonText="Tambah Dosen"
      />
      {addProf && (
        <div className=" flex justify-center items-center fixed top-0 left-0 right-0 z-50  p-4 overflow-x-hidden overflow-y-auto w-screen h-screen mx-auto ">
          <div className="bg-gray-700 opacity-30 h-screen w-screen -z-50 absolute top-0 left-0 right-0" />
          <div className="gap-4 relative  w-3/5 h-full  flex justify-center items-center">
            <div className="relative bg-white border-purple-600 rounded-2xl shadow w-3/5 xxs:max-md:w-full md:max-lg:w-full min-h-fit ">
              <button
                onClick={() => setAddProf(!addProf)}
                type="button"
                className="absolute top-3 right-2.5 bg-red-600  hover:opacity-50  text-white bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <RiCloseLine />
              </button>

              <div className="p-4 flex flex-col gap-2">
                {/* <p className="block text-xl mt-6 font-medium text-gray-900 ">
                  Apakah anda ingin menghapus data dosen pembimbing ini?
                </p> */}
                {/* <div className="p-4 flex gap-2 justify-end items-end">
                  <button
                    // onClick={() => deleteData()}
                    type="button"
                    className=" text-white bg-green-500    rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3 hover:opacity-50 focus:z-10"
                  >
                    Iya
                  </button>
                  <button
                    // onClick={() => setHapus(!hapus)}
                    type="button"
                    className=" text-white bg-red-500    rounded-lg  text-sm font-medium px-5 min-h-[50px] mt-3 hover:opacity-50 focus:z-10"
                  >
                    Tidak
                  </button> */}
                {/* </div> */}
                <form onSubmit={handleSubmit(onSubmit)} className="text-left">
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center text-gray-900 font-semibold mx-4 mb-0 text-4xl">
                      Tambah Dosen
                    </p>
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Nama
                    </label>
                    <input
                      {...register("name")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Nama Lengkap"
                    />
                    <p className="text-red-500">{errors.name?.message}</p>
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      NIP
                    </label>
                    <input
                      {...register("username")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Contoh: 19630708879031002"
                    />
                    <p className="text-red-500">{errors.username?.message}</p>
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="email@dosen.ulm.ac.id"
                    />
                    <p className="text-red-500">{errors.email?.message}</p>
                  </div>

                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Kata Sandi
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    />
                    <p className="text-red-500">{errors.password?.message}</p>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-patternOne hover:bg-patternFour focus:ring-4 focus:outline-none focus:ring-navy-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
                  >
                    DAFTAR
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
