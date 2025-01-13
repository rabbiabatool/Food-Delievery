import React from "react";
import './Cuisines.css'
import {Cuisine} from "../../assets/Cuisine";

import Slider from "react-slick";

export default function Cuisines(){
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 8,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 1
            }
          }
        ]
    }
    return(
        <div className="cuisine">
            <h1>Cuisines</h1>
            <Slider {...settings}>
             {
                Cuisine.map((item,index)=>{
                    return <img className="cuisine-img" key={index} src={item.image}alt="" />
                })

             }
            </Slider>
        </div>

    );
}