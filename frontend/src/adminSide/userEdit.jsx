import React, { useEffect, useState } from 'react'
import axios
    from 'axios'
    import axiosInstance from '../axiosConfig';
import Swal from 'sweetalert2';
import { useParams, useNavigate, Link } from 'react-router-dom';
// import './userEdit.css'
const UserEdit = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('');
    const params = useParams()
    console.log(params.userId)
    useEffect(() => {

        const fetchUser = async () => {
            try {
                console.log('hello amal')
                const res = await axiosInstance.get(`/admin/dashboard/edit/${params.userId}`)

                console.log('this is data of user', res.data.user)
                const result = res.data.user
                setName(result.name)
                setEmail(result.email)
                setPhone(result.phone)
                setImage(result.image)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [])

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

        try {
            const response = await axiosInstance.patch(`/admin/dashboard/edit/${params.userId}`, {
                name,
                email,
                phone,

            });
            console.log('response', response.data); // Handle successful signup
            if (response.status === 200) {

                Swal.fire({
                    icon: 'success',
                    title: 'Updation Successful!',
                    text: 'User Details successfully Updated.',
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
                    title: 'Updation Failed',
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
        // <div className="container">
        //     <div className="row gutters mt-5">
        //         <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
        //             <div className="card h-100">
        //                 <div className="card-body">
        //                     <div className="account-settings">
        //                         <div className="user-profile">
        //                             <div className="user-avatar">
                                       
        //                                 <img src={`http://localhost:4000/images/${image}`} alt="Maxwell Admin" width="150" />
        //                             </div>
        //                             <h5 className="user-name">{name}</h5>

        //                         </div>

        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
        //             <div className="card h-100">
        //                 <div className="card-body">
        //                     <div className="row gutters mt-4">
        //                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        //                             <h6 className="mb-2 text-primary">Personal Details</h6>
        //                         </div>
        //                         {error && <div className="alert alert-danger">{error}</div>}
        //                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        //                             <div className="form-group">
        //                                 <label htmlFor="fullName">Full Name</label>
        //                                 <input value={name} onChange={(e) => {
        //                                     setName(e.target.value)

        //                                 }} type="text" className="form-control" id="fullName" placeholder="Enter full name" />
        //                             </div>
        //                         </div>
        //                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        //                             <div className="form-group">
        //                                 <label htmlFor="eMail">Email</label>
        //                                 <input value={email} onChange={(e) => {
        //                                     setEmail(e.target.value)

        //                                 }} type="email" className="form-control" id="eMail" placeholder="Enter email ID" />
        //                             </div>
        //                         </div>
        //                         <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
        //                             <div className="form-group">
        //                                 <label htmlFor="phone">Phone</label>
        //                                 <input value={phone} onChange={(e) => {
        //                                     setPhone(e.target.value)

        //                                 }} type="text" className="form-control" id="phone" maxLength={10} placeholder="Enter phone number" />
        //                             </div>
        //                         </div>

        //                     </div>

        //                     <div className="row gutters mt-3">
        //                         <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        //                             <div className="text-right">
        //                                 <button onClick={() => navigate('/admin/dashboard')} type="button" id="submit" name="submit" className="btn btn-secondary mt-4 mx-4">Cancel</button>
        //                                 <button onClick={handleSubmit} type="button" id="submit" name="submit" className="btn btn-primary mt-4 mx-4">Update</button>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="admin-edit-user gradient-custom">
            <div className="container">
                <div className="row gutters mt-4">
                    {/* Profile Card */}
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100 glassmorphism-card">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img
                                                src={`http://localhost:4000/images/${image}`}
                                                alt="User Avatar"
                                                className="rounded-circle"
                                                width="150"
                                            />
                                        </div>
                                        <h5 className="user-name text-white mt-3">{name}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100 glassmorphism-card">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Personal Details</h6>
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
                                                Update
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
    )
}

export default UserEdit