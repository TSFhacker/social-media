import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = (props) => {
    const [visibility, setVisibility] = useState("hidden");
    const [darkBtn, setDarkBtn] = useState("");

    const changeMenuVisibility = () => {
        if (visibility === "hidden") setVisibility("visible");
        else setVisibility("hidden");
    };

    const changeDarkBtn = () => {
        if (darkBtn === "") setDarkBtn("dark-btn-on");
        else setDarkBtn("");
    };

    return (
        <div className={`nav`}>
            <div className="left-nav">
                <img src="logo.png" className="logo" />
                <ul>
                    <li>
                        <img src="/notification.png"></img>
                    </li>
                    <li>
                        <img src="/inbox.png"></img>
                    </li>
                    <li>
                        <img src="/video.png"></img>
                    </li>
                </ul>
            </div>
            <div className="right-nav">
                <div className="search-box">
                    <img src="search.png" />
                    <input type={"text"} placeholder="Search" />
                </div>
                <div
                    className="nav-user-icon online"
                    onClick={changeMenuVisibility}
                >
                    <img src="profile-pic.png" />
                </div>
            </div>

            <div className={`settings-menu ${visibility}`}>
                <div
                    id="dark-btn"
                    className={darkBtn}
                    onClick={() => {
                        changeDarkBtn();
                        props.changeScreenColor();
                    }}
                >
                    <span></span>
                </div>
                <div className="settings-menu-inner">
                    <div className="user-profile">
                        <img src="profile-pic.png" />
                        <div>
                            <p>John Nicholson</p>
                            <a href="#">See your profile</a>
                        </div>
                    </div>
                    <hr />
                    <div className="user-profile">
                        <img src="profile-pic.png" />
                        <div>
                            <p>Give profile</p>
                            <a href="#">Help us to improve</a>
                        </div>
                    </div>
                    <hr />
                    <div className="settings-links">
                        <img src="setting.png" className="settings-icon" />
                        <a href="#">
                            Settings & Privacy{" "}
                            <img src="arrow.png" width={10 + "px"} />
                        </a>
                    </div>
                    <div className="settings-links">
                        <img src="help.png" className="settings-icon" />
                        <a href="#">
                            Help & Support{" "}
                            <img src="arrow.png" width={10 + "px"} />
                        </a>
                    </div>
                    <div className="settings-links">
                        <img src="display.png" className="settings-icon" />
                        <a href="#">
                            Display & Accessibility{" "}
                            <img src="arrow.png" width={10 + "px"} />
                        </a>
                    </div>
                    <div className="settings-links">
                        <img src="logout.png" className="settings-icon" />
                        <a href="#">
                            Logout <img src="arrow.png" width={10 + "px"} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
