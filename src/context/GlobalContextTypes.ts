import { Unsubscribe as UnsubscribeAuth } from "firebase/auth";
import { Unsubscribe as UnsubscribeFirestore } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

type GlobalContextTypes = {
  isLoading: boolean;
  isAuthenticated: boolean;
  cameraPermission: boolean | undefined;
  messageChats: any[];
  userListedItems: string[] | undefined;
  clearState: () => void;
  setCameraPermission: Dispatch<SetStateAction<boolean | undefined>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserListedItems: Dispatch<SetStateAction<string[] | undefined>>;
  unsubMessages: UnsubscribeFirestore;
};

export { GlobalContextTypes };
