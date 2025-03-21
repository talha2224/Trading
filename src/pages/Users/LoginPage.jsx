import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authactions'; // Import the login action
import Navbar from '../../components/Users/Navbar';
import Candle from '../../assets/candle.png';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false); // Track login state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoggingIn(true); // Set logging in state to true

    const credentials = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await dispatch(loginUser(credentials)).unwrap(); // Ensure correct usage
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        nav("/user/home");
      }, 2000);
    } catch (err) {
      toast.error(`Login failed: ${err.message || "Invalid credentials"}`);
    } finally {
      setIsLoggingIn(false); // Reset logging in state
    }
  };

  // Reset the button state if loading or error changes
  useEffect(() => {
    if (!loading && !error) {
      setIsLoggingIn(false);
    }
  }, [loading, error]);

  return (
    <div>
      <Navbar title={'Sign up'} link={'/register'} />

      <div className='flex h-[90vh] justify-center items-center flex-col px-5'>
        <h1 className='text-3xl'>Login Your Account</h1>

        <div className='w-[100%] sm:w-fit mt-[3rem]'>
          <p className='mb-2'>Email Address</p>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required={true}
            className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
          />
        </div>
        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Password</p>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required={true}
            className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
          />
        </div>
        <p onClick={() => nav('/forgot')} className='mt-3 w-[100%] sm:w-[25rem] text-end cursor-pointer'>
          Forgot Password
        </p>
        <button
          onClick={handleSubmit}
          disabled={isLoggingIn} // Use isLoggingIn to disable the button
          className='mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block'
        >
          {isLoggingIn ? 'Signing In...' : 'Sign In'}
        </button>
      </div>

      <img src={Candle} alt='' className='fixed bottom-[30%] left-0 -z-50' />
      <img src={Candle} alt='' className='fixed bottom-[30%] right-0 -z-50' />

      {/* Add ToastContainer for toast notifications */}
      <ToastContainer
        position='top-right'
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

export default LoginPage;