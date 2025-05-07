import type { SetStateAction } from "react";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

import type { SwitchToggleButton } from "../../lib/types/AnimeTypes.ts";

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SwitchToggle({ option1, option2, onChange }: SwitchToggleButton) {
  const [selected, setSelected] = useState(option1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen);
    }
    else {
      const newValue = selected === option1 ? option2 : option1;
      setSelected(newValue);
      onChange(newValue);
    }
  };

  const handleOptionSelect = (option: SetStateAction<string>) => {
    setSelected(option);
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mx-auto" ref={containerRef}>
      <div className="md:hidden block">
        <div
          className="flex h-12 w-full cursor-pointer items-center justify-between rounded-lg px-4 bg-primary-600"
          onClick={handleToggle}
        >
          <div className="text-white font-semibold">{selected}</div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <IoChevronDown className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 bg-primary-600 rounded-lg "
          >
            {[option1, option2].map(opt => (
              <div
                key={opt}
                className="p-3 hover:bg-primary-500 cursor-pointer"
                onClick={() => handleOptionSelect(opt)}
              >
                <span className="text-white font-semibold">{opt}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="relative hidden md:block">
        <div
          className="relative flex h-12 w-52 cursor-pointer items-center justify-between rounded-lg p-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 shadow-lg overflow-hidden"
          onClick={handleToggle}
          role="switch"
          aria-checked={selected === option1}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleToggle();
            }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-500/50 via-primary-600/20 to-primary-600/20"
            animate={{ x: ["0%", "100%", "0%"], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {[option1, option2].map(opt => (
            <motion.div
              key={opt}
              className={classNames(
                "relative z-10 px-6 py-2 text-center text-sm font-semibold transition-colors duration-200 rounded-lg",
                selected === opt ? "text-white bg-primary-700 " : "text-white/80",
              )}
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >

              {opt}
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}
