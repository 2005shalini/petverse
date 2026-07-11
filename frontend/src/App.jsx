import AppRoutes from "./routes/AppRoutes";
import { AIContextProvider } from "./contexts/AIContext";

function App() {
  return (
    <AIContextProvider>
      <AppRoutes />
    </AIContextProvider>
  );
}

export default App;