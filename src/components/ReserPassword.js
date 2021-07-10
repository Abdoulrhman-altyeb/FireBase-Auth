import React,{useRef,useState} from 'react';
import './singUp.css';
import {useAuth} from '../context/AuthContext';
import { Link } from 'react-router-dom';

const LogIn = () => {
    const emailRef = useRef();
    const {resetPassowrd} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('');
    const [message,setMessage] = useState('');  

    const handelSubmit = async (e) => {
        e.preventDefault();
        
        try{
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassowrd(emailRef.current.value)
            setMessage('check your inbox for further instructions')
        } catch{
            setError('Failed to reset Password');
        }
        
        setLoading(false);
    }

    return(
        <>
        <div className='container' style={{maxWidth:'400px'}}>
        <h2>Log in </h2>
            <form onSubmit={handelSubmit}> 
            {error && <div className='error'>{error}</div>}
            {message && <div className='succes'>{message}</div>}
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' ref={emailRef} required/>
                <button type="submit" style={{marginTop:'1rem'}} disabled={loading} onClick={handelSubmit}> Reset Password</button>
                <div className='reset'>
                    <Link to='/login' >
                        Log In
                    </Link>
                </div>
            </form>
        </div>
        <h4>Need an Account ? <Link to="/signup">Sing in </Link> </h4>
        </> 
    )
}

export default LogIn;