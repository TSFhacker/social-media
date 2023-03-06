import React from "react";
import Navbar from "./Navbar"
import Search from "./Search";
import UserChat from "./UserChat";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Navbar/>
            <Search/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
            <UserChat/>
        </div>
    );
};

export default Sidebar;
