import React, { useEffect, useState } from 'react'
import './Signup.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import axiosInstance from '../../axiosConfig';
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const auth = Cookies.get('accessToken')
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        const checkLogged = () => {
            if (auth) {
                navigate('/home')
            }
        }
        checkLogged()
    })
    const handleSubmit = async (e) => {

        setLoading(true);
        if (!name || !email || !phone || !password) {
            setError('All fields are required');
            setLoading(false);
            return;
        }
        else if (name.trim() === '' || email.trim() === '' || phone.trim() === '' || password.trim() === '') {
            setError('All fields are required');
            setLoading(false);
            return;
        }
        const namePattern=/^[a-zA-Z]+$/;
        if (!name || !namePattern.test(name)) {
            setError('Please enter a valid name');
            setLoading(false);
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }
        const phonePattern = /^\d{10}$/;
        if (!phone || !phonePattern.test(phone)) {
            setError('Please enter a valid phone number');
            setLoading(false);
            return;
        }

        if (!password || password.length < 3) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }
        else if (/\s/.test(password)) {
            setError('Password cannot contain whitespace');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/register', {
                name,
                email,
                phone,
                password
            });
            console.log('response', response.data); // Handle successful signup
            if (response.status === 201) {


                toast.success('You have successfully registered', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => navigate('/login')
                });
            }

        } catch (error) {

            if (error.response && error.response.status === 400) {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'Email or phone number already exists. Please use a different email.',
                    confirmButtonText: 'OK'
                });
                setLoading(false);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: 'An error occurred while registering. Please try again later.',
                    confirmButtonText: 'OK'
                });
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: '15px' }}>
                                    <div className="card-body p-3">
                                        <h2 className="text-uppercase text-center mb-4">Create an account</h2>

                                        {error && <div className="alert alert-danger">{error}</div>}

                                        <div className="form-outline mb-4">
                                            <input type="text" id="form3Example1cg" onChange={(e) => {
                                                setName(e.target.value)

                                            }} className="form-control  form-control-md" value={name} />
                                            <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input onChange={(e) => {
                                                setEmail(e.target.value)

                                            }} type="email" value={email} id="form3Example3cg" className="form-control form-control-md" />
                                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input onChange={(e) => {
                                                setPhone(e.target.value)

                                            }} type="text" id="form3Example2cg" className="form-control form-control-md" maxLength={10} />
                                            <label className="form-label" htmlFor="form3Example2cg">Phone Number</label>
                                        </div>
                                        <div className="form-outline mb-4">
                                            <input onChange={(e) => {
                                                setPassword(e.target.value)

                                            }} type="password" value={password} id="form3Example4cg" className="form-control form-control-md" />
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                        </div>
                                        {/* 
                                        <div className="form-outline mb-4">
                                            <input type="password" id="form3Example4cdg" className="form-control form-control-md" />
                                            <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                        </div> */}

                                        {/* <div className="form-outline mb-4">
                                            <input type="file" id="formFile" className="form-control form-control-sm" />
                                            <label className="form-label" htmlFor="formFile">Upload Image</label>
                                        </div> */}

                                        <div className="d-flex justify-content-center">
                                            <button onClick={handleSubmit} disabled={loading} type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                                        </div>
                                        <Link to={'/login'}>  <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!" className="fw-bold text-body"><u>Login here</u></a></p>
                                        </Link>



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup