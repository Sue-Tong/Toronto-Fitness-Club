import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'

// from https://reactjsexample.com/logster-a-react-app-that-has-a-login-register-and-reset-password-features/

export default function LandingPage() {

    localStorage.removeItem('token');
    
    return (
        <header style={ HeaderStyle }>
            <h1 className="main-title text-center">Welcome to Toronto Fitness Club</h1>
            <p className="main-para text-center">Join us now and stay healthy</p>
            <div className="buttons text-center">
                <Link to="login">
                    <button className="primary-button">Log in</button>
                </Link>
                <Link to="register">
                    <button className="primary-button" id="reg_btn"><span>Register </span></button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}