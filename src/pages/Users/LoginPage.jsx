import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, verifyTwoFactor } from '../../redux/actions/authactions';
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
    twoFactorToken: ''
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [tempToken, setTempToken] = useState('');

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
  
    setIsLoggingIn(true);
  
    try {
      if (requires2FA) {
        // Handle 2FA verification
        const result = await dispatch(verifyTwoFactor({
          tempToken,
          twoFactorToken: formData.twoFactorToken
        })).unwrap();
        
        toast.success("Login successful! Redirecting...");
        nav("/user/home");
      } else {
        // Initial login attempt
        const result = await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        })).unwrap();
        
        if (result.twoFactorRequired) {
          setTempToken(result.tempToken);
          setRequires2FA(true);
          toast.info("Please enter your 2FA code");
        } else {
          toast.success("Login successful! Redirecting...");
          nav("/user/home");
        }
      }
    } catch (err) {
      toast.error(err || "Authentication failed");
    } finally {
      setIsLoggingIn(false);
    }
  };

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
            disabled={requires2FA}
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
            disabled={requires2FA}
          />
        </div>

        {requires2FA && (
          <div className='w-[100%] sm:w-fit'>
            <p className='mt-4 mb-2'>2FA Code</p>
            <input
              type='text'
              name='twoFactorToken'
              value={formData.twoFactorToken}
              onChange={handleChange}
              required={true}
              placeholder='Enter 6-digit code'
              className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
            />
          </div>
        )}

        <p onClick={() => nav('/forgot')} className='mt-3 w-[100%] sm:w-[25rem] text-end cursor-pointer'>
          Forgot Password
        </p>

        <button
          onClick={handleSubmit}
          disabled={isLoggingIn}
          className='mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block'
        >
          {isLoggingIn ? 'Signing In...' : 'Sign In'}
        </button>
      </div>

      <img src={Candle} alt='' className='fixed bottom-[30%] left-0 -z-50' />
      <img src={Candle} alt='' className='fixed bottom-[30%] right-0 -z-50' />

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