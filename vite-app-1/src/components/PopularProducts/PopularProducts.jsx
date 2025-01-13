import React, { useContext } from "react";
import './PopularProducts.css';
import Slider from "react-slick";
import Item from "../Item/Item";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../../context/ShopContext";


export default function PopularProducts(){

    // let Products=All_Data.filter((d)=>d.category==="Fast Food");
    const {All_Products}=useContext(ShopContext);
    const win = () => {
       window.scrollTo({
        top:0,
        behavior:'smooth'
       });
    };
    

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    }


    return(
        <div className="container">
            <div className="header">
            
                <div className="right">
                    <h1>Popular Now</h1>
                   
                </div>
            </div>

            <Slider {...settings}>
                {
                    All_Products.map((item,index)=>{
                        return<div className="Item-list" key={index} onClick={win}>
                           <Item id={item.id} key={item.id} name={item.name} image={item.image} />
                        </div>

                    })
                }
                
            </Slider>
        </div>

    );
}