import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import "./styles.css";

const url = `ws:localhost:1337/websocket`;
const server = new WebSocket(url);

server.onopen = function() {
  server.send("Hello");
};

//Websocket
const Chat = () => {
  let navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    const inputText = setText();
    server.send(inputText);
  };

  const allUsers = async () => {
    axios
      .get("http://localhost:1337/api/user-list")
      .then((response) => {
        const data = response.data;

        setChatList(data);
        console.log("Data has been reveived!");
      })
      .catch(() => {
        alert("Error retriving data!");
      });
  };

  useEffect(() => {
    allUsers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        allUsers();
      }
    }
  }, []);
  return (
    <>
      <h1>Chat Page</h1>
      <div className="wrapper">
        <div className="userMainDiv">
          {chatList.map((item, i) => {
            return (
              <div className="userDiv">
                <p key={i}>{item._id}</p>
                <p>{item.phonenumber}</p>
              </div>
            );
          })}
        </div>
        <div>
          <input
            type="text"
            id="message"
            onChange={(e) => setText(e.target.value)}
          />
          <button id="send" onClick={sendMessage}>
            Send All Users
          </button>
          <button id="send" onClick={sendMessage}>
            Send X Users
          </button>
          <button id="send" onClick={sendMessage}>
            Send to Single User
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
