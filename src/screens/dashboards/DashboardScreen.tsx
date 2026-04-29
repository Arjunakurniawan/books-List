import DashboardCards from "@/components/dashboards/dashboardCards";
import { ChartBar } from "@/components/dashboards/dashboardChartsBar";
import { ChartPie } from "@/components/dashboards/dashboardChartPie";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import { SlashIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  if (isMobile) return null;

  return (
    <>
      <div
        className={clsx(
          "h-screen transition-all duration-300 mt-5",
          isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28"
        )}
      >
      <div className="pt-4 px-6 pb-8 ml-5">
          <h1 className="text-4xl">Dashboard.</h1>
          <Breadcrumb className="pt-6 pb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbEllipsis />
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-8">
            <div>
              <DashboardCards />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
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
