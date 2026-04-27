import CategoryTable from "@/components/categories/CategoryTables/CategoryPage";
import AppBreadcrumb from "@/components/common/AppBreadcrumb";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";

function CategoryScreen() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <>
      <div
        className={clsx(
          "h-screen transition-all duration-300 lg:mt-5 mt-10",
          isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28",
        )}
      >
        <div className="pt-2 lg:pt-4 px-6 lg:ml-5">
          <h1 className="text-4xl">List Category.</h1>
          <AppBreadcrumb to="/categories">Categories</AppBreadcrumb>
          <CategoryTable />
        </div>
      </div>
    </>
  );
}

export default CategoryScreen;
