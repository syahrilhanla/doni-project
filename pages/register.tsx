import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
  const onSubmit: SubmitHandler<formInput> = (data) => console.log(data);
  return (
    <div>
      <section className="h-screen overflow-auto">
        <div className="px-6 h-max dark:text-white bg-gradient-to-t from-patternThree via-patternTwo to-patternOne text-white dark:bg-gray-800 ">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-2 md:mb-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center text-white font-semibold mx-4 mb-0 text-4xl dark:text-patternFive">
                    Daftar Akun
                  </p>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    Nama
                  </label>
                  <input
                    {...register("name", {
                      required: "Nama lengkap diperlukan",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Nama Lengkap"
                  />
                  <p>{errors.name?.message}</p>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    Nama Pengguna
                  </label>
                  <input
                    {...register("username", {
                      required: "Nama pengguna diperlukan",
                      maxLength: {
                        value: 13,
                        message: "Nama pengguna maksimal 13 karakter",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Contoh: 2012012019920"
                  />
                  <p>{errors.username?.message}</p>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: "Email diperlukan" })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email@gmail.com"
                  />
                  <p>{errors.email?.message}</p>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    No Telepon/HP
                  </label>
                  <input
                    {...register("phoneNumber", {
                      required: "No Telepon/HP diperlukan",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p>{errors.phoneNumber?.message}</p>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    Angkatan
                  </label>
                  <input
                    {...register("generation", {
                      required: "Informasi angkatan diperlukan",
                      maxLength: 4,
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Contoh: 2020"
                  />
                  <p>{errors.generation?.message}</p>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password diperlukan",
                      min: {
                        value: 6,
                        message:
                          "Password harus harus memiliki minimal 6 karakter",
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p>{errors.password?.message}</p>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-white dark:text-white">
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    type="password"
                    {...register("confirmPassword", {
                      required: "Konfirmasi kata sandi diperlukan",
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <p>{errors.confirmPassword?.message}</p>
                </div>

                {/* <div className="flex items-start mb-6">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="remember"
                      value=""
                      className="w-4 h-4 border accent-patternTwo  border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-patternThree dark:bg-patternThree dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label className="ml-2 text-sm font-medium text-white dark:text-gray-300">
                    Ingat Aku
                  </label>
                </div> */}
                <button
                  type="submit"
                  className="text-white bg-patternOne hover:bg-patternFour focus:ring-4 focus:outline-none focus:ring-navy-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:text-patternFour dark:bg-patternFive dark:hover:bg-patternThree dark:focus:ring-blue-800"
                >
                  DAFTAR
                </button>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" />
                <div className="text-center">
                  <p className="text-sm font-semibold mt-2 pt-1 mb-4">
                    Sudah punya akun?{" "}
                    <Link href="/dashboard">
                      <button className=" text-white hover:text-patternThree focus:text-red-700 transition duration-200 ease-in-out dark:text-patternFive">
                        Masuk
                      </button>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
