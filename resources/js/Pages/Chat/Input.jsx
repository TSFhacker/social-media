import React from "react";

const Input = () => {
    return (
        <div className="input">
            <input type="text" placeholder="Type something..." />
            <div className="send">
                <button>Send</button>
            </div>
        </div>
    );
};

export default Input;
