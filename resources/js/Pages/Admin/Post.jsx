import { InertiaLink } from '@inertiajs/inertia-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import "./Admin.css";
const Post = ({ posts, success }) => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='view'>
                <p>
                    View Post
                </p>
                {success && <div className='alert alert-success'>{success}</div>}
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
            </div>

        </div>

    )
}

export default Post;