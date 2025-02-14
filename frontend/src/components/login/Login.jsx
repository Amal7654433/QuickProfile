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
        <div>  <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card" style={{ borderRadius: '15px' }}>
                                <div className="card-body p-3">
                                    <h2 className="text-uppercase text-center mb-4">Sign in</h2>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <form>
                                        <div className="form-outline mb-4">
                                            <input onChange={(e) => {
                                                setEmail(e.target.value)
                                            }} value={email} type="email" id="form3Example3cg" className="form-control form-control-md" />
                                            <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                        </div>
                                        <div onChange={(e) => {
                                            setPassword(e.target.value)

                                        }} className="form-outline mb-4">
                                            <input type={showPassword ? 'text' : 'password'} id="form3Example4cg" className="form-control form-control-md" />
                                            <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                            <span className="password-toggle-icon" onClick={handleTogglePassword}>
                                            </span>
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button onClick={handleSubmit} type="button" disabled={loading} className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Login</button>
                                        </div>
                                        <Link to={'/register'}> <p className="text-center text-muted mt-5 mb-0">Don't have an account?  <a href="#!" className="fw-bold text-body"><u>Signup here</u></a></p></Link>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section></div>
    )
}

export default Login