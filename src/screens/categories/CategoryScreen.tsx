import CategoryTable from "@/components/tables/CategoryTables/pageCategory";
import {
  Breadcrumb,
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

function CategoryScreen() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <>
      <div
        className={clsx(
          "h-screen transition-all duration-300 mt-20",
          isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28"
        )}
      >
        <div className="pl-8 pt-4">
          <h1 className="text-4xl">List Category.</h1>
          <Breadcrumb className="pt-8 pb-2">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/books">book</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/categories">category</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <CategoryTable />
        </div>
      </div>
    </>
  );
}

export default CategoryScreen;
