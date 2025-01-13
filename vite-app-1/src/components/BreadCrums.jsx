import React from "react";
import './Breadcrums.css';

export default function BreadCrums(props){

    let {product} =props;
    
    if (!product) {
      return <div>Loading...</div>; // Show loading state while waiting for product data
    }

    return(
        <div className="bread">
          <p>Home</p>
          <i className="fas fa-arrow-right"></i>
          <p>{product.category}</p>
          <i className="fas fa-arrow-right"></i>
          <p>{product.name}</p>
        </div>

    );
}