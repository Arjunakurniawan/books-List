import DashboardCards from "@/components/dashboards/dashboardCards";
import { ChartBar } from "@/components/dashboards/dashboardChartsBar";
import { ChartPie } from "@/components/dashboards/dashboardChartPie";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import AppBreadcrumb from "@/components/common/AppBreadcrumb";

function Dashboard() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  if (isMobile) return null;

  return (
    <>
      <div
        className={clsx(
          "min-h-screen transition-all duration-300 mt-5",
          isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28",
        )}
      >
        <div className="px-10 ml-2">
          <div className="pb-5">
            <h1 className="text-4xl">Dashboard.</h1>
            <AppBreadcrumb to="/dashboard">Dashboard</AppBreadcrumb>
          </div>
          <div className="space-y-8">
            <div>
              <DashboardCards />
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="md:col-span-8">
                <ChartBar />
              </div>
              <div className="md:col-span-4">
                <ChartPie />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
