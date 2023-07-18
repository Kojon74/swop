import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import CustomHeader from "../../components/atoms/CustomHeader";
import useCamera from "./useCamera";
import { fonts } from "../../utils/fonts";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CameraScreen = () => {
  const navigation = useNavigation();
  const {
    backCamera,
    cameraPermission,
    cameraRef,
    isPreview,
    tempImage,
    handleUsePicture,
    setBackCamera,
    setIsPreview,
    takePic,
  } = useCamera();
  if (cameraPermission === undefined) {
    return <View />;
  }

  if (cameraPermission === false) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader text="" />
        <View style={styles.container}>
          <Text style={fonts.h1}>
            Give Clearo access to the camera to log your selfies
          </Text>
          <Text style={[fonts.p, { marginTop: 50 }]}>
            {"Settings > Clearo > Allow Clearo to Access Camera"}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const cameraScreen = () => (
    <SafeAreaView style={styles.cameraContainer}>
      <View />
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={backCamera ? CameraType.back : CameraType.front}
      ></Camera>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={navigation.goBack}>
          <FontAwesome5 name="times" solid size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={takePic}>
          <View style={styles.outerCircle}>
            <View style={styles.innerCircle} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setBackCamera((prev) => !prev)}>
          <FontAwesome5 name="sync-alt" solid size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const previewScreen = () => (
    <SafeAreaView style={styles.cameraContainer}>
      <View />
      <Image source={{ uri: tempImage }} style={styles.camera} />
      <View
        style={[
          styles.buttonRow,
          { justifyContent: "space-between", marginHorizontal: 10, height: 75 },
        ]}
      >
        <TouchableOpacity onPress={() => setIsPreview(false)}>
          <Text style={[fonts.p, styles.buttonText]}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleUsePicture}>
          <Text style={[fonts.p, styles.buttonText]}>Use</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  return (
    <View style={styles.backgroundContainer}>
      {isPreview ? previewScreen() : cameraScreen()}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10 },
  backgroundContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  cameraContainer: { flex: 1, justifyContent: "space-around" },
  camera: { height: ((width * 4) / 3) | 0 },
  faceOutline: {
    height: height - 225,
    width: width,
    alignSelf: "center",
    opacity: 0.5,
    resizeMode: "contain",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonText: { color: "white", marginHorizontal: 10 },
  outerCircle: {
    height: 75,
    width: 75,
    borderRadius: 75,
    borderColor: "white",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 62,
    width: 62,
    borderRadius: 31,
    backgroundColor: "white",
  },
});
