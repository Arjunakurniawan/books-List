import AppBreadcrumb from "@/components/common/AppBreadcrumb";
import BookTable from "@/components/books/bookTables/BookTable";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";

function BookScreen() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <div
      className={clsx(
        "h-screen transition-all duration-300 mt-5",
        isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28",
      )}
    >
      <div className="pt-4 lg:ml-5 px-6">
        <h1 className="text-4xl">List books.</h1>
        <AppBreadcrumb to="/books">Books</AppBreadcrumb>
        <BookTable />
      </div>
    </div>
  );
}

export default BookScreen;
