// src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { 
    getAuth,
    signInWithEmailAndPassword,
 } from "firebase/auth";
import './styles.css'
import SocialSignIn from '../../components/SocialSignIn/SocialSignIn';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            console.error(error);
            if(error.code === "auth/invalid-credential"){
                alert('Invalid credential')
            }
        }
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="email" 
                    value={email}
                    className='login-input' 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    className='login-input' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit" className='login-btn'>Login</button>
            </form>
            <h6 className='divider'>Or</h6>
            <SocialSignIn />
            <div className='register-link'>
              <Link to='/signup'>Register</Link>
            </div>
        </div>
    );
};

export default Login;
