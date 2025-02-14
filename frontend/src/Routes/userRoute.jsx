import { Routes, Route } from 'react-router-dom';
import Signup from '../components/signup/Signup';
import Login from '../components/login/Login';
import UserPage from '../components/home/userPage';
import EditProfile from '../components/home/ProfileEdit';
import React from 'react'
import PrivateComponent from '../privateComponents/privateComponent'
const UserRoute = () => {
    return (
        <Routes>
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<UserPage />} />
            <Route element={<PrivateComponent />}>

                <Route path='/profile' element={<EditProfile />} />
            </Route>
        </Routes>
    )
}

export default UserRoute