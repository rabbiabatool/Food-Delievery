// import React, { useEffect, useState } from "react";
// import './RestaurantsList.css'
// import Navbar from "../../components/Navbar/Navabar";
// import Hero from "../../components/Hero/Hero";
// import Discount from "../../components/Discount/Discount";
// import Cuisines from "../../components/Cuisines/Cuisines";
// import All_restaurants from "../../components/AllRestaurants/All_restaurants";
// import Footer from "../../components/Footer/Footer";

// export default function RestaurantsList() {

//     const [isScrolled, setScrolled] = useState(false);
//     useEffect(() => {
//         // Disable back and forward buttons
//         const preventBackForward = () => {
//             window.history.pushState(null, document.title);
//             window.history.replaceState(null, document.title);

//             // Trap the back navigation in the history stack
//             window.onpopstate = () => {
//                 window.history.pushState(null, document.title);
//                 window.history.replaceState(null, document.title);
//             };
//         };

//         // Call the function to disable navigation
//         preventBackForward();

//         // Cleanup function
//         return () => {
//             window.onpopstate = null;  // Remove the event listener when component unmounts
//         };
//     }, []);

//     window.onscroll = () => {
//         setScrolled(window.pageYOffset === 0 ? false : true);

//         return () => (window.onscroll = null);
//     }
//     return (
//         <div className="list">
//             <Navbar isScrolled={isScrolled} />
//             <Hero />
//             <Discount />
//             <Cuisines />
//             <All_restaurants />
//             <Footer />

//         </div>

//     );
// }
import React, { useEffect, useState } from "react";
import './RestaurantsList.css';
import Navbar from "../../components/Navbar/Navabar";
import Hero from "../../components/Hero/Hero";
import Discount from "../../components/Discount/Discount";
import Cuisines from "../../components/Cuisines/Cuisines";
import All_restaurants from "../../components/AllRestaurants/All_restaurants";
import Footer from "../../components/Footer/Footer";

export default function RestaurantsList() {
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        // Disable back and forward buttons
        const preventBackForward = () => {
            window.history.pushState(null, document.title);
            window.history.replaceState(null, document.title);

            window.onpopstate = () => {
                window.history.pushState(null, document.title);
                window.history.replaceState(null, document.title);
            };
        };

        preventBackForward();

      
    }, []);
    window.onscroll = () => {
        setScrolled(window.pageYOffset === 0 ? false : true);

        return () => (window.onscroll = null);
    }

    return (
        <div className="list">
            <Navbar isScrolled={isScrolled} />
            <Hero />
            <Discount />
            <Cuisines />
            <All_restaurants />
            <Footer />
        </div>
    );
}
