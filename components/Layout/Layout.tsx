
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="text-center flex flex-col min-h-screen relative">
      <Navbar />
      <div className="w-full min-h-[90vh] flex flex-row">
        <span className="hidden sm:block">
          <Sidebar />
        </span>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

export default Layout;