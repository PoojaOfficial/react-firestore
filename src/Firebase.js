import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyBtpv465zoA9JJFHvE0rLd4qnYzXsoeDsE",
  authDomain: "react-firebase-dd926.firebaseapp.com",
  databaseURL: "https://react-firebase-dd926.firebaseio.com",
  projectId: "react-firebase-dd926",
  storageBucket: "react-firebase-dd926.appspot.com",
  messagingSenderId: "115932625806"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;