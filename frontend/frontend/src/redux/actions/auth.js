import { USER_STATE_CHANGE } from "../constants";

let getAuth,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged;

const importAuthFunctions = async () => {
  const appModule = await import("../../../App");
  const authModule = await import("firebase/auth");
  app = appModule.default;
  getAuth = authModule.getAuth;
  onAuthStateChanged = authModule.onAuthStateChanged;
  createUserWithEmailAndPassword = authModule.createUserWithEmailAndPassword;
  signInWithEmailAndPassword = authModule.signInWithEmailAndPassword;
  auth = getAuth();
};

let getFirestore, firestore, doc, onSnapshot;

const importFirestore = async () => {
  const firestoreModule = await import("firebase/firestore");
  getFirestore = firestoreModule.getFirestore;
  doc = firestoreModule.doc;
  onSnapshot = firestoreModule.onSnapshot;
  firestore = getFirestore();
};

const initializeFirebase = async () => {
  await importAuthFunctions();
  await importFirestore();
};

initializeFirebase();

export const login = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const register = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const userAuthStateListener = () => async (dispatch) => {
  if (!auth) {
    await importAuthFunctions();
  }
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(getCurrentUserData());
    } else {
      dispatch({ type: USER_STATE_CHANGE, currentUser: null, loaded: true });
    }
  });
};

export const getCurrentUserData = () => async (dispatch) => {
  if (!firestore) {
    await importFirestore();
  }
  const uid = auth.currentUser.uid;
  const userDocRef = doc(firestore, "user", uid);

  onSnapshot(userDocRef, (snapshot) => {
    if (snapshot.exists()) {
      dispatch({
        type: USER_STATE_CHANGE,
        currentUser: snapshot.data(),
        loaded: true,
      });
    } else {
      dispatch({
        type: USER_STATE_CHANGE,
        currentUser: null,
        loaded: true,
      });
    }
  });
};
