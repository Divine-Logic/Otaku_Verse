import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SwitchToggle({
  option1,
  option2,
  onChange,
}: {
  option1: string;
  option2: string;
  onChange: (val: string) => void;
}) {
  const [selected, setSelected] = useState(option1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rightPosition, setRightPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const optionWidth = containerWidth / 2;
      setRightPosition(optionWidth);
    }
  }, []);

  const handleToggle = () => {
    const newValue = selected === option1 ? option2 : option1;
    setSelected(newValue);
    onChange(newValue);
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        className="relative flex h-12 w-52 cursor-pointer items-center justify-between rounded-lg p-1.5 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden"
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          animate={{
            x: ["0%", "100%", "0%"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute h-9 w-24 rounded-lg bg-white/10 backdrop-blur-sm"
          animate={{
            x: selected === option1 ? 3 : rightPosition - 3,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >

          <motion.div
            className="absolute inset-0 rounded-lg bg-primary-700/100"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* Option 1 */}
        <motion.div
          className={classNames(
            "relative z-10 w-24 text-center text-sm font-semibold transition-colors duration-200",
            selected === option1 ? "text-white" : "text-white/70",
          )}
          animate={{
            scale: selected === option1 ? [1, 1.1, 1] : 1,
            y: selected === option1 ? [0, -2, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {option1}
        </motion.div>

        {/* Option 2 */}
        <motion.div
          className={classNames(
            "relative z-10 w-24 text-center text-sm font-semibold transition-colors duration-200",
            selected === option2 ? "text-white" : "text-white/70",
          )}
          animate={{
            scale: selected === option2 ? [1, 1.1, 1] : 1,
            y: selected === option2 ? [0, -2, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {option2}
        </motion.div>

        {/* Particle effects */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array.from({ length: 12 })].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white/30"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    x: [0, Math.random() * 120 - 60],
                    y: [0, Math.random() * 120 - 60],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1 + Math.random(),
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 rounded-lg bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: selected === option1 ? [0, 2, 0] : [0, 2, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 0.5,
            times: [0, 0.5, 1],
          }}
        />

        {/* Corner accents */}
        <motion.div
          className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/20 rounded-tl-lg"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/20 rounded-br-lg"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
    </div>
  );
}
