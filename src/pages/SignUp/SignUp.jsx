// src/components/SignUp.js
import React, { useState } from 'react';
import { auth, db } from '../../config/firebase-config';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import './styles.css'
import SocialSignIn from '../../components/SocialSignIn/SocialSignIn';
import useAuthentication from '../../hooks/useAuthentication';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const { createUserInDB } = useAuthentication()
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            if(password !== rePassword) throw new Error('Password should match!!'); 
            const authUser = await createUserWithEmailAndPassword(auth, email, password);
            await createUserInDB(authUser);
            navigate('/');
        } catch (error) {
            console.error(error);
            if(error.code === 'auth/email-already-in-use'){
                alert('user already exist with this email')
            }else if(error.code === 'auth/weak-password'){
                alert('Password should be at least 6 characters')
            }
        }
    };

    return (
        <div className='signup-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input 
                    type="email" 
                    value={email} 
                    className='signup-input'
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    value={password} 
                    className='signup-input'
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <input 
                    type="password" 
                    value={rePassword} 
                    className='signup-input'
                    onChange={(e) => setRePassword(e.target.value)} 
                    placeholder="Confirm Password" 
                    required 
                />
                <button type="submit" className='submit-btn'>Sign Up</button>
            </form>
            <h6 className='divider'>Or</h6>
            <SocialSignIn />
            <div className='register-link'>
              <Link to='/login'>Login</Link>
            </div>
        </div>
    );
};

export default SignUp;
