import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBooks } from "@/hooks/books/useBooks";
import { useCategories } from "@/hooks/categories/useCategories";

import { BookIcon, Tag, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardCards() {
  const { data: categoriesCount, isLoading: loadingCountCategories } =
    useCategories();
  const { data: booksCount, isLoading: loadingCountBooks } = useBooks();

  const dashboardCards = [
    {
      icon: Tag,
      label: "Categories",
      value: loadingCountCategories ? "..." : categoriesCount?.total || 0,
      change: "+2.15%",
      trend: "up",
      path: "/categories",
    },
    {
      icon: BookIcon,
      label: "Books",
      value: loadingCountBooks ? "..." : booksCount?.total || 0,
      change: "+5.23%",
      trend: "up",
      path: "/books",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {dashboardCards.map((item, index) => {
        const IconComponent = item.icon;
        const isPositive = item.trend === "up";

        return (
          <Link to={item.path}>
            <Card
              key={index}
              className="bg-white rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer p-6 dark:bg-neutral-950 dark:border-neutral-800"
            >
              <CardHeader className="pb-4 p-0">
                <div className="flex items-center justify-between mb-4">
                  <CardDescription className="text-sm font-medium text-gray-600 dark:text-white">
                    {item.label}
                  </CardDescription>
                  <div className="p-2 bg-gray-100 rounded-xl dark:bg-neutral-900 border ">
                    <IconComponent className="h-5 w-5 text-gray-600 dark:text-neutral-300" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
                    {item.value}
                  </CardTitle>
                  {item.change && (
                    <div
                      className={`flex items-center text-sm font-medium ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <TrendingUp
                        className={`h-4 w-4 mr-1 ${
                          !isPositive ? "rotate-180" : ""
                        }`}
                      />
                      {item.change}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
