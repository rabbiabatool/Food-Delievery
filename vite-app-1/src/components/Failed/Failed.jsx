import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.webp";
// import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Failed(){
   const navigate=useNavigate();
   useEffect(()=>{
    const emailNotifier = async () => {

        let response;
        const message="Your order can not be placed.";

        await fetch('http://localhost:5000/sendEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({message})

        }).then((res) => res.json()).then((data) => response = data)

        if (response.success) {

            console.log(response.success);
            navigate("/");
            return;


        }
        return;


    };
    emailNotifier();
   },[]);
   
    return(
        <div>
            <h1>Order placement is successful</h1>

        </div>

    )

}