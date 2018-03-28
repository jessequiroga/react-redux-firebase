import firebase from "firebase";

export const appName = "advreact-46acf";
// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyChg_xI1IHlYhk0hsjtVizdHrQY9SnC-vI",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: `${appName}`,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: "378684790581"
};

var config = {
  apiKey: "AIzaSyChg_xI1IHlYhk0hsjtVizdHrQY9SnC-vI",
  authDomain: "advreact-46acf.firebaseapp.com",
  databaseURL: "https://advreact-46acf.firebaseio.com",
  projectId: "advreact-46acf",
  storageBucket: "advreact-46acf.appspot.com",
  messagingSenderId: "378684790581"
};

firebase.initializeApp(config);
