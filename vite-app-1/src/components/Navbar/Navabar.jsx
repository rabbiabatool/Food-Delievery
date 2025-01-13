import React, { useRef, useState } from "react";
import './Navbar.css'
// import cart_icon from "../../assets/cart_icon.png"
import logo from "../../assets/logo.webp";
import logo1 from "../../assets/logo1.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar({isScrolled}){

    const menuRef=useRef(null);
    
 

    const drop_down=(e)=>{
        menuRef.current.classList.toggle('search-bar-visible');

        // Toggle class on the clicked element
        e.target.classList.toggle('open');

    }

    const loginHandler=()=>{
        navigate('/login');
    }



  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate=useNavigate();
  const location=useLocation();
//   const {showMessanger}=location.state||{};
//   console.log(showMessanger);

  const [menu,setMenu]=useState("shop");
//   console.log(localStorage.getItem('auth-token'));
  
  const options = ["Pizza", "Burger", "Shawarma", "Fries", "Sandwitch","Pulao","Biryani","Salad","Karahi","Cold Drink","Ice Cream"];
  const handleChange=(e)=>{
    const Value=e.target.value;
    setInputValue(Value);

    if(Value){
        setSuggestions(options.filter(options=>options.toLowerCase().startsWith(Value.toLowerCase())));

    }
    else{
        setSuggestions(options);
    }
  }

  const handler=()=>{
    if(inputValue!==""){
        navigate('/searched',{state:{inputValue}});
        
    }
  }
  
  // Filter suggestions based on user input
//   const handleChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
    
//     if (value) {
//       setSuggestions(
//         options.filter(option => option.toLowerCase().startsWith(value.toLowerCase()))
//       );
//     } else {
//       setSuggestions(options); // Show all options if input is empty
//     }
//   };
    return(
        <div className={`navbar ${isScrolled?"scrolled":""}`}>
            <img src={logo1} alt="" />
            <div className="shop">
                <p onClick={() => setMenu("shop")}>
                    <Link to="/" style={{ textDecoration:'none' }}>
                        Shop
                    </Link>
                </p>
                {menu === "shop" ? <hr /> : <></>}
            </div>
        

            <i className="fa fa-bars drop-down" onClick={drop_down}></i>
            
            <div ref={menuRef} className="search-bar">
                
                <input className="input"
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={() => setSuggestions(options)}
                    onBlur={()=>setSuggestions([])}          // Show all suggestions on focus
                    placeholder="Search here"
                />
                <div className="suggestions">

                    {suggestions.length > 0 && (
                        <ul style={{ border: "1px solid #ccc", listStyleType: "none", padding: 0, background: "white" }}>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => setInputValue(suggestion)} style={{ padding: "5px", cursor: "pointer" }}>
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button onClick={handler}>Search</button>
            </div>

            
            <div className="cart-login">
                  {localStorage.getItem('auth-token')?<button onClick={()=>localStorage.removeItem('auth-token')}>Logout</button>:<button onClick={loginHandler}>Login</button>}
                  <img src={logo} alt="" onClick={()=>navigate("/chat")}/>
                  {/* <div className="nav_cart_count">0</div> */}
            </div>

            

        </div>

    )

}