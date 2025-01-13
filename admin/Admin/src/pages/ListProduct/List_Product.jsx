import React from "react";
import './List_Product.css';
import { useState } from "react";
import { useEffect } from "react";

export default function List_Product(){

    const [allproducts,setAllProducts] = useState([]);
    const[state,setState]=useState(false);
    

    useEffect(()=>{
        const fetchData=async()=>{
           await fetch('http://localhost:5000/all_products',{
               method:'GET',
               headers:{
                   'Content-Type':'application/json'
               }
           }).then((resp)=>resp.json()).then((data)=>setAllProducts(data))
           
       }
       fetchData();
   },[state]);

   const RemoveProduct=async(Id)=>{

    await fetch('http://localhost:5000/remove_product',{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({Id})
    }).then((resp)=>resp.json());

    setState(true);
     
   }
   console.log(allproducts);

    return(
        <div className="list-product">
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Product</p>
                <p>Name</p>
                <p>Category</p>
                <p>SubCategory 1</p>
                <p>Price</p>
                <p>SubCategory 2</p>
                <p>Price</p>
                <p>SubCategory 3</p>
                <p>Price</p>
                <p>Priority 1</p>
                <p>Priority 2</p>
                <p>Remove</p>
            </div>
            <div className="list_product_all">
                <hr />
                {Object.values(allproducts).map((product) =>{
                    return <div className="listproduct-format-main listproduct-format">
                        <img src={product.image} alt="" className="listproduct-icon" />
                        <p>{product.name}</p>
                        <p>{product.category}</p>
                        <p>{product.subCategory1}</p>
                        <p>${product.price1}</p>
                        <p>{product.subCategory2}</p>
                        <p>${product.price2}</p>
                        <p>{product.subCategory3}</p>
                        <p>${product.price3}</p>
                        <p>{product.priority1}</p>
                        <p>{product.priority2}</p>
                        <i className="fas fa-times remove_icon" onClick={()=>RemoveProduct(product.id)}></i>
                        

                    </div>
                })}
            </div>

        </div>

    );
}