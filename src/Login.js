import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { auth } from './firebase';
import { login } from './features/userSlice';
function Login() {
    const dispatch=useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic,setProfilePic]=useState("");
    const register = () => {
        if(!name){
            return alert('Please enter a full name');
        }
        auth.createUserWithEmailAndPassword(email,password).then(userAuth=>{
            userAuth.user.updateProfile({
                displayName:name,
                photoURL:profilePic
            })
            .then(()=>{
                dispatch(login({
                    email:userAuth.user.email,
                    uid:userAuth.user.id,
                    displayName:name,
                    photoURL:profilePic
                }))
            })
        }).catch(error=>alert(error));
    };
    const loginToApp = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password)
        .then((userAuth)=>{
            dispatch(login({
                email:userAuth.user.email,
                uid:userAuth.user.uid,
                displayName:userAuth.user.displayName,
                profileUrl:userAuth.user.photoURL
            }))
        }).catch(error=>alert(error));
    };
    return (
        <div className='login'>
            <img src="https://content.linkedin.com/content/dam/brand/site/img/logo/logo-hero.png" alt="Linkedn Logo" />
            <form>
                <input type="text" placeholder='Full name (required if registering)' value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder='Profile pic URL (optional)' value={profilePic} onChange={e=>setProfilePic(e.target.value)}/>
                <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type='submit' onClick={loginToApp}>Sign in</button>
            </form>

            <p>Not a member?{" "}
                <span className='login__register' onClick={register}>Register Now</span>
            </p>
        </div>
    )
}

export default Login;