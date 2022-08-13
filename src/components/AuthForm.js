import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    } from 'firebase/auth';
const inputStyles = {};

const AuthForm = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        });
    const [newAccount, setNewAccount] = useState(true);
    const { email, password } = inputs;
    const [error, setError] = useState("");
    const onChange = (e) => {
        const { name, value } = e.target;
        setInputs({
        ...inputs,
        [name]: value,
        });
        };
    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            let data;
            const auth = getAuth();
            if (newAccount) {
                data = await createUserWithEmailAndPassword(
                    auth, email, password
                );
            } else {
                data = await signInWithEmailAndPassword(
                    auth, email, password
                );
            }
        } catch (error){
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount(prev => !prev);
    return (
    <div>
        <form onSubmit={onSubmit} className="container">
            <input 
                name="email"
                type="email" 
                placeholder="Email" 
                value={inputs.email} 
                onChange={onChange} 
                required
                className="authInput"
                 />
            <input 
            name="password"
            type="password" 
            placeholder="Password" 
            value={inputs.password} 
            onChange={onChange} 
            required 
            className="authInput"
            />
            <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account":"Sign in"} />
            {error && <span className="authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch"> {newAccount ? "Sign in" : "Create Account"}</span>
    </div>
    );
};

export default AuthForm;