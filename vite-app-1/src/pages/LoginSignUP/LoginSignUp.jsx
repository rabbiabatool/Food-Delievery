import React, { useEffect, useState } from "react";
import './LoginSignUp.css';
import Footer from "../../components/Footer/Footer";

export default function LoginSignUp() {
    const [State, setstate] = useState("login");

    const [formData, SetFormData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        // Disable back and forward buttons
        const preventBackForward = () => {
            window.history.pushState(null, document.title);
            window.history.replaceState(null, document.title);

            // Trap the back navigation in the history stack
            window.onpopstate = () => {
                window.history.pushState(null, document.title);
                window.history.replaceState(null, document.title);
            };
        };

        // Call the function to disable navigation
        preventBackForward();

        // Cleanup function
        return () => {
            window.onpopstate = null;  // Remove the event listener when component unmounts
        };
    }, []);

    const LoginFunction = async () => {
        let response;
        await fetch('https://food-delievery-production.up.railway.app/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data) => response = data)

        if (response.success) {
            console.log(response.message);
            localStorage.setItem('auth-token', response.token);
            localStorage.setItem('email',response.email);
            window.location.replace('/');
        }
        else {
            console.log(response.message);
        }
    }

    const SignUpFunction = async () => {
        let response;
        await fetch('https://food-delievery-production.up.railway.app/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json()).then((data) => response = data)

        if (response.success) {
            console.log(response.message);
            localStorage.setItem('auth-token', response.token);
            window.location.replace('/');
        }
        else {
            console.log(response.message);
        }
    }


    const ChangeHandler = (e) => {
        SetFormData({ ...formData, [e.target.name]: e.target.value });

    }
    return (
        <>
            <div className="login-container">
                <div className="login-box">
                    <h1>{State}</h1>
                    <div className="login-input-fields">
                        <input type="text" placeholder="Enter email" name="email" value={formData.email} onChange={ChangeHandler} required />
                        <input type="text" placeholder="Enter password" name="password" value={formData.password} onChange={ChangeHandler} required />
                    </div>
                    <div className="login-btn">

                        {State === "login" ? <button onClick={LoginFunction}>Login</button> : <button onClick={SignUpFunction}>Sign Up</button>}

                        <div>

                            {State === "login" ? <p>Account not created?</p> : <p>Already have account?</p>}

                            {State === "login" ? <p className="signup" onClick={() => setstate("Sign Up")}>SignUp</p> : <p className="login" onClick={() => setstate("login")}>Login</p>}
                        </div>

                    </div>
                </div>
            </div>

        </>

    );

}