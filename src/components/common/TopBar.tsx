import { Bell, Mail } from "lucide-react";
import { Button } from "../ui/button";
import avatar from "../../assets/images/kim jong un.jpg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ModeToggle } from "../mode-toggle";

function TopBar() {
  return (
    <header className="flex p-3 px-8 shadow-sm justify-end fixed top-0 left-0 right-0 z-20 bg-white dark:bg-neutral-900">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="px-2">
          <Bell />
        </Button>
        <Button variant="outline" size="icon" className="px-2">
          <Mail />
        </Button>
        <ModeToggle />

        <Select>
          <SelectTrigger className="flex gap-2 px-3 py-1 border rounded-md focus:outline-none">
            <img
              src={avatar}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <SelectValue placeholder="Kim Jong Un" />
          </SelectTrigger>

          <SelectContent align="end">
            <SelectItem value="profile">Profile</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
            <SelectItem value="logout">Logout</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}

export default TopBar;
