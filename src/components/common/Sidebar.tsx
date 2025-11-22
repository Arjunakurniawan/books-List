import clsx from "clsx";
import {
  LayoutDashboard,
  Mail,
  Settings,
  HelpCircle,
  BookIcon,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BiArrowBack, BiArrowFromLeft } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSidebar } from "../ui/sidebar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BookIcon, label: "Book", path: "/books" },
  { icon: Tag, label: "Category", path: "/categories" },
];

const settingItems = [
  { icon: Mail, label: "Messages" },
  { icon: Settings, label: "Setting" },
  { icon: HelpCircle, label: "Help Centre" },
];

function Sidebar() {
  const { state, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <aside
      className={clsx(
        "fixed left-0 top-0 z-40 h-screen bg-neutral-900 font-sans transition-all duration-300 text-black",
        state === "expanded" ? "w-60" : "w-28"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <h1
          className={clsx(
            "text-2xl pt-4 pl-5 pr-32 font-bold text-white",
            state === "collapsed" && "hidden"
          )}
        >
          Books.
        </h1>
        {state === "collapsed" ? (
          <h1 className="font-bold text-2xl pt-4 pl-8 pr-3 text-white">B.</h1>
        ) : null}
        <Button
          size="icon"
          variant="outline"
          onClick={toggleSidebar}
          className="absolute top-4 -right-6 w-10 h-10 shadow-md dark:text-white"
        >
          {state === "expanded" ? <BiArrowBack /> : <BiArrowFromLeft />}
        </Button>
      </div>

      <nav className="px-8 space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          return (
            <TooltipProvider key={label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={path}>
                    <Button
                      className={clsx(
                        "bg-neutral-900 w-full h-12 justify-start gap-4 font-normal my-1 hover:bg-neutral-800 dark:text-white"
                      )}
                    >
                      <Icon size={24} />
                      {state === "expanded" && label}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {state === "collapsed" && (
                  <TooltipContent side="right">{label}</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </nav>

      <div className="my-3 mx-7 uppercase text-neutral-700 ">
        <p className={clsx("text-base", state === "collapsed" && "opacity-0")}>
          Settings
        </p>
      </div>

      <div className="px-8 space-y-2">
        {settingItems.map(({ icon: Icon, label }) => (
          <TooltipProvider key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={clsx(
                    "bg-neutral-900 w-full h-12 justify-start gap-4 font-normal my-1 hover:bg-neutral-800 dark:text-white"
                  )}
                >
                  <Icon size={24} />
                  {state === "expanded" && label}
                </Button>
              </TooltipTrigger>
              {state === "collapsed" && (
                <TooltipContent side="right">{label}</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
