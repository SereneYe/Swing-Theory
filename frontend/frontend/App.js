import { initializeApp, getApps } from "firebase/app";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { QueryClient, QueryClientProvider } from "react-query";
import rootReducer from "./src/redux/reducers";
import Route from "./src/navigation/main";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const store = createStore(rootReducer, applyMiddleware(thunk));

firebaseConfig = {
  apiKey: "AIzaSyDjPGDgGs0CLfYHqjFSBjxj6elKM9oJnok",
  authDomain: "tiktok-clone-32fdc.firebaseapp.com",
  projectId: "tiktok-clone-32fdc",
  storageBucket: "tiktok-clone-32fdc.appspot.com",
  messagingSenderId: "732533980352",
  appId: "1:732533980352:web:a203f754c74ba1cd90c125",
  measurementId: "G-DKPN99GQPM",
};

let app;
let auth;
let db;
let storage;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if firebase is already initialized use that one
}

auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);

export { auth, db, storage };

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchInterval: false, staleTime: Infinity } },
});

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>
    </Provider>
  );
}
