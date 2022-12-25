import React, { useEffect, useState } from "react";
import "./MainContent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MainContent = () => {
    const [posts, setPosts] = useState([]);

    async function fetchData() {
        let result = await fetch("http://localhost:8000/api/posts");
        result = await result.json();
        setPosts(result);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
                        <img src="profile-pic.png" />
                        <div>
                            <p>John Nicholson</p>
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
                        ></textarea>
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
                                <img src="profile-pic.png" />
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
