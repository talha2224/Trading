// RegisterPage.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/authactions"; // Import the action
import Navbar from "../../components/Users/Navbar";
import Candle from "../../assets/candle.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the CSS

const RegisterPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    DOB: "",
    Phoneno: "",
    Residence: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match"); // Replace alert with toast
      return;
    }

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      DOB: formData.DOB,
      Phoneno: formData.Phoneno,
      Residence: formData.Residence,
    };

    dispatch(registerUser(userData))
      .unwrap()
      .then(() => {
        toast.success("Registration successful!");
        nav("/user/home"); // Navigate to /user/home on success
      })
      .catch((err) => {
        toast.error(`Registration failed: ${err.message}`);
      });
  };

  return (
    <div>
      <Navbar title={"Log in"} link={"/"} />

      <div className="flex min-h-[90vh] justify-center items-center flex-col px-5">
        <h1 className="text-3xl">Register Your Account</h1>

        {/* Form fields */}
        <div className='w-[100%] sm:w-fit mt-[3rem]'>
          <p className='mb-2'>Full Name</p>
          <input
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            required={true}
            className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
          />
        </div>
        <div className='w-[100%] sm:w-fit mt-4'>
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
        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Confirm Password</p>
          <input
            type='password'
            name='confirmPassword'
            value={formData.confirmPassword}
            onChange={handleChange}
            required={true}
            className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
          />
        </div>
        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>DOB</p>
          <input
            type='text'
            name='DOB'
            value={formData.DOB}
            onChange={handleChange}
            required={true}
            className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
          />
        </div>

        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Phone Number</p>
          <input
            type='text'
            name='Phoneno'
            value={formData.Phoneno}
            onChange={handleChange}
            required={true}
            className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
          />
        </div>

        <div className='w-[100%] sm:w-fit'>
          <p className='mt-4 mb-2'>Residence</p>
          <input
            type='text'
            name='Residence'
            value={formData.Residence}
            onChange={handleChange}
            required={true}
            className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
          />
        </div>

        {/* Add other form fields here */}

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block mb-5"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>

      <img src={Candle} alt="" className="fixed bottom-[30%] left-0 -z-50" />
      <img src={Candle} alt="" className="fixed bottom-[30%] right-0 -z-50" />

      {/* Add ToastContainer for toast notifications */}
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

export default RegisterPage;