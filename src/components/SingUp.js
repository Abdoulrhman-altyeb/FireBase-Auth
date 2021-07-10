import React,{useRef, useState} from 'react';
import './singUp.css';
import {useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const SingUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();
    const {singup} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('');
    const history = useHistory();


    const handelSubmit =async (e) => {
        e.preventDefault();

        if(passwordRef.current.value !== confirmRef.current.value) {
            return setError('The passowrd dose not matches');
        }

        try{
            setError('');
            setLoading(true);
            await singup(emailRef.current.value, passwordRef.current.value);
            history.push("/login")
        } catch{
            setError('Can not make a new account');
        }
        
        setLoading(false);
    }

    return(
        <>
        <div className='container' style={{maxWidth:'400px'}}>
        <h2>Sing Up </h2>
            <form onSubmit={handelSubmit}> 
            {error && <div className='error'>{error}</div>}
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' ref={emailRef} required/>
                <label htmlFor='password'> Password</label>
                <input type='password' id='password' ref={passwordRef} required/>
                <label htmlFor='passowrdConfig'>Password Confirmation </label>
                <input type='password' id='passowrdConfig' ref={confirmRef} required/>
                <button type="submit" disabled={loading} onClick={handelSubmit}> Sing Up </button>
            </form>
        </div>
        <h4>Already Have an Account ? <Link to='/login'>login</Link> </h4>
        </> 
    )
}

export default SingUp;