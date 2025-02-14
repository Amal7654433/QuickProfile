
import { createSlice } from "@reduxjs/toolkit";

const initialState = {   userInfo:localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
adminInfo: localStorage.getItem('adminToken') ? JSON.parse(localStorage.getItem('adminToken')) : null
}

const authSlice = new createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setCredentilas: (state, action) => {
            const { token } = action.payload;
            state.userInfo= token;
            localStorage.setItem('token', JSON.stringify(token));

        },
        userLogout: (state, action) => {
            state.userInfo = null;
       
            localStorage.removeItem('token');
        },
        setAdminCredentials: (state, action) => {
             
            const { token } = action.payload;
            state.adminInfo = token;
            localStorage.setItem('adminToken', JSON.stringify(token));
  },
          adminLogout: (state, action) => {
            state.adminInfo = null;
            localStorage.removeItem('adminToken');
          }
    }

})
export const { setCredentilas, userLogout,setAdminCredentials,adminLogout } = authSlice.actions
export default authSlice.reducer






























// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
// adminInfo: localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null
// }

// const authSlice = new createSlice({
//     name: 'auth',
//     initialState: initialState,
//     reducers: {
//         setCredentilas: (state, action) => {
         
//             const {  name, email, token } = action.payload;
//             state.userInfo = {  name, email };
//             localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
//             localStorage.setItem('token', token);

//         },
//         userLogout: (state, action) => {
//             state.userInfo = null;
//             localStorage.removeItem('userInfo');
//             localStorage.removeItem('token');
//         },
//         setAdminCredentials: (state, action) => {
             
//             const {  email, token } = action.payload;
//             state.adminInfo = email
//             localStorage.setItem('adminInfo', JSON.stringify(state.adminInfo));
//             localStorage.setItem('AdminToken', token);
//           },
//           adminLogout: (state, action) => {
//             state.adminInfo = null;
//             localStorage.removeItem('adminInfo');
//             localStorage.removeItem('adminToken');
//           }
//     }

// })
// export const { setCredentilas, userLogout,setAdminCredentials,adminLogout } = authSlice.actions
// export default authSlice.reducer