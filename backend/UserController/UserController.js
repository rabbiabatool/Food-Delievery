const { Product } = require("../UserModel/UserModel");
const { User } = require("../UserModel/UserModel");
const jwt = require('jsonwebtoken');
const stripe = require('stripe')("sk_test_51Phy2JAfxtUK8Ufa8ePivAyNIfRalMRJZDOLN8mCHHICS73VUhL8iWd6BPwjaRphPue6fUeTUW7G6gttEtYYYwJz00tEgfDF8X");

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const base64url = require('base64url');




// The scope for sending emails via Gmail
const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Path to the credentials file and token file
const CREDENTIALS_PATH = 'credentials.json'; // Change this to your credentials.json path
const TOKEN_PATH = 'token.json'; // Path to the token file

// Get a new token after OAuth flow
function getNewToken(oAuth2Client) {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });

    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Enter the code from that page here: ', async (code) => {
      rl.close();
      try {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        await fs.promises.writeFile(TOKEN_PATH, JSON.stringify(tokens));
        resolve();
      } catch (error) {
        reject('Error retrieving access token');
      }
    });
  });
}

// Authenticate the user and get the Gmail API service
async function authenticateGmail() {
  let credentials;

  try {
    credentials = await fs.promises.readFile(CREDENTIALS_PATH);
  } catch (error) {
    console.log('Error reading credentials file:', error);
    return;
  }

  const { client_id, client_secret, redirect_uris } = JSON.parse(credentials).installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  let token;

  // Check if token.json exists
  try {
    token = await fs.promises.readFile(TOKEN_PATH);
  } catch (error) {
    console.log('No token found, starting OAuth flow...');
    await getNewToken(oAuth2Client);
    return;
  }

  oAuth2Client.setCredentials(JSON.parse(token));
  return google.gmail({ version: 'v1', auth: oAuth2Client });
}



// Create the email message
function createMessage(sender, to, subject, body) {
    const message = [
        `From: ${sender}`,
        `To: ${to}`,
        `Subject: ${subject}`,
        '',
        body
    ].join('\n');

    const rawMessage = base64url.encode(message);
    return { raw: rawMessage };
}

// Send the email
async function sendEmail(service, sender, to, subject, body) {
    const message = createMessage(sender, to, subject, body);

    try {
        const sendMessage = await service.users.messages.send({
            userId: 'me',
            requestBody: message
        });
        console.log('Message Id:', sendMessage.data.id);
    } catch (error) {
        console.error('Error occurred while sending email:', error);
    }
}
module.exports.EmailNotification = async (req, res) => {
    const {message}=req.body;
    const service = await authenticateGmail();

    if (!service) {
        console.log('Authentication failed');
        return;
    }

    const users = await User.findById(req.user.id);



    const sender = 'rabbiabatool875@gmail.com'; // Change to your email
    const to = users.email; // The user's email
    const subject = 'Order placement';
    const body = `
       ${message}
       
      `;

    // Send email to the user
    await sendEmail(service, sender, to, subject, body);
    res.json({ success: true });
}

// app.use('/images',express.static('upload/images'))
const { google } = require('googleapis');

// Path to the Google Service Account JSON file
const SERVICE_ACCOUNT_FILE = './rising-capsule-444115-h8-2de004958209.json';
const SPREADSHEET_ID = '1MMAQBTfKBkbIozmnu1DvwDyJJQ0ndzNKyPXbDPFlbTA';

// Set up credentials and service
const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Function to get Google Sheets service
async function getSheetsService() {
    const authClient = await auth.getClient();
    return google.sheets({ version: 'v4', auth: authClient });
}

// Function to read data from the Google Sheet
async function readData(rangeName) {
    try {
        const sheets = await getSheetsService();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: rangeName,
        });
        return response.data.values || [];
    } catch (error) {
        console.error('Error reading data:', error.message);
        return [];
    }
}

// Function to append data to the Google Sheet
async function appendData(rangeName, values) {
    try {
        const sheets = await getSheetsService();
        const request = {
            spreadsheetId: SPREADSHEET_ID,
            range: rangeName,
            valueInputOption: 'RAW',
            requestBody: {
                values: values,
            },
        };
        const response = await sheets.spreadsheets.values.append(request);
        return response.data;
    } catch (error) {
        console.error('Error appending data:', error.message);
        return null;
    }
}



