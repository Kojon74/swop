import {
  ActionSheetIOS,
  Button,
  Image,
  InputAccessoryView,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomTextInput from "../../components/atoms/CustomTextInput";
import { SIZES } from "../../utils/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { Formik, FormikErrors, FormikState, FormikTouched } from "formik";
import * as Yup from "yup";
import CustomHeader from "../../components/atoms/CustomHeader";
import { colors } from "../../utils/colors";
import CustomText from "../../components/atoms/CustomText";
import CustomButton, { ButtonType } from "../../components/atoms/CustomButton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../utils/firebase";
import CategoriesList from "./CategoriesList";
import { useGlobalContext } from "../../context/GlobalContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { manipulateAsync } from "expo-image-manipulator";

type Props = {};

type FormValueTypes = {
  images: string[];
  brand: string;
  title: string;
  desc: string;
  price: string;
  size: SIZES | undefined;
  color: string;
  category: string;
};

const FILENAME = "SellItem";

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Missing images").required(),
  title: Yup.string().required(),
  desc: Yup.string().required(),
  price: Yup.number().required(),
});

const ListItemScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  // const [images, setImages] = useState<string[]>([]);

  const { setUserListedItems } = useGlobalContext();

  const inputAccessoryViewID = "priceInput";

  const handleSubmit = async (
    values: FormValueTypes,
    resetForm: (
      nextState?: Partial<FormikState<FormValueTypes>> | undefined
    ) => void,
    setErrors: (errors: FormikErrors<FormValueTypes>) => void,
    setTouched: (
      touched: FormikTouched<FormValueTypes>,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    const { images: localImageURIs, ...docValues } = values;
    const newItemRef = doc(collection(db, "items"));
    const resizedImageURIs = await resizeImages(localImageURIs);
    // Get remote images in format [[uri1, path1], [uri2, path2], ...], need to transpose
    const remoteImages = await Promise.all(
      resizedImageURIs.map(async (localImageURI) => {
        const remoteImagePath = `${auth.currentUser?.uid}/${
          newItemRef.id
        }/${localImageURI.split("/").slice(-1)}`;
        const storageRef = ref(storage, remoteImagePath);
        await uploadBytesResumable(
          storageRef,
          await (await fetch(localImageURI)).blob()
        );
        return [await getDownloadURL(storageRef), remoteImagePath];
      })
    );
    // Transpose the array to separate uris and paths
    const [remoteImageURIs, remoteImagePaths] = remoteImages[0].map(
      (_, colIndex) => remoteImages.map((row) => row[colIndex])
    );
    await setDoc(newItemRef, {
      ...docValues,
      datePosted: new Date(),
      imagePaths: remoteImagePaths,
      imageURIs: remoteImageURIs,
      price: parseInt(docValues.price),
      sellerID: auth.currentUser?.uid,
      sellerUsername: auth.currentUser?.displayName,
    });
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      userListedItems: arrayUnion(newItemRef.id),
    });
    setUserListedItems((prev: string[] | undefined) => [
      ...prev,
      newItemRef.id,
    ]);
    navigation.navigate("ProfileStackNav");
  };

  // Resize imgURI into images with heights in array heights while preserving aspect ratio
  const resizeImages = async (imageURIs: string[], height: number = 1000) =>
    await Promise.all(
      imageURIs.map(
        async (imageURI) =>
          (
            await manipulateAsync(imageURI, [{ resize: { height } }], {
              compress: 1,
            })
          ).uri
      )
    );

  const handleAddImg = (
    images: string[],
    setImages: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<FormValueTypes>>
  ) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Take photo", "Choose from library"],
        cancelButtonIndex: 0,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            break;
          case 1:
            navigation.navigate("Camera", { images, setImages });
            break;
          case 2:
            try {
              const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                allowsMultipleSelection: true,
              });
              if (result.canceled === false)
                setImages("images", [
                  ...images,
                  ...result.assets.map(({ uri }) => uri),
                ]);
            } catch (error) {
              console.error(`${FILENAME}: ${error}`);
            }
            break;
          default:
            console.error("Invalid button index");
            break;
        }
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <CustomHeader text="New Listing" />
        <Formik
          initialValues={
            {
              images: [],
              brand: "",
              title: "",
              desc: "",
              price: "",
              size: undefined,
              color: "",
              category: "",
            } as FormValueTypes
          }
          // validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setErrors, setTouched }) =>
            handleSubmit(
              values as FormValueTypes,
              resetForm,
              setErrors,
              setTouched
            )
          }
        >
          {({
            errors,
            touched,
            values,
            handleChange,
            handleSubmit,
            setErrors,
            setFieldValue,
            setTouched,
            validateForm,
          }) => (
            <View style={styles.formCont}>
              <ScrollView>
                {values.images.length === 0 ? (
                  <TouchableOpacity
                    style={styles.addImagesButton}
                    onPress={() => handleAddImg(values.images, setFieldValue)}
                  >
                    <FontAwesome5
                      name="images"
                      size={20}
                      color={colors.lightBlack}
                    />
                    <CustomText style={styles.addImagesButtonText}>
                      Add images
                    </CustomText>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.itemImageGallery}>
                    {values.images.map((image) => (
                      <Image
                        source={{ uri: image }}
                        style={styles.image}
                        key={image}
                      />
                    ))}
                    <TouchableOpacity
                      style={[styles.image, styles.addPhotosButton]}
                      onPress={() => handleAddImg(values.images, setFieldValue)}
                    >
                      <FontAwesome5
                        name="plus"
                        size={20}
                        color={colors.lightBlack}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {/* TODO: Change this to Searchable Dropdown */}
                <CustomTextInput
                  placeholder="Brand"
                  value={values.brand}
                  onChangeText={handleChange("brand")}
                />
                <CustomTextInput
                  placeholder="Item name"
                  value={values.title}
                  onChangeText={handleChange("title")}
                />
                <CustomTextInput
                  multiline
                  placeholder="Description"
                  value={values.desc}
                  onChangeText={handleChange("desc")}
                />
                <CustomTextInput
                  icon="dollar-sign"
                  inputAccessoryViewID={inputAccessoryViewID}
                  maxLength={5}
                  keyboardType="number-pad"
                  placeholder="Price"
                  value={values.price}
                  onChangeText={handleChange("price")}
                />
                <CustomButton
                  style={styles.categoryButton}
                  text={values.category === "" ? "Categories" : values.category}
                  type={ButtonType.Input}
                  onPress={() =>
                    navigation.navigate("Select", {
                      list: CategoriesList,
                      setItem: handleChange("category"),
                    })
                  }
                  placeholder={values.category === ""}
                />
                <CustomButton
                  style={styles.categoryButton}
                  text={values.size === undefined ? "Size" : values.size}
                  type={ButtonType.Input}
                  onPress={() =>
                    navigation.navigate("Select", {
                      list: { S: "", M: "", L: "" },
                      setItem: handleChange("size"),
                    })
                  }
                  placeholder={values.size === undefined}
                />
              </ScrollView>
              <CustomButton
                text="Publish"
                onPress={handleSubmit}
                style={{ marginTop: "auto" }}
              />
            </View>
          )}
        </Formik>
        <InputAccessoryView
          backgroundColor={colors.background}
          nativeID={inputAccessoryViewID}
        >
          <View style={styles.inputAccessoryCont}>
            <Button onPress={Keyboard.dismiss} title="Done" />
          </View>
        </InputAccessoryView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ListItemScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  formCont: { flex: 1, marginHorizontal: 10 },
  addImagesButton: {
    backgroundColor: colors.lightGray,
    height: 200,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  addImagesButtonText: { color: colors.lightBlack },
  itemImageGallery: { flexDirection: "row", marginVertical: 10 },
  image: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
  addPhotosButton: {
    backgroundColor: colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  inputAccessoryCont: {
    alignItems: "flex-end",
  },
  categoryButton: { marginTop: 10, marginBottom: 10 },
});
