import { ThemeProvider } from "@/components/common/theme-provider";

import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}
