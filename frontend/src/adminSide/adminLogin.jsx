import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setAdminCredentials } from '../redux/authSllice';
import { useDispatch } from 'react-redux';
import './toast.css'

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const Navigate = useNavigate()
    const auth = Cookies.get('adminToken')
    const dispatch = useDispatch()
    useEffect(() => {
        const checkLogged=()=>
            {
                if (auth) {
                    Navigate('/admin/dashboard')
                }
            }
       checkLogged()
    })
    const handleLogin = async (e) => {
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
            const response = await axiosInstance.post('/admin/login', {
                email,
                password,
            });
            const { token, admin } = response.data;
            if (response.status === 200) {
                dispatch(setAdminCredentials({
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
                    onClose: () => Navigate('/admin/dashboard')
                });
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('Invalid credentials. Please try again.');
            setLoading(false);
        }
    };
    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-3">
                                    <h2 className="fw-bold mb-2 text-uppercase">Admin Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                    <div className="form-outline form-white mb-4" data-mdb-input-init>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="typeEmailX" className="form-control form-control-md" />
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    </div>
                                    <div className="form-outline form-white mb-4" data-mdb-input-init>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="typePasswordX" className="form-control form-control-md" />
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    </div>
                                    {/* <p className="small mb-5 pb-lg-2"><a href="#!" className="text-white-50">Forgot password?</a></p> */}
                                    <button onClick={handleLogin} className="btn btn-outline-light btn-lg px-5" disabled={loading} data-mdb-button-init data-mdb-ripple-init type="submit">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminLogin;
