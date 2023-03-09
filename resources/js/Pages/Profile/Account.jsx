import React, { useState, useRef, useEffect } from "react";
import NavBar from "../../Components/navbar/NavBar";
import "./Edit.css";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Components/main-content/MainContent.css";
import { router } from "@inertiajs/react";
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

export default function Account({
    mustVerifyEmail,
    status,
    user,
    users,
    friendrequests,
}) {
    const [darkMode, setDarkMode] = useState("");

    const [imgSrc, setImgSrc] = useState("");
    const changeScreenColor = () => {
        if (darkMode === "") setDarkMode("dark-mode");
        else setDarkMode("");
    };

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal(value) {
        setImgSrc(value);
        setIsOpen(true);
    }

    console.log(user);

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    const sendFriendRequest = (id) => {
        router.post("/friendrequest", {
            user_id: id,
        });
        alert("Have sent friend request");
    };

    return (
        <div className={`home-container ${darkMode}`}>
            <div className="navbar">
                <NavBar
                    changeScreenColor={changeScreenColor}
                    user={user}
                    users={users}
                    friendrequests={friendrequests}
                />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {imgSrc ? (
                    <div>
                        <img src={imgSrc} className="gallery-image" />
                    </div>
                ) : (
                    <form action="" className="w-[500px] pt-10 pb-20">
                        <div className="flex flex-col mt-10">
                            <label>Name</label>
                            <input type="text" className="w-full mb-10"></input>
                            <label>Description</label>
                            <textarea className="w-full mb-10"></textarea>
                            <button type="button">Submit</button>
                        </div>
                    </form>
                )}
            </Modal>
            <header>
                <div className="container">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={user.profile_picture} alt="" />
                        </div>
                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">{user.name}</h1>
                            <button
                                className="btn profile-edit-btn"
                                onClick={(e) => sendFriendRequest(user.id)}
                            >
                                Add Friend
                            </button>
                            <button className="btn profile-edit-btn">
                                Message
                            </button>
                            <button
                                className="btn profile-settings-btn"
                                aria-label="profile settings"
                            >
                                <i className="fas fa-cog" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="profile-stats">
                            <ul>
                                <li>
                                    <span className="profile-stat-count">
                                        164
                                    </span>{" "}
                                    posts
                                </li>
                                <li>
                                    <span className="profile-stat-count">
                                        188
                                    </span>{" "}
                                    followers
                                </li>
                                <li>
                                    <span className="profile-stat-count">
                                        206
                                    </span>{" "}
                                    following
                                </li>
                            </ul>
                        </div>
                        <div className="profile-bio">
                            <p>
                                <span className="profile-real-name">
                                    {user.name}
                                </span>{" "}
                                {user.desciption}
                            </p>
                        </div>
                    </div>
                    {/* End of profile section */}
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="gallery">
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        56
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        2
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        89
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        5
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span>
                                <i
                                    className="fas fa-clone"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        42
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        1
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Video</span>
                                <i
                                    className="fas fa-video"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        38
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        0
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span>
                                <i
                                    className="fas fa-clone"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        47
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        1
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        94
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        3
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span>
                                <i
                                    className="fas fa-clone"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        52
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        4
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        66
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        2
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Gallery</span>
                                <i
                                    className="fas fa-clone"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        45
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        0
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        34
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        1
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        41
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        0
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            className="gallery-item"
                            tabIndex={0}
                            onClick={() => {
                                openModal(
                                    "https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop"
                                );
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop"
                                className="gallery-image"
                                alt=""
                            />
                            <div className="gallery-item-type">
                                <span className="visually-hidden">Video</span>
                                <i
                                    className="fas fa-video"
                                    aria-hidden="true"
                                />
                            </div>
                            <div className="gallery-item-info">
                                <ul>
                                    <li className="gallery-item-likes">
                                        <span className="visually-hidden">
                                            Likes:
                                        </span>
                                        <i
                                            className="fas fa-heart"
                                            aria-hidden="true"
                                        />{" "}
                                        30
                                    </li>
                                    <li className="gallery-item-comments">
                                        <span className="visually-hidden">
                                            Comments:
                                        </span>
                                        <i
                                            className="fas fa-comment"
                                            aria-hidden="true"
                                        />{" "}
                                        2
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* End of gallery */}
                    <div className="loader" />
                </div>
                {/* End of container */}
            </main>
        </div>
    );
}
