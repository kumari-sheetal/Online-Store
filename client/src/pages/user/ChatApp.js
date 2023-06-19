// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { useAuth } from "../../context/auth";
// import Layout from "../../components/Layout/Layout";
// import UserMenu from "../../components/Layout/UserMenu";
// import ".././user/Chat.css";
// const socket = io("http://localhost:8081");

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [sender, setSender] = useState("User"); // Set the sender name for the user
//   const [receiver, setReceiver] = useState("Admin"); // Set the receiver name as needed
//   const [auth] = useAuth(""); // Access the user authentication context

//   useEffect(() => {
//     // Fetch initial messages
//     fetchMessages();

//     // Listen for new messages
//     socket.on("newMessage", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       // Clean up socket connection
//       socket.off("newMessage");
//     };
//   }, []);

//   const fetchMessages = async () => {
//     try {
//       const response = await fetch("http://localhost:8081/api/v1/msg/messages");
//       const data = await response.json();
//       setMessages(data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputMessage) return;

//     try {
//       const response = await fetch("http://localhost:8081/api/v1/msg", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ sender, receiver, message: inputMessage }),
//       });

//       if (response.ok) {
//         setInputMessage("");
//         // Add the sent message to the client-side messages array
//         const newMessage = { sender, receiver, message: inputMessage };
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       } else {
//         console.error("Failed to send message");
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <Layout title={"Chat-Room"}>
//       <div className="container-fluid mt-5">
//         <div className="row">
//           <div className="col-md-3">
//             <UserMenu />
//           </div>
//         </div>
//       </div>
//       <div className="box-chat">
//         <h1 style={{ color: "white", textAlign: "center" }}>Chat App</h1>
//         {/* <h4 className="mt-3 user-name">User Name: {auth?.user?.name}</h4>{" "} */}
//         {/* Display user name */}
//         {/* <h4>User Email: {auth?.user?.email}</h4>
//       <h4>User Contact: {auth?.user?.phone}</h4> */}
//         <div className="messages-container">
//           {messages.map((message) => (
//             <div
//               key={message._id}
//               className={`message ${
//                 message.sender === sender ? "sent" : "received"
//               }`}
//             >
//               <p>
//                 <span className="sender-name">
//                   {message.sender === sender ? "You" : message.sender}:
//                 </span>{" "}
//                 {message.message}
//               </p>
//             </div>
//           ))}
//         </div>
//         <form onSubmit={sendMessage}>
//           <input
//             type="text"
//             value={inputMessage}
//             placeholder="Write here your Message"
//             onChange={(e) => setInputMessage(e.target.value)}
//           />
//           <button className="reset mt-2" type="submit">
//             Send
//           </button>
//         </form>
//       </div>
//     </Layout>
//   );
// };

// export default ChatApp;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import ".././user/Chat.css";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/v1/msg/messages?username=${auth?.user?.name}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8081/api/v1/msg/messages", {
        sender: auth?.user?.name,
        receiver: "admin",
        message: newMessage,
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const clientMessages = messages.filter(
    (message) =>
      message.sender === auth?.user?.name ||
      message.receiver === auth?.user?.name
  );

  return (
    <Layout title={"Chat-Room"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="box-chat mt-5">
            <h2> Chat with Admin</h2>

            <div className="chat">
              {clientMessages.map((message) => (
                <div
                  key={message._id}
                  className={`message ${
                    message.sender === auth?.user?.name ? "sent" : "received"
                  }`}
                >
                  <p>
                    <span className="sender-name">
                      {message.sender === auth?.user?.name
                        ? "You"
                        : message.sender}
                      :
                    </span>{" "}
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
            <form
              onSubmit={sendMessage}
              className="mt-3"
              style={{ display: "flex" }}
            >
              <input
                type="text"
                value={newMessage}
                placeholder="Write here your message"
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="add"
                style={{ marginLeft: "5px", marginTop: "3px" }}
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatApp;

{
  /* <Layout title={"Chat-Room"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
        </div>
      </div>
      <div className="">
        <div className="box-chat">
          <h2>Client Chat</h2>
          <div>
            {clientMessages.map((message) => (
              <div
                key={message._id}
                className={`message ${
                  message.sender === auth?.user?.name ? "sent" : "received"
                }`}
              >
                <p>
                  <span className="sender-name">
                    {message.sender === auth?.user?.name
                      ? "You"
                      : message.sender}
                    :
                  </span>{" "}
                  {message.message}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </Layout> */
}
