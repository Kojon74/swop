import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBo3XwvjSS8KXlmW1i-ynlB4fJXY4z8NX0",
  authDomain: "swop-38a6e.firebaseapp.com",
  projectId: "swop-38a6e",
  storageBucket: "swop-38a6e.appspot.com",
  messagingSenderId: "831491384126",
  appId: "1:831491384126:web:b4ca109f38843fd71f026f",
});

const auth = getAuth(firebaseApp);
const db = initializeFirestore(firebaseApp, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});
const storage = getStorage(firebaseApp);

export { auth, db, storage };
