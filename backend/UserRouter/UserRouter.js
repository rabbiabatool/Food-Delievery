const router=require("express").Router();
const {AddtoCart,GetCart, Login, fetchUser,signup, setcartTotal,removeProduct,removeOrder,OrderDetails,removeCartItem,removeCart, priceTotal, addProduct, allProducts, createCheckout, EmailNotification}=require("../UserController/UserController");

const multer=require("multer");
const path=require("path");

const storage=multer.diskStorage({
    destination:'upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1000000000
    }
})

router.post('/upload',upload.single('profile'),async(req,res)=>{
    res.json({
        success:true,
        profile_url:`http://localhost:5000/images/${req.file.filename}`
    })
})

router.post('/addToCart',fetchUser,AddtoCart);
router.get('/getCart',fetchUser,GetCart);
router.post('/login',Login);
router.post('/signup',signup);
router.put('/removeCart',fetchUser,removeCart);
router.get('/priceTotal',fetchUser,priceTotal);
router.post('/addProduct',addProduct);
router.get('/all_products',allProducts);
router.post('/removeItem',fetchUser,removeCartItem);
router.get('/getOrders',OrderDetails);
router.post('/SetTotal',fetchUser,setcartTotal);
router.post('/removeOrder',removeOrder);
router.post('/remove_product',removeProduct);
router.post('/create-checkout-session',createCheckout);
router.post('/sendEmail',fetchUser,EmailNotification);




module.exports = { UserRouter: router };