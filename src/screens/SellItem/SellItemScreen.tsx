import {
  ActionSheetIOS,
  Button,
  Image,
  InputAccessoryView,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { ChangeEvent, useState } from "react";
import CustomTextInput from "../../components/atoms/CustomTextInput";
import { SIZES } from "../../utils/constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { Formik, FormikErrors } from "formik";
import * as Yup from "yup";
import CustomHeader from "../../components/atoms/CustomHeader";
import { colors } from "../../utils/colors";
import CustomText from "../../components/atoms/CustomText";
import CustomButton, { ButtonType } from "../../components/atoms/CustomButton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import CustomNestedDropdown from "../../components/atoms/CustomNestedDropdown";

type Props = {};

type FormValueTypes = {
  images: string[];
  title: string;
  desc: string;
  price: number | undefined;
  size: SIZES | undefined;
  color: string;
  categories: string;
};

const FILENAME = "SellItem";

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, "Missing images").required(),
  title: Yup.string().required(),
  desc: Yup.string().required(),
  price: Yup.number().required(),
});

const SellItemScreen = (props: Props) => {
  const navigation = useNavigation<any>();
  // const [images, setImages] = useState<string[]>([]);

  const inputAccessoryViewID = "priceInput";

  const handleSubmit = (values, resetForm, setErrors, setTouched) => {};

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
              });
              if (result.canceled === false) {
                setImages("images", [...images, result.uri]);
              }
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
              title: "",
              desc: "",
              price: undefined,
              size: undefined,
              color: "",
              categories: "",
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
                    {values.images.map((imager) => (
                      <Image source={{ uri: imager }} style={styles.image} />
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
                  text={
                    values.categories === "" ? "Categories" : values.categories
                  }
                  type={ButtonType.Input}
                  onPress={() =>
                    navigation.navigate("SelectCategory", {
                      setCategory: handleChange("categories"),
                    })
                  }
                  placeholder={values.categories === ""}
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

export default SellItemScreen;

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
