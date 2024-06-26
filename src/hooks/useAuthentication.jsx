import { collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../config/firebase-config";

const useAuthentication = () => {

    const checkUserAvailable = async (id) => {
        const q = query(collection(db, "users"), where("_id", "==", id));
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        return !!(result && result.length)
    }

    const createUserInDB = async (authUser) => {
        console.log('AUTH', authUser)
        const user = {
            _id: authUser.user.uid,
            appliedToIds: [],
            isAdmin: false,
            jobIds: []
        }
        const isPresent = await checkUserAvailable(authUser.user.uid);
        if(!isPresent){
            try {
                const docRef = await addDoc(collection(db, "users"), user);
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }
    }

    return {
        createUserInDB
    }
}

export default useAuthentication;