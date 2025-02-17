import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import EditProfile from './ProfileEdit'
import ProfilePic from './ProfilePic'
import axiosInstance from '../../axiosConfig'

import './userHome.css'
const UserHome = () => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const fetchUserData = async () => {
        try {
            const response = await axiosInstance.get('/home', {

            });
            console.log(response.data.image, 'thid is data')
            setUser(response.data);
            if (response.data && response.data.image) {
                setImageUrl(`http://localhost:4000/images/${response.data.image}`);
            }

        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const updateImageUrl = (newUrl) => {
        setImageUrl(newUrl);
    };

    return (
        <div>

            {user ? (
    <div className="profile-page gradient-custom">
    <div className="container mt-4">
        <div className="main-body">
            <h2 className="mt-4 text-white">Welcome To Your Profile</h2>
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card glassmorphism-card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="Profile" className="rounded-circle" width="150" />
                                ) : (
                                    <img
                                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                        alt="Admin"
                                        className="rounded-circle"
                                        width="150"
                                    />
                                )}
                                <div className="mt-3">
                                    <h4 className="text-white">{user.name}</h4>
                                </div>
                                <ProfilePic user={user._id} fetch={fetchUserData} updateImageUrl={updateImageUrl} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card mb-3 glassmorphism-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0 text-white">Full Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-white">
                                    {user.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 glassmorphism-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0 text-white">Email Address</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-white">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3 glassmorphism-card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0 text-white">Phone Number</h6>
                                </div>
                                <div className="col-sm-9 text-secondary text-white">
                                    {user.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-box row gutters-sm">
                        <button
                            onClick={() => navigate('/profile')}
                            className="edit-btn btn-primary"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
            ) : (
                <div className="homepage-container">
                    <div className="welcome-container">
                        <h4 className='wel'>Welcome to My QuickProfile</h4>
                        <p className='log'> Please Login to view your profile</p>
                        <button  onClick={()=>navigate('/login')} className="login-button">Login</button>
                    </div>
                </div>


            )}

        </div>
    )
}

export default UserHome