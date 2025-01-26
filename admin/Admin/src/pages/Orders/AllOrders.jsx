import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import './AllOrders.css'


export default function AllOrders(){

    // const [OrderDetails,setOrderDetails]=useState([]);
    useEffect(()=>{
        const fetchInfo=async()=>{
          try{

            const response=await fetch('https://food-delievery-production.up.railway.app/getOrders',{
              method:'GET',
              headers:{
                 'Accept':'application/json',
                 'Content-Type':'application/json'
              }
            });
            if(!response.ok){
             throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
 
            const data=await response.json();
            if(data.success){
              const SPREADSHEET_ID = '1MMAQBTfKBkbIozmnu1DvwDyJJQ0ndzNKyPXbDPFlbTA';
              const sheetUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`;
              
              // Open in the same tab
              window.location.href = sheetUrl;
              
              // Open in a new tab
              window.open(sheetUrl, '_blank');
              
            }else{
              console.log("Some issue has occured");
            }
            // console.log("Fetched orders",data);
            // setOrderDetails(data);
          }catch(error){
            console.error("Failed to fetch orders: ",error);
          }
       }
        fetchInfo();
    },[]);
    // console.log(OrderDetails);

    return(
        <div className="all_orders">
            <h1>Redirecting to google sheeet....</h1>
            {/* <div className="ordersList">
                <p>Email</p>
                <p>Restaurant</p>
                <p>Category</p>
                <p>Quantity</p>
                <p>Price</p>
               
            </div>
            <hr />
            <div className="OrderList">
                {
                    OrderDetails.map(order => (
                        <div key={order._id}>
                        
                          {order.cart.map(item => (
                            <div key={item._id} className="ordersList">
                              <p>{order.email}</p>
                              <p>{item.name}</p>
                              <p>{item.category}</p>
                              <p>{item.quantity}</p>
                              <p>{item.price}</p>
                            </div>
                          ))}
                        </div>
                    ))
                }
                
            </div> */}
        </div>

    );

}