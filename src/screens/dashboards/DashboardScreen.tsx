import DashboardCards from "@/components/dashboardCards";
import { ChartBarDefault } from "@/components/dashboardCharts";
import { MonthlyTargetChart } from "@/components/monthlyTargetChart";
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
          "h-screen transition-all duration-300 mt-20",
          isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28"
        )}
      >
        <div className="pl-8 pt-4 pr-8 pb-8">
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
              <div className="xl:col-span-8">
                <ChartBarDefault />
              </div>
              <div className="xl:col-span-4">
                <MonthlyTargetChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
