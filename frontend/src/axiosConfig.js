

import axios from 'axios';
import Cookies from 'js-cookie';
const axiosInstance = axios.create({
  baseURL:process.env.BACKEND_URL, //'http://localhost:4000',
  withCredentials: true // Include credentials (cookies) with each request
});


// axiosInstance.interceptors.request.use(
//   config => {
//     console.log( Cookies.get("accessToken"),'token form cookie') 
//     const token = localStorage.getItem('token');
//     if (token) {
//       console.log(token, 'this is ')
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
   
//       Cookies.remove('accessToken');

//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );


// axiosInstance.interceptors.response.use(
//   response => {
//     console.log(response, 'this is the resopnse')
//     return response;
//   },
//   error => {
//     if (error.response && error.response.status === 401) {

//       console.log('Unauthorized, redirecting to login...');

//       localStorage.removeItem('token');
//       Cookies.remove('accessToken');

//     }

//     return Promise.reject(error);
//   }
// );
export default axiosInstance;












