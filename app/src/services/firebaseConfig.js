import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCh574cpIggCGFKCz2MUeeCfp4XnlUhoJY",
  authDomain: "localizase-b0c83.firebaseapp.com",
  databaseURL: "https://localizase-b0c83-default-rtdb.firebaseio.com",
  projectId: "localizase-b0c83",
  storageBucket: "localizase-b0c83.appspot.com",
  messagingSenderId: "71684198008",
  appId: "1:71684198008:web:09ba1bd580f4d77ce7278d",
  measurementId: "G-Q2XWX8T992"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);