import Sidebar from "../../common/Sidebar";
import TopBar from "../../common/TopBar";
import MobileNav from "../../common/MobileNav";
import { ThemeProvider } from "../../common/theme-provider";
import { SidebarProvider } from "../../ui/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <TopBar />
            <MobileNav />
            <main className="pt-16 w-screen mb-5 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default DashboardLayout;
