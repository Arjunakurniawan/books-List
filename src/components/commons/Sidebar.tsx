// import {
//   BiArrowBack,
//   BiArrowToRight,
//   BiBook,
//   BiEnvelope,
//   BiHelpCircle,
//   BiHomeAlt,
//   BiSolidPurchaseTag,
// } from "react-icons/bi";

import {
  BiArrowBack,
  BiArrowToRight,
  BiBook,
  BiEnvelope,
  BiHelpCircle,
  BiHomeAlt,
  BiSliderAlt,
  BiSolidPurchaseTag,
} from "react-icons/bi";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from "../ui/sidebar";
import { useState } from "react";

function SideBarNavigation() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <>
      <SidebarProvider className="relative">
        <Sidebar
          className={`w-60 h-dvh bg-neutral-900 text-white transition-all duration-300 ${
            collapsed ? "w-28" : "w-60"
          }`}
        >
          <SidebarHeader className="sticky bg-neutral-900">
            <h1
              className={`text-white font-sans text-2xl pt-4 pl-8 pr-32 pb-4 transition-all duration-300 ${
                collapsed ? "hidden" : "inline"
              }`}
            >
              booklist.
            </h1>
          </SidebarHeader>

          <SidebarContent className="overflow-y-auto bg-neutral-900">
            <SidebarGroup className="flex flex-col pt-4 px-8 gap-2">
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 active:bg-neutral-600 transition-all cursor-pointer">
                <BiHomeAlt size={20} className="text-white" />
                <span
                  className={`text-white uppercase text-sm transition-all  duration-300 ${
                    collapsed ? "hidden" : "inline"
                  }`}
                >
                  dashboard
                </span>
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 active:bg-neutral-600 transition-all cursor-pointer">
                <BiBook size={20} className="text-white" />
                <span
                  className={`text-white uppercase text-sm transition-all duration-300 ${
                    collapsed ? "hidden" : "inline"
                  }`}
                >
                  book lists
                </span>
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 active:bg-neutral-600 transition-all cursor-pointer">
                <BiSolidPurchaseTag size={20} className="text-white" />
                <span
                  className={`text-white uppercase text-sm transition-all duration-300  ${
                    collapsed ? "hidden" : "inline"
                  }`}
                >
                  category lists
                </span>
              </a>
            </SidebarGroup>
            <SidebarGroup className="flex flex-col pt-4 px-8 gap-2">
              <h3 className="uppercase text-neutral-700 -ml-3">settings</h3>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 active:bg-neutral-600  transition-all cursor-pointer">
                <BiEnvelope size={20} className="text-white" />
                <span
                  className={`text-white uppercase text-sm transition-all duration-300 ${
                    collapsed ? "hidden" : "inline"
                  }`}
                >
                  messages
                </span>
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 active:bg-neutral-600 transition-all cursor-pointer">
                <BiSliderAlt size={20} className="text-white" />
                <span
                  className={`text-white uppercase text-sm transition-all duration-300 ${
                    collapsed ? "hidden" : "inline"
                  }`}
                >
                  settings
                </span>
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-800 active:bg-neutral-600  transition-all cursor-pointer">
                <BiHelpCircle size={20} className="text-white" />
                <span
                  className={`text-white uppercase text-sm transition-all duration-300 ${
                    collapsed ? "hidden" : "inline"
                  }`}
                >
                  help centre
                </span>
              </a>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="sticky p-4 bg-neutral-900">
            <p className="text-sm text-center">ArjunaKrn© 2025</p>
          </SidebarFooter>
        </Sidebar>

        {/* Tombol buat toggle sidebar */}
        <button
          onClick={toggleSidebar}
          className={`absolute top-4 z-20 transition-all duration-300 bg-white rounded w-10 h-10 shadow-md
    ${collapsed ? "left-24" : "left-56"}`}
        >
          {collapsed ? (
            <BiArrowToRight className="mx-auto" />
          ) : (
            <BiArrowBack className="mx-auto" />
          )}
        </button>
      </SidebarProvider>
    </>
  );
}

export default SideBarNavigation;
