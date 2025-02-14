
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoute from './Routes/userRoute';
import AdminRoute from './Routes/adminRoute';
function App() {
 return (
    <div className="App">
      <BrowserRouter><Routes>

        <Route path='/*' element={<UserRoute />} />

        <Route path='/admin/*' element={<AdminRoute />} />

      </Routes></BrowserRouter>

      <ToastContainer />
    </div>
  );
}

export default App;
