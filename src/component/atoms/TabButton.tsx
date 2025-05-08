import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type TabButtonProps = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
};

const TabButton: React.FC<TabButtonProps> = ({ tabs, activeTab, setActiveTab, isDark }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="mt-8 relative">
      <div className="md:hidden ">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-full flex items-center justify-between py-3 px-4 bg-primary-600 `}
        >
          <div className="font-medium rounded-lg">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </div>
          <IoIosArrowDown />
        </button>
        {isMenuOpen && (
          <div className="absolute z-10 w-full left-0 bg-primary-600 ">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 ${
                  activeTab === tab
                    ? "bg-primary-500"
                    : "bg-primary-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        )}
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
};

export default TabButton;
