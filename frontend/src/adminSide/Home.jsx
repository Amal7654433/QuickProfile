import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Button';
import axios from 'axios';
import UserEdit from './userEdit';
import Swal from 'sweetalert2';
import './adminHome.css'
import axiosInstance from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const Home = () => {
 
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const dispatch=useDispatch()
      
    const fetchUser = async () => {
        try {
            const response = await axiosInstance.get('/admin/dashboard')
     
            setUser(response.data);

        }
        catch (err) {
            console.log(err.message)
        }

    }
    useEffect(() => {

        fetchUser()
    }, [])

    // const deleteUser = async (id) => {
    //     const response = await axios.delete(`http://localhost:4000/admin/dashboard/delete/${id}`)

    //     if (response.status === 200) {

    //         Swal.fire({
    //             icon: 'success',
    //             title: 'Removed',
    //             text: 'User have been successfully removed.',
    //             showConfirmButton: false,
    //             timer: 3000, 
    //         })
    //         fetchUser()
    //     }
    // }
    const deleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once deleted, you will not be able to recover this user!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove !'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axiosInstance.delete(`/admin/dashboard/delete/${id}`)

                if (response.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Removed',
                        text: 'User have been successfully removed.',
                        showConfirmButton: false,
                        timer: 3000,
                    })
                    fetchUser()
                }
            }
        });
    };
    const searchHandle = async (event) => {
        try {
            let key = event.target.value
            console.log(key)
            if (key) {
                const result = await axiosInstance.get(`/admin/search/${key}`)
                console.log('this is search data', result.data)
                if (result) {
                    setUser(result.data)
                }
            }
            else {
                fetchUser()
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div className="admin-dashboard gradient-custom">
            <div className="container p-3">
                {/* Search Bar and Add User Button */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div style={{ width: 400 }} className="input-group">
                        <input
                            type="text"
                            onChange={searchHandle}
                            className="form-control glassmorphism-input"
                            placeholder="Search"
                        />
                        <button type="button" className="btn btn-secondary">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <button
                        onClick={() => navigate('/admin/add')}
                        className="btn btn-primary"
                    >
                        Add User +
                    </button>
                </div>

                {/* User Table */}
                <div className="table-responsive">
                    <table className="table table-striped glassmorphism-card">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user &&
                                user.map((item, index) => (
                                    <tr key={item._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td onClick={() => navigate(`/admin/dashboard/edit/${item._id}`)}>
                                            <i className="bi bi-pen text-primary" style={{ cursor: 'pointer' }}></i>
                                        </td>
                                        <td onClick={() => deleteUser(item._id)}>
                                            <i className="bi bi-trash text-danger" style={{ cursor: 'pointer' }}></i>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home