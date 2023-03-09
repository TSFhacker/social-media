import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";

const NavBar = (props) => {
    const [availableUser, setAvailableUser] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchVisibility, setSearchVisibility] = useState("hidden");
    const [notiVisibility, setNotiVisibility] = useState("hidden");
    const [visibility, setVisibility] = useState("hidden");
    const [darkBtn, setDarkBtn] = useState("");

    let users = props.users;
    useEffect(() => {
        setAvailableUser(users);
    }, []);

    const changeMenuVisibility = () => {
        if (visibility === "hidden") setVisibility("visible");
        else setVisibility("hidden");
    };

    const changeSearchVisibility = () => {
        console.log("change search visibility");
        if (searchVisibility === "hidden") setSearchVisibility("visible");
        else setSearchVisibility("hidden");
    };

    const changeNotiVisibility = () => {
        console.log("change search visibility");
        if (notiVisibility === "hidden") setNotiVisibility("visible");
        else setNotiVisibility("hidden");
    };

    const changeDarkBtn = () => {
        if (darkBtn === "") setDarkBtn("dark-btn-on");
        else setDarkBtn("");
    };
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        if (e.target.value.length > 0) {
            console.log("filtering");
            setAvailableUser(
                users.filter((user) => {
                    return user.name.match(e.target.value);
                })
            );
        } else setAvailableUser(users);
    };

    const acceptFriend = (id) => {
        router.post("/acceptfriend", {
            id: id,
        });
        alert("Accept friends successfully");
    };

    const declineFriend = (id) => {
        router.post("/declinefriend", {
            id: id,
        });

        alert("Decline friends successfully");
    };

    return (
        <div className={`nav`}>
            <div className="left-nav">
                <img src="/logo.png" className="logo" />
                <ul>
                    <li>
                        <img
                            src="/notification.png"
                            className="notfication"
                            onClick={changeNotiVisibility}
                        ></img>
                        <div className={`noti-list ${notiVisibility}`}>
                            {props.friendrequests.map((request) => (
                                <div className="noti-info">
                                    <div>
                                        {request.name} wants to be friends with
                                        you
                                    </div>
                                    <div className="request-option">
                                        <button
                                            className="accept-btn"
                                            onClick={(e) =>
                                                acceptFriend(request.id)
                                            }
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="decline-btn"
                                            onClick={(e) =>
                                                declineFriend(request.id)
                                            }
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                    <img src="/search.png" />
                    <input
                        type={"text"}
                        placeholder="Search"
                        onChange={handleChange}
                        value={searchInput}
                        onClick={changeSearchVisibility}
                    />
                    <div className={`user-list ${searchVisibility}`}>
                        {availableUser.map((user) => (
                            <Link
                                href={route(`account.account`, user.id)}
                                as="button"
                            >
                                <div className="user-info">
                                    <img src={user.profile_picture} />
                                    <div>{user.name}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div
                    className="nav-user-icon online"
                    onClick={changeMenuVisibility}
                >
                    <img src="/profile-pic.png" />
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
                        <img src="/profile-pic.png" />
                        <div>
                            <p>{props.user.name}</p>
                            <a href="/profile">See your profile</a>
                        </div>
                    </div>
                    <hr />
                    <div className="user-profile">
                        <img src="/profile-pic.png" />
                        <div>
                            <p>Give profile</p>
                            <a href="#">Help us to improve</a>
                        </div>
                    </div>
                    <hr />
                    <div className="settings-links">
                        <img src="/setting.png" className="settings-icon" />
                        <a href="#">
                            Settings & Privacy{" "}
                            <img src="/arrow.png" width={10 + "px"} />
                        </a>
                    </div>
                    <div className="settings-links">
                        <img src="/help.png" className="settings-icon" />
                        <a href="#">
                            Help & Support{" "}
                            <img src="/arrow.png" width={10 + "px"} />
                        </a>
                    </div>
                    <div className="settings-links">
                        <img src="display.png" className="settings-icon" />
                        <a href="#">
                            Display & Accessibility{" "}
                            <img src="/arrow.png" width={10 + "px"} />
                        </a>
                    </div>
                    <div className="settings-links">
                        <img src="logout.png" className="settings-icon" />
                        <Link href={route("logout")} method="post" as="button">
                            Logout <img src="arrow.png" width={10 + "px"} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
