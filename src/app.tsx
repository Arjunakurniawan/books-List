import Sidebar from "./components/common/Sidebar";
import TopBar from "./components/common/TopBar";
import MobileNav from "./components/common/MobileNav";
import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import RoutesApp from "./routes/route";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <SidebarProvider>
        <div className="flex">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <TopBar />
            <MobileNav />
            <main className="pt-16">
              <RoutesApp />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
