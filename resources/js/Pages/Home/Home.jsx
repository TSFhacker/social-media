import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../../../../public/images.png";
import "./Home.css";
import NavBar from "../../Components/navbar/NavBar";

import MainContent from "../../Components/main-content/MainContent";
// import { client } from "../client";
// import Pins from "./Pins";

const Home = (props) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [darkMode, setDarkMode] = useState("");
    // const userInfo =
    //     localStorage.getItem("user") !== "undefined"
    //         ? JSON.parse(localStorage.getItem("user"))
    //         : localStorage.clear();

    console.log(props);
    const changeScreenColor = () => {
        if (darkMode === "") setDarkMode("dark-mode");
        else setDarkMode("");
    };

    return (
        <div className={`home-container ${darkMode}`}>
            <div className="navbar">
                <NavBar
                    changeScreenColor={changeScreenColor}
                    username={props.auth.user.name}
                />
            </div>
            <div className="content">
                <MainContent
                    username={props.auth.user.name}
                    posts={props.posts}
                />
            </div>
            {/* <div className="hidden-sidebar">
                <Sidebar />
            </div> */}
            {/* <div className="navbar2">
                <HiMenu
                    fontSize={40}
                    className="cursor-pointer"
                    onClick={() => setToggleSidebar(true)}
                />
                <Link to="/">
                    <img
                        style={{ maxWidth: 50 + "px" }}
                        src={logo}
                        alt="logo"
                        className="w-28"
                    />
                </Link>
                <Link to={`user-profile/`}>
                    <img
                        // src={user?.image}
                        alt="user-pic"
                        className="w-9 h-9 rounded-full "
                    />
                </Link>
            </div> */}
            {/* if toggleSidebar is true */}
            {/* <div className="content">
                {toggleSidebar && (
                    <div className="expanded-sidebar">
                        <div className="close-icon-container">
                            <AiFillCloseCircle
                                fontSize={30}
                                className="close-icon"
                                onClick={() => setToggleSidebar(false)}
                            />
                        </div>
                        <Sidebar
                            closeToggle={setToggleSidebar}
                            // user={user && user}
                        />
                    </div>
                )}
                <div className="pins">Pins</div>
            </div> */}
        </div>
    );
};

export default Home;
