import { Dispatch, SetStateAction } from "react";

type GlobalContextTypes = {
  isLoading: boolean;
  isAuthenticated: boolean;
  cameraPermission: boolean | undefined;
  setCameraPermission: Dispatch<SetStateAction<boolean | undefined>>;
};

export { GlobalContextTypes };
