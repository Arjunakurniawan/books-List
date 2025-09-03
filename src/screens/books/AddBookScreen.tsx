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
import { SlashIcon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddBookScreen() {
  const isMobile = useIsMobile();
  const { state } = useSidebar();

  return (
    <div
      className={clsx(
        "h-screen transition-all duration-300 mt-12",
        isMobile ? "m-0" : state === "expanded" ? "ml-60" : "ml-28"
      )}
    >
      <div className="pt-4">
        <Link to="/books" className="relative top-8 left-7">
          <ArrowLeft size={32} />
        </Link>
        <h1 className="text-4xl pl-20">New Book.</h1>
        <Breadcrumb className="pt-8 pl-8">
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
                <Link to="/books">Books</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/book/create">New Book</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Add Book Form */}
    </div>
  );
}
