import { Dispatch, SetStateAction } from "react";

type GlobalContextTypes = {
  isLoading: boolean;
  isAuthenticated: boolean;
  cameraPermission: boolean | undefined;
  messageChats: any[];
  userListedItems: string[] | undefined;
  setCameraPermission: Dispatch<SetStateAction<boolean | undefined>>;
  setUserListedItems: Dispatch<SetStateAction<string[] | undefined>>;
};

export { GlobalContextTypes };
