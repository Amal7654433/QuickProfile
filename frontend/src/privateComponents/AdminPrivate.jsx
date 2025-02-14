import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
const AdminPrivate=()=>
{
    const auth = Cookies.get('adminToken')
 console.log(auth)
    return auth ? <Outlet /> : <Navigate to='/admin/login'></Navigate>
}
export default AdminPrivate