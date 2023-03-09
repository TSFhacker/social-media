import { InertiaLink } from '@inertiajs/inertia-react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./Admin.css";
const User_Post = ({ user, posts,comments}) => {

    return (
        <div>
            <Navbar></Navbar>
            <div className='view'>
                <p>
                    View Post and Comment Of User
                </p>
                <div>
                    <div>User_id: {user.id}</div>
                    <div>Name: {user.name}</div>
                    <div>Avatar: <img src={user.profile_picture} alt="" /></div>
                    <div>Birthday: {user.birthday}</div>
                    <div>Email: {user.email}</div>


                </div>
                <br />
                <h4>Post</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Content</th>
                            <th>Image</th>
                            <th>Created_at</th>
                            <th>Updated_at</th>
                            <th>View</th>
                            <th>Delete</th>
                            {/* <th>User_id</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.content}</td>
                                <td><img src={post.image} alt="" /></td>
                                <td>{post.created_at}</td>
                                <td>{post.updated_at}</td>
                                {/* <td>{post.user_id}</td> */}
                                <td><InertiaLink href={`/admin/view.post_comment/${post.id}`} className="btn btn-primary" >View</InertiaLink></td>

                                <td><InertiaLink href={`/admin/delete.post/${post.id}`} className="btn btn-danger" >Delete</InertiaLink></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
<br />
<h4>Comment</h4>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Content</th>
                           
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
                                <td>{comment.created_at}</td>
                                <td>{comment.updated_at}</td>
                                <td><InertiaLink href={`/admin/delete.comment/${comment.id}`} className="btn btn-danger" >Delete</InertiaLink></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default User_Post;