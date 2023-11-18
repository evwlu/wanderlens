import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => { 
    const navigate = useNavigate()
    const id = -1;

    const onClick = () => {
        // TODO: Handle login here. We should return a token that we can use to authenticate the user.
        
        /*
    
        */
        navigate(`/profile/${id}`);
    }

    return (
        <div className="Login">
            <main className="login-container">
                <div className="login">
                    <button onClick={() => onClick()}> Login to GitHub! </button>
                </div>
            </main>
        </div>
    )
}

export default Login