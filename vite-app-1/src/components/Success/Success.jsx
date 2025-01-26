import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.webp";
// import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Success(){
   const navigate=useNavigate();
   const RemoveCart=async()=>{
    let response;
    if(localStorage.getItem('auth-token')){
        await fetch('https://food-delievery-production.up.railway.app/removeCart',{
            method:'PUT',
            headers:{
                
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body:""
            
        }).then((res)=>res.json()).then((data)=>response=data)

        if(response.success){
            alert("Cart is emptied");
            // AddToCart();
        }
    }
}
   useEffect(()=>{
    const emailNotifier = async () => {

        let response;
        const message="Your order has been placed successfully";

        await fetch('https://food-delievery-production.up.railway.app/sendEmail', {
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
            await RemoveCart();
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