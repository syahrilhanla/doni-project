import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

type DashboardLayoutProps = {
    children: React.ReactNode,
  };
  
  export default function Layout({ children }: DashboardLayoutProps) {
    return (
      <div className="text-center flex flex-col min-h-screen color-red-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="p-5 w-4/5">{children}</div >
        </div>
 
      </div>
    );
  }