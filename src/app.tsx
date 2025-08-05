import Sidebar from "./components/common/Sidebar";
import TopBar from "./components/common/TopBar";
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
            <main>
              <RoutesApp />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
