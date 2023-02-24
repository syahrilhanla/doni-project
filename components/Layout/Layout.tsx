import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../Navbar/Navbar";
import ProtectedRoute from "../ProtectedRoute";
import Sidebar from "../Sidebar/Sidebar";

import { TiWarningOutline } from "react-icons/ti";
import { doc } from "firebase/firestore";
import { db } from "../Store/firebase";
import { User } from "firebase/auth";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  if (user.role === "admin") {
    Router.push("/request");
  } else if (user.role === "dosen") {
    Router.push("/approval");
  }
  const [approve, setApprove] = useState(null);

  useEffect(() => {
    if (user.statusApprove) {
      setApprove(user.statusApprove);
    }
  }, [user]);
  return (
    <ProtectedRoute>
      <div className="text-center flex flex-col min-h-screen relative">
        {approve && (
          <>
            <Navbar />
            <div className="w-full min-h-[90vh] flex flex-row">
              <span className="hidden sm:block">
                <Sidebar />
              </span>
              <div className="w-full">{children}</div>
            </div>
          </>
        )}
        {!approve && (
          <>
            <Navbar />
            <div className="w-full min-h-[100vh] flex flex-row">
              <span className="hidden sm:block">
                <Sidebar />
              </span>
              <div className="w-full h-full">
                <div className="h-screen bg-[#a5a4a4a9]">
                  <div className="flex xl:justify-center lg:justify-center justify-center items-center  h-full g-6">
                    <div className="flex flex-col items-center xl:ml-20 xl:w-5/12 lg:w-8/12 md:w-8/12  h-80 border-[#cccbccf3] rounded-xl bg-white">
                      <div className="text-9xl text-[#fd8888] mt-5 ">
                        <TiWarningOutline />
                      </div>
                      <p className="sm:text-2xl sm:flex flex-col xl:text-5xl text-center text-[#9e9d9ef3]">
                        Menunggu ... Konfirmasi Admin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Layout;
