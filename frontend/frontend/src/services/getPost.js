let getAuth,
    auth,
    getFirestore,
    firestore,
    collection,
    getDocs,
    deleteDoc,
    query,
    setDoc,
    doc,
    updateDoc,
    where,
    orderBy
;

const importFirestoreFunctions = async () => {
    const appModule = await import("../../App");
    const firestoreModule = await import("firebase/firestore");
    app = appModule.default;
    getFirestore = firestoreModule.getFirestore;
    firestore = getFirestore(app);
    doc = firestoreModule.doc;
    setDoc = firestoreModule.setDoc;
    updateDoc = firestoreModule.updateDoc;
    deleteDoc = firestoreModule.deleteDoc;
    collection = firestoreModule.collection;
    getDocs = firestoreModule.getDocs;
    query = firestoreModule.query;
    where = firestoreModule.where;
    orderBy = firestoreModule.orderBy;
};

const importAuthFunctions = async () => {
    const authModule = await import("firebase/auth");
    getAuth = authModule.getAuth;
    auth = getAuth();
};

const initializeFirebase = async () => {
    importAuthFunctions();
    importFirestoreFunctions();
};

initializeFirebase();

export const getUserPost = async () => {
    await importFirestoreFunctions();
    await importAuthFunctions();
    try {
        const userId = auth.currentUser.uid;
        const recordCollection = collection(firestore, "posts");
        const q = query(
            recordCollection,
            where("user_id", "==", userId),
            orderBy("created_at", "desc")
        );
        const querySnapshot = await getDocs(q);
        const records = [];
        querySnapshot.forEach((doc) => {
            records.push({
                ...doc.data(),
            });
        });
        return {success: true, data: records};
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return {success: false, error};
    }
};


export const deletePost = async (itemId) => {
    await importFirestoreFunctions();
    console.log("deletePostDetails: ", itemId);
    try {
        const rawVideoCollection = collection(firestore, "posts");
        const docRef = doc(rawVideoCollection, itemId);
        await deleteDoc(docRef);
        console.log("deletePostDetails");
        return {success: true};
    } catch (error) {
        console.error("Error deleting posts: ", error);
        return {success: false, error};
    }
};