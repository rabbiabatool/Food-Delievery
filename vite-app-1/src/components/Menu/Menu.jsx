import './Menu.css'
import React from "react";
import MenuItem from "../MenuItem/MenuItem";
import { useState } from "react";
import { useEffect } from "react";
import empty_cart from "../../assets/empty_cart.png"
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../../context/ShopContext';
import PopularProducts from '../PopularProducts/PopularProducts';

export default function Menu({ product }) {

    const [price, setPrice] = useState(0);

    const [cartData, setCartData] = useState([]);
    const { showCart, setShowCart } = useContext(ShopContext);

    const navigate = useNavigate();
    useEffect(() => {
        // Disable back and forward buttons
        const preventBackForward = () => {
            window.history.pushState(null, document.title);
            window.history.replaceState(null, document.title);

            // Trap the back navigation in the history stack
            window.onpopstate = () => {
                window.history.pushState(null, document.title);
                window.history.replaceState(null, document.title);
            };
        };

        // Call the function to disable navigation
        preventBackForward();

        // Cleanup function
        return () => {
            window.onpopstate = null;  // Remove the event listener when component unmounts
        };
    }, []);


    const fetchData = async () => {
        try {
            // Fetch cart data
            const cartResponse = await fetch('http://localhost:5000/getCart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
            });

            const cartData = await cartResponse.json();
            setCartData(cartData);
            console.log('Cart Data:', cartData);

            // Fetch total price
            const priceResponse = await fetch('http://localhost:5000/priceTotal', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                },
            });

            const priceData = await priceResponse.json();
            setPrice(priceData.total);
            console.log('Price:', priceData.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            fetchData();
            //   setShowCart(true);
        }
    }, []); // Runs only when the component mounts

    const RemoveItem = async (category) => {

        await fetch('http://localhost:5000/removeItem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`
            },
            body: JSON.stringify({ category })

        }).then((res) => res.json()).then((data) => { console.log(data.message) })

        fetchData();
    }

    const Checking = () => {
        navigate("/checkout", { state: { shopName: product.name } });
    }

    return (

        <div className="container-menu">
            <div className="menu">
                <h1>Menu</h1>
                <div className="section1">
                    <div className="menu-item">
                        <MenuItem fetchData={fetchData} showCart={setShowCart} sub={product.subCategory1} price={product.price1} priority1={product.priority1} priority2={product.priority2} product={product} />
                        <MenuItem fetchData={fetchData} showCart={setShowCart} sub={product.subCategory2} price={product.price2} priority1={product.priority1} priority2={product.priority2} product={product} />
                        <MenuItem fetchData={fetchData} showCart={setShowCart} sub={product.subCategory3} price={product.price3} priority1={product.priority1} priority2={product.priority2} product={product} />
                    </div>
                </div>
                <div className="section1">
                    <div className="menu-item">
                        <MenuItem fetchData={fetchData} showCart={setShowCart} sub={product.subCategory1} price={product.price1} priority1={product.priority1} priority2={product.priority2} product={product} />
                        <MenuItem fetchData={fetchData} showCart={setShowCart} sub={product.subCategory2} price={product.price2} priority1={product.priority1} priority2={product.priority2} product={product} />
                        <MenuItem fetchData={fetchData} showCart={setShowCart} sub={product.subCategory3} price={product.price3} priority1={product.priority1} priority2={product.priority2} product={product} />
                    </div>
                </div>

            </div>

            <div className="cart">
                {showCart === true ? (
                    <div className="cart-data">
                        <h3>Your Items</h3>
                        <div className="all_cart">
                            {cartData.map((c) => (
                                <div className="CartItems" key={c.id}> {/* Include a unique key */}
                                    <div className="cart_item">
                                        <div className="item_img">
                                            <img src={product.image} alt="product" />
                                        </div>
                                        <div className="item_info">
                                            <p>{c.category}</p>
                                            <p>{c.priority}</p>
                                        </div>
                                    </div>

                                    <div className="price-item">
                                        <p>Rs.{c.price}</p>

                                        <div className="product-increment">

                                            <i onClick={() => RemoveItem(c.category)} className="fas fa-trash"></i>


                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-total">
                            <h3>Total</h3>
                            <h3 className='cart-total-price'>Rs.{price}</h3>
                            <button onClick={Checking}>Review Payment and Address
                            </button>
                        </div>
                    </div>
                ) : (
                    <img src={empty_cart} alt="Empty Cart" />
                )}


            </div>

        </div>



    );

}