import { LogBox } from "react-native";
import { GlobalProvider } from "./src/context/GlobalContext";
import Navigation from "./src/navigation/Navigation";

export default function App() {
  LogBox.ignoreLogs([
    "Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property. This API will be removed in SDK 45.",
  ]);

  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  );
}
