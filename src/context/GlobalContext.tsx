import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContextTypes as Types } from "./GlobalContextTypes";
import { Unsubscribe, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../utils/firebase";
import {
  DocumentData,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";

const FILENAME = "GlobalContext";
const GlobalContext = createContext<Types>(null);

const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [unsubAuth, setUnsubAuth] = useState<Unsubscribe>();
  const [cameraPermission, setCameraPermission] = useState<boolean>();
  const [messageChats, setMessageChats] = useState<any[]>([]);

  // Keep track of current user
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
      if (user) {
        (async () => {
          const docRef = doc(db, "users", user.uid);
          let docSnap: DocumentData | undefined = undefined;
          try {
            docSnap = await getDoc(docRef);
          } catch (error) {
            console.error(`1 ${FILENAME}: ${error}`);
          }
          if (docSnap?.exists()) {
          } else {
            console.error("ERROR: user document doesn't exist");
          }
        })();
      }
    });
    setUnsubAuth(() => unsubscribeAuth);
    return () => {
      unsubscribeAuth();
    };
  }, []);

  // Get all message chats the currentUser is involved in
  useEffect(() => {
    if (!!auth.currentUser?.uid)
      (async () => {
        const messageChatsQuerySnap = await getDocs(
          query(
            collection(db, "messages"),
            or(
              where("buyer", "array-contains", auth.currentUser?.uid),
              where("seller", "array-contains", auth.currentUser?.uid)
            )
          )
        );
        let tempMessageChats: any[] = [];
        messageChatsQuerySnap.forEach((messageChatDoc) => {
          let type; // buy, sell, trade
          if (
            messageChatDoc.data().buyer.includes(auth.currentUser?.uid) &&
            messageChatDoc.data().seller.includes(auth.currentUser?.uid)
          )
            type = "trade";
          else if (messageChatDoc.data().buyer.includes(auth.currentUser?.uid))
            type = "buy";
          else type = "sell";
          tempMessageChats.push({
            id: messageChatDoc.id,
            type,
            ...messageChatDoc.data(),
          });
        });
        setMessageChats(tempMessageChats);
      })();
  }, [auth.currentUser?.uid]);

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        cameraPermission,
        messageChats,
        setCameraPermission,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