module.exports.createCheckout = async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((e) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: e.name,
                    metadata: {
                        image: e.image // Use metadata for storing image reference
                    }
                },
                unit_amount: Math.round(Number(e.price) * 100) // Convert price to cents
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/Success",
            cancel_url: "http://localhost:3000/Failed",
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Stripe Checkout Error:', error.message);
        res.status(500).json({ error: 'Failed to create Stripe session' });
    }
};




module.exports.fetchUser = async (req, res, next) => {
    console.log("entered");
    const token = req.header('auth-token');
    if (!token) {

        res.status(401).send({ errors: "Please authenticate using valid token" });
    }
    else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();

        } catch (error) {

            res.status(401).send({ errors: "Please authenticate using valid token" });
        }
    }
}
function formatRequiredUsersForSheet(requiredUsers) {
    // const formattedData = [
    //     // ["_id", "email", "password", "cart_name", "cart_category", "cart_price", "cart_priority", "cart_quantity"]
    // ];
    const formattedData=[];

    requiredUsers.forEach(user => {
        if (user.cart && user.cart.length > 0) {
            user.cart.forEach(cartItem => {
                formattedData.push([
                    user._id,
                    user.email,
                    user.password,
                    cartItem.name,
                    cartItem.category,
                    cartItem.price,
                    cartItem.priority,
                    cartItem.quantity
                ]);
            });
        } else {
            formattedData.push([
                user._id,
                user.email,
                user.password,
                "", "", "", "", ""
            ]);
        }
    });
    console.log(formattedData);

    return formattedData;
}


module.exports.OrderDetails = async (req, res) => {


    const requiredUsers = await User.find({
        cart: { $exists: true, $not: { $size: 0 } } // Direct MongoDB query
    });
    if (!requiredUsers) {
        return res.status(500).json({ error: 'Failed to fetch users' });
    }
    const rangeName = 'Sheet2';
    const formattedData = formatRequiredUsersForSheet(requiredUsers);
    console.log("users",requiredUsers);
    console.log('Formatted Data:', formattedData);

    const appendResult = await appendData(rangeName, formattedData);
    console.log('Append Result:', appendResult);
    res.json({ success: true });

    // let user=await User.find({});

    // let requiredUsers=user.filter(users=>users.cart && users.cart.length>0);

    // res.json({orders:requiredUsers});


}

module.exports.AddtoCart = async (req, res) => {

    let { newItem } = req.body;
    const { name, category, price, priority } = newItem;
    console.log(name, category, price, priority);


    try {


        let user = await User.findOne({ _id: req.user.id });



        if (!user) {
            console.log("User not found");
            return;

        }


        newItem = {
            name,
            category,
            price,
            priority,
            quantity: 1
        }


        if (user.cart.length === 0) {



            await User.findOneAndUpdate(
                { _id: req.user.id },  // Find the user by ID
                { $push: { cart: newItem } }  // Push newItem to the cart array
                // Return the updated document
            );




            res.json({ success: true, message: "cart added successfully" });
            return;
        }

        let itemfromsameRestaurant = user.cart[0].name === newItem.name;

        if (itemfromsameRestaurant) {



            let product_Count = user.cart.filter(cartitem => cartitem.category === newItem.category);
            console.log(product_Count);

            if (product_Count.length !== 0) {

                product_Count[0].quantity += 1;
                console.log(product_Count[0].quantity);

                await User.findOneAndUpdate({ _id: req.user.id, 'cart.category': product_Count[0].category },
                    { $set: { 'cart.$.quantity': product_Count[0].quantity, 'cart.$.price': product_Count[0].price * product_Count[0].quantity } }
                );


                res.json({ success: true, message: "cart added successfully" });
                return;
            }
            else {


                await User.findOneAndUpdate(
                    { _id: req.user.id },  // Find the user by ID
                    { $push: { cart: newItem } }// Push newItem to the cart array
                );

                res.json({ success: true, message: "cart added successfully" });
                return;


            }



        }

        else {
            res.json({ success: false, message: "Can't place order from different restaurant" });
        }


    }
    catch (error) {
        console.log("Error occured", error);
    }

}
module.exports.GetCart = async (req, res) => {

    let user = await User.findOne({ _id: req.user.id });



    try {


        if (!user) {
            console.log("User not found");
            res.status(401).json({ message: "User not found" });
            return;
        }
        console.log(user.cart);
        res.json(user.cart);

    }
    catch (error) {
        console.error("Error occured", error);
        res.status(500).json({ message: "Internal server error" });
    }

}
module.exports.Login = async (req, res) => {
    const email=req.body.email;

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404).json({ message: "User not found with email" });
        return;
    }

    if (user.password === req.body.password) {


        let data = {
            user: {
                id: user.id
            }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, message: "user found", token,email });
        return;
    }

    res.json({ success: false, message: "user not found with email" });



}

