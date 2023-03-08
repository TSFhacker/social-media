import React from "react";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

import Input from "./Input";
const ChatComponent = () => {
    return (
        <div className = "chat">
            <ChatHeader/>
            <Messages/>
            <Input/>
        </div>
    );
};

export default ChatComponent;