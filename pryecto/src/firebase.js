import firebase from 'firebase'
import 'firebase/firestore'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBEHPnYECSAn-8WGNvJlR3CKqq1X6i19lY",
    authDomain: "vue-firebase-ca0d6.firebaseapp.com",
    databaseURL: "https://vue-firebase-ca0d6.firebaseio.com",
    projectId: "vue-firebase-ca0d6",
    storageBucket: "vue-firebase-ca0d6.appspot.com",
    messagingSenderId: "335276403400",
    appId: "1:335276403400:web:d6c290cc456b25678193fd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  export const db = firebase.firestore();