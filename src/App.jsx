import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className={`flex h-screen text-gray-700`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Header />
          <div className="m-2">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
export default App;
