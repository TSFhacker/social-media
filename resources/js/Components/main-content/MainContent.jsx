import React, { useEffect, useState } from "react";
import "./MainContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../modal/Modal";
import { router } from "@inertiajs/react";
import { faStreetView } from "@fortawesome/free-solid-svg-icons";

const MainContent = (props) => {
    const [commentCount, setCommentCount] = useState(0);
    const [posts, setPosts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [likeColor, setLikeColor] = useState(0);
    const [comment, setComment] = useState("");

    useEffect(() => {
        setPosts(props.posts);
        console.log(props);
    }, []);

    const likePost = (id) => {
        console.log("Clicked");
        if (
            (posts.find((element) => element.id === id).liked === 1 &&
                posts.find((element) => element.id === id).templike === 0) ||
            posts.find((element) => element.id === id).templike === 1
        ) {
            console.log("Decrease like");
            router.post("/dislike", {
                post_id: id,
            });
            setLikeColor(likeColor + 1);
            posts.find((element) => element.id === id).templike--;
        } else {
            router.post("/like", {
                post_id: id,
                category: "like",
            });
            setLikeColor(likeColor + 1);
            posts.find((element) => element.id === id).templike++;
        }
    };

    const showComments = (id) => {
        let current_post = posts.find((element) => element.id === id);
        console.log(current_post);
        if (current_post.comment_visibility === "hidden")
            current_post.comment_visibility = "visible";
        else current_post.comment_visibility = "hidden";
        setCommentCount(commentCount + 1);
    };

    const sendComment = (id) => {
        console.log(id);
        if (comment.length !== 0) {
            router.post("/comment", {
                post_id: id,
                content: comment,
            });
        }
        setCommentCount(commentCount + 1);
        setComment("");
    };

    return (
        <div className="content-container">
            <div className="left-sidebar">
                <div className="imp-links">
                    <a href="#">
                        <img src="/news.png"></img>
                        Latest News
                    </a>
                    <a href="#">
                        <img src="/friends.png"></img>
                        Friends
                    </a>
                    <a href="#">
                        <img src="/group.png"></img>
                        Groups
                    </a>
                    <a href="#">
                        <img src="/marketplace.png"></img>
                        Marketplace
                    </a>
                    <a href="#">
                        <img src="/watch.png"></img>
                        Watch
                    </a>
                    <a href="#">See more</a>
                </div>
                <div className="shortcut-links">
                    <p>Your Shortcuts</p>
                    <a href="#">
                        <img src="shortcut-1.png" />
                        Web Developers
                    </a>
                    <a href="#">
                        <img src="shortcut-2.png" />
                        Web Design course
                    </a>
                    <a href="#">
                        <img src="shortcut-3.png" />
                        Full Stack Development
                    </a>
                    <a href="#">
                        <img src="shortcut-4.png" />
                        Website Experts
                    </a>
                </div>
            </div>
            <div className="content">
                <div className="story-gallery">
                    <div className="story story1">
                        <img src="upload.png" />
                        <p>Post Story</p>
                    </div>
                    <div className="story story2">
                        <img src="member-1.png" />
                        <p>Alison</p>
                    </div>
                    <div className="story story3">
                        <img src="member-2.png" />
                        <p>Jackson</p>
                    </div>
                    <div className="story story4">
                        <img src="member-3.png" />
                        <p>Samona</p>
                    </div>
                    <div className="story story5">
                        <img src="member-4.png" />
                        <p>Kevin</p>
                    </div>
                </div>
                <div className="write-post-container">
                    <div className="user-profile">
                        <img src={props.user.profile_picture} />
                        <div>
                            <p>{props.user.name}</p>
                            <small>
                                Public{" "}
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                            </small>
                        </div>
                    </div>
                    <div className="post-input-container">
                        <textarea
                            rows="3"
                            placeholder="What's on your mind"
                            onClick={() => {
                                setModalOpen(true);
                            }}
                        ></textarea>
                        {modalOpen && (
                            <Modal
                                setOpenModal={setModalOpen}
                                username={props.username}
                            />
                        )}
                        <div className="add-post-links">
                            <a href="#">
                                <img src="live-video.png" />
                                Live Video
                            </a>
                            <a href="#">
                                <img src="photo.png" />
                                Photo/Video
                            </a>
                            <a href="#">
                                <img src="feeling.png" />
                                Feeling/Activity
                            </a>
                        </div>
                    </div>
                </div>
                {posts.map((post) => (
                    <div className="post-container">
                        <div className="post-row">
                            <div className="user-profile">
                                <img src={post.profile_picture} />
                                <div>
                                    <p>{post.name}</p>
                                    <span>{post.create_date}</span>
                                </div>
                            </div>
                            <a href="#">
                                <FontAwesomeIcon icon="fa-solid fa-ellipsis-v" />
                            </a>
                        </div>

                        <p className="post-text">{post.content}</p>
                        <img
                            src={`storage/images/${post.image.split("/")[2]}`}
                            className="post-img"
                        />
                        <div className="post-row">
                            <div className="activity-icons">
                                <div onClick={() => likePost(post.id)}>
                                    <img
                                        src={
                                            post.templike === 1 ||
                                            (post.liked === 1 &&
                                                post.templike === 0)
                                                ? "like-blue.png"
                                                : "like.png"
                                        }
                                    />
                                    {post.like +
                                        (post.templike ? post.templike : 0)}
                                </div>
                                <div onClick={(e) => showComments(post.id)}>
                                    <img src="comments.png" />
                                    {post.comments.length}
                                </div>
                                {/* <div>
                                    <img src="share.png" />
                                    20
                                </div> */}
                            </div>
                            <div className="post-profile-icon">
                                <img src="profile-pic.png" />
                                <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                            </div>
                        </div>
                        <div className="comment-section">
                            <div className="post-comment">
                                <input
                                    type="text"
                                    placeholder="Leave a comment"
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                    }}
                                />
                                <button onClick={(e) => sendComment(post.id)}>
                                    Send
                                </button>
                            </div>
                            <div
                                className={`all-comments ${post.comment_visibility}`}
                            >
                                {post.comments.map((comment) => (
                                    <div className="comment">
                                        <div className="commenter-picture">
                                            <img
                                                src={comment.profile_picture}
                                            />
                                        </div>
                                        <div className="comment-body">
                                            <div className="commenter-name">
                                                {comment.name}
                                            </div>
                                            <div className="comment-content">
                                                {comment.content}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* <div className="post-container">
                    <div className="post-row">
                        <div className="user-profile">
                            <img src="profile-pic.png" />
                            <div>
                                <p>John Nicholson</p>
                                <span>December 21 2022</span>
                            </div>
                        </div>
                        <a href="#">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis-v" />
                        </a>
                    </div>

                    <p className="post-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Optio, ipsam asperiores similique at suscipit blanditiis
                        dolores repellat itaque, numquam vel nihil fugiat.
                        Dignissimos voluptatibus laboriosam dolorem ipsa illo
                        earum in.
                    </p>
                    <img src="feed-image-1.png" className="post-img" />
                    <div className="post-row">
                        <div className="activity-icons">
                            <div>
                                <img src="like-blue.png" />
                                120
                            </div>
                            <div>
                                <img src="comments.png" />
                                45
                            </div>
                            <div>
                                <img src="share.png" />
                                20
                            </div>
                        </div>
                        <div className="post-profile-icon">
                            <img src="profile-pic.png" />
                            <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                        </div>
                    </div>
                </div>

                <div className="post-container">
                    <div className="post-row">
                        <div className="user-profile">
                            <img src="profile-pic.png" />
                            <div>
                                <p>John Nicholson</p>
                                <span>December 21 2022</span>
                            </div>
                        </div>
                        <a href="#">
                            <FontAwesomeIcon icon="fa-solid fa-ellipsis-v" />
                        </a>
                    </div>

                    <p className="post-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Optio, ipsam asperiores similique at suscipit blanditiis
                        dolores repellat itaque, numquam vel nihil fugiat.
                        Dignissimos voluptatibus laboriosam dolorem ipsa illo
                        earum in.
                    </p>
                    <img src="feed-image-1.png" className="post-img" />
                    <div className="post-row">
                        <div className="activity-icons">
                            <div>
                                <img src="like-blue.png" />
                                120
                            </div>
                            <div>
                                <img src="comments.png" />
                                45
                            </div>
                            <div>
                                <img src="share.png" />
                                20
                            </div>
                        </div>
                        <div className="post-profile-icon">
                            <img src="profile-pic.png" />
                            <FontAwesomeIcon icon="fa-solid fa-caret-down" />
                        </div>
                    </div>
                </div> */}

                <button type="button" className="load-more-btn">
                    Load More
                </button>
            </div>

            <div className="right-sidebar">
                <div className="sidebar-title">
                    <h4>Events</h4>
                    <a href="#">See all</a>
                </div>
                <div className="event">
                    <div className="left-event">
                        <h3>18</h3>
                        <span>March</span>
                    </div>
                    <div className="right-event">
                        <h4>Social Media</h4>
                        <p>
                            <FontAwesomeIcon icon="fa-solid fa-location-pin" />
                            Willson Tech Park
                        </p>
                        <a href="#">More Info</a>
                    </div>
                </div>
                <div className="event">
                    <div className="left-event">
                        <h3>18</h3>
                        <span>March</span>
                    </div>
                    <div className="right-event">
                        <h4>Social Media</h4>
                        <p>Willson Tech Park</p>
                        <a href="#">More Info</a>
                    </div>
                </div>
                <div className="sidebar-title">
                    <h4>Advertisement</h4>
                    <a href="#">Close</a>
                </div>
                <img src="/advertisement.png" className="sidebar-adv" />

                <div className="sidebar-title">
                    <h4>Conversation</h4>
                    <a href="#">Hide chat</a>
                </div>

                <div className="online-list">
                    <div className="online">
                        <img src="/member-1.png" />
                    </div>
                    <p>Alison Mina</p>
                </div>

                <div className="online-list">
                    <div className="online">
                        <img src="/member-2.png" />
                    </div>
                    <p>Alison Mina</p>
                </div>

                <div className="online-list">
                    <div className="online">
                        <img src="/member-3.png" />
                    </div>
                    <p>Alison Mina</p>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
