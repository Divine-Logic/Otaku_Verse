import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type TabButtonProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
};

function TabButton({ tabs, activeTab, setActiveTab, isDark }: TabButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="mt-8 relative">
      <div className="relative md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-full flex items-center justify-between py-3 px-4 bg-primary-600 text-white shadow transition-all duration-300  ${isMenuOpen ? "rounded-t-lg" : "rounded-lg"} `}
        >
          <span className="font-semibold tracking-wide text-base">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </span>
          <IoIosArrowDown
            className={`text-xl transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`absolute z-20 w-full left-0 bg-primary-600  overflow-hidden shadow-lg transition-all duration-300 ${
            isMenuOpen ? "max-h-[500px] opacity-100 rounded-b-lg" : "max-h-0 opacity-0 pointer-events-none rounded--lg"
          }`}
        >
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? "bg-primary-500 text-white"
                  : "hover:bg-primary-500 text-white"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <nav className="hidden md:flex gap-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-1 border-b-2 font-medium text-lg ${
              activeTab === tab
                ? "border-primary-500 text-primary-500"
                : isDark
                  ? "border-transparent text-zinc-400 hover:text-white hover:border-white"
                  : "border-transparent text-zinc-400 hover:text-primary-600 hover:border-primary-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default TabButton;
