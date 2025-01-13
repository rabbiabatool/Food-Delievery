import React from "react";
import './Footer.css';
import logo1 from "../../assets/logo1.jpg";
import delivery_logo from "../../assets/delivery_logo.jpg";

export default function Footer(){
    return(
        <div className="footer">
            <hr />
            <div className="categories-list-contain">

                <div className="categories-list">
                    <h3 className="main-head">american food delivery in lahore</h3>
                    <div className="categories">
                        <h3>kfc - johar town,</h3>
                        <h3>optp - t block</h3>
                    </div>
                    <div className="categories">
                        <h3>subway - jail road,</h3>
                        <h3>hardeez - k block</h3>
                    </div>
                    <div className="categories">
                        <h3>foodeez,</h3>
                        <h3>cafe aylanto - dha</h3>
                    </div>
                </div>
                <div className="categories-list">
                    <h3 className="main-head">pakistani food delivery in lahore</h3>
                    <div className="categories">
                        <h3>kfc - johar town,</h3>
                        <h3>optp - t block</h3>
                    </div>
                    <div className="categories">
                        <h3>subway - jail road,</h3>
                        <h3>hardeez - k block</h3>
                    </div>
                    <div className="categories">
                        <h3>foodeez,</h3>
                        <h3>cafe aylanto - dha</h3>
                    </div>
                </div>
                <div className="categories-list">
                    <h3 className="main-head">pizza delivery in lahore</h3>
                    <div className="categories">
                        <h3>kfc - johar town,</h3>
                        <h3>optp - t block,</h3>
                    </div>
                    <div className="categories">
                        <h3>subway - jail road,</h3>
                        <h3>hardeez - k block</h3>
                    </div>
                    <div className="categories">
                        <h3>foodeez,</h3>
                        <h3>cafe aylanto - dha</h3>
                    </div>
                </div>
                <div className="categories-list">
                    <h3 className="main-head">burger delivery in lahore</h3>
                    <div className="categories">
                        <h3>kfc - johar town,</h3>
                        <h3>optp - t block</h3>
                    </div>
                    <div className="categories">
                        <h3>subway - jail road,</h3>
                        <h3>hardeez - k block</h3>
                    </div>
                    <div className="categories">
                        <h3>foodeez,</h3>
                        <h3>cafe aylanto - dha</h3>
                    </div>
                </div>
                <div className="categories-list">
                    <h3 className="main-head">fast food delivery in lahore</h3>
                    <div className="categories">
                        <h3>kfc - johar town,</h3>
                        <h3>optp - t block</h3>
                    </div>
                    <div className="categories">
                        <h3>subway - jail road,</h3>
                        <h3>hardeez - k block</h3>
                    </div>
                    <div className="categories">
                        <h3>foodeez,</h3>
                        <h3>cafe aylanto - dha</h3>
                    </div>
                </div>
             </div>
                <hr />
                <div className="footer-logos">
                    <div className="shop-logo">


                        <img  className ="shop-img" src={logo1} alt="" />
                        <hr></hr>

                        <img  className="delivery-img" src={delivery_logo} alt="" />

                    </div>
                    <div className="other-logos">
                        <div className="insta-logo">
                            <i className="fab fa-instagram"></i>
                        </div>
                        <div className="fb-logo">
                            <i className="fab fa-facebook"></i>
                        </div>
                    </div>
                </div>
            
        </div>

    );
}