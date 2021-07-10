import React,{useRef, useState} from 'react';
import './singUp.css';
import {useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const EditProfile = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const {updateEmail,updatePassword , currentUser} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('');
    const history = useHistory();


    const handelSubmit = (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== confirmRef.current.value) {
            return setError('Password dose not match')
        }

        const Promises = [];
        setError('');
        setLoading(true);

        if(passwordRef.current.value) {
            setError('')
            Promises.push(updatePassword(passwordRef.current.value))
        }

        if(emailRef.current.value !== currentUser.email){
            Promises.push(updateEmail(emailRef.current.value))
        }

        console.log(Promises)

        Promise.all(Promises).then(() => {
            history.push('/')
        }).catch(() => {
            setError('failed to update account')
        }).finally(() => {
            setLoading(false)
        })

    }

    return(
        <>
        <div className='container' style={{maxWidth:'400px'}}>
        <h2>Profile update </h2>
            <form onSubmit={handelSubmit}> 
            {error && <div className='error'>{error}</div>}
                <label htmlFor='email' >Email</label>
                <input type="email" id='email' ref={emailRef} required placeholder='Enter your new Email' defaultValue={currentUser.email}/>
                <label htmlFor='password'> Password</label>
                <input type='password' id='password' ref={passwordRef}  placeholder='leave it empty for the same password'/>
                <label htmlFor='passowrdConfig'>Password Confirmation </label>
                <input type='password' id='passowrdConfig' ref={confirmRef} placeholder='leave it empty for the same password'/>
                <button type="submit" disabled={loading} onClick={handelSubmit}> Update </button>
            </form>
        </div>
        <h4><Link to='/'>Cancel</Link></h4> 
        </> 
    )
}

export default EditProfile;