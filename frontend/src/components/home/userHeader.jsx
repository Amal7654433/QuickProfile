import axios from 'axios';
import axiosInstance from '../../axiosConfig';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import './userHeader.css'
import { userLogout } from '../../redux/authSllice';
const UserHeader = () => {
 
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cookie = Cookies.get('accessToken')
  console.log(cookie,'from the header')
    const { userInfo } = useSelector((state) => state.auth)
    const isAuth = userInfo && cookie
  
 
    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out!'
        }).then((result) => {
            if (result.isConfirmed) {
              
                axiosInstance.post('/logout')
                dispatch(userLogout())
                navigate('/login');

            }
        });
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a href="#" className="navbar-brand">QuickProfile</a>
                    <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div className="navbar-nav">


                        </div>
                        {/* <form className="d-flex">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search" />
                                <button type="button" className="btn btn-secondary"><i className="bi bi-search"></i></button>
                            </div>
                        </form> */}
                        <div className="navbar-nav">
                            {isAuth ? (<a href="#" onClick={handleLogout} className="nav-item nav-link bi bi-user">Logout</a>) : <Link to='/login' className="nav-item nav-link bi bi-user">Login</Link>}

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default UserHeader