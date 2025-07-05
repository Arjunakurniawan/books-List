import Sidebar from "./components/common/Sidebar";
import TopBar from "./components/common/TopBar";
import RoutesApp from "./routes/route";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="bg-neutral-100">
          <RoutesApp />
        </main>
      </div>
    </div>
  );
}

export default App;
