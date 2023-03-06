import React from "react";
import ChatComponent from "./ChatComponent";
import "./Chat.scss";
import Sidebar from "./Sidebar";

const Chat = () => {
    return (
        <div className="app"> 
        <div className="container">       
            <ChatComponent/>
            <Sidebar/>
        </div>
        </div>
    );
};

export default Chat;