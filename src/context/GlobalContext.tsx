import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { GlobalContextTypes as Types } from "./GlobalContextTypes";
import {
  Unsubscribe as UnsubscribeAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../utils/firebase";
import {
  Unsubscribe as UnsubscribeFirestore,
  collection,
  doc,
  getDoc,
  onSnapshot,
  or,
  query,
  where,
} from "firebase/firestore";

const FILENAME = "GlobalContext";
const GlobalContext = createContext<Types>(undefined);

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [unsubMessages, setUnsubMessages] = useState<UnsubscribeFirestore>(
    undefined as unknown as UnsubscribeFirestore
  );
  const [cameraPermission, setCameraPermission] = useState<
    boolean | undefined
  >(); // Initialize undefined to differentiate between empty and uninitialized
  const [messageChats, setMessageChats] = useState<any[]>([]);
  const [userListedItems, setUserListedItems] = useState<
    string[] | undefined
  >(); // Initialize undefined to differentiate between empty and uninitialized

  // Keep track of current user
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
      if (user) {
        (async () => {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap?.exists()) {
            // Get all user listed items
            setUserListedItems(docSnap.data().userListedItems);
          } else {
            console.error("ERROR: user document doesn't exist");
          }
        })();
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  // Get all message chats the currentUser is involved in
  // TODO: Change so each user keeps track on all messageChatIDs they are in
  useEffect(() => {
    let unsubscribe: UnsubscribeFirestore | undefined;
    if (!!auth.currentUser?.uid)
      (async () => {
        const messageChatsQuery = query(
          collection(db, "messages"),
          or(
            where("buyer", "array-contains", auth.currentUser?.uid),
            where("seller", "array-contains", auth.currentUser?.uid)
          )
        );
        unsubscribe = onSnapshot(messageChatsQuery, (messageChatsQuerySnap) =>
          setMessageChats(
            messageChatsQuerySnap.docs.map((messageChatDoc) => {
              let type; // buy, sell, trade
              if (
                messageChatDoc.data().buyer.includes(auth.currentUser?.uid) &&
                messageChatDoc.data().seller.includes(auth.currentUser?.uid)
              )
                type = "trade";
              else if (
                messageChatDoc.data().buyer.includes(auth.currentUser?.uid)
              )
                type = "buy";
              else type = "sell";
              return {
                id: messageChatDoc.id,
                type,
                ...messageChatDoc.data(),
              };
            })
          )
        );
      })();
    setUnsubMessages(() => unsubscribe);
    return unsubscribe;
  }, [auth.currentUser?.uid]);

  const clearState = () => {
    setUnsubMessages(undefined as unknown as UnsubscribeFirestore);
    setCameraPermission(undefined);
    setMessageChats([]);
    setUserListedItems(undefined);
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        cameraPermission,
        messageChats,
        userListedItems,
        clearState,
        setCameraPermission,
        setIsAuthenticated,
        setUserListedItems,
        unsubMessages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
