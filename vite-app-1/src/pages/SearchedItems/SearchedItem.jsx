import React, { useEffect, useState } from "react";
import './SearchedItem.css';
import { useLocation } from "react-router-dom";
import Item from "../../components/Item/Item";
import Navbar from "../../components/Navbar/Navabar";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import Footer from "../../components/Footer/Footer";

export default function SearchedItem() {
    const location = useLocation();

    const { inputValue } = location.state || {};
    const { All_Products } = useContext(ShopContext);


    const [noItem, setNoItem] = useState(false);
    const [products, setProducts] = useState([]);
    const [len, setLen] = useState(0);

    const [isScrolled, setIsScrolled] = useState(false);

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

    window.onscroll = () => {
        window.pageYOffset === 0 ? setIsScrolled(false) : setIsScrolled(true)
        return () => (window.onscroll = null)
    }

    useEffect(() => {
        if (inputValue === "pizza" || inputValue === "burger" || inputValue === "shawarma" || inputValue === "sandwitch" || inputValue === "fries") {
            setProducts(All_Products.filter((d) => d.category === "Fast Food"));
            setLen(products.length);

        }
        else if (inputValue === "biryani" || inputValue === "pulao" || inputValue === "salad" || inputValue === "karahi" || inputValue === "ice cream" || inputValue === "cold drink") {
            setProducts(All_Products.filter((d) => d.category === "Desi Food"));
            setLen(products.length);

        }
        else {
            setNoItem(true);
        }
    }, [inputValue, products.length]);



    return (
        <>
            <Navbar isScrolled={isScrolled} />
            <div className="searched-items">
                {noItem === true ? <h1>No Items Found</h1> :
                    <div className="all-items">
                        <h1>{len} Items Founds</h1>
                        <div className="products">

                            {products.map((item) => {
                                return <Item id={item.id}
                                    key={item.key} name={item.name} image={item.image} />
                            })}
                        </div>
                    </div>
                }
            </div>
            <Footer />
        </>


    );

}