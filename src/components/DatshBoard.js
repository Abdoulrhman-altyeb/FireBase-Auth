import React, { useState } from 'react';
import './Dash.css';
// firebase
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const DashBoard = () => {

    const {currentUser,logOut} = useAuth();
    const [error, setError] = useState('');
    const history = useHistory();

    const handelLogOut = async () => {
        setError('');
        try{
            await logOut();
            history.push('/login');
            
        } catch{
            setError('Failed to logOut')
        }
    }
    return(
        <>
            <div className='container'>
             <h1>profile</h1>
             {error && <div className='error'>{error}</div>}           
             <h3><strong>Email :</strong>{currentUser.email}</h3>
                <Link to='/edit-profile' className='btn'>
                     Edit Profile
                </Link>
            </div>
            <span  onClick={handelLogOut}>
                Log Out
            </span>
        </>
    )

}


export default DashBoard;