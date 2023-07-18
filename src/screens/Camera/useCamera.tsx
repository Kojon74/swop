import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Camera } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";

// import useUploadImage from "../../hooks/useUploadImage";
import { useGlobalContext } from "../../context/GlobalContext";
import { FormikErrors } from "formik";
import { SIZES } from "../../utils/constants";

const FILENAME = "useCamera";

type FormValueTypes = {
  images: string[];
  title: string;
  desc: string;
  price: number | undefined;
  size: SIZES | undefined;
  color: string;
};

const useCamera = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { images, setImages } = route.params as {
    images: string[];
    setImages: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<FormValueTypes>>;
  };
  const { cameraPermission, setCameraPermission } = useGlobalContext();

  const [backCamera, setBackCamera] = useState<boolean>(true);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [done, setDone] = useState(false);
  const [tempImage, setTempImage] = useState<string>("");

  const cameraRef = useRef<Camera>(null);

  //   const { uploadSelfies } = useUploadImage();

  useEffect(() => {
    if (cameraPermission === undefined)
      (async () => {
        try {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setCameraPermission(status === "granted");
        } catch (error) {
          console.error(`${FILENAME}: ${error}`);
        }
      })();
  }, [cameraPermission]);

  useEffect(() => {
    if (done && !isPreview) {
      setIsPreview(true);
      setDone(false);
    } else if (done) {
    }
  }, [done]);

  const takePic = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      // TypeScript error if I don't do this
      // TODO: Show error message if photo is undefined or null
      if (photo) {
        setTempImage(photo.uri);
        setDone(true);
      }
    }
  };

  const handleUsePicture = () => {
    console.log(images);
    console.log([...images, tempImage]);

    setImages("images", [...images, tempImage]);
    navigation.navigate("SellItem");
  };

  return {
    backCamera,
    cameraPermission,
    cameraRef,
    isPreview,
    tempImage,
    handleUsePicture,
    setBackCamera,
    setIsPreview,
    takePic,
  };
};

export default useCamera;
