import { StyleSheet } from "react-native";
import { colors } from "./colors";

const fontFamily = "Chalkboard SE";

const fonts = StyleSheet.create({
  h1: { fontFamily, fontSize: 22, fontWeight: "600" },
  h6: { fontFamily, fontSize: 18, fontWeight: "500" },
  p: { fontFamily, fontSize: 16, fontWeight: "400" },
  ps: { fontFamily, fontSize: 12, fontWeight: "300" },
  error: { fontFamily, fontSize: 16, fontWeight: "400", color: colors.red },
});

export { fonts };
