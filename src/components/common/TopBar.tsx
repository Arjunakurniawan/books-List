import {
  Bell,
  Mail,
  ChevronDownIcon,
  Bookmark,
  Receipt,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import AvatarImg from "@/assets/images/circle-user-regular-full.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ModeToggle } from "./mode-toggle";
import { useEffect, useState } from "react";
import { getProfile, logoutUser } from "@/services/auth_service";
import type { User } from "@/types/ApiResponse.type";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileUser = async () => {
      try {
        const response = await getProfile();
        setUserData(response.data);
      } catch (error) {
        throw error;
      }
    };

    fetchProfileUser();
  }, []);

  const handleButtonLoggout = async () => {
    try {
      await logoutUser();
      navigate("/auth/login");
    } catch (error) {
      alert("logout error");
    }
  };

  return (
    <header className="hidden md:flex p-3 px-8 shadow-sm justify-end fixed top-0 left-0 right-0 z-20 bg-white dark:bg-neutral-950">
      <div className="flex items-center gap-2">
        <Button
          variant="topbar"
          size="icon"
          className="px-2 border dark:border-neutral-800"
        >
          <Bell />
        </Button>
        <Button
          variant="topbar"
          size="icon"
          className="px-2 border dark:border-neutral-800"
        >
          <Mail />
        </Button>
        <ModeToggle />

        {/* topBar user profile dropdown */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="topbar"
              className="flex items-center gap-2 p-2 border dark:border-neutral-800"
            >
              <img
                src={AvatarImg}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="font-normal text-neutral-500">
                {userData?.username}
              </p>
              <ChevronDownIcon className="w-4 h-4 text-neutral-500" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-72 p-0 bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 shadow-md rounded-lg overflow-hidden"
          >
            {/* Header: Avatar, Name, Email */}
            <div className="flex items-center gap-3 p-4">
              {/* Wadah Avatar + Titik Online */}
              <div className="relative">
                <img
                  src={AvatarImg}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover"
                />
                {/* Titik Hijau Online */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-neutral-950 rounded-full"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-base leading-none mb-1.5 text-black dark:text-white">
                  {userData?.username}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 leading-none">
                  {userData?.email}
                </span>
              </div>
            </div>

            {/* Garis Pemisah (Divider) */}
            <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
            
            <div className="p-1.5">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                <UserIcon className="w-4 h-4" />
                My Profile
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                <Bookmark className="w-4 h-4" />
                My Subscription
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                <Receipt className="w-4 h-4" />
                My Invoice
              </a>
            </div>

            <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

            {/* Menu Group 2: Settings */}
            <div className="p-1.5">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-sm font-medium text-neutral-700 dark:text-neutral-200"
              >
                <Settings className="w-4 h-4" />
                Account Settings
              </a>
            </div>

            <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

            {/* Menu Group 3: Signout (Warna Merah) */}
            <div className="p-1.5">
              <button
                onClick={handleButtonLoggout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors text-sm font-medium text-red-600 dark:text-red-500"
              >
                <LogOut className="w-4 h-4" />
                Signout
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
}

export default TopBar;