module.exports.signup = async (req, res) => {
    try {
        let users = await User.findOne({ email: req.body.email });
        if (users) {
            res.status(401).json({ message: "user already exists" });
            return;
        }

        let user = new User({
            email: req.body.email,
            password: req.body.password,
            cart: []
        });
        await user.save();

        let data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, message: "user added successfully", token });

    }
    catch (error) {
        console.error("Error occured", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.removeCart = async (req, res) => {

    let user = await User.findOne({ _id: req.user.id });



    if (!user) {
        res.status(401).json({ success: false, errors: "user not found" });
        return;
    }

    await User.findOneAndUpdate({ _id: req.user.id }, { $set: { cart: [] } });
    // user.cart=[];

    // await User.findOneAndDelete({_id:req.user.id},{cart:[]});



    res.status(200).json({ success: true, message: "ok" });


}

module.exports.addProduct = async (req, res) => {

    let { name, priority1, priority2, description, category, image, subCategory1, subCategory2, subCategory3, price1, price2, price3 } = req.body;
    let Id;
    
    let findSameName=await Product.findOne({name});
    if(findSameName){
        return res.json({success:false,message:"Product already exists"});
    }
    


    let all = await Product.find({});

    if (all.length > 0) {

        last_product = all.slice(-1);
        last_Product_arr = last_product[0];
        Id = last_Product_arr.id + 1;

    }
    else {
        Id = 1;
    }


    let product = new Product({
        id: Id,
        name,
        image,
        description,
        category,
        subCategory1,
        subCategory2,
        subCategory3,
        price1,
        price2,
        price3,
        priority1,
        priority2
    });


    await product.save();

    res.json({ sucess: true, message: "Product added successfully" });



}

module.exports.allProducts = async (req, res) => {
    let Products = await Product.find({});

    res.send(Products);
}

module.exports.cartTotal = async (req, res) => {

    let user = await User.findOne({ _id: req.user.id });


    if (!user) {
        res.status(401).json({ success: false, errors: "user not found" });
        return;
    }

    const cartLength = user.cart.length;

    res.json({ cartLength });



}



module.exports.setcartTotal = async (req, res) => {
    let { CartTotal } = req.body;

    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    let UpdatedUser = user.cart.map(item => {
        return { ...item, total: CartTotal }
    });

    await User.findOneAndUpdate({ _id: req.user.id }, { $set: { cart: UpdatedUser } })


    // await User.findOneAndUpdate({_id:req.user.id},{$set:{cart:{total:CartTotal}}});

    res.json({ message: "total added", success: true });
    return;


}

module.exports.priceTotal = async (req, res) => {

    let user = await User.findOne({ _id: req.user.id });



    let total = 0;

    if (!user) {

        res.status(404).json({ message: "User not found" });
        return;

    }





    for (let i = 0; i < user.cart.length; i++) {

        total += user.cart[i].price;

    }

    res.json({ total });

}


module.exports.removeCartItem = async (req, res) => {

    let { category } = req.body;

    let user = await User.findOne({ _id: req.user.id });

    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    try {

        await User.findOneAndUpdate(
            { _id: req.user.id },
            { $pull: { cart: { category: category } } },  // Remove items matching the category
            { new: true }  // Return the updated document
        );
        res.json({ message: "deleted successfully" });
        return;


    } catch (error) {
        res.json({ message: "Unable to delete" });
        return;
    }
}


module.exports.removeOrder = async (req, res) => {
    const { category, email } = req.body;

    let user = await User.findOne({ email: email });

    if (!user) {
        res.status(400).send("user not found");
        return;
    }

    let updated_user_cart = user.cart.filter(c => c.category !== category);

    // let updated_user={...user,cart:updated_user_cart};

    await User.findOneAndUpdate({ email: email }, { cart: updated_user_cart });

    res.json({ message: "Removed order successfully", success: true });


}

module.exports.removeProduct = async (req, res) => {
    let { Id } = req.body;

    const products = await Product.findOneAndDelete({ id: Id });

    if (!products) {
        res.status(400).send("product not found");
        return;

    }

    res.send("Removed Successfully");




}

