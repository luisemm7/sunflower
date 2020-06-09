import firebase from 'firebase/app'
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.VUE_APP_MY_API_KEYFIRE,
    authDomain: process.env.VUE_APP_MY_AUTHDOMAIN,
    databaseURL: process.env.VUE_APP_MY_DBDOMAIN,
    projectId: process.env.VUE_APP_MY_PROJECTID,
    storageBucket: process.env.VUE_APP_MY_STORAGE,
    messagingSenderId: process.env.VUE_APP_MY_API_KEYMESSAGE,
    appId: process.env.VUE_APP_MY_API_KEYAPPID
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const fireauth = firebase.auth();

  export default fireauth;
  