// // const express=require("express");
// const cors=require("cors");
// // const app=express();
// // const http = require("http");
// require('dotenv').config(); 
// const {UserRouter}=require("./UserRouter/UserRouter");
// // const WebSocket = require('ws');
// // const server = http.createServer(app);  // Attach Express to the same HTTP server
// // const wss = new WebSocket.Server({ server });

// const http = require("http");
// const express = require("express");
// const WebSocket = require("ws");

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// const PORT = process.env.PORT || 5000; // Use Railway-assigned port

// wss.on("connection", (ws) => {
//   console.log("Client connected");

//   ws.on("message", (message) => {
//     console.log("Received:", message);
//     ws.send("Message received: " + message); // Echo back for testing
//   });

//   ws.on("close", () => console.log("Client disconnected"));
// });

// server.listen(PORT, () => {
//   console.log(`WebSocket Server running on port ${PORT}`);
// });
 
// // wss.on('connection', function connection(ws) {
// //   console.log('Client connected');

// //   ws.on('message', function incoming(message) {
// //     console.log('Received: %s', message);
// //     const messageString=message.toString();

// //     // Split the message to get the email and the actual message
// //     const [email, ...msgParts] = messageString.split(':');
// //     const actualMessage = msgParts.join(':').trim();  // Join back the message if it contains multiple parts

// //     console.log(`Received message from ${email}: ${actualMessage}`);

// //     // Broadcast the message to all clients except the sender
// //     wss.clients.forEach(function each(client) {
// //       if (client !== ws && client.readyState === WebSocket.OPEN) {
// //         // Send the email and message to the other clients
// //         client.send(`${email}: ${actualMessage}`);
// //         console.log("Broadcasted to a client");
// //       }
// //     });
// //   });

// //   ws.on('close', function () {
// //     console.log('Client disconnected');
// //   });
// // });

// server.use(cors());
// server.use(express.json());
// server.use(express.urlencoded({ extended: true, limit: "10mb" }));



// // app.listen(process.env.PORT,()=>{
// //     console.log("Server listening at port 5000");
// // })


// server.use('/images',express.static('upload/images'));


// server.use(UserRouter);
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const { UserRouter } = require("./UserRouter/UserRouter");

const app = express();
const server = http.createServer(app);  // Attach Express to HTTP server
// const wss = new WebSocket.Server({ server });
const wss = new WebSocket.Server({ server });


const PORT = process.env.PORT || 5000;

// ✅ Correctly setup Express middlewares
app.use(cors({
  origin: '*', // Or specify your frontend domain, like 'https://food-delievery-production.up.railway.app'
  methods: ['GET', 'POST'],
}));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ Serve static images
app.use('/images', express.static('upload/images'));

// ✅ Attach User Router
app.use(UserRouter);
wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("message", (message) => {
    console.log("Received:", message);
    ws.send("Message received: " + message); // Echo back for testing
  });
  ws.on("close", () => console.log("Client disconnected"));
});


// // ✅ WebSocket logic
// wss.on("connection", (ws) => {
//   console.log("Client connected");
//   ws.on("message", (message) => {
//     console.log("📩 Received:", message);
  
//     // ✅ Broadcast the message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });
  
  // ws.on("message", (message) => {
  //   console.log("Received:", message);
  //   ws.send("Message received: " + message); // Echo back for testing
  // });

//   ws.on("close", () => console.log("Client disconnected"));
// });
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
// // ✅ Start the HTTP + WebSocket server
// server.listen(process.env.PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


