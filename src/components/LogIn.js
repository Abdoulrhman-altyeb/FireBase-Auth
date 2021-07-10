import React,{useRef,useState} from 'react';
import './singUp.css';
import {useAuth} from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState('');
    const history = useHistory();

    const handelSubmit = async (e) => {
        e.preventDefault();
        
        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/')
        } catch{
            setError('Failed to Sign in');
        }
        
        setLoading(false);
    }

    return(
        <>
        <div className='container' style={{maxWidth:'400px'}}>
        <h2>Log in </h2>
            <form onSubmit={handelSubmit}> 
            {error && <div className='error'>{error}</div>}
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' ref={emailRef} required/>
                <label htmlFor='password'> Password</label>
                <input type='password'  id='password' ref={passwordRef} required/>
                <button type="submit" disabled={loading} onClick={handelSubmit}> Log In</button>
                <div className='reset'>
                    <Link to='/reset-password' >
                        Forgot Password ?
                    </Link>
                </div>
            </form>
        </div>
        <h4>Already Have an Account ? <Link to="/signup">Sing In</Link> </h4>
        </> 
    )
}

export default LogIn;