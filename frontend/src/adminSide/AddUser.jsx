import React, { useEffect, useState } from 'react'

    import './addUser.css'
import Swal from 'sweetalert2';
import axiosInstance from '../axiosConfig';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from './Header';
// import './userEdit.css'
const AddUser = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const params = useParams()
  


    const handleSubmit = async (e) => {
        if (!name || !email || !phone) {
            setError('All fields are required');
            return;
        }
        else if (name.trim() === '' || email.trim() === '') {
            setError('All fields are required');
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            setError('Please enter a valid email address');
            return;
        }
        const phonePattern = /^\d{10}$/;
        if (!phone || !phonePattern.test(phone)) {
            setError('Please enter a valid phone number');
            return;
        }
        if (!password || password.length < 3) {
            setError('Password must be at least 6 characters long');
            return;
        }
        else if (/\s/.test(password)) {
            setError('Password cannot contain whitespace');
            return;
        }
        try {
            const response = await axiosInstance.post(`/admin/add`, {
                name,
                email,
                phone,
                password
 });
            console.log('response', response.data); // Handle successful signup
            if (response.status === 201) {

                Swal.fire({
                    icon: 'success',
                    title: 'Added Succesfully!',
                    text: 'User Details successfully Added.',
                    showConfirmButton: false,
                    timer: 3000 // Auto-close after 3 seconds
                }).then(() => {
                    // Redirect or perform any action after the alert closes
                    navigate('/admin/dashboard')
                });
            }

        } catch (error) {

            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Adding Failed',
                    text: 'Email or Phone number already exists. Please use a different email.',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'An error occurred while registering. Please try again later.',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    return (
        <>
            <Header />
            <div className="admin-add-user gradient-custom">
            <div className="container">
                <div className="row gutters mt-4">
                    {/* Add User Form */}
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100 glassmorphism-card">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Enter the User Details</h6>
                                    </div>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName" className="text-white">
                                                Full Name
                                            </label>
                                            <input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                type="text"
                                                className="form-control glassmorphism-input"
                                                id="fullName"
                                                placeholder="Enter full name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail" className="text-white">
                                                Email
                                            </label>
                                            <input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="email"
                                                className="form-control glassmorphism-input"
                                                id="eMail"
                                                placeholder="Enter email ID"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone" className="text-white">
                                                Phone
                                            </label>
                                            <input
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                type="text"
                                                className="form-control glassmorphism-input"
                                                id="phone"
                                                maxLength={10}
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="password" className="text-white">
                                                Password
                                            </label>
                                            <input
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                className="form-control glassmorphism-input"
                                                id="password"
                                                placeholder="Enter the password"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="row gutters mt-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button
                                                onClick={() => navigate('/admin/dashboard')}
                                                type="button"
                                                className="btn btn-secondary mx-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmit}
                                                type="button"
                                                className="btn btn-primary mx-2"
                                            >
                                                Add User
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default AddUser