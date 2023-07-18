import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContextTypes as Types } from "./GlobalContextTypes";
import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import { DocumentData, doc, getDoc } from "firebase/firestore";

const FILENAME = "GlobalContext";
const GlobalContext = createContext<Types>(null);

const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [unsubAuth, setUnsubAuth] = useState<Unsubscribe>();
  const [cameraPermission, setCameraPermission] = useState<boolean>();

  // Keep track of current user
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
      (async () => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          let docSnap: DocumentData;
          try {
            docSnap = await getDoc(docRef);
          } catch (error) {
            console.error(`1 ${FILENAME}: ${error}`);
          }
          if (docSnap?.exists()) {
          } else {
            console.error("ERROR: user document doesn't exist");
          }
        }
      })();
    });
    setUnsubAuth(() => unsubscribeAuth);
    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        cameraPermission,
        setCameraPermission,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
