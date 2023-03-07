import React from 'react';
import "./Admin.css";

const Navbar = () => {

    return (
        <div className='side-nav-container'>
            <div className='menu'>
                <ul className='item'>
                    <li><a href="/admin/view.users"><span className='title'>User</span></a></li>
                    <li><a href="/admin/view.posts"><span className='title'>Post</span></a></li>
                    <li><a href="/admin/view.comments"><span className='title'>Comment</span></a></li>
                </ul>
            </div>
        </div>
        
    )
    
}

export default Navbar;