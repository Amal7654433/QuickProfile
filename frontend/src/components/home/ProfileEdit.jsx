import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosInstance from '../../axiosConfig';
const EditProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const params = useParams()
  const navigate = useNavigate()
  useEffect(() => {

    const fetchUser = async () => {
      try {

        const res = await axiosInstance.get(`/profile`)

        console.log('this is data of user', res.data.user.password)
        const result = res.data.user
        setName(result.name)
        setEmail(result.email)
        setPhone(result.phone)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
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
      const response = await axiosInstance.post(`/profile`, {
        name,
        email,
        phone,
      });
      console.log(response.data)
      if (response.status === 200) {

        Swal.fire({
          icon: 'success',
          title: 'Updation Successful!',
          text: 'User Details successfully Updated.',
          showConfirmButton: false,
          timer: 3000 // Auto-close after 3 seconds
        }).then(() => {
          // Redirect or perform any action after the alert closes
          navigate('/home')
        });
      }
      // Update user information in parent component
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
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container-xl px-4 mt-4">

      <hr className="mt-0 mb-4" />
      <div className="row">

        <div className="col-xl-8">
          {/* Account details card */}
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                {/* Form Group (username) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">Username</label>
                  <input className="form-control" id="inputUsername" onChange={(e) => {
                    setName(e.target.value)

                  }} value={name} type="text" placeholder="Enter your username" />
                </div>

                {/* Form Group (email address) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                  <input onChange={(e) => {
                    setEmail(e.target.value)

                  }} className="form-control" value={email} id="inputEmailAddress" type="email" placeholder="Enter your email address" />
                </div>

                <div className="row gx-3 mb-3">

                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                    <input className="form-control" id="inputPhone" type="tel" onChange={(e) => {
                      setPhone(e.target.value)

                    }} placeholder="Enter your phone number" maxLength={10} value={phone} />
                  </div>

                  {/* <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">password</label>
                    <input onChange={(e) => {
                      setPassword(e.target.value)

                    }} className="form-control" id="inputBirthday" type="password" name="birthday" placeholder="Enter your birthday" value="06/10/1988" />
                  </div> */}
                </div>

                <button onClick={handleUpdate} className="btn btn-primary" type="button">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
