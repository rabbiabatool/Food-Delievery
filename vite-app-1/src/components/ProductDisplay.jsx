import React, { useState } from "react";
import Modal from "./Modal/Modal";
import './ProductDisplay.css';
import Menu from "./Menu/Menu";
import Discount from "./Discount/Discount"
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navabar";
import PopularProducts from "./PopularProducts/PopularProducts";

export default function ProductDisplay({product}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [isScrolled,setScrolled]=useState(false);
    window.onscroll=()=>{
        setScrolled(window.pageYOffset===0?false:true);
        return()=>(window.onscroll=null);
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    if (!product) {
        return <div>Loading...</div>; // Show loading state while waiting for product data
    }

    return (
      <>
        <Navbar isScrolled={isScrolled} />
        <div className="main">
            <div className="image">
                <img src={product.image} alt="" />
            </div>
            <div className="information">
                <p>{product.category}</p>
                <h1>{product.name}</h1>
                <div className="stars-more">

                    <div className="stars">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="more">

                        <button onClick={handleOpenModal}>More Info</button>
                        {isModalOpen && (
                            <Modal onClose={handleCloseModal}>
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                            </Modal>
                        )}
                    </div>
                </div>


            </div>
        </div>
        <Menu product={product} />
        <PopularProducts />
        <Footer />
      </>
    );
}