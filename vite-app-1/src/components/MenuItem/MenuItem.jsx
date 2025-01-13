import React, { useState } from "react";
import './MenuItem.css';
import Modal from "../Modal/Modal";
// import {ShopContext} from "../../context/ShopContext"
import { useNavigate } from "react-router-dom";

export default function MenuItem(props){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemRemove,setState]=useState(false);

    // const {SetCheckoutData}=useContext(ShopContext);

    const [newItem,setItem]=useState({
        name:props.product.name,
        category:props.sub,
        price:props.price,
        priority:"",
        quantity:0

    })

    // const [priorityChoosed,SetPriority]= useState("");
    const [controlled,Controller]=useState(1);

    const navigate=useNavigate();

    const RadioButtonChangeHandler=(e)=>{

        setItem({...newItem,[e.target.name]:e.target.value})

    }

    const AddToCart=async()=>{
        setState(false);

        let response;

        console.log("cart",newItem);
      
        if(localStorage.getItem('auth-token')){

           
            await fetch('http://localhost:5000/addToCart',{
                method:'POST',
                headers:{
                    'Accept':'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({newItem})
            }).then((res)=>res.json()).then((data)=>response=data)
    
            if(response.success){
                alert(response.message);
                console.log(response.success);
                props.showCart(true);
                props.fetchData();
              
            }
            else{
                setState(true);
                setIsModalOpen(true);
              
            }
        }
        else{
            navigate('/login');
        }

       

          
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
                AddToCart();
            }
        }
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);

    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const productDecrement=()=>{

        let i=controlled;
        i-=1;

        Controller(i);    

    }

    const productIncrement=()=>{

        
        let i=controlled;
        i+=1;

        Controller(i);   
        
    }

    return(
      <>
        <div className="item" onClick={handleOpenModal}>
            <h3>{props.sub}</h3>
            <div className="price">

                    <span>Rs.</span>
                    <p>{props.price}</p>
            </div>
            <div className="add-box">
                <i className="fas fa-plus"></i>
            </div>
        </div>

        {isModalOpen && (
            <Modal onClose={handleCloseModal}>
                <div className="options-box">
                    <div className="options">
                        <input type="radio" value={props.priority1} name="priority" onChange={RadioButtonChangeHandler}/>
                        <p>{props.priority1}</p>
                        <input type="radio" value={props.priority2} name="priority"  onChange={RadioButtonChangeHandler} />
                        <p>{props.priority2}</p>

                    </div>
                </div>
                <div className="productAdd">
                    <div className="product-increment">
                        <div className={`controls ${controlled===1?"disabled":""}`} onClick={productDecrement}>
                            <i className="fas fa-minus"></i>
                        </div>
                        <p>{controlled}</p>
                        <div className={`controls ${controlled===100?"disabled":""}`} onClick={productIncrement}>
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>

                    <button className="add-btn" onClick={()=>AddToCart()}>Add To Cart</button>
                </div>
            </Modal> 
        
       )}
        {itemRemove && isModalOpen && (
            <Modal onClose={handleCloseModal}>
                <h1>All items will be removed</h1>
                <button onClick={RemoveCart}>Remove anyway</button>

            </Modal>
        )}
      </>

    );
}