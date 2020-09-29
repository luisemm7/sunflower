import firebase from 'firebase/app'
require('firebase/auth')
require('firebase/database')

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
  const db = firebase.database();

  //Sync object changes

  /* const dbRef = db.ref().child('productosf');

  var Datos1;
  
  dbRef.on('value',snap => {
    Datos1 = snap.val();
    console.log('JS: ',Datos1);
  });

  console.log('JS2: ',Datos1); */

  export {fireauth, db}

  