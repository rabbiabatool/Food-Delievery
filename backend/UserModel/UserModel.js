const mongoose=require("mongoose");
// "mongodb://localhost:27017/food_Delievery"
// const uri="mongodb+srv://rabbiabatool875:RyvFzhqClOKp7u6W@cluster0.rzziv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
require('dotenv').config();  // Add this line to load the .env file

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
}).catch(err => {
    console.log("MongoDB connection error: ", err);
});


const ProductSchema=new mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    name:{
        type:String,
        required:true,
        unique: true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true

    },
    subCategory1:{
        type:String,
        required:true

    },
    subCategory2:{
        type:String,
        required:true

    },
    subCategory3:{
        type:String,
        required:true

    },
    price1:{
        type:Number,
        required:true
    },
    price2:{
        type:Number,
        required:true
    },
    price3:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority1:{
        type:String,
        required : true
    },
    priority2:{
        type:String,
        required : true
    }
 
});
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    cart:[{
        name:{
            type:String
        },
        category:{
            type:String
        },
        price:{
            type:Number,
        },
        priority:{
            type:String

        },
        quantity:{
            type:Number
        },
       
        total:{
            type:Number
        }

    }],

})

const Product=mongoose.model("Product",ProductSchema);
const User=mongoose.model("User",UserSchema)
module.exports={Product,User};
  

