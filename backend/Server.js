const express=require("express");
const cors=require("cors");
const app=express();
require('dotenv').config(); 

const {UserRouter}=require("./UserRouter/UserRouter");
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.WEB_PORT });

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  ws.on('message', function incoming(message) {
    console.log('Received: %s', message);
    const messageString=message.toString();

    // Split the message to get the email and the actual message
    const [email, ...msgParts] = messageString.split(':');
    const actualMessage = msgParts.join(':').trim();  // Join back the message if it contains multiple parts

    console.log(`Received message from ${email}: ${actualMessage}`);

    // Broadcast the message to all clients except the sender
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        // Send the email and message to the other clients
        client.send(`${email}: ${actualMessage}`);
        console.log("Broadcasted to a client");
      }
    });
  });

  ws.on('close', function () {
    console.log('Client disconnected');
  });
});

app.use(cors());
app.use(express.json());



app.listen(process.env.PORT,()=>{
    console.log("Server listening at port 5000");
})


app.use('/images',express.static('upload/images'));


app.use(UserRouter);

