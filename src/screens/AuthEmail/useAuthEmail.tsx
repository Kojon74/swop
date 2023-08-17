import { useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "@firebase/firestore";
import {
  FormikErrors,
  FormikProps,
  FormikState,
  FormikTouched,
  FormikValues,
} from "formik";
import * as Yup from "yup";
import { auth, db } from "../../utils/firebase";
import { useNavigation } from "@react-navigation/native";
import { FirebaseError } from "firebase/app";
import { TextInput } from "react-native";

const FILENAME = "useAuthEmail";

type FormValuesType = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const EmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  username: Yup.string()
    .min(4, "Must be 4 characters or more")
    .required("Required"),
  password: Yup.string()
    .min(6, "Must be 6 characters or more")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});

const errorCodes: { [key: string]: string } = {
  "auth/invalid-email": "Invalid email",
  "auth/wrong-password": "Wrong password",
  "auth/too-many-requests":
    "Access to this account has been temporarily disabled due to many failed login attempts, you can immediately restore it by resetting your password or you can try again later",
};

const useAuthEmail = () => {
  const navigation = useNavigation<any>();
  const [firebaseError, setFirebaseError] = useState({ code: "", message: "" });
  const [isNewUser, setIsNewUser] = useState<number | boolean>(-1);
  const [validationSchema, setValidationSchema] = useState(EmailSchema);

  const refForm = useRef<FormikProps<FormikValues>>(null);
  const refPassword = useRef<TextInput>(null);
  const refConfirmPassword = useRef<TextInput>(null);

  useEffect(() => {
    if (isNewUser === -1) setValidationSchema(EmailSchema);
    else if (isNewUser === false) setValidationSchema(SignInSchema);
    else setValidationSchema(SignUpSchema);
  }, [isNewUser]);

  // Sign up with email
  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      if (isNewUser) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // TODO: Put create new user doc in a seperate hook
        setDoc(doc(db, "users", cred.user.uid), {
          dateCreated: Timestamp.fromDate(new Date()),
          userListedItems: [],
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setFirebaseError({ code: "", message: "" });
      }
    } catch (error) {
      console.error(`${FILENAME}: ${error}`);
    }
  };

  const handleSubmitEmail = async (email: string) => {
    let users;
    try {
      users = await fetchSignInMethodsForEmail(auth, email);
      setIsNewUser(users.length === 0);
    } catch (error) {
      console.error(`${FILENAME}: ${error}`);
    }
  };

  const handleSubmitSignIn = async (
    values: FormValuesType,
    resetForm: (
      nextState?: Partial<FormikState<FormValuesType>> | undefined
    ) => void,
    setErrors: (errors: FormikErrors<FormValuesType>) => void,
    setTouched: (
      touched: FormikTouched<FormValuesType>,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    try {
      await signUp(values);
      resetForm();
    } catch (error) {
      if (error instanceof FirebaseError)
        switch (error.code) {
          case "auth/invalid-email":
            // should never be executed since we check for this with formik, and new emails create new account
            setError("email", errorCodes[error.code], setErrors, setTouched);
            console.error("'auth/invalid-email error' should not be called");
            break;
          case "auth/wrong-password":
            setError("password", errorCodes[error.code], setErrors, setTouched);
            break;
          case "auth/too-many-requests":
            setError("password", errorCodes[error.code], setErrors, setTouched);
            break;
          default:
            setFirebaseError(error);
            break;
        }
    }
  };

  const clearError = (
    field: string,
    setErrors: (errors: FormikErrors<FormValuesType>) => void,
    setTouched: (
      touched: FormikTouched<FormValuesType>,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setErrors({ [field]: "" });
    setTouched({ [field]: false });
  };

  const setError = (
    field: string,
    errorMessage: string,
    setErrors: (errors: FormikErrors<FormValuesType>) => void,
    setTouched: (
      touched: FormikTouched<FormValuesType>,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    setErrors({ [field]: errorMessage });
    setTouched({ [field]: true });
  };

  return {
    errorCodes,
    firebaseError,
    isNewUser,
    navigation,
    refConfirmPassword,
    refForm,
    refPassword,
    validationSchema,
    clearError,
    handleSubmitEmail,
    handleSubmitSignIn,
    setError,
    setIsNewUser,
  };
};

export { FormValuesType };

export default useAuthEmail;
