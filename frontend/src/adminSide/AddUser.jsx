import React, { useEffect, useState } from 'react'

    
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
            <div className="container">
                <div className="row gutters mt-5">

                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters mt-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-2 text-primary">Enter the user details</h6>
                                    </div>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name</label>
                                            <input value={name} onChange={(e) => {
                                                setName(e.target.value)

                                            }} type="text" className="form-control" id="fullName" placeholder="Enter full name" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="eMail">Email</label>
                                            <input value={email} onChange={(e) => {
                                                setEmail(e.target.value)

                                            }} type="email" className="form-control" id="eMail" placeholder="Enter email ID" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input value={phone} onChange={(e) => {
                                                setPhone(e.target.value)

                                            }} type="text" className="form-control" id="phone" maxLength={10} placeholder="Enter phone number" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label htmlFor="phone">Password</label>
                                            <input value={password} onChange={(e) => {
                                                setPassword(e.target.value)

                                            }} type="text" className="form-control" id="phone" placeholder="Enter the password" />
                                        </div>
                                    </div>

                                </div>
  <div className="row gutters mt-3">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button onClick={() => navigate('/admin/dashboard')} type="button" id="submit" name="submit" className="btn btn-secondary mt-4 mx-4">Cancel</button>
                                            <button onClick={handleSubmit} type="button" id="submit" name="submit" className="btn btn-primary mt-4 mx-4">Update</button>
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