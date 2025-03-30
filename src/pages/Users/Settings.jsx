import React, { useState } from 'react'
import LoginNavbar from '../../components/Users/LoginNavbar'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Settings = () => {
    const navigate = useNavigate();
    const [showSub, setShowSub] = useState("profile")
    const [currentIndex, setCurrentIndex] = useState(0)
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9] 
    const [qrCodeData, setQrCodeData] = useState('');
    const [secret, setSecret] = useState('');
    const [tokens, setTokens] = useState('');
  
    const [success, setSuccess] = useState('');
    const [loginHistory, setLoginHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterStatus, setFilterStatus] = useState('');
  
    // Get auth state from Redux
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user);
  
   
    useEffect(() => {
        const fetchLoginHistory = async (page = 1) => {
          if (!token || !user?.id) {
            console.log("Missing token or user ID");
            return;
          }
          
          try {
            setLoading(true);
            setError(null);
      
            // Ensure we're using the same ID format as the backend expects
            const userId = user.id || user._id; // Handle both cases
            
            let url = `http://localhost:5000/api/users/${userId}/loginhistory?page=${page}`;
            if (filterStatus) {
              url += `&status=${filterStatus}`;
            }
      
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });
      
            console.log("API Response:", response.data);
            setLoginHistory(response.data.loginHistory || []);
            setTotalPages(response.data.totalPages || 1);
            setCurrentPage(response.data.currentPage || 1);
          } catch (err) {
            console.error('Error:', err);
            const errorMsg = err.response?.data?.message || err.message;
            setError(errorMsg);
            toast.error(errorMsg);
            
            // Debug unauthorized errors
            if (err.response?.status === 403) {
              console.log("Token user ID:", user.id);
              console.log("Requested user ID:", err.response?.data?.details?.tokenUserId);
            }
          } finally {
            setLoading(false);
          }
        };
      
        if (currentIndex === 6 && user?.id && token) {
          fetchLoginHistory(currentPage);
        }
      }, [currentIndex, user?.id, user?._id, token, filterStatus, currentPage]);
   
    
    useEffect(() => {
        const generateSecret = async () => {
            try {
                setLoading(true);
                console.log('Auth token:', token);
                
                if (!token) {
                    throw new Error('No authentication token found');
                }
    
                const response = await axios.post('http://localhost:5000/api/users/2fa/generate', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                console.log('API response:', response);
                
                if (!response.data.dataURL) {
                    throw new Error('No QR code data received from server');
                }
                
                setQrCodeData(response.data.dataURL);
                setSecret(response.data.secret);
            } catch (err) {
                console.error('Error in generateSecret:', err);
                setError(`Failed to generate 2FA secret: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };
    
        if (token) {
            generateSecret();
        } else {
            setError('Authentication token not available');
        }
    }, [token]);
    
    const handleVerifyToken = async () => {
        if (!token) {
            setError('Please enter the authentication code');
            return;
        }
    
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/users/2fa/verify', { tokens }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            if (response.data.verified) {
                setSuccess('Two-factor authentication has been enabled successfully!');
                setError('');
            } else {
                setError('Invalid authentication code. Please try again.');
            }
        } catch (err) {
            console.error('Verification error:', err);
            setError(err.response?.data?.message || 'Failed to verify token');
        } finally {
            setLoading(false);
        }
    };
    const handleCloseAccount = async () => {
        try {
            const token = localStorage.getItem('token'); // Get JWT token

            if (!token) {
                toast.error('User not authenticated'); // Show error toast
                return;
            }

            // Call the API to close the account
            await axios.delete('http://localhost:5000/api/users/deleteaccount', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Clear local storage
            localStorage.clear();

            // Show success toast
            toast.success('Your account has been closed successfully');

            setTimeout(() => {
                navigate('/');
            }, 2000);

            // Redirect to home page after short delay
           // 2-second delay for user to see message
        } catch (error) {
            console.error('Error closing account:', error);
            toast.error('Failed to close account. Please try again.');
        }
    };
    return (


        <div className='px-5'>

            <div className='border-b border-[#103147]'>
                <LoginNavbar />
            </div>

            {/* ${type === "deposit" && "bg-[#010410] border-l-8 border-[#3391F6]"} */}
            <div className='mt-[2rem] flex items-start gap-x-[2.5rem]'>

                <div>
                    <p className='text-xs text-[#c4c4c4]'>Settings Option</p>

                    <div className='bg-[#0A1A23] border border-[#103147] mt-8 w-[20rem] rounded-lg px-3 py-5 flex justify-center items-center flex-col'>


                        <div className='w-[80%] relative'>

                            <div onClick={() => setShowSub("profile")} className='flex justify-between items-center w-[100%] text-[#c4c4c4] cursor-pointer'>
                                <p>Profile</p>
                                {showSub === "profile" ? <FaChevronDown /> : <FaChevronUp />}
                            </div>

                            {
                                showSub === "profile" && (

                                    <div>
                                        <div onClick={() => setCurrentIndex(0)} className={`mt-4 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 0 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p>Personal details</p>
                                        </div>
                                    </div>
                                )
                            }



                        </div>



                        <div className='w-[80%] relative mt-4'>

                            <div onClick={() => setShowSub("verification")} className='flex justify-between items-center w-[100%] text-[#c4c4c4] cursor-pointer'>
                                <p>Verification</p>
                                {showSub === "verification" ? <FaChevronDown /> : <FaChevronUp />}
                            </div>

                            {
                                showSub === "verification" && (

                                    <div>
                                        <div onClick={() => setCurrentIndex(1)} className={`mt-4 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 1 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p>Proof of identity</p>
                                        </div>
                                        <div onClick={() => setCurrentIndex(2)} className={`mt-2 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 2 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p>Proof of address</p>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                        <div className='w-[80%] relative mt-4'>

                            <div onClick={() => setShowSub("security")} className='flex justify-between items-center w-[100%] text-[#c4c4c4] cursor-pointer'>
                                <p>Security and safety</p>
                                {showSub === "security" ? <FaChevronDown /> : <FaChevronUp />}
                            </div>

                            {
                                showSub === "security" && (

                                    <div>
                                        <div onClick={() => setCurrentIndex(3)} className={`mt-4 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 3 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p>Email and Password</p>
                                        </div>
                                        <div onClick={() => setCurrentIndex(4)} className={`mt-2 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 4 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p>Self exclusion</p>
                                        </div>
                                        <div onClick={() => setCurrentIndex(5)} className={`mt-2 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 5 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p>Account limites</p>
                                        </div>
                                        <div onClick={() => setCurrentIndex(6)} className={`mt-2 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 6 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p>Login History</p>
                                        </div>
                                        <div onClick={() => setCurrentIndex(7)} className={`mt-2 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 7 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p className=' truncate'>Two Factor Authentication</p>
                                        </div>
                                        <div onClick={() => setCurrentIndex(8)} className={`mt-2 cursor-pointer w-[100%] h-[2.5rem] text-[#434343] rounded-md py-2 ${currentIndex === 8 && "bg-[#010410] border-l-8 border-[#3391F6] px-3"}`}>
                                            <p className=' truncate'>Close your account</p>
                                        </div>
                                    </div>
                                )
                            }

                        </div>

                    </div>


                </div>

                <div className='flex-1 ml-[4rem]'>

                    {
                        currentIndex == 0 && (

                            <div>
                                <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>

                                <div className='flex items-center gap-x-6 mt-5'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Firstname</p>
                                        <input type="text" name="" id="" placeholder='First name' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Lastname</p>
                                        <input type="text" name="" id="" placeholder='Lastname' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>

                                <div className='flex items-center gap-x-6 mt-5'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Date Of Birth</p>
                                        <input type="date" name="" id="" placeholder='First name' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Country Of Residence</p>
                                        <input type="text" name="" id="" placeholder='US' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>


                                <div className='flex items-center gap-x-6 mt-5 border-b border-[#103147] pb-4'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Phone Number</p>
                                        <input type="text" name="" id="" placeholder='Phone Number' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>


                                <div className='flex items-center gap-x-6 mt-5'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Home Address</p>
                                        <input type="text" name="" id="" placeholder='Home Address' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Home Address 2</p>
                                        <input type="text" name="" id="" placeholder='Home Address 2' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>


                                <div className='flex items-center gap-x-6 mt-5'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Town City</p>
                                        <input type="text" name="" id="" placeholder='Town City' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Town City 2</p>
                                        <input type="text" name="" id="" placeholder='Town City 2' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>


                                <div className='flex items-center gap-x-6 mt-5'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>State/Province</p>
                                        <input type="text" name="" id="" placeholder='State Provice' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>State Provice 2</p>
                                        <input type="text" name="" id="" placeholder='State Provice 2' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>


                                <div className='flex items-center gap-x-6 mt-5'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Postal Zip Code</p>
                                        <input type="text" name="" id="" placeholder='Postal Zip Code' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Postal Zip Code 2</p>
                                        <input type="text" name="" id="" placeholder='Postal Zip Code 2' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>



                                <button className='bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5'>Save Edit</button>

                            </div>
                        )
                    }


                    {
                        currentIndex == 1 && (

                            <div>
                                <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
                                <p className='mt-4'>Upload proof of identity</p>

                                <div className='mt-5  pb-4'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Select a verification id</p>
                                        <input type="text" name="" id="" placeholder='National Identity' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>

                                    <div className='mt-6'>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Upload Card Front</p>
                                        <div className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white flex items-center'>Upload Card Front</div>
                                    </div>


                                    <div className='mt-6'>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Upload Card Back</p>
                                        <div className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white flex items-center'>Upload Card Back</div>
                                    </div>


                                </div>




                                <button className='bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5'>Submit</button>

                            </div>
                        )
                    }



                    {
                        currentIndex == 2 && (

                            <div>
                                <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
                                <p className='mt-4'>Upload proof of address</p>

                                <div className='mt-5  pb-4'>
                                    <div>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Select address</p>
                                        <input type="text" name="" id="" placeholder='Select Address' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>

                                    <div className='mt-6'>
                                        <p className='text-sm text-[#c4c4c4] mb-2'>Upload Proof</p>
                                        <div className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white flex items-center'>Upload Proof</div>
                                    </div>


                                </div>

                                <button className='bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5'>Submit</button>

                            </div>
                        )
                    }



                    {
                        currentIndex == 3 && (

                            <div>
                                <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
                                <p className='my-2'>Email address</p>
                                <p className='text-sm text-[#c4c4c4]'>This is the email address associated with your account.</p>

                                <div className='flex items-center gap-x-6 mt-5'>
                                    <input type="email" name="" id="" placeholder='@gmail.com' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    <button className='bg-[#135960] h-[3rem] rounded-md w-[10rem]'>Change Email</button>
                                </div>


                                <p className='text-[#c4c4c4] mt-4 mb-2'>Old Password</p>
                                <input type="password" name="" id="" placeholder='*****' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />

                                <p className='text-[#c4c4c4] mt-4 mb-2'>New Password</p>
                                <input type="password" name="" id="" placeholder='*****' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />


                                <p className='text-[#c4c4c4] mt-4 mb-2'>Confirm Password</p>
                                <input type="password" name="" id="" placeholder='*****' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                <button className='bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block'>Change Password</button>

                            </div>
                        )
                    }


                    {
                        currentIndex == 4 && (

                            <div>
                                <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>

                                <p className='my-2'>Your Stake And Loss Limit</p>
                                <div className='flex items-center gap-x-6 mt-5 border-b border-[#103147] pb-4'>
                                    <div className='bg-[#082022] py-5 px-5 rounded-md'>
                                        <div>
                                            <p className='text-[#c4c4c4] mb-2'>24 hrs</p>
                                            <p className='text-[#c4c4c4] mb-2'>Max total stake</p>
                                            <input type="text" name="" id="" placeholder='BTC' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                        </div>
                                        <div className='mt-5'>
                                            <p className='text-[#c4c4c4] mb-2'>Max total loss</p>
                                            <input type="text" name="" id="" placeholder='BTC' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                        </div>
                                    </div>
                                    <div className='bg-[#082022] py-5 px-5 rounded-md'>
                                        <div>
                                            <p className='text-[#c4c4c4] mb-2'>7 days</p>
                                            <p className='text-[#c4c4c4] mb-2'>Max total stake</p>
                                            <input type="text" name="" id="" placeholder='BTC' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                        </div>
                                        <div className='mt-5'>
                                            <p className='text-[#c4c4c4] mb-2'>Max total loss</p>
                                            <input type="text" name="" id="" placeholder='BTC' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                        </div>
                                    </div>
                                    <div className='bg-[#082022] py-5 px-5 rounded-md'>
                                        <div>
                                            <p className='text-[#c4c4c4] mb-2'>30 days</p>
                                            <p className='text-[#c4c4c4] mb-2'>Max total stake</p>
                                            <input type="text" name="" id="" placeholder='BTC' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                        </div>
                                        <div className='mt-5'>
                                            <p className='text-[#c4c4c4] mb-2'>Max total loss</p>
                                            <input type="text" name="" id="" placeholder='BTC' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                        </div>
                                    </div>
                                </div>

                                <p className='my-2'>Your Session And Login Limit</p>
                                <div className='flex items-center gap-x-6 mt-5 border-b border-[#103147] pb-4'>
                                    <div className='bg-[#082022] py-5 px-5 rounded-md'>
                                        <p className='text-[#c4c4c4] mb-2'>You will be automatically logged out from each session after this time limit.</p>
                                        <input type="text" name="" id="" placeholder='Minutes' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                    <div className='bg-[#082022] py-5 px-5 rounded-md'>
                                        <p className='text-[#c4c4c4] mb-2'>You will not be able to log in to your account until this date (up to 6 weeks from today).</p>
                                        <input type="date" name="" id="" placeholder='Dates' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>

                                    <div className='bg-[#082022] py-5 px-5 rounded-md'>
                                        <p className='text-[#c4c4c4] mb-2'>Your account will be excluded from the website until this date (at least 6 months, up to 5 years).</p>
                                        <input type="date" name="" id="" placeholder='Dates' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>


                                <p className='my-2'>Maximum account balance and open positions</p>
                                <div className='flex items-center gap-x-6 mt-5 border-b border-[#103147] pb-4'>
                                    <div className='bg-[#082022] py-5 px-5 rounded-md'>
                                        <p className='text-[#c4c4c4] mb-2'>Once your account balance reaches this amount, you will not be able to deposit funds into your account.</p>
                                        <input type="text" name="" id="" placeholder='BTC' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>

                                    <div className='bg-[#082022] py-5 px-5 rounded-md'>
                                        <p className='text-[#c4c4c4] mb-2'>Once your account balance reaches this amount, you will not be able to deposit funds into your account.</p>
                                        <input type="text" name="" id="" placeholder='No of open positions' className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' />
                                    </div>
                                </div>





                                <button className='bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5'>Save Edit</button>

                            </div>
                        )
                    }



                    {
                        currentIndex == 5 && (

                            <div>
                                <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>

                                <div className='flex items-center gap-x-12 mt-5'>
                                    <p className='text-lg w-[40rem]'>Trading Limits</p>
                                    <p className='text-lg'>Limits</p>
                                </div>

                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>*Maximum number of open positions</p>
                                    <p className='text-lg'>1000</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>*Maximum account cash balance</p>
                                    <p className='text-lg'>Not set</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Maximum aggregate payouts on open positions</p>
                                    <p className='text-lg'>1000000</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Any limits in your Self-exclusion settings will override these default limits.</p>
                                    <p className='text-lg'>1000</p>
                                </div>


                                <div className='flex items-center gap-x-12 mt-5'>
                                    <p className='text-lg w-[40rem]'>Trading Limits</p>
                                    <p className='text-lg'>Limits</p>
                                </div>

                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Commodities</p>
                                    <p className='text-lg'>1000</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Forex</p>
                                    <p className='text-lg'>Not set</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Major Pairs</p>
                                    <p className='text-lg'>1000000</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Minor Pairs</p>
                                    <p className='text-lg'>1000</p>
                                </div>

                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Stock indices</p>
                                    <p className='text-lg'>1000</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Derived</p>
                                    <p className='text-lg'>Not set</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Commodities Basket</p>
                                    <p className='text-lg'>1000000</p>
                                </div>
                                <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
                                    <p className='text-lg w-[40rem]'>Forex Basket</p>
                                    <p className='text-lg'>1000</p>
                                </div>


                                <button className='bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5'>Save Edit</button>

                            </div>
                        )
                    }



                    {
                        currentIndex == 6 && (

                            <div>
      <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
      <div className='py-5 rounded-md w-[100%] mb-4 overflow-hidden'>
        
        {/* Filter Controls */}
        <div className="mb-4 flex items-center">
          <label className="mr-2">Filter by status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border rounded px-3 py-1"
            disabled={loading}
          >
            <option value="">All</option>
            <option value="success">Successful</option>
            <option value="failed">Failed</option>
            <option value="2fa_required">2FA Required</option>
          </select>
        </div>

        {/* Table Header */}
        <div className='flex justify-between items-center border-b border-[#103147] pb-4'>
          <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Date & Time</p>
          <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Action</p>
          <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Browser</p>
          <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>IP Address</p>
          <p className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Status</p>
        </div>
        
        {/* Table Content */}
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading login history...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4">
            Error: {error}
          </div>
        ) : loginHistory.length === 0 ? (
          <div className="text-center p-4">
            No login history records found
          </div>
        ) : (
          loginHistory.map((entry) => (
            <div key={entry._id} className='flex justify-between items-center mt-4 border-b border-[#103147] pb-4'>
              <p className='flex-1 min-w-[10rem] mr-1 truncate'>
                {new Date(entry.attemptTime).toLocaleString()}
              </p>
              <p className='flex-1 min-w-[10rem] mr-1 truncate'>
                Login
              </p>
              <p className='flex-1 min-w-[10rem] mr-1 truncate'>
                {entry.browser || 'Unknown'} {entry.os ? `(${entry.os})` : ''}
              </p>
              <p className='flex-1 min-w-[10rem] mr-1 truncate'>
                {entry.ipAddress}
              </p>
              <p className={`flex-1 min-w-[10rem] mr-1 truncate ${
                entry.status === 'success' ? 'text-green-500' : 
                entry.status === 'failed' ? 'text-red-500' : 'text-yellow-500'
              }`}>
                {entry.status === 'success' ? 'Successful' : 
                 entry.status === 'failed' ? `Failed${entry.failureReason ? ` (${entry.failureReason})` : ''}` : 
                 '2FA Required'}
              </p>
            </div>
          ))
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => fetchLoginHistory(page)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === page 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                disabled={loading}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
                        )
                    }


                    {
                        currentIndex == 7 && (

                            <div>
            <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
            <p className='my-3'>How to set up 2FA for your Deriv account</p>
            
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {qrCodeData ? (
                <>
                    <p className='mb-3 text-[#c4c4c4]'>Scan the QR code below with your 2FA app. We recommend Authy or Google Authenticator.</p>
                    <img src={qrCodeData} alt="2FA QR Code" className='h-[8rem]' />
                    <p className='my-3 text-[#c4c4c4]'>If you are unable to scan the QR code, you can manually enter this code instead:</p>
                    <p className="mb-3 font-mono bg-[#0A1A23] p-2 rounded">{secret}</p>
                </>
            ) : (
                <p>Generating QR code...</p>
            )}

            <p className='mb-3'>Enter the authentication code generated by your 2FA app:</p>
            <div>
                <p className='text-sm text-[#c4c4c4] mb-2'>Authenticator Code</p>
                <input 
                    type="text" 
                    value={tokens}
                    onChange={(e) => setTokens(e.target.value)}
                    placeholder='Enter 6-digit code' 
                    className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
                />
            </div>

            <button 
                onClick={handleVerifyToken}
                disabled={loading}
                className='bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5 disabled:opacity-50'
            >
                {loading ? 'Verifying...' : 'Enable'}
            </button>
        </div>
                        )
                    }


                    {
                            currentIndex === 8 && (
                                <div>
                                    <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
                                    <p className='my-3 leading-9'>
                                        Are you sure? <br />
                                        If you close your account: <br />
                                        You can't trade on Deriv. <br />
                                        You can't make transactions. <br />
                                        Before closing your account: <br />
                                        Close all your positions. <br />
                                        Withdraw your funds. <br />
                                        We shall delete your personal information as soon as our legal obligations are met, as mentioned in the section on Data Retention in our Security and privacy policy.
                                    </p>
                                    <div className='flex justify-end items-center gap-x-5'>
                                        <button className='border border-[#135960] h-[3rem] rounded-md w-[15rem] mt-4 block mb-5'>
                                            Close
                                        </button>
                                        <button 
                                            className='bg-[#135960] h-[3rem] rounded-md w-[15rem] mt-4 block mb-5' 
                                            onClick={handleCloseAccount}
                                        >
                                            Close my account
                                        </button>
                                    </div>
                                </div>
                            )
                    }





                </div>

            </div>


        </div>
    )
}

export default Settings