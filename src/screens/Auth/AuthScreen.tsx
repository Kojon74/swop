import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AuthProviders from "./AuthProviders";
import AuthTerms from "./AuthTerms";
import { colors } from "../../utils/colors";

const iconPath = "../../../assets/icon.png";

const AuthScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SafeAreaView style={styles.imgCont}>
          <Image source={require(iconPath)} style={styles.img} />
        </SafeAreaView>
        <SafeAreaView style={styles.bottomContOuter}>
          <View style={styles.bottomCont}>
            <View style={styles.headerCont}>
              <Text style={styles.header}>Get started with swop!</Text>
              <Text style={styles.subHeader}>Save money by trading!</Text>
            </View>
            <AuthProviders />
            <AuthTerms />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgCont: { flex: 1 },
  img: { height: "100%", width: "100%", resizeMode: "contain" },
  bottomContOuter: {
    flex: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  bottomCont: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headerCont: { marginVertical: 10 },
  header: {
    fontSize: 23,
    fontWeight: "600",
    color: "#444444",
  },
  subHeader: { marginTop: 10, fontSize: 19, color: "#888888" },
  forgotPassBtn: { alignSelf: "flex-end" },
  forgotPass: { color: colors.primary, marginBottom: 10 },
  error: {
    color: "red",
    marginLeft: 10,
    fontSize: 15,
  },
});
