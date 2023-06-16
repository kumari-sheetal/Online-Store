import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import "./Chatapp.css";

const Chatapp = () => {
  // State variables
  const [messages, setMessages] = useState([]);
  const [adminReply, setAdminReply] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  // Update user list when messages change
  useEffect(() => {
    setUsers(getUniqueUsers());
  }, [messages]);

  // Fetch messages from the API
  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/v1/msg/messages"
      );
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Send a reply to the selected user
  const sendReply = async (clientId) => {
    try {
      await axios.post("http://localhost:8081/api/v1/msg/messages", {
        sender: "admin",
        receiver: clientId,
        message: adminReply,
      });
      setAdminReply("");
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  // Get unique users from messages
  const getUniqueUsers = () => {
    const usersSet = new Set();
    messages.forEach((message) => {
      usersSet.add(message.sender);
      usersSet.add(message.receiver);
    });
    return Array.from(usersSet);
  };

  // Find messages between admin and a specific client
  const findClientMessages = (clientName) => {
    return messages.filter(
      (message) =>
        message.sender === clientName || message.receiver === clientName
    );
  };

  return (
    <Layout title={"Chat-Room"}>
      <div className="container-fluid m-3 p-3 mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-wrapper">
          <div className="user-list">
            <div className="text-ld" style={{ color: "rgb(254, 186, 48)" }}>
              <h2>User list </h2>
            </div>
            {users.map((user) => (
              <div
                key={user}
                className={`user ${selectedUser === user ? "active" : ""}`}
                onClick={() => setSelectedUser(user)}
              >
                {user}
              </div>
            ))}
          </div>
          {selectedUser && (
            <div className="chat-box">
              <div className="text-lg" style={{ color: "rgb(254, 186, 48)" }}>
                <h3>Chat with {selectedUser}:</h3>
              </div>
              <div className="messages-container">
                {findClientMessages(selectedUser).map((message) => (
                  <div
                    key={message._id}
                    className={`message ${
                      message.sender === "admin" ? "sent" : "received"
                    }`}
                  >
                    <p>{message.message}</p>
                  </div>
                ))}
              </div>
              <div className="reply-container">
                <input
                  type="text"
                  placeholder="Write here your Message"
                  value={adminReply}
                  onChange={(e) => setAdminReply(e.target.value)}
                />
                <button
                  className="add btn"
                  onClick={() => sendReply(selectedUser)}
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chatapp;
