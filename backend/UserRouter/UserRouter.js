const router = require("express").Router();
const { AddtoCart, GetCart, Login, fetchUser, signup, setcartTotal, removeProduct, removeOrder, OrderDetails, removeCartItem, removeCart, priceTotal, addProduct, allProducts, createCheckout, EmailNotification } = require("../UserController/UserController");

const multer = require("multer");
const path = require("path");
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
// Multer Storage (Temporary file storage)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
    storage: multer.memoryStorage(),
});
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload_stream(
            { folder: "uploads" },
            (error, result) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                res.json({  success:true,imageUrl: result.secure_url });
            }
        ).end(req.file.buffer);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 Route to get image by public ID
router.get("/image/:publicId", (req, res) => {
    const { publicId } = req.params;
    const imageUrl = cloudinary.url(publicId, {
        fetch_format: "auto",
        quality: "auto",
        width: 500,
        height: 500,
        crop: "auto",
        gravity: "auto",
    });
    res.json({ imageUrl });
});

// const storage=multer.diskStorage({
//     destination:'upload/images',
//     filename:(req,file,cb)=>{
//         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// });

// const upload=multer({
//     storage:storage,
//     limits:{
//         fileSize:1000000000
//     }
// })

// router.post('/upload',upload.single('profile'),async(req,res)=>{
//     res.json({
//         success:true,
//         profile_url:`https://food-delievery-production.up.railway.app/images/${req.file.filename}`
//     })
// })

router.post('/addToCart', fetchUser, AddtoCart);
router.get('/getCart', fetchUser, GetCart);
router.post('/login', Login);
router.post('/signup', signup);
router.put('/removeCart', fetchUser, removeCart);
router.get('/priceTotal', fetchUser, priceTotal);
router.post('/addProduct', addProduct);
router.get('/all_products', allProducts);
router.post('/removeItem', fetchUser, removeCartItem);
router.get('/getOrders', OrderDetails);
router.post('/SetTotal', fetchUser, setcartTotal);
router.post('/removeOrder', removeOrder);
router.post('/remove_product', removeProduct);
router.post('/create-checkout-session', createCheckout);
router.post('/sendEmail', fetchUser, EmailNotification);




module.exports = { UserRouter: router };