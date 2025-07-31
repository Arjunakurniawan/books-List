import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div className="pl-8 pt-4">
        <h1 className="text-4xl">Dashboard.</h1>
        <Breadcrumb className="pt-6">
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
      </div>
    </>
  );
}

export default Dashboard;
