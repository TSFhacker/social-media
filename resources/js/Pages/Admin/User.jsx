import { InertiaLink } from '@inertiajs/inertia-react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Admin.css";
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
const User = ({ users }) => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='view'>
            <div className="logout"><ResponsiveNavLink method="post" href={route('logout')} as="button" >
                    Log Out
                </ResponsiveNavLink></div>
                <p>
                    View User
                </p>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Avatar</th>
                            <th>Birthday</th>
                            <th>Email</th>
                            <th>Created_at</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td><img src={user.avatar} alt="" /></td>
                                <td>{user.birthday}</td>
                                <td>{user.email}</td>
                                <td>{user.created_at}</td>
                                <td><InertiaLink href={`/admin/view.user_post/${user.id}`} className="btn btn-primary" >View</InertiaLink></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>


    )
}

export default User;