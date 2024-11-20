import {backendURL} from "../constants/backendURL";

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
    where;

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
///////////////////////////////////////////
// fetch Current Record Lists by userId
///////////////////////////////////////////
export const fetchCurrentPost = async () => {
    await importFirestoreFunctions();
    await importAuthFunctions();
    try {
        const userId = auth.currentUser.uid;
        // TODO: fetch current user posts
        const recordResponse = await getCurrentUserRecord(userId);
        console.log('fetchCurrentPost' + recordResponse)
        if (recordResponse.success) {

            return {success: true, data: recordResponse.message};
        }

        // const recordCollection = collection(firestore, "results");
        // const q = query(recordCollection, where("userId", "==", userId));
        // const querySnapshot = await getDocs(q);
        // const records = [];
        // querySnapshot.forEach((doc) => {
        //     records.push({
        //         ...doc.data(),
        //     });
        // });
        // return {success: true, data: records};
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return {success: false, error};
    }
};
///////////////////////////////////////////
// fetch Current Record Details by recordId
///////////////////////////////////////////
export const fetchPostDetails = async (recordId) => {
    //TODO: fetch posts by record_id
    await importFirestoreFunctions();
    await importAuthFunctions();
    try {
        const userId = auth.currentUser.uid;
        // TODO: fetch current user posts
        const recordResponse = await getRecordDetail(userId, recordId);
        if (recordResponse.success) {
            // await pushRecordToFirestore(recordResponse.message);
            return {success: true, data: recordResponse.message};
        }

        // const recordCollection = collection(firestore, "results");
        // const q = query(recordCollection, where("recordId", "==", recordId));
        // const querySnapshot = await getDocs(q);
        // let record = null;
        // querySnapshot.forEach((doc) => {
        //     record = {
        //         ...doc.data(),
        //     };
        // });

        // return {success: true, data: record};
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return {success: false, error};
    }
};

const pushRecordToFirestore = async (recordData) =>
    new Promise(async (resolve, reject) => {
        if (!auth.currentUser || !firestore) {
            await importAuthFunctions();
            await importFirestoreFunctions();
        }
        storageRef = ref(
            storage,
            `results/${auth.currentUser.uid}/${recordData.recordId}`
        );
        await setDoc(doc(firestore, "results", recordData.recordId), recordData);
        console.log("Record pushed to Firestore");
        resolve();
    }).catch((error) => {
        console.error("Error fetching video from filesystem", error);
        reject();
    });

export const deletePostDetails = async (itemId) => {
    await importFirestoreFunctions();
    console.log("deletePostDetails: ", itemId);
    try {
        // const rawVideoCollection = collection(firestore, "results");
        // const docRef = doc(rawVideoCollection, itemId);
        // await deleteDoc(docRef);
        deleteRecordDetail(itemId);
        return {success: true};
    } catch (error) {
        console.error("Error deleting posts: ", error);
        return {success: false, error};
    }
};
///////////////////////////////////////////
// fetch Current Summary Details by userId and practice type
///////////////////////////////////////////
export const fetchSummaryDetails = async (summaryType) => {
    await importFirestoreFunctions();
    await importAuthFunctions();
    try {
        const userId = auth.currentUser.uid;
        const recordResponse = await getSummaryByType(userId, summaryType);
        if (recordResponse.success) {
            addColors(recordResponse.message);
            // pushSummaryToFirestore(recordResponse.message);
            return {success: true, data: recordResponse.message};
        }
        const recordCollection = collection(firestore, "summaries");
        console.log(summaryType);
        const q = query(recordCollection, where("type", "==", summaryType));
        const querySnapshot = await getDocs(q);

        let summary = {};
        querySnapshot.forEach((doc) => {
            summary = {
                ...doc.data(),
            };
        });

        return {success: true, data: summary};
    } catch (error) {
        console.error("Error fetching summary: ", error);
        return {success: false, error};
    }
};

const pushSummaryToFirestore = async (summaryData) =>
    new Promise(async (resolve, reject) => {
        if (!auth.currentUser || !firestore) {
            await importAuthFunctions();
            await importFirestoreFunctions();
        }

        await setDoc(
            doc(
                firestore,
                "summaries",
                `${auth.currentUser.uid}&${summaryData.type}`
            ),
            summaryData
        );
        console.log("Summary pushed to Firestore");
        resolve();
    }).catch((error) => {
        console.error("Error fetching video from filesystem", error);
        reject();
    });

//////////////////////////////////////////////
// TODO: Mock data for testing
//////////////////////////////////////////////
async function getCurrentUserRecord(userId) {
    console.log("GET request started.");
    try {
        let response = await fetch(backendURL + "history/get_all_records", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
            }),
        });

        console.log("POST request finished.");
        console.log("POST request finished." + response);
        if (!response.ok) {
            console.error("POST request failed.", response.status);
            throw new Error("Request failed with status " + response.status);
        } else {
            const data = await response.json();
            console.log('getCurrentUserRecord2')
            return data;
        }
    } catch (error) {
        console.error("There was an error with fetch!", error);
        throw error;
    }
}

async function getCurrentUserRecord2(userId) {
    return {
        success: true,
        message: [
            {
                recordId: "1234gefwfebrs-db5",
                userId: "pMJgk78kGzO6zXlLw1M9bd3Mw9q1",

                title: "Backhand Practice for 5 turns",
                recordScore: 79,
                recordType: "Backhand",
                recordTurns: 5,
                correctTurns: 4,
                created_date: "2024-09-29 14:22:33",
                record_url:
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
                video: [
                    {
                        processed_video_id: "13s245",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                    {
                        processed_video_id: "5436d7",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fa939c0ff-75da-411e-91dc-0935297071e2?alt=media&token=b24c6659-7612-4e5e-8acd-13a03f45534f",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                    {
                        processed_video_id: "4567e3",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fbfbae445-fa8c-4a89-9957-858e791b9bc2?alt=media&token=ce557a32-ee3a-415a-8b41-ac68d20e69b7",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                ],
            },
            {
                recordId: "dgxfdsfserdgz4lkgbrs-db5",
                title: "Forehand Practice for 10 turns",
                recordScore: 88,
                recordType: "Backhand",
                recordTurns: 3,
                created_date: "2024-09-29 14:22:33",
                record_url:
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
                video: [
                    {
                        processed_video_id: "1ui245",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                    {
                        processed_video_id: "54tf367",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fa939c0ff-75da-411e-91dc-0935297071e2?alt=media&token=b24c6659-7612-4e5e-8acd-13a03f45534f",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                    {
                        processed_video_id: "45t673",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fbfbae445-fa8c-4a89-9957-858e791b9bc2?alt=media&token=ce557a32-ee3a-415a-8b41-ac68d20e69b7",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                ],
            },
            {
                recordId: "1234gqwfd678brs-db5",
                title: "Forhand Practice for 3 turns",
                recordScore: 79,
                recordType: "Backhand",
                recordTurns: 5,
                created_date: "2024-09-29 14:22:33",
                record_url:
                    "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
                video: [
                    {
                        processed_video_id: "1386245",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                    {
                        processed_video_id: "54678367",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fa939c0ff-75da-411e-91dc-0935297071e2?alt=media&token=b24c6659-7612-4e5e-8acd-13a03f45534f",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                    {
                        processed_video_id: "456jkh73",
                        video_url:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fbfbae445-fa8c-4a89-9957-858e791b9bc2?alt=media&token=ce557a32-ee3a-415a-8b41-ac68d20e69b7",
                        image_url1:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                        image_url2:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                        image_url3:
                            "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                        instruction1:
                            "hadsl ikfzxchj kmdsgzb wddefva abgsetrwd abesfdv sgaai lhf szxk lwqa ",
                        instruction2: "Wjkefnhsa ewa efwafad vf sfsdjk wef adwf afdfawefe",
                        instruction3: "zsfd awefds ehatrbdgs ,kghj zdbx fx szfawseff",
                    },
                ],
            },
        ],
    };
}

async function getRecordDetail(userId, recordId) {
    console.log("GET request started.");
    try {
        let response = await fetch(backendURL + "history/get_record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userId,
                record_id: recordId,
            }),
        });

        console.log("POST request finished.");
        if (!response.ok) {
            console.error("POST request failed.", response.status);
            throw new Error("Request failed with status " + response.status);
        } else {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error("There was an error with fetch!", error);
        throw error;
    }
}

async function getRecordDetail2(recordId) {
    return {success: false};
    return {
        success: true,
        data: {
            recordId: "1234gefwfebrs-db5",
            userId: "pMJgk78kGzO6zXlLw1M9bd3Mw9q1",
            title: "Backhand Practice for 5 turns",
            recordScore: 79,
            recordType: "Backhand",
            recordTurns: 5,
            correctTurns: 4,
            created_date: "2024-09-29 14:22:33",
            video: [
                {
                    processed_video_id: "13245",
                    video_url:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2F5e359858-45cb-4b26-b99d-aa3c19cd020a?alt=media&token=695ef2be-b031-46df-8ae2-35752cdd42a0",
                    image_url1:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                    image_url2:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                    image_url3:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                    instruction1:
                        "Wow! you're swing is looking great, You're preparation is strong and precise!",
                    instruction2:
                        "You will need to twist your shoulders further around on the contact",
                    instruction3:
                        "See if you can keep your right elbow higher on the follow through",
                    score: 79,
                },
                {
                    processed_video_id: "54367",
                    video_url:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fa939c0ff-75da-411e-91dc-0935297071e2?alt=media&token=b24c6659-7612-4e5e-8acd-13a03f45534f",
                    image_url1:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                    image_url2:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                    image_url3:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                    instruction1:
                        "Try to rotate your hips more aggressively as you swing through the ball.",
                    instruction2:
                        "Bend your knees more and get lower to the ground when the ball is lower.",
                    instruction3:
                        "Try to make contact with the ball at waist height and in front of your body.",
                    score: 89,
                },
                {
                    processed_video_id: "45673",
                    video_url:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2FSZuqCYWkHmdeu0RcpYhwBKpQZFV2%2Fbfbae445-fa8c-4a89-9957-858e791b9bc2?alt=media&token=ce557a32-ee3a-415a-8b41-ac68d20e69b7",
                    image_url1:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand1.png?alt=media&token=67165203-b468-4d31-b934-66113488aa75",
                    image_url2:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand2.png?alt=media&token=cee229e3-1472-4908-b056-a7b476df07ea",
                    image_url3:
                        "https://firebasestorage.googleapis.com/v0/b/tiktok-clone-32fdc.appspot.com/o/testingTesting123%2Fbackhand3.png?alt=media&token=69c19243-ddd4-4f8a-8059-2c842586ec40",
                    instruction1:
                        "Relax your arm muscles for a smoother and more fluid swing.",
                    instruction2:
                        "Remember to pivot on your back foot during the swing for better balance.",
                    instruction3:
                        "Avoid rolling your wrist too much on impact to maintain a flat shot.",
                    score: 81,
                },
            ],
        },
    };
}

async function getSummaryByType2(userId, summaryType) {
    console.log("GET request started.");
    try {
        let response = await fetch(
            backendURL + "history/get_stats_by_stroke_type",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    stroke_type: summaryType,
                }),
            }
        );

        console.log("POST request finished.");
        if (!response.ok) {
            console.error("POST request failed.", response.status);
            throw new Error("Request failed with status " + response.status);
        } else {
            const data = await response.json();
            console.log("data: ", data);
            return data;
        }
    } catch (error) {
        console.error("There was an error with fetch!", error);
        throw error;
    }
}

async function getSummaryByType(userId, summaryType) {
    return {
        success: false,
        message: {},
    };
    return {
        success: true,
        message: {
            type: "Serve",
            userId: "pMJgk78kGzO6zXlLw1M9bd3Mw9q1",
            averageScore: 81,
            practiceTurns: 21,
            totalTime: 435,
            progress: 0.59,
            maxScore: 87,
            practiceTime: 168,
            performanceDetail: {excellent: 39, good: 22, fair: 28, poor: 11},
            pastScore: [65, 73, 76, 69, 72, 84, 81, 85, 78, 81, 82, 77, 80, 79, 86],
            summary1:
                "Exceptional show of tenacity! Your continuous Serve drills exhibit your strong commitment. Challenge yourself to minimize faults in your Serve to improve your game even more.",
            summary2:
                "Small decline in your scores merely signifies another chance to excel. The lowered number of faulty Serves is a positive sign of your evolving precision.",
            summary3:
                "You're achieving prominent advancement in your Serve! Each practice is evidently adding to your progress, keep maintaining this momentum!",
        },
    };
}

async function deleteRecordDetail(recordId) {
    console.log("GET request started.");
    try {
        let response = await fetch(backendURL + "history/delete_record", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                record_id: recordId,
            }),
        });

        console.log("POST request finished.");
        if (!response.ok) {
            console.error("POST request failed.", response.status);
            throw new Error("Request failed with status " + response.status);
        } else {
            const data = await response.json();
            console.log("data: ", data);
            return data;
        }
    } catch (error) {
        console.error("There was an error with fetch!", error);
        throw error;
    }
}

////////////////////////////////
// Helper function to add color here
////////////////////////////////
function addColors(item) {
    var colorSets = {
        Backhand: {
            primary: "#6A994E",
            primaryDark: "#386641",
            primaryLight: "#BACD92",
            highlight1: "#FFF5CD",
            highlight2: "#F29C6E",
        },
        Forehand: {
            primary: "#EC8F5E",
            primaryDark: "#bd724b",
            primaryLight: "#F3B664",
            highlight1: "#F1EB90",
            highlight2: "#9FBB73",
        },
        Serve: {
            primary: "#219EBC",
            primaryDark: "#176f84",
            primaryLight: "#7ac5d7",
            highlight1: "#FFF5B8",
            highlight2: "#E7CEA6",
        },
    };

    item.colors = colorSets[item.type];
    return item;
}
