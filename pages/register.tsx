import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Navbar from "../components/navbar/navbar";

interface formInput {
  name: String;
  username: String;
  email: String;
  phoneNumber: Number;
  generation: Number;
  password: String;
  confirmPassword: String;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInput>();
  const onSubmit: SubmitHandler<formInput> = (data) =>
    window.alert("Data berhasil disimpan");
  return (
    <div>
      <section className="h-screen overflow-auto bg-gradient-to-t from-patternThree via-patternTwo to-patternOne  text-gray-900">
        <div className=" bg-white p-4 flex flex-col mx-2 sm:mx-10 md:mx-20 lg:mx-80 my-10 rounded-lg h-max">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center text-gray-900 font-semibold mx-4 mb-0 text-4xl">
                Daftar Akun
              </p>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Nama
              </label>
              <input
                {...register("name", {
                  required: "Nama lengkap diperlukan",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Nama Lengkap"
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                NIM
              </label>
              <input
                {...register("username", {
                  required: "NIM diperlukan",
                  maxLength: {
                    value: 13,
                    message: "NIM maksimal 13 karakter",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Contoh: 2012012019920"
              />
              <p className="text-red-500">{errors.username?.message}</p>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email diperlukan" })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="email@gmail.com"
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                No HP/WA
              </label>
              <input
                type="number"
                {...register("phoneNumber", {
                  required: "No HP/WA diperlukan",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <p className="text-red-500">{errors.phoneNumber?.message}</p>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Angkatan
              </label>
              <input
                type="number"
                {...register("generation", {
                  required: "Informasi angkatan diperlukan",
                  maxLength: {
                    value: 4,
                    message: "Maksimal 4 angka",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Contoh: 2020"
              />
              <p className="text-red-500">{errors.generation?.message}</p>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Kata Sandi
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Kata diperlukan",
                  minLength: {
                    value: 6,
                    message: "Kata sandi harus memiliki minimal 6 karakter",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Konfirmasi kata sandi diperlukan",
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            </div>

            <button
              type="submit"
              className="text-white bg-patternOne hover:bg-patternFour focus:ring-4 focus:outline-none focus:ring-navy-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
            >
              DAFTAR
            </button>
            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" />
            <div className="text-center">
              <p className="text-sm font-semibold mt-2 pt-1 mb-4">
                Sudah punya akun?{" "}
                <Link href="/dashboard">
                  <button className=" text-patternThree hover:text-patternOne focus:text-red-700 transition duration-200 ease-in-out ">
                    Masuk
                  </button>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
