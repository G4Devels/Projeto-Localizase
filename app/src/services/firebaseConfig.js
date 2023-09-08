import { initializeApp } from "firebase/app";
  import "firebase/auth";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, analytics, auth}