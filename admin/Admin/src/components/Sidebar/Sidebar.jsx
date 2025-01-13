import React from "react";
import {Link} from "react-router-dom";
import add from '../../assets/add.jpg';
import './Sidebar.css';
// import styled from "styled-components";

export default function Sidebar(){
    return(
        <div className="sidebar">
            <div className="add">
                <Link to='/addProduct' style={{textDecoration:"none"}}>
                    <div className="sidebar-item">

                        <img src={add} alt="" />
                        <p>Add Product</p>
                    </div>
                </Link>
                <Link to='/listProduct' style={{textDecoration:"none"}}>
                    <div className="sidebar-item">

                        <img src={add} alt="" />
                        <p>list Product</p>
                    </div>
                </Link>
                <Link to='/Orders' style={{textDecoration:"none"}}>
                    <div className="sidebar-item">
                        <img src={add} alt="" />
                        <p>Orders</p>
                    </div>
                </Link>
            </div>
        </div>

    );
}

