// import React, { useEffect, useState } from "react";
// // import { All_Data } from "../assets/All_Data";
// import Item from "./Item";

// export default function CategoryList({category}){

//     const [Products,setProducts] =useState([]);

//     // const fetchData=async()=>{
//     //     await fetch('http://localhost:5000/all_products',{
//     //         method:'GET',
//     //         headers:{
//     //             Accept:'application/json',
//     //             'Content-type':'application/json'
//     //         },
//     //         body:""
//     //     }).then((resp)=>resp.json()).then((data)=>setProducts(data))

//     // }

//     // useEffect(()=>{
//     //   fetchData();

//     // },[]);

//     // useEffect(()=>{
//     //     setProducts(All_Data.filter((data)=> data.category===category))
//     // },[category]);

//     return(
//         <div className="list">
//             <h2>{category}</h2>
        
//             <div className="products">
//                 {
//                     Products.map((product) => {
//                         return <Item key={product.id} id={product.id} image={product.image} name={product.name} description={product.description} />
//                     })
//                 }
//             </div>
//         </div>

//     );
// }