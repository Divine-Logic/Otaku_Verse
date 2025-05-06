import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MediaTypeProvider } from "./hooks/useMediaType.tsx";
import { ThemeProvider } from "./hooks/useTheme.tsx";
import Routers from "./routes/Routers.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MediaTypeProvider>
        <ThemeProvider>
          <Routers />
        </ThemeProvider>
      </MediaTypeProvider>
    </QueryClientProvider>
  );
}

export default App;
