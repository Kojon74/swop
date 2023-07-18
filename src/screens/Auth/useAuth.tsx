import { useEffect, useState } from "react";
import {
  deleteUser,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  OAuthCredential,
  OAuthProvider,
  reauthenticateWithCredential,
  signInWithCredential,
} from "firebase/auth";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as Crypto from "expo-crypto";
import * as AppleAuthentication from "expo-apple-authentication";

import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { auth, db } from "../../utils/firebase";

const FILENAME = "useAuth";

WebBrowser.maybeCompleteAuthSession();

const useAuth = () => {
  const navigation = useNavigation<any>();

  // const isExpoGo =
  //   Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

  // const [isAppleAvailable, setIsAppleAvailable] = useState(false);
  // const [googleReauthenticate, setGoogleReauthenticate] = useState(false);

  // const redirectUri = AuthSession.makeRedirectUri({ useProxy: isExpoGo });
  // const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: isExpoGo
  //     ? "394133112627-klhirsoakodotfm959fratnf76gvba3u.apps.googleusercontent.com"
  //     : "394133112627-fd4j5db7c332dbi6q32jja1m1opkagee.apps.googleusercontent.com",
  // });

  // const authenticate = (credential: OAuthCredential, reauthenticate: boolean) =>
  //   reauthenticate
  //     ? reauthenticateWithCredential(auth.currentUser, credential)
  //         .then(() => deleteUser(auth.currentUser))
  //         .catch((error) => console.error(error))
  //     : signInWithCredential(auth, credential)
  //         .then((cred) => {
  //           if (getAdditionalUserInfo(cred).isNewUser)
  //             setDoc(doc(db, "users", cred.user.uid), {
  //               dateCreated: Timestamp.fromDate(new Date()),
  //             });
  //         })
  //         .catch((err) => console.error(err));

  // const loginWithGoogle = (reauthenticate = false) => {
  //   setGoogleReauthenticate(reauthenticate);
  //   promptAsync({
  //     useProxy: isExpoGo,
  //     redirectUri,
  //   } as AuthSession.AuthRequestPromptOptions);
  // };

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     let credential: OAuthCredential;
  //     if (isExpoGo) {
  //       const idToken = response.params.id_token;
  //       credential = GoogleAuthProvider.credential(idToken);
  //     } else {
  //       const accessToken = response.authentication.accessToken;
  //       credential = GoogleAuthProvider.credential(null, accessToken);
  //     }
  //     authenticate(credential, googleReauthenticate);
  //   }
  // }, [response]);

  // // Sign up with Apple
  // useEffect(() => {
  //   (async () => {
  //     let loginAvailable: boolean;
  //     try {
  //       loginAvailable = await AppleAuthentication.isAvailableAsync();
  //     } catch (error) {
  //       console.error(`${FILENAME}: ${error}`);
  //     }
  //     setIsAppleAvailable(loginAvailable);
  //   })();
  // }, []);

  // const loginWithApple = async (reauthenticate = false) => {
  //   const csrf = Math.random().toString(36).substring(2, 15);
  //   const nonce = Math.random().toString(36).substring(2, 10);
  //   let appleCredential: AppleAuthentication.AppleAuthenticationCredential;
  //   try {
  //     const hashedNonce = await Crypto.digestStringAsync(
  //       Crypto.CryptoDigestAlgorithm.SHA256,
  //       nonce
  //     );
  //     appleCredential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ],
  //       state: csrf,
  //       nonce: hashedNonce,
  //     });
  //   } catch (error) {
  //     console.error(`${FILENAME}: ${error}`);
  //   }
  //   const { identityToken } = appleCredential;
  //   if (identityToken) {
  //     const provider = new OAuthProvider("apple.com");
  //     const credential = provider.credential({
  //       idToken: identityToken,
  //       rawNonce: nonce, // nonce value from above
  //     });
  //     authenticate(credential, reauthenticate);
  //   }
  // };

  return {
    navigation,
    // isAppleAvailable,
    // request,
    // loginWithApple,
    // loginWithGoogle,
  };
};

export default useAuth;
