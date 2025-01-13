import React from "react";
import './Hero.css'
import pizza_hero from "../../assets/pizza_hero.jpg";

export default function Hero(){
    return(
        <div className="hero">
            <div className="hero-left">
            
                <h1>TASTY FOOD COMING TO YOU</h1>
            
                
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi reprehenderit repellendus, maxime tempora nobis excepturi.</p>
                
                <button>
                    Order Now
                </button>
            </div>
            <div className="hero-right">
                <img src={pizza_hero} alt="" />
            </div>

        </div>

    );
}