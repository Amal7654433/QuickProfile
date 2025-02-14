import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLogin from '../adminSide/adminLogin'
import Dashboard from '../adminSide/dashboard'
import UserEdit from '../adminSide/userEdit';
import AddUser from '../adminSide/AddUser';
import AdminPrivate from '../privateComponents/AdminPrivate';
const AdminRoute = () => {
    return (
        <Routes>
            <Route path='/login' element={<AdminLogin />}></Route>

            <Route element={<AdminPrivate />}>

                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/dashboard/edit/:userId' element={<UserEdit />}></Route>
                <Route path='/add' element={<AddUser />}></Route>
            </Route>
        </Routes>
    )
}

export default AdminRoute