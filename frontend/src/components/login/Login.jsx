import React, { useState, useEffect } from 'react'
import './login.css'
import { setCredentilas } from '../../redux/authSllice';
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../axiosConfig';
const Login = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = Cookies.get('accessToken')
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        const checkLogged=()=>
            {
                if (auth) {
                    navigate('/home')
                }
            }
       checkLogged()
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !email.trim()) {
            setError('Please enter a valid email');
            setLoading(false);
            return;
        }
        else if (!email || !emailPattern.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }
        if (password.trim() === '') {
            setError('Please enter the password');
            setLoading(false);
            return;
        }
        else if (!password || password.length < 3) {
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
            const response = await axiosInstance.post('/login', {
                email,
                password
            }, { withCredentials: true });
            const { token, user } = response.data;
            if (response.status === 200) {
                dispatch(setCredentilas({
                    token: token
                }))
                toast.success('Login Successful! You have successfully logged in.', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onClose: () => navigate('/home')
                });
            }
        } catch (error) {
            console.error('Failed to sign up:', error);
            if (error.response && error.response.status === 401) {
                setError('Incorrect password or email');
                setLoading(false);
            } else {
                setError('Failed to log in. Please try again.');
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
                                <h2 className="text-uppercase mb-4">Sign In</h2>

                                {error && <div className="alert alert-danger">{error}</div>}

                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control form-control-lg"
                                            
                                        />
                                        <label className="form-label" htmlFor="email">
                                            Your Email
                                        </label>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control form-control-lg"
                                            
                                        />
                                        <label className="form-label" htmlFor="password">
                                            Password
                                        </label>
                                        <span
                                            className="password-toggle-icon"
                                            onClick={handleTogglePassword}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? '👁️' : '👁️‍🗨️'}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-center">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="btn btn-primary btn-lg gradient-custom-4"
                                        >
                                            {loading ? 'Logging in...' : 'Login'}
                                        </button>
                                    </div>

                                    <p className="text-center text-muted mt-4 mb-0">
                                        Don't have an account?{' '}
                                        <Link to="/register" className="fw-bold text-body">
                                            <u>Sign up here</u>
                                        </Link>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
}

export default Login