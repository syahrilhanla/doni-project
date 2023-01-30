import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../components/Context/AuthContext";
import { useRouter } from "next/router";
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
  const { logIn } = useAuth();
  const router = useRouter();
  const [elogin, setElogin] = useState(false);
  const onSubmit = async (data: IFormInput) => {
  try {
        await logIn(data.username, data.password);
        router.push("/dashboard");
    } catch (error: any) {
      setElogin(true)
    }
  };

  // const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);
  return (
    <div>
      <section className="bg-gradient-to-r from-[#5E548E] via-[#9F86C0] to-[#BE95C4] h-screen">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
            <div className="xl:ml-20 xl:w-5/12 lg:w-8/12 md:w-8/12 mb-2 md:mb-0 rounded-2xl bg-white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-5">
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center text-[#5E548E] font-semibold mx-4 mb-0 text-4xl">
                      Masuk
                    </p>
                  </div>
                  {elogin &&
                    <p className="bg-red-100 mt-1 mb-4 text-center text-red-900 text-sm rounded-lg block w-full p-2.5 font-semibold">
                      {"Kamu belum terdaftar !"}
                    </p>
                  }
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      {"NIM/Username"}
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="ex: 1910131310012"
                      {...register("username", {
                        required: true,
                        maxLength: 13,
                      })}
                    />
                    {errors.username && errors.username.type === "required" && (
                      <p className="bg-red-100 mt-1 text-red-900 text-sm rounded-lg block w-full p-2.5 font-semibold">
                        {"Lengkapi dan sesuaikan username kamu !"}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Password
                    </label>

                    <input
                      type="password"
                      id="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      {...register("password", { required: true })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <p className="bg-red-100 mt-1 text-red-900 text-sm rounded-lg block w-full p-2.5 font-semibold">
                        {"Sesuaikan password kamu !"}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-[#5E548E] hover:bg-[#231942] focus:ring-4 focus:outline-none focus:ring-navy-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                  >
                    Masuk
                  </button>
                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5" />
                  <div className="text-center">
                    <p className="text-sm font-semibold mt-2 pt-1 mb-6">
                      Belum punya akun?
                      <Link href="/register">
                        <button className="text-[#BE95C4] ml-1 hover:text-[#5E548E] focus:text-red-700 transition duration-200 ease-in-out">
                          {" Daftar"}
                        </button>
                      </Link>
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
