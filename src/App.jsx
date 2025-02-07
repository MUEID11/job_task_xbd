import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      <div className="flex h-screen text-gray-700">
        {/* Sidebar for large screens */}
        <aside className="hidden lg:block">
          <Sidebar />
        </aside>

        {/* Sidebar for small screens */}
        {isSidebarOpen && (
          <aside className="fixed inset-0 z-10 lg:hidden">
            <div className="w-64 h-full bg-white relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                onClick={toggleSidebar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Sidebar />
            </div>
          </aside>
        )}

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {/* Header with sidebar toggle */}
          <Header onToggleSidebar={toggleSidebar} />
          <div className="m-2">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
