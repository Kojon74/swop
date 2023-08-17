import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomTextInput from "../../components/atoms/CustomTextInput";
import CustomButton from "../../components/atoms/CustomButton";
import useAuthEmail, { FormValuesType } from "./useAuthEmail";
import CustomHeader from "../../components/atoms/CustomHeader";
import { Formik } from "formik";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

const AuthEmailScreen = () => {
  const {
    errorCodes,
    firebaseError,
    isNewUser,
    navigation,
    refPassword,
    refConfirmPassword,
    validationSchema,
    clearError,
    handleSubmitEmail,
    handleSubmitUsername,
    handleSubmitSignIn,
    setError,
  } = useAuthEmail();

  const [passwordHeader, setPasswordHeader] = useState<string[]>(["", ""]);

  useEffect(() => {
    isNewUser
      ? setPasswordHeader([
          "Looks like you don't have a swop account yet",
          "Create a new password to sign up!",
        ])
      : setPasswordHeader([
          "Looks like you already have a swop account",
          "Enter your password to sign in!",
        ]);
  }, [isNewUser]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomHeader text="Continue with email" />
        <SafeAreaView style={styles.container}>
          <Formik
            initialValues={{
              email: "",
              username: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm, setErrors, setTouched }) =>
              handleSubmitSignIn(
                values as FormValuesType,
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
              setTouched,
              validateForm,
            }) => (
              <View style={styles.form}>
                <CustomTextInput
                  autoFocus
                  errorMessage={errors.email}
                  icon="envelope"
                  keyboardType="email-address"
                  placeholder="E-mail"
                  touched={touched.email}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onFocus={() => clearError("email", setErrors, setTouched)}
                  onSubmitEditing={() =>
                    validateForm().then((err) => {
                      if (!Object.keys(err).includes("email"))
                        handleSubmitEmail(values.email);
                      else if (err.email) {
                        setError("email", err.email, setErrors, setTouched);
                      }
                    })
                  }
                />
                {isNewUser !== -1 && (
                  <>
                    <Text style={styles.passwordLabel1}>
                      {passwordHeader[0]}
                    </Text>
                    <Text style={styles.passwordLabel2}>
                      {passwordHeader[1]}
                    </Text>
                  </>
                )}
                {isNewUser === true && (
                  <CustomTextInput
                    autoFocus
                    errorMessage={errors.username}
                    icon="user"
                    placeholder="Username"
                    touched={touched.username}
                    value={values.username}
                    onChangeText={handleChange("username")}
                    onFocus={() =>
                      clearError("username", setErrors, setTouched)
                    }
                    onSubmitEditing={() =>
                      handleSubmitUsername(
                        values.username,
                        setErrors,
                        setTouched
                      )
                    }
                  />
                )}
                {isNewUser !== -1 && (
                  <CustomTextInput
                    autoFocus={!(isNewUser as boolean)}
                    errorMessage={errors.password}
                    icon="lock"
                    isPass
                    placeholder="Password"
                    refValue={refPassword}
                    touched={touched.password}
                    value={values.password}
                    onChangeText={handleChange("password")}
                    onFocus={() =>
                      clearError("password", setErrors, setTouched)
                    }
                    onSubmitEditing={() =>
                      isNewUser
                        ? refConfirmPassword.current?.focus()
                        : handleSubmit()
                    }
                  />
                )}
                {isNewUser === false && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                  </TouchableOpacity>
                )}
                {isNewUser === true && (
                  <CustomTextInput
                    errorMessage={errors.confirmPassword}
                    icon="lock"
                    isPass
                    placeholder="Confirm Password"
                    refValue={refConfirmPassword}
                    touched={touched.confirmPassword}
                    value={values.confirmPassword}
                    onChangeText={handleChange("confirmPassword")}
                    onFocus={() =>
                      clearError("confirmPassword", setErrors, setTouched)
                    }
                    onSubmitEditing={() => handleSubmit()}
                  />
                )}
                <Text style={[fonts.error, styles.textError]}>
                  {Object.keys(errorCodes).includes(firebaseError.code)
                    ? errorCodes[firebaseError.code]
                    : firebaseError.message}
                </Text>
                <CustomButton
                  style={!!firebaseError.code && styles.buttonError}
                  text={"Sign in"}
                  onPress={() => handleSubmit()}
                />
              </View>
            )}
          </Formik>
        </SafeAreaView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default AuthEmailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 10 },
  header: {
    fontSize: 23,
    fontWeight: "600",
    marginTop: 30,
    marginVertical: 15,
    color: "#444444",
  },
  form: { flex: 1 },
  passwordLabel1: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
  },
  passwordLabel2: {
    fontSize: 15,
    fontWeight: "300",
  },
  forgotPassword: { color: colors.primary },
  textError: { marginTop: "auto" },
  buttonError: { marginTop: 10 },
});
