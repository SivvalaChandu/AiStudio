import { useState, useEffect } from "react";
import { FiMessageSquare, FiBook, FiMenu, FiActivity } from "react-icons/fi";
import { CgGym } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import ChatComponent from "./components/ChatComponent";
import RecipeGenerator from "./components/RecipeGenerator";
import WorkoutGenerator from "./components/WorkoutGenerator";
import Landing from "./components/Landing";
import useMediaQuery from "./hooks/useMediaQuery";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const navItems = [
    { id: "home", icon: <CgGym className="text-xl" />, label: "AI Studio" },
    { id: "chat", icon: <FiMessageSquare />, label: "AI Chat" },
    { id: "recipe", icon: <FiBook />, label: "Recipe Generator" },
    { id: "workout", icon: <FiActivity />, label: "Workout Generator" },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-inter">
      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 h-full transition-all duration-300 flex flex-col z-50
          ${sidebarOpen ? "w-64" : "w-[-10] -translate-x-full md:translate-x-0"}
          bg-slate-800/80 backdrop-blur-lg border-r border-slate-700/50`}
      >
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                AI Studio
              </span>
            )}
            <RxCross1
              onClick={() => setSidebarOpen(false)}
              className="size-6 text-slate-400 hover:text-slate-200 p-1 rounded-lg md:hidden cursor-pointer transition-colors"
            />
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all
                ${
                  activeTab === item.id
                    ? "bg-cyan-500/20 text-cyan-400 font-medium"
                    : "text-slate-300 hover:bg-slate-700/30"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-4 mt-4 flex items-center px-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800/50 rounded-xl md:hidden"
          >
            <FiMenu className="text-xl text-slate-300" />
          </button>
          <span className="font-bold text-lg bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            AI Studio
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-900/20">
          {activeTab === "home" && <Landing setActiveTab={setActiveTab} />}
          {activeTab === "chat" && <ChatComponent />}
          {activeTab === "recipe" && <RecipeGenerator />}
          {activeTab === "workout" && <WorkoutGenerator />}
        </main>
      </div>
    </div>
  );
};

export default App;
