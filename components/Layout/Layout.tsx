
import { onSnapshot } from "firebase/firestore";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../Navbar/Navbar";
import ProtectedRoute from "../ProtectedRoute";
import Sidebar from "../Sidebar/Sidebar";
import { db } from "../Store/firebase";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: DashboardLayoutProps) => {
  const { user } = useAuth();
  if (user.role === "admin") {
    Router.push("/request")
  }
  else if (user.role === "dosen") {
    Router.push("/approval")
  }
  const [approve, setApprove] = useState(user.statusApprove)
  // useEffect(()=>{
  //   onSnapshot(doc(db,"studentsList"))
  // },[])
  return (
    <ProtectedRoute>

      <div className="text-center flex flex-col min-h-screen relative">
        {approve === true ?
          <>
            <Navbar />
            <div className="w-full min-h-[90vh] flex flex-row">
              <span className="hidden sm:block">
                <Sidebar />
              </span>
              <div className="w-full">{children}</div>
            </div>
          </>
          :
          <>
            <Navbar />
            <div className="w-full min-h-[90vh] flex flex-row">
              <span className="hidden sm:block">
                <Sidebar />
              </span>
              <div className="w-full h-full">
                <div className="h-screen">
                  <div className="flex xl:justify-center lg:justify-center justify-center items-center flex-wrap h-full g-6">
                    <div className="xl:ml-20 xl:w-5/12 lg:w-8/12 md:w-8/12 mb-2 md:mb-0 border-4  h-80 border-[#cccbccf3] rounded-2xl bg-white">
                      <p className="grid content-center justify-items-center text-5xl text-center text-[#a68ea8f3]">
                        Menunggu ...
                        Konfirmasi Admin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>}
      </div>
    </ProtectedRoute>
  );
}

export default Layout;