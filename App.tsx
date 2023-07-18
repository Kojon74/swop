import { GlobalProvider } from "./src/context/GlobalContext";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  );
}
