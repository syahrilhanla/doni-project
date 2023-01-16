
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <div className="text-center flex flex-col min-h-screen relative">
      <Navbar />
      <Sidebar />
    </div>
  );
}
