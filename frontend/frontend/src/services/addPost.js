import uuid from "uuid-random";

let getAuth, auth, getFirestore, firestore, Timestamp, doc, setDoc;

const importFirestoreFunctions = async () => {
    const appModule = await import("../../App");
    const firestoreModule = await import("firebase/firestore");
    app = appModule.default;
    getFirestore = firestoreModule.getFirestore;
    firestore = getFirestore(app);
    Timestamp = firestoreModule.Timestamp;
    doc = firestoreModule.doc;
    setDoc = firestoreModule.setDoc;
};

const importAuthFunctions = async () => {
    const authModule = await import("firebase/auth");
    getAuth = authModule.getAuth;
    auth = getAuth();
};

const importStorageFunctions = async () => {
    const appModule = await import("../../App");
    const storageModule = await import("firebase/storage");
    storage = appModule.storage;
    ref = storageModule.ref;
    getDownloadURL = storageModule.getDownloadURL;
    uploadBytesResumable = storageModule.uploadBytesResumable;
    getMetadata = storageModule.getMetadata;
};

const initializeFirebase = async () => {
    importStorageFunctions();
    importAuthFunctions();
    importFirestoreFunctions();
};

initializeFirebase();

export const createPost = async (data) => {
    const { file, body } = data;

    try {
        console.log("In the createPost", file, body);

        if (!auth.currentUser || !firestore) {
            await importAuthFunctions();
            await importFirestoreFunctions();
        }

        if (!file) {
            console.error("No file provided");
            return false;
        }

        // Generate a unique ID for the post
        const postId = uuid();
        const storageRef = ref(storage, `posts/${auth.currentUser.uid}/${postId}`);
        const metadata = {
            contentType: file.type || "application/octet-stream",
        };

        console.log("Starting to upload user's post file.");

        // Fetch and upload the file to Firebase Storage
        const response = await fetch(file.uri);
        const blob = await response.blob();
        const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

        await new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                null,
                (error) => reject(error),
                () => resolve()
            );
        });

        // Get the download URL after upload is complete
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("File available at", downloadURL);

        // Create metadata for Firestore
        const date = Timestamp.now().toDate();
        const formattedDate = date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });

        const postData = {
            user_id: auth.currentUser.uid,
            post_id: postId,
            url: downloadURL,
            body: body,
            file_type: file.type,
            created_at: formattedDate,
        };

        console.log("Post data created", postData);

        // Save metadata to Firestore
        await setDoc(doc(firestore, "posts", postId), postData);

        console.log("Post successfully created");
        return true;
    } catch (error) {
        console.error("Error creating post:", error);
        return false;
    }
};

