import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import splashscreenlogo1 from "../../assets/logo/icon2.png";
import splashscreenlogo2 from "../../assets/logo/namegreen.png";
import splashscreenlogo3 from "../../assets/logo/slogan.png";

function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="flex flex-col w-full items-center justify-center h-full select-none overflow-y-hidden absolute z-50 bg-black gap-[1rem]"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={splashscreenlogo1}
            alt="Splash Screen Logo"
            className="max-w-[10rem]  md:max-w-[25rem] lg:max-w-[28rem] xl:max-w-[28rem] 2xl:max-w-[30rem]"
            initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 1.2, rotate: 500 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <motion.img
            src={splashscreenlogo2}
            alt="Splash Screen Logo"
            className="max-w-[15rem] sm:max-w-[25rem] md:max-w-[25rem] lg:max-w-[28rem] xl:max-w-[28rem] 2xl:max-w-[30rem]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.img
            src={splashscreenlogo3}
            alt="Splash Screen Logo"
            className="max-w-[15rem] sm:max-w-[25rem] md:max-w-[25rem] lg:max-w-[28rem] xl:max-w-[28rem] 2xl:max-w-[30rem]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
