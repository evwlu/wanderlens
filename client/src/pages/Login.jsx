import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Login.css'

const Login = () => { 
    return (
        <div className="Login">
            <main class="login-container">
                <div class="login">
                    <button> Login to GitHub! </button>
                </div>
            </main>
        </div>
    )
}

export default Login