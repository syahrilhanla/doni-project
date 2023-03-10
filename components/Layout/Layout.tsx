
import Router from "next/router";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../Navbar/Navbar";
import ProtectedRoute from "../ProtectedRoute";
import Sidebar from "../Sidebar/Sidebar";

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
  return (
    <ProtectedRoute>

    <div className="text-center flex flex-col min-h-screen relative">
      <Navbar />
      <div className="w-full min-h-[90vh] flex flex-row">
        <span className="hidden sm:block">
          <Sidebar />
        </span>
        <div className="w-full">{children}</div>
      </div>
    </div>
    </ProtectedRoute>
  );
}

export default Layout;