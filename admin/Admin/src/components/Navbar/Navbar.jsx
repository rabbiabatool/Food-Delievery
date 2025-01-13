import React from "react";
import './Navbar.css';
import profile from '../../assets/profile.jpg';
import logo from '../../assets/logo.webp';
import { useNavigate } from "react-router-dom";


export default function Navbar(){
    const navigate=useNavigate();
    return(
        <div className="navbar">
            <img src={logo} alt="" className="image" onClick={()=>navigate("/Chat")} />
            <img src={profile} alt="" className="image"/>
        </div>
    );
}