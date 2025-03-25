// RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerAdmin } from '../../redux/actions/adminauthAction';

const RegisterPage = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        const adminData = {
            username: formData.email, // Assuming username is the email
            email: formData.email,
            password: formData.password,
        };
        try {
            await dispatch(registerAdmin(adminData));
            nav('/admin/home');
        } catch (error) {
            console.error('Error registering admin:', error);
        }
    };

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col px-5'>
            <h1 className='text-3xl'>Create Admin Account</h1>
            <form onSubmit={handleSubmit} className='mt-[2rem] w-[100%] flex justify-center items-center flex-col'>
                <div className='w-[100%] sm:w-fit'>
                    <p className='mb-2'>Email Address</p>
                    <input type="email" name="email" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' onChange={handleChange} />
                </div>
                <div className='w-[100%] sm:w-fit'>
                    <p className='mt-4 mb-2'>Password</p>
                    <input type="password" name="password" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' onChange={handleChange} />
                </div>
                <div className='w-[100%] sm:w-fit'>
                    <p className='mt-4 mb-2'>Confirm Password</p>
                    <input type="password" name="confirmPassword" required={true} className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none' onChange={handleChange} />
                </div>
                <button type="submit" className='mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block'>Sign Up</button>
            </form>
        </div>
    );
};

export default RegisterPage;