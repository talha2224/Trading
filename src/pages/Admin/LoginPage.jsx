import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../../redux/actions/adminauthAction';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, isAuthenticated } = useSelector((state) => state.adminAuth); // Ensure correct state slice
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(loginAdmin(email, password)); // Dispatch the login action
    };

    // Use useEffect to react to changes in isAuthenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin/home'); // Navigate to the admin home page if authenticated
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className='w-screen h-screen flex justify-center items-center flex-col px-5'>
            <h1 className='text-3xl'>Login Your Account</h1>

            {error && <p className='text-red-500'>{error}</p>}

            <form onSubmit={handleLogin} className='w-[100%] sm:w-fit mt-[3rem]'>
                <div className='w-[100%] sm:w-fit'>
                    <p className='mb-2'>Email Address</p>
                    <input
                        type="email"
                        name="email"
                        required={true}
                        className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='w-[100%] sm:w-fit'>
                    <p className='mt-4 mb-2'>Password</p>
                    <input
                        type="password"
                        name="password"
                        required={true}
                        className='w-[100%] sm:w-[25rem] h-[3rem] rounded-md px-3 border border-[#0E2F44] bg-transparent outline-none'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className='mt-6 w-[100%] sm:w-[25rem] h-[3rem] bg-[#135960] block'>
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default LoginPage;