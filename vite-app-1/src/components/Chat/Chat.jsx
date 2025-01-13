import React, { useState, useEffect } from "react";
import './Chat.css';
import Navbar from "../Navbar/Navabar";
// import Navbar from "../Navbar/Navbar";

export function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]); // Array to store all messages
  const [myMessage, setMyMessage] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const [isScrolled, setScrolled] = useState(false);
      
  
  window.onscroll = () => {
    setScrolled(window.pageYOffset === 0 ? false : true);

    return () => (window.onscroll = null);
  }
  // const [profile, setProfile] = useState("");
  useEffect(() => {
    // Create the WebSocket connection when the component mounts
    const email=localStorage.getItem("email");
    console.log(email);
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("✅ Connected to WebSocket server");
    };

    newSocket.onmessage = (event) => {
      const message = event.data; // The message is in the format "email: message"
      console.log('📩 Message received:', message);

      // Split the message into email and message
      const [email, ...msgParts] = message.split(':');
      const actualMessage = msgParts.join(':').trim();

      console.log(`📧 Received message from ${email}: ${actualMessage}`);

      // Update state with the received message
      setMessages((prevMessages) => [
        ...prevMessages,
        { email, message: actualMessage },
      ]);
    };

    newSocket.onclose = () => {
      console.log("❌ Disconnected from WebSocket server");
    };

    setSocket(newSocket);

    // Cleanup WebSocket connection when the component unmounts
    return () => {
      console.log("🧹 Closing WebSocket connection");
      newSocket.close();
    };
  }, []);



  const inputHandler = (e) => {
    setMessageInput(e.target.value);
  };

  const sendMessage = () => {
    if (socket && messageInput.trim() !== "") {
      const email=localStorage.getItem("email");
      console.log("email",email);
      const messageToSend = `${email} ${messageInput}`;
      socket.send(messageToSend);
      setMyMessage((prev) => [...prev, messageInput]);
      setMessageInput(""); // Clear input after sending
    }else{
      console.log("unable to enter");
    }
  };



  return (
    <>
      {/* <Navbar showLogOut={false} showHome={true} showMessageLogo={false} /> */}
      <Navbar isScrolled={isScrolled} />
      <div className="msg-div">
        <div className="heading">

          <h1 style={{ color: "black" }}>Messenger</h1>
        </div>
        <div className="container" style={{ margin: "10px" }}>

          <div className="input-div" style={{ marginTop: "20px", float: "right" }}>
            {myMessage.map((msg, index) => (

              <p key={index} className="my-msg">
                {/* <p className="profile"></p> */}
                <p>{msg}</p>
              </p>
            ))}

          </div>

          {/* Render all messages as separate divs */}
          <div className="output-div" style={{ marginTop: "20px" }}>
            {messages.map((msg, index) => (
              <p key={index} className="your-msg">
                <p className="profile">{msg.email}</p>
                {/* <p className="profile">{msg.RegNo}</p> */}
                <p>{msg.message}</p>
              </p>
            ))}
          </div>
        </div>
        <div className="input-btn">

          <textarea
            type="text"
            name="messageInput"
            value={messageInput}
            onChange={inputHandler}
            placeholder="Send message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </>
  );
}
