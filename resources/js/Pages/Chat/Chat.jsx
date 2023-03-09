import React, { useEffect, useState } from "react";
import "./Chat.scss";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";

const Chat = (props) => {
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);
    let allMessages = [];
    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher("49ae72059b07612b1f1d", {
            cluster: "ap1",
        });

        const channel = pusher.subscribe("chat");
        channel.bind("message", function (data) {
            allMessages.push(data);
            setMessages(allMessages);
        });
    }, []);

    const submit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:8000/api/messages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: props.auth.user.name,
                message: message,
            }),
        });
        setMessage("");
    };
    return (
        <div className="app">
            <div className="container">
                <div class="chat">
                    <div className="chatHeader">
                        <div className="chatHeaderInfo">
                            <img src="data:image/jpeg;base64,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" />
                            <span>name</span>
                        </div>
                    </div>
                    <div className="message owner">
                        {messages.map((message) => (
                            <>
                                <div className="messageInfo">
                                    <img
                                        src={`${props.auth.user.profile_picture}`}
                                        alt=""
                                    />
                                    <p className="messager">
                                        {props.auth.user.name}
                                    </p>
                                </div>
                                <div className="messageContent">
                                    <p>{message.message}</p>
                                </div>
                            </>
                        ))}
                    </div>
                    <form className="input" onSubmit={submit}>
                        <input
                            type="text"
                            placeholder="Type something..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="send" type="submit">
                            <button>Send</button>
                        </div>
                    </form>
                </div>
                <Sidebar />
            </div>
        </div>
    );
};

export default Chat;
