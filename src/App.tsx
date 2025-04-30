import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "./hooks/useTheme.tsx";
import Routers from "./routes/Routers.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Routers />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
