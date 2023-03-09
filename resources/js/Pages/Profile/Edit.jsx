import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "antd";
import NavBar from "../../Components/navbar/NavBar";
import "./Edit.css";
import "../../Components/main-content/MainContent.css";
import Modal from "react-modal";
import { Link, useForm, usePage } from "@inertiajs/inertia-react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { DashOutlined } from "@ant-design/icons";

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

const items = [
    {
        label: "delete",
        key: "0",
    },
];

export default function Edit({
    mustVerifyEmail,
    status,
    className,
    posts,
    friends,
    users,
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            description: user.description,
        });
    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };
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

    function afterOpenModal() {
        subtitle.style.color = "#f00";
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={`home-container ${darkMode}`}>
            <div className="navbar">
                <NavBar
                    changeScreenColor={changeScreenColor}
                    user={user}
                    users={users}
                />
            </div>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {imgSrc ? (
                    <div className="relative">
                        <Dropdown menu={{ items }} trigger={["click"]}>
                            <DashOutlined
                                className="text-black text-5xl right-0 top-[-23px] absolute"
                                onClick={(e) => e.preventDefault()}
                            />
                        </Dropdown>
                        <img src={imgSrc} className="gallery-image" />
                    </div>
                ) : (
                    <form onSubmit={submit} className="mt-6 space-y-6">
                        <div>
                            <InputLabel for="name" value="Name" />

                            <TextInput
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                handleChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="name"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div>
                            <InputLabel for="description" value="Description" />

                            <TextInput
                                id="description"
                                type="text"
                                className="mt-1 block w-full"
                                value={data.description}
                                handleChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                required
                                autoComplete="description"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="text-sm mt-2 text-gray-800">
                                    Your email address is unverified.
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Click here to re-send the verification
                                        email.
                                    </Link>
                                </p>

                                {status === "verification-link-sent" && (
                                    <div className="mt-2 font-medium text-sm text-green-600">
                                        A new verification link has been sent to
                                        your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <PrimaryButton processing={processing}>
                                Save
                            </PrimaryButton>

                            <Transition
                                show={recentlySuccessful}
                                enterFrom="opacity-0"
                                leaveTo="opacity-0"
                                className="transition ease-in-out"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                )}
            </Modal>
            <header className="content-profile">
                <div className="container">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={user.profile_picture} alt="" />
                        </div>
                        <div className="profile-user-settings">
                            <h1 className="profile-user-name">{data.name}</h1>
                            <button
                                className="btn profile-edit-btn"
                                onClick={() => {
                                    openModal();
                                }}
                            >
                                Edit Profile
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
                                        {posts.length}
                                    </span>{" "}
                                    posts
                                </li>
                                <li>
                                    <span className="profile-stat-count">
                                        {friends.length}
                                    </span>{" "}
                                    friends
                                </li>
                            </ul>
                        </div>
                        <div className="profile-bio">
                            <p>
                                <span className="profile-real-name">
                                    {data.name}
                                </span>{" "}
                                {data.description}
                            </p>
                        </div>
                    </div>
                    {/* End of profile section */}
                </div>
            </header>
            <main>
                <div className="container">
                    <div className="gallery">
                        {posts.map((post) => (
                            <div
                                className="gallery-item"
                                tabIndex={0}
                                onClick={() => {
                                    openModal(
                                        `storage/images/${
                                            post.image.split("/")[2]
                                        }`
                                    );
                                }}
                            >
                                <img
                                    src={`storage/images/${
                                        post.image.split("/")[2]
                                    }`}
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
                                            {post.like}
                                        </li>
                                        <li className="gallery-item-comments">
                                            <span className="visually-hidden">
                                                Comments:
                                            </span>
                                            <i
                                                className="fas fa-comment"
                                                aria-hidden="true"
                                            />{" "}
                                            {post.comment}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ))}
                        {/* <div
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
                        </div> */}
                    </div>
                    {/* End of gallery */}
                    <div className="loader" />
                </div>
                {/* End of container */}
            </main>
        </div>
    );
}
