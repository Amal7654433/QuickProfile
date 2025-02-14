import React, { useState } from 'react';

import Swal from 'sweetalert2';
import axiosInstance from '../../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ProfilePic = ({ user, fetch, updateImageUrl }) => {
  const [file, setImage] = useState();
  
  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
   
      formData.append("file", file);
      console.log(formData)
      const response = await axiosInstance.post(`/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
       window.location.reload()
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Swal.fire({
        icon: 'error',
        title: 'Upload Error',
        text: 'There was an error uploading your photo. Please try again.',
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload} encType="multipart/form-data">
        <div className="form-outline mb-4">

          <input name='file' type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} id="formFile" className="form-control form-control-sm" />
          <button type='submit' style={{ border: 'none', backgroundColor: '#d4edda' }} className='mt-2' >upload</button>
        </div>
      </form>
    </div>

  );
};

export default ProfilePic;
