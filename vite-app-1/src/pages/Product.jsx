import React, { useContext} from "react";
import BreadCrums from "../components/BreadCrums";
import { useParams } from "react-router-dom";
// import { All_Data } from "../assets/All_Data";
import ProductDisplay from "../components/ProductDisplay";
import { ShopContext } from "../context/ShopContext";


export default function Product(){
    
    const {All_Products}=useContext(ShopContext);
    const {id} = useParams();

  

    const product=All_Products.find((e)=>e.id===Number(id));

    console.log("Product:",product);

   
   

    return(
        <div className="div">
          

            <BreadCrums product={product} />
            <ProductDisplay product={product} />
        </div>


    );
}