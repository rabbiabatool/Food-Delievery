import React from 'react'
import { useState } from 'react'
import upload_area from '../../assets/upload_area.jpg';
import './Add_Product.css'


function Add_Product() {
    const [image,setImage] =useState(false);
    const [productDetails,setProductDetails] =useState({
        name:"",
        image:"",
        category:"Fast Food",
        description:"",
        subCategory1:"",
        subCategory2:"",
        subCategory3:"",
        price1:"",
        price2:"",
        price3:"",
        priority1:"",
        priority2:""
        
    })

    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

    const AddProduct=async()=>{
        let product = {
            ...productDetails,
            name: productDetails.name.toString(),
            category:productDetails.category.toString(),
            description: productDetails.description.toString(),
            subCategory1: productDetails.subCategory1.toString(),
            subCategory2: productDetails.subCategory2.toString(),
            subCategory3: productDetails.subCategory3.toString(),
            price1: Number(productDetails.price1),
            price2: Number(productDetails.price2),
            price3: Number(productDetails.price3),
            priority1:productDetails.priority1.toString(),
            priority2:productDetails.priority2.toString()
        };
        console.log("1",product.priority1);
        console.log("2",product.priority2);
        
        let responseData;

        const formdata=new FormData();
        formdata.append('profile',image);

        await fetch('http://localhost:5000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json'
            },
            body:formdata
        }).then((resp)=>resp.json()).then((data)=>responseData=data)

        console.log("data",product);

        if(responseData.success){
            product.image=responseData.profile_url;
            await fetch('http://localhost:5000/addProduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(product)

            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product added"):alert(`Failed:${data.message}`)
            })

        }



    }

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }
 

  return (
    <div className="add-product">
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Description</p>
            <input type="text" name='description' placeholder='Type here' value={productDetails.description} onChange={changeHandler} />
        </div>
        <div className="add_product_categories">
              <div className="addproduct-itemfield">
                  <p>SubCategory 1</p>
                  <input type="text" name='subCategory1' placeholder='Type here' value={productDetails.subCategory1} onChange={changeHandler} />
              </div>
              <div className="addproduct-itemfield">
                  <p>SubCategory 2</p>
                  <input type="text" name='subCategory2' placeholder='Type here' value={productDetails.subCategory2} onChange={changeHandler} />
              </div>
              <div className="addproduct-itemfield">
                  <p>SubCategory 3</p>
                  <input type="text" name='subCategory3' placeholder='Type here' value={productDetails.subCategory3} onChange={changeHandler} />
              </div>

        </div>
          <div className="add_product_categories">
              <div className="addproduct-itemfield">
                  <p>Price 1</p>
                  <input type="text" name='price1' placeholder='Type here' value={productDetails.price1} onChange={changeHandler} />
              </div>
              <div className="addproduct-itemfield">
                  <p>Price 2</p>
                  <input type="text" name='price2' placeholder='Type here' value={productDetails.price2} onChange={changeHandler} />
              </div>
              <div className="addproduct-itemfield">
                  <p>Price 3</p>
                  <input type="text" name='price3' placeholder='Type here' value={productDetails.price3} onChange={changeHandler} />
              </div>

          </div>
          <div className="add_product_categories">
              <div className="addproduct-itemfield">
                  <p>Priority 1</p>
                  <input type="text" name='priority1' placeholder='Type here' value={productDetails.priority1} onChange={changeHandler} />
              </div>
              <div className="addproduct-itemfield">
                  <p>Priority 2</p>
                  <input type="text" name='priority2' placeholder='Type here' value={productDetails.priority2} onChange={changeHandler} />
              </div>
            

          </div>
          <div className="addproduct-itemfield">
              <p>Product Category</p>
              <select name="category" value={productDetails.category} onChange={changeHandler} className='selector'>
                  <option value="Fast Food">Fast Food</option>
                  <option value="Desi Food">Desi Food</option>
              </select>
          </div>

          <div className="addproduct-itemfield">
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):upload_area} style={{width:"40px",height:"40px"}} alt="" className='thumbnail-img' />
            </label>
            <input type="file" onClick={imageHandler} name='image' id='file-input' hidden />
                  
          </div>

          <button onClick={()=>AddProduct()} className='add_btn'>ADD</button>
        
    </div>
  )
}

export default Add_Product
