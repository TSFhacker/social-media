import { InertiaLink } from "@inertiajs/inertia-react";
import Navbar from "./Navbar";

import "./Admin.css";
const Post_Comment = ({ comments, post }) => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="view">
                <p>View Comment Of Post</p>
                <div>
                    <img
                        src={`/storage/images/${post.image.split("/")[2]}`}
                        alt=""
                    />
                    {post.content}
                </div>
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Content</th>
                            {/* <th>User_id</th>
                            <th>Post_id</th> */}
                            <th>Created_at</th>
                            <th>Updated_at</th>

                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((comment) => (
                            <tr key={comment.id}>
                                <td>{comment.id}</td>
                                <td>{comment.content}</td>
                                {/* <td>{comment.user_id}</td>
                                <td>{comment.post_id}</td> */}
                                <td>{comment.created_at}</td>
                                <td>{comment.updated_at}</td>
                                <td>
                                    <InertiaLink
                                        href={`/admin/delete.comment/${comment.id}`}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </InertiaLink>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Post_Comment;
