import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC3q1D1PTa0hItOMGfQ83Z4hgUUPukrxlU",
  authDomain: "osmium-915.firebaseapp.com",
  projectId: "osmium-915",
  storageBucket: "osmium-915.appspot.com",
  messagingSenderId: "288686191481",
  appId: "1:288686191481:web:e359ee84f237e6823935a8",
  measurementId: "G-KSXCF5E3V4"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
// Sign in and check or create account in firestore
const signInWithGoogle = async () => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    console.log(response.user);
    const user = response.user;
    console.log(`User ID - ${user.uid}`);
    const querySnapshot = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (querySnapshot.docs.length === 0) {
      // create a new user
      await db.collection("users").add({
        uid: user.uid,
        enrolledClassrooms: [],
      });
    }
  } catch (err) {
    alert(err.message);
  }
};
const logout = () => {
  auth.signOut();
};

export { app, auth, db, signInWithGoogle, logout };
