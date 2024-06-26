import React from 'react';
import { googleProvider, facebookProvider, githubProvider, db } from '../../config/firebase-config';
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import { 
    getAuth,
    signInWithPopup,
 } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './styles.css'
import useAuthentication from '../../hooks/useAuthentication';

const SocialSignIn = () => {
    const navigate = useNavigate()
    const { createUserInDB } = useAuthentication()

    const handleSocialLogin = async (provider) => {
        const auth = getAuth();
        try {
            const authUser = await signInWithPopup(auth, provider);
            await createUserInDB(authUser)
            navigate('/');
        } catch (error) {
           console.error(error)
        }
    };

    return (
        <div className='social-buttons'>
            <button onClick={() => handleSocialLogin(googleProvider)}>
                <FaGoogle size={24} />
                <span>Connect with Google</span>
            </button>
            <button onClick={() => handleSocialLogin(facebookProvider)}>
                <FaFacebook size={24} />
                <span>Connect with Facebook</span>
            </button>
            <button onClick={() => handleSocialLogin(githubProvider)}>
                <FaGithub size={24} />
                <span>Connect with Github</span>
            </button>
        </div>
    )
}

export default SocialSignIn;