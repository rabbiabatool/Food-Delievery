import React from "react";
import {Link} from "react-router-dom"
import './Item.css';


export default function Item(props){
    
    return(
        <div className="product-list">
            <Link to={`/product/${props.id}`}><img src={props.image} alt="" /></Link>
            <div className="About">
            
               <h3>{props.name}</h3>
                <div className="reviews">
                 <i class="fas fa-star" style={{color:"golden"}}></i>
                 <p>4.6(100+)</p>
               </div>
            </div>
        </div>

    );
}