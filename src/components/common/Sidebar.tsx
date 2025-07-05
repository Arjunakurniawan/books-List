import { useState } from "react";
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

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BookIcon, label: "Book Lists", path: "/books" },
  { icon: Tag, label: "Category lists", path: "/categories" },
];

const settingItems = [
  { icon: Mail, label: "Messages" },
  { icon: Settings, label: "Setting" },
  { icon: HelpCircle, label: "Help Centre" },
];

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside
      className={clsx(
        "relative h-screen bg-neutral-900 font-sans transition-all duration-300  text-white",
        isExpanded ? "w-60" : "w-28"
      )}
    >
      <div className="flex items-center justify-between p-4">
        <h1
          className={clsx("text-2xl pt-4 pl-5 pr-32", !isExpanded && "hidden")}
        >
          BooksList.
        </h1>
        <Button
          size="icon"
          variant="secondary"
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 -right-6 w-10 h-10"
        >
          {isExpanded ? <BiArrowBack /> : <BiArrowFromLeft />}
        </Button>
      </div>

      <nav className="px-8 space-y-2">
        {navItems.map(({ icon: Icon, label, path }) => (
          <TooltipProvider key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={path}>
                  <Button
                    variant="ghost"
                    className="w-full h-12 justify-start gap-4 font-normal"
                  >
                    <Icon size={24} />
                    {isExpanded && label}
                  </Button>
                </Link>
              </TooltipTrigger>
              {!isExpanded && (
                <TooltipContent side="right">{label}</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      <div className="my-3 mx-7 uppercase text-neutral-700 ">
        <p className={clsx("text-base", !isExpanded && "opacity-0")}>
          Settings
        </p>
      </div>

      <div className="px-8 space-y-2">
        {settingItems.map(({ icon: Icon, label }) => (
          <TooltipProvider key={label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full h-12 justify-start gap-4 font-normal"
                >
                  <Icon size={24} />
                  {isExpanded && label}
                </Button>
              </TooltipTrigger>
              {!isExpanded && (
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
