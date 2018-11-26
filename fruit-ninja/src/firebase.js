// Initialize Firebase
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyBh-JkLXpuAkuH-ArewrVd9HEiFg3sMAv0",
  authDomain: "master-7a069.firebaseapp.com",
  databaseURL: "https://master-7a069.firebaseio.com",
  projectId: "master-7a069",
  storageBucket: "",
  messagingSenderId: "1084717495831"
};

export const firebaseApp = firebase.initializeApp(config);
