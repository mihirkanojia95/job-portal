// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase-config'
import { collection, getDocs, query, where } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserData = async(id) => {
       try{
        const q = query(collection(db, "users"), where("_id", "==", id));
        const querySnapshot = await getDocs(q);
        const result = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setUserData(result.length ? result[0] : null);
       }catch(error){
        console.log(error)
       }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if(user){
                getUserData(user.uid)
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userData
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
