// Paste your Firebase config below. Example:
// const firebaseConfig = {
//   apiKey: "...",
//   authDomain: "...",
//   projectId: "...",
//   storageBucket: "...",
//   messagingSenderId: "...",
//   appId: "..."
// };

// Replace the placeholder values with your Firebase project's config
const firebaseConfig = {
  apiKey: "AIzaSyDnuEQ0JrjbK-DcATslQFSJPWhB9amrKIQ",
  authDomain: "credisure-lending.firebaseapp.com",
  projectId: "credisure-lending",
  storageBucket: "credisure-lending.firebasestorage.app",
  messagingSenderId: "571106413421",
  appId: "1:571106413421:web:daec10669aa6a1ae936864"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
window.credisure = { auth, db };
