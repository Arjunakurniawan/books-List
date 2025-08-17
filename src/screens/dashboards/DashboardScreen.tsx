import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";
import { SlashIcon, BookIcon, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getBooks } from "@/services/book";
import { getCategories } from "@/services/category";

function Dashboard() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();
  const [booksCount, setBooksCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [booksResponse, categoriesResponse] = await Promise.all([
          getBooks(),
          getCategories(),
        ]);
        setBooksCount(booksResponse.length);
        setCategoriesCount(categoriesResponse.length);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isMobile) return null;

  const dashboardCards = [
    {
      icon: Package,
      label: "Categories",
      value: loading ? "..." : categoriesCount.toLocaleString(),
      description: "Total book categories",
    },
    {
      icon: BookIcon,
      label: "Books",
      value: loading ? "..." : booksCount.toLocaleString(),
      description: "Total books in inventory",
    },
  ];

  return (
    <>
      <div
        className={clsx(
          "h-screen transition-all duration-300 mt-20",
          isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28"
        )}
      >
        <div className="pl-8 pt-4 pr-8">
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

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {dashboardCards.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <Card
                  key={index}
                  className="w-80 transition-all duration-300 hover:shadow-lg hover:bg-neutral-50 cursor-pointer dark:bg-neutral-950 dark:border-neutral-800"
                >
                  <CardHeader className="pb-4">
                    <div className="p-3 bg-gray-100 rounded-xl w-12 mb-5 transition-all duration-300 dark:bg-neutral-900">
                      <IconComponent className="h-5 text-gray-600 transition-colors duration-300 dark:text-white" />
                    </div>
                    <div className="flex flex-col">
                      <CardDescription className="text-md font-medium text-gray-600 dark:text-white">
                        {item.label}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white">
                        {item.value}
                      </CardTitle>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {/* end dashboard cards */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
