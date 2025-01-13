import React, { useContext, useEffect, useState } from "react";
import './Checkout.css';
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navabar";
import { loadStripe } from '@stripe/stripe-js';
import { ShopContext } from "../../context/ShopContext";


const Checkout = () => {

    const [showPayments, setShowPayment] = useState(false);
    const [priority_price, SetPriorityPrice] = useState(0);
    const [cartData, setCartData] = useState([]);
    const [showTotal, setShowTotal] = useState(false);
    const {setShowCart}=useContext(ShopContext);
    const navigate = useNavigate();

    const location = useLocation();
    const { shopName } = location.state || {};

    const [price, setPrice] = useState(0);

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

    useEffect(() => {

        // setQuantity(GetCheckoutData());



        const fetchInfo = async () => {

            await fetch('http://localhost:5000/getCart', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`
                }

            }).then((resp) => resp.json()).then((data) => setCartData(data));

            await fetch('http://localhost:5000/priceTotal', {
                method: 'GET',
                headers: {
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                }
            }).then((resp) => resp.json()).then((data) => setPrice(data.total))



        }

        fetchInfo();


    }, []);

    const changeHandler = (e) => {
        SetPriorityPrice(50);
    }



    const [isDisabled, setDisabled] = useState(false);
    const Total = async () => {
        setDisabled(true);

        try {
            // Ensure cartData is populated correctly
            if (!cartData || cartData.length === 0) {
                console.error('Cart data is empty');
                return;
            }

            // Initialize Stripe
            const stripe = await loadStripe("pk_test_51Phy2JAfxtUK8UfaHFh5eP82w1KVcElB81pEj2TWE4xMNT8CJQgUCd4uRElKbpocsRhQSAHSjmaSwb3MTPxcHqfQ00WZ2y9J2S");

            // Prepare request body
            const body = {
                products: cartData
            };

            const headers = {
                "Content-Type": "application/json"
            };
            // setCartData([]); remove cart function here
            // Send request to server
            const response = await fetch('http://localhost:5000/create-checkout-session', {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Failed to create Stripe session');
            }

            const session = await response.json();

            // Redirect to Stripe Checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.error('Stripe Checkout Error:', result.error.message);
            }

        } catch (error) {
            console.error('Error during checkout:', error.message);
        }

    }
    const emailNotifier = async () => {

        // let response;
        let response;
        const message="Your order has been placed successfully";

        await fetch('http://localhost:5000/sendEmail', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({message})

        }).then((res) => res.json()).then((data) => response = data)

        // await fetch('http://localhost:5000/sendEmail', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'auth-token': `${localStorage.getItem('auth-token')}`,
        //         'Content-Type': 'application/json'
        //     }

        // }).then((res) => res.json()).then((data) => response = data)

        if (response.success) {

            console.log(response.success);
            return;


        }
        return;


    }
    const RemoveCart=async()=>{
        let response;
        if(localStorage.getItem('auth-token')){
            await fetch('http://localhost:5000/removeCart',{
                method:'PUT',
                headers:{
                    
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
                
            }).then((res)=>res.json()).then((data)=>response=data)

            if(response.success){
                // AddToCart();
                alert("Cart is empty");
            }
        }
    }
    const total = async () => {
        setShowCart(false); 
        alert("Your order has been placed successfully");
        await emailNotifier();
        // await RemoveCart();
        navigate("/");
    }


    const [isScrolled, setScrolled] = useState(false);
    const [isCash, setCash] = useState(false);
    const [isCard, setCard] = useState(false);


    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0 ? false : true);

        return () => (window.onscroll = null);
    }
    const cashInput = () => {
        setCash(true);
        setCard(false);

    }
    const cardInput = () => {
        setCard(true);
        setCash(false);
    }


    return (
        <>
            <Navbar isScrolled={isScrolled} />
            <div className="outer-check">

                <div className="checkout">
                    <div className="inner-left">
                        <div className="delivery-options">
                            <h1>Delivery options</h1>
                            <div className="standard">
                                <input type="radio" name="option" />
                                <span>Standard</span>
                                <p>20-35 mins</p>

                            </div>
                            <div className="priority">
                                <div className="priority-data">

                                    <input type="radio" name="option" onChange={changeHandler} />
                                    <span>Priority</span>
                                    <p>15-30mins</p>
                                </div>
                                <div className="priority-price">
                                    <p>+<span>Rs.50</span></p>

                                </div>
                            </div>
                        </div>

                        <div className="payment-options">
                            <div className="pay">

                                <h1>Payment</h1>
                                {showPayments === false ? <p onClick={() => setShowPayment(true)}>Show All</p> : ""}
                            </div>
                            <div className="pay-standard">
                                <div className="pay-data">

                                    <input type="radio" name="pay-option" onChange={cashInput} />
                                    <h3>Cash On Delievery</h3>
                                </div>

                                <div className="note">
                                    <p>Simply pay the driver, when he delivers the food to your doorstep.</p>

                                </div>

                            </div>
                            {showPayments && (


                                <div className="pay-priority">


                                    <input type="radio" name="pay-option" onChange={cardInput} />
                                    <h3>Credit or debit Card</h3>



                                </div>
                            )}
                        </div>

                    </div>

                    <div className="inner-right">
                        <div className="header">

                            <h1>Your order From</h1>
                            <h3>{shopName}</h3>


                        </div>
                        <div className="cartItems">
                            {cartData.map((c) => {

                                return (

                                    <div className="quantity-cal">

                                        <p>{c.quantity}x{c.category}</p>
                                        <p>Rs.{c.price}</p>
                                    </div>
                                )

                            })}

                        </div>
                        <hr />
                        <div className="total-container">
                            <div className="total">
                                <p>SubTotal</p>
                                <p>Rs.{price}</p>
                            </div>
                            <div className="total">
                                <p>Delievery charges</p>
                                <p>Rs.99</p>
                            </div>

                        </div>
                        <div className="grand-total">
                            <h1>Total</h1>
                            <h1>{99 + price + priority_price}</h1>
                        </div>

                    </div>


                </div>

                {isCard && <button className={`${isDisabled ? 'disabled' : ''}`} onClick={Total}>Place Order</button>}
                {isCash && <button className={`${isDisabled ? 'disabled' : ''}`} onClick={total}>Place Order</button>}


            </div>
            <Footer />
        </>

    );

}

export default Checkout;