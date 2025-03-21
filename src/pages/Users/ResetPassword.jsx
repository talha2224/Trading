import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/authactions'; // Import the resetPassword action
import Navbar from '../../components/Users/Navbar';
import Candle from '../../assets/candle.png';
import { ToastContainer, toast } from 'react-toastify'; // For showing notifications
import 'react-toastify/dist/ReactToastify.css';

const ResetPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { id } = useParams(); // Get the reset token from the URL
  const { loading, error } = useSelector((state) => state.auth);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
const token=id;
  const handleSubmit = async (e) => {
    e.preventDefault(); 


    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await dispatch(resetPassword({ token, password })).unwrap(); // Dispatch the resetPassword action
      toast.success('Password reset successful!');
      nav('/'); // Navigate to the login page after success
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <Navbar title={"Sign up"} link={"/register"} />

      <div className='flex h-[90vh] justify-center items-center flex-col px-5'>
        <h1 className='text-3xl'>Reset Password</h1>

        <form onSubmit={handleSubmit} className='w-[100%] sm:w-fit'>
          <div className='w-[100%] sm:w-fit mt-[3rem]'>
            <p className='mb-2'>New Password</p>
            <input
              type="password"
              name="newPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
              className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
            />
          </div>
          <div className='w-[100%] sm:w-fit'>
            <p className='mt-4 mb-2'>Confirm Password</p>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={true}
              className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className='mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block'
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>

      <img src={Candle} alt="" className='fixed bottom-[30%] left-0 -z-50' />
      <img src={Candle} alt="" className='fixed bottom-[30%] right-0 -z-50' />

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ResetPage;