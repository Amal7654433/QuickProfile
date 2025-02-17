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
            const response = await axiosInstance.post('/register', {
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
        <section className="vh-100 gradient-custom">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card glassmorphism-card">
                            <div className="card-body p-5 text-center">
                                <h2 className="text-uppercase mb-4">Create an account</h2>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example1cg"
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control form-control-lg"
                                        value={name}
                                    />
                                    <label className="form-label" htmlFor="form3Example1cg">
                                        Your Name
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3cg"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control form-control-lg"
                                        value={email}
                                    />
                                    <label className="form-label" htmlFor="form3Example3cg">
                                        Your Email
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="text"
                                        id="form3Example2cg"
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control form-control-lg"
                                        maxLength={10}
                                    />
                                    <label className="form-label" htmlFor="form3Example2cg">
                                        Phone Number
                                    </label>
                                </div>

                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="form3Example4cg"
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control form-control-lg"
                                        value={password}
                                    />
                                    <label className="form-label" htmlFor="form3Example4cg">
                                        Password
                                    </label>
                                </div>

                                <div className="d-flex justify-content-center">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        type="button"
                                        className="btn btn-primary btn-lg gradient-custom-4"
                                    >
                                        {loading ? 'Registering...' : 'Register'}
                                    </button>
                                </div>

                                <p className="text-center text-muted mt-4 mb-0">
                                    Already have an account?{' '}
                                    <Link to="/login" className="fw-bold text-body">
                                        <u>Login here</u>
                                    </Link>
                                </p>
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