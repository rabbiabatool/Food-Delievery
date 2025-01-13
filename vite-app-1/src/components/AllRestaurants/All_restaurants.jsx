import React from "react";
import {All_Data} from "../../assets/All_Data"
import Item from "../Item/Item";
import './All_restaurants.css';
import { useEffect } from "react";
import { useState,useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

export default function All_restaurants(){

    // const [All_Products,setAllProducts]=useState([]);
    const {All_Products}=useContext(ShopContext);

    console.log(All_Products);

    // useEffect(()=>{
    //      const fetchData=async()=>{
    //         await fetch('http://localhost:5000/all_products',{
    //             method:'GET',
    //             headers:{
    //                 'Content-Type':'application/json'
    //             }
    //         }).then((resp)=>resp.json()).then((data)=>setAllProducts(data))
            

    //     }
    //     fetchData();
    // },[]);

    return(
        <div className="all_rest">
            <h1>All Restaurants</h1>
            <div className="products">

                {
                    All_Products.map((item) => {
                        return <Item
                            id={item.id}
                            key={item.key}
                            image={item.image}
                            name={item.name}
                          

                        />
                    })
                }
            </div>

        </div>

    );
}