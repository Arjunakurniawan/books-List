import { useState } from "react";
import { Menu, Bell, Mail, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "../ui/sheet";
import { ModeToggle } from "./mode-toggle";
import avatar from "../../assets/images/kim jong un.jpg";
import { Link } from "react-router-dom";

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/" },
    { label: "Books", href: "/books" },
    { label: "Categories", href: "/categories" },
  ];

  return (
    <header className="lg:hidden flex items-center justify-between p-3 px-4 shadow-md fixed top-4 left-4 right-4 z-20 bg-white dark:bg-neutral-950 rounded-2xl">
      {/* Left - Hamburger */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="dark:text-neutral-300">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 dark:bg-neutral-950">
          {/* Header Drawer */}
          <div className="flex justify-between mb-8">
            <h2 className="text-xl font-bold">Books.</h2>
            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="dark:text-neutral-300"
              ></Button>
            </SheetClose>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2">
            {menuItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link to={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base font-normal dark:hover:bg-neutral-800"
                  >
                    {item.label}
                  </Button>
                </Link>
              </SheetClose>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t dark:border-neutral-800" />

          {/* User Profile and Logout */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3 px-2 py-2">
              <img
                src={avatar}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">Kim Jong Un</p>
                <p className="text-xs text-neutral-500">Admin judol</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full justify-start text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              LogOut
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Center - Title */}
      <h1 className="flex-1 text-center font-semibold text-neutral-900 dark:text-white">
        Books.
      </h1>

      {/* Right - Icons */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="dark:text-neutral-300">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="dark:text-neutral-300">
          <Mail className="h-5 w-5" />
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
}

export default MobileNav;
