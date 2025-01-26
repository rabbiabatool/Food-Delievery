import { createContext, useEffect, useState } from "react";
// import react from react;

export const ShopContext = createContext(null);

const ShopContextProvider=(props)=>{

    const [All_Products,setAllProducts] =useState([]);
    const[showCart,setShowCart] = useState(false);
    const[showTotal,setShowTotal]=useState(false);

    const [checkoutDetails,setCheckoutDetails]=useState([{
        product_name:"",
        product_category:"",
        product_price:0,
        product_priority:"",
        product_quantity:0

    }]);

    useEffect(()=>{
        const fetchData=async()=>{
           await fetch('https://food-delievery-production.up.railway.app/all_products',{
               method:'GET',
               headers:{
                   'Content-Type':'application/json'
               }
           }).then((resp)=>resp.json()).then((data)=>setAllProducts(data))
           

       }
       fetchData();
   },[]);

    const GetCheckoutData=async()=>{
        let quantity;

       if(localStorage.getItem('auth-token')){
         await fetch('https://food-delievery-production.up.railway.app/cartTotal',{
            method:'GET',
            headers:{
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json'
            },
            body:""
        }).then((res)=>res.json()).then((data)=>quantity=data);

        return quantity;
          
       }

    }

    const SetCheckoutData=(title,category,price,priority,quantity)=>{

        setCheckoutDetails({...checkoutDetails,product_name:title,product_category:category,product_price:price,product_priority:priority,product_quantity:quantity});



    }

    const contextValue={GetCheckoutData,SetCheckoutData,All_Products,setShowCart,showCart,showTotal,setShowTotal};

    return(

        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );

   

}

export default ShopContextProvider;