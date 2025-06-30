import {
  BiArrowBack,
  BiArrowToRight,
  BiBook,
  BiEnvelope,
  BiHelpCircle,
  BiHomeAlt,
  BiSolidPurchaseTag,
} from "react-icons/bi";

import { Button } from "../ui/button";
import { useState } from "react";

function SidebarOld() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  return (
    <>
      <div
        className={`bg-neutral-900 h-dvh relative transition-all duration-300 ${
          isCollapsed ? "w-28" : "w-64"
        }`}
      >
        <Button
          variant={"secondary"}
          className="rounded absolute top-3 -right-6 hover:bg-gray-300 w-10 h-10 transition-all"
          onClick={toggleSidebar}
        >
          {isCollapsed ? <BiArrowToRight /> : <BiArrowBack />}
        </Button>
        <h1 className="text-white font-sans text-2xl pt-4 pl-8 pr-32 pb-4">
          BooksList.
        </h1>

        {/* main link */}
        <div className="flex flex-col pt-4 px-8 gap-2">
          <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 active:bg-neutral-600 transition-all cursor-pointer">
            <BiHomeAlt size={20} className="text-white" />
            <span className="text-white uppercase text-sm">dashboard</span>
          </a>
          <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 active:bg-neutral-600 transition-all cursor-pointer">
            <BiBook size={20} className="text-white" />
            <span className="text-white uppercase text-sm">book lists</span>
          </a>
          <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 active:bg-neutral-600 transition-all cursor-pointer">
            <BiSolidPurchaseTag size={20} className="text-white" />
            <span className="text-white uppercase text-sm">category lists</span>
          </a>
        </div>

        <div className="flex flex-col pt-4 px-8 gap-2">
          {/*  setting link*/}
          <h3 className="uppercase text-neutral-700">settings</h3>
          <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 active:bg-neutral-600  transition-all cursor-pointer">
            <BiEnvelope size={20} className="text-white" />
            <span className="text-white uppercase text-sm">messages</span>
          </a>
          <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 active:bg-neutral-600 transition-all cursor-pointer">
            <BiBook size={20} className="text-white" />
            <span className="text-white uppercase text-sm">settings</span>
          </a>
          <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-700 active:bg-neutral-600  transition-all cursor-pointer">
            <BiHelpCircle size={20} className="text-white" />
            <span className="text-white uppercase text-sm">help centre</span>
          </a>
        </div>
      </div>
    </>
  );
}

export default SidebarOld;
