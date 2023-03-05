import React, { useRef, useState } from "react";
import "./Modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ setOpenModal, username }) => {
    const inputFile = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const uploadPicture = () => {
        inputFile.current.click();
    };
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h3>Write a post</h3>
                </div>
                <div className="user-profile">
                    <img src="profile-pic.png" />
                    <div>
                        <p>{username}</p>
                        <small>
                            Public{" "}
                            <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                        </small>
                    </div>
                </div>
                <div className="body">
                    <textarea
                        rows="5"
                        placeholder="What's on your mind"
                    ></textarea>
                </div>
                {selectedImage && (
                    <div>
                        <img
                            alt="not found"
                            width={"250px"}
                            src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        <button onClick={() => setSelectedImage(null)}>
                            Remove
                        </button>
                    </div>
                )}
                <div className="add">
                    <p>Add to your post</p>
                    <div className="add-icon">
                        <img src="photo.png" onClick={uploadPicture} />
                        <input
                            type={"file"}
                            style={{ display: "none" }}
                            ref={inputFile}
                            onChange={(event) => {
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }}
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                            multiple=""
                        />

                        <FontAwesomeIcon icon="fa-solid fa-tag" id="tag-icon" />
                        <img src="feeling.png" />
                        <FontAwesomeIcon
                            icon="fa-solid fa-location-pin"
                            id="location-icon"
                        />
                        <FontAwesomeIcon
                            icon="fa-solid fa-flag"
                            id="flag-icon"
                        />
                    </div>
                </div>
                <div className="footer">
                    <button>Post</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
