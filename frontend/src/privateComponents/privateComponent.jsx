import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
const PrivateComponent = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const cookie = Cookies.get('accessToken')

    const isAuth = userInfo && cookie
    return isAuth ? <Outlet /> : <Navigate to='/login'></Navigate>
}
export default PrivateComponent

