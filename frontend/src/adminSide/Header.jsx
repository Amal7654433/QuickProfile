import React, { useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogout } from '../redux/authSllice';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'
import './adminLogout.css';
const Header = () => {
    const { adminInfo } = useSelector((state) => state.auth)
    const adminToken = Cookies.get('adminToken')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPopupActive, setIsPopupActive] = useState(false)
    const handleLogout = async () => {
        setIsPopupActive(true);
        await axiosInstance.post('/admin/logout');
        dispatch(adminLogout())
        navigate('/admin/login');
        // toast.warn(
        //     ({ closeToast }) => (
        //         <div className="confirm-box">
        //             <p className="confirm-text">Are you sure you want to logout?</p>
        //             <div className="button-container">
        //                 <button
        //                     className="confirm-button"
        //                     onClick={async () => {
        //                         closeToast();
        //                         setIsPopupActive(false);
        //                         await axiosInstance.post('/admin/logout');
        //                         dispatch(adminLogout())
        //                         navigate('/admin/login');
        //                     }}
        //                 >
        //                     Yes
        //                 </button>
        //                 <button className="cancel-button" onClick={() => {
        //                     closeToast();
        //                     setIsPopupActive(false);
        //                 }}>No</button>
        //             </div>
        //         </div>
        //     ),
        //     {
        //         autoClose: false,
        //         closeOnClick: false,
        //         draggable: false,
        //         position: "top-center",
        //         toastClassName: 'toast-container',
        //         bodyClassName: 'toast-body',
        //     }
        // );


    };


    return (
        <div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand">Admin Side</a>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav">

                            {/* <a href="#" className="nav-item nav-link">Profile</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Messages</a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Inbox</a>
                                    <a href="#" className="dropdown-item">Sent</a>
                                    <a href="#" className="dropdown-item">Drafts</a>
                                </div>
                            </div> */}
                        </div>
                        <form className="d-flex">

                        </form>
                        <div className="navbar-nav">
                            {adminToken ? (<button onClick={handleLogout} className="nav-item nav-link bi bi-user">Logout</button>) : <Link to='/admin/login' className="nav-item nav-link bi bi-user">Login</Link>}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header