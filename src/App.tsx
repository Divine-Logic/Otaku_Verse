import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ThemeProvider } from "./hooks/useTheme.tsx";
import SplashScreen from "./pages/splashscreen/SplashScreen.tsx";
import Routers from "./routes/Routers.tsx";

const queryClient = new QueryClient();

function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0].type;
    const hasShownSplash = sessionStorage.getItem("hasShownSplash");

    if (!hasShownSplash || navType === "reload") {
      setShowSplash(true);
      sessionStorage.setItem("hasShownSplash", "true");
      setTimeout(() => {
        setShowSplash(false);
        setReady(true);
      }, 3000);
    }
    else {
      setReady(true);
    }
  }, []);

  if (!ready) {
    return showSplash ? <SplashScreen /> : null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Routers />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
