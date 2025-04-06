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
  const [showSub, setShowSub] = useState("profile");
  const [currentIndex, setCurrentIndex] = useState(0);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [qrCodeData, setQrCodeData] = useState('');
  const [secret, setSecret] = useState('');
  const [tokens, setTokens] = useState('');
  const [success, setSuccess] = useState('');
  const [loginHistory, setLoginHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limitsLoading, setLimitsLoading] = useState(false); // Separate loading state
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('');
  const [tradingLimits, setTradingLimits] = useState(null);
  const [formData, setFormData] = useState({
    maxOpenPositions: '',
    maxAccountBalance: '',
    maxAggregatePayouts: '',
    selfExclusionLimit: '',
    commoditiesLimit: '',
    forexLimit: '',
    majorPairsLimit: '',
    minorPairsLimit: '',
    stockIndicesLimit: '',
    derivedLimit: '',
    commoditiesBasketLimit: '',
    forexBasketLimit: '',
    useSelfExclusion: false,
  });
// State variables
const [emailForm, setEmailForm] = useState({
  newEmail: '',
  currentPassword: ''
});

const [passwordForm, setPasswordForm] = useState({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const [emailLoading, setEmailLoading] = useState(false);
const [passwordLoading, setPasswordLoading] = useState(false);
const [address, setAddress] = useState('');
const [file, setFile] = useState(null);
const [previewUrl, setPreviewUrl] = useState('');

const token = useSelector((state) => state.auth.token);
const user = useSelector((state) => state.auth.user);
const [idType, setIdType] = useState('national-id');
const [frontFile, setFrontFile] = useState(null);
const [backFile, setBackFile] = useState(null);
const [frontPreview, setFrontPreview] = useState(null);
const [backPreview, setBackPreview] = useState(null);


   {/* State for form data */}
   const [formDatas, setFormDatas] = useState({
    firstName: '',
    lastName: '',
    DOB: '',
    countryOfResidence: 'US',
    phoneNumbers: ['', ''],
    addresses: [
      {
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: ''
      },
      {
        line1: '',
        line2: '',
        city: '',
        state: '',
        postalCode: ''
      }
    ]
  });


  // Load profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://backend-nine-tau-59.vercel.app/api/users/getuserprofiledata', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setFormDatas(response.data.profile);
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    fetchProfile();
  }, []);

  // Handle form input changes
  const handleChange = (e, index, fieldType) => {
    const { name, value } = e.target;
    
    if (fieldType === 'address') {
      const updatedAddresses = [...formDatas.addresses];
      updatedAddresses[index][name] = value;
      setFormDatas({...formDatas, addresses: updatedAddresses});
    } else if (fieldType === 'phone') {
      const updatedPhones = [...formDatas.phoneNumbers];
      updatedPhones[index] = value;
      setFormDatas({...formDatas, phoneNumbers: updatedPhones});
    } else {
      setFormDatas({...formDatas, [name]: value});
    }
  };

  // Handle form submission
  const handleSubmitprofile = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://backend-nine-tau-59.vercel.app/api/users/saveprofiledata', formDatas, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.data.success) {
        alert('Profile saved successfully!');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert(error.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

const handleFileChanges = (side, file) => {
  if (file) {
    if (side === 'front') {
      setFrontFile(file);
      setFrontPreview(URL.createObjectURL(file));
    } else {
      setBackFile(file);
      setBackPreview(URL.createObjectURL(file));
    }
  }
};

const handleSubmitdoc = async () => {
  if (!idType || !frontFile || !backFile) {
    alert('Please select ID type and upload both sides');
    return;
  }

  const formData = new FormData();
  formData.append('idType', idType);
  formData.append('front', frontFile);
  formData.append('back', backFile);

  try {
    setLoading(true);
    const response = await axios.post('https://backend-nine-tau-59.vercel.app/api/docs/identity/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log('Upload successful:', response.data);
    alert('ID documents uploaded successfully!');
    
    // Reset form
    setFrontFile(null);
    setBackFile(null);
    setFrontPreview(null);
    setBackPreview(null);
  } catch (error) {
    console.error('Upload failed:', error);
    alert(error.response?.data?.message || 'Upload failed');
  } finally {
    setLoading(false);
  }
};
const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  }
};

const handleSubmitfiles = async () => {
  if (!address ) {
    alert('Please fill all fields');
    return;
  }

  const formData = new FormData();
  formData.append('address', address);
  formData.append('document', file);
  formData.append('docType', 'address'); // Specify document type

  try {
    setLoading(true);
    const response = await axios.post('https://backend-nine-tau-59.vercel.app/api/docs/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    console.log('Upload successful:', response.data);
   
    // Reset form
    setAddress('');
    setFile(null);
    setPreviewUrl('');
  } catch (error) {
    console.error('Upload failed:', error);
    alert(error.response?.data?.message || 'Upload failed');
  } finally {
    setLoading(false);
  }
};


 

  // Email change handler
const handleEmailChange = async () => {
  try {
    setEmailLoading(true);
    const response = await axios.put(
      'https://backend-nine-tau-59.vercel.app/api/users/changeemail',
      emailForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (response.data.success) {
      toast.success('Verification email sent! Check your new email');
      setEmailForm({ newEmail: '', currentPassword: '' });
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to initiate email change');
  } finally {
    setEmailLoading(false);
  }
};

// Password change handler
const handlePasswordChange = async () => {
  try {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setPasswordLoading(true);
    const response = await axios.put(
      'https://backend-nine-tau-59.vercel.app/api/users/changepassword',
      passwordForm,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success('Password updated successfully!');
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to change password');
  } finally {
    setPasswordLoading(false);
  }
};

  // Trading limits effect
  useEffect(() => {
    const fetchTradingLimits = async () => {
      try {
        setLimitsLoading(true);
        const limits = await tradingLimitService.getTradingLimits(user._id, token);
        setTradingLimits(limits);
        setFormData({
          maxOpenPositions: limits.maxOpenPositions || '',
          maxAccountBalance: limits.maxAccountBalance || '',
          maxAggregatePayouts: limits.maxAggregatePayouts || '',
          selfExclusionLimit: limits.selfExclusionLimit || '',
          commoditiesLimit: limits.commoditiesLimit || '',
          forexLimit: limits.forexLimit || '',
          majorPairsLimit: limits.majorPairsLimit || '',
          minorPairsLimit: limits.minorPairsLimit || '',
          stockIndicesLimit: limits.stockIndicesLimit || '',
          derivedLimit: limits.derivedLimit || '',
          commoditiesBasketLimit: limits.commoditiesBasketLimit || '',
          forexBasketLimit: limits.forexBasketLimit || '',
          useSelfExclusion: limits.useSelfExclusion || false,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLimitsLoading(false);
      }
    };

    if (user?._id && token) {
      fetchTradingLimits();
    }
  }, [user?._id, token]);

  // Login history effect
  useEffect(() => {
    const fetchLoginHistory = async (page = 1) => {
      if (!token || !user?.id) return;
      
      try {
        setLoading(true);
        const userId = user.id || user._id;
        let url = `https://backend-nine-tau-59.vercel.app/api/users/${userId}/loginhistory?page=${page}`;
        if (filterStatus) url += `&status=${filterStatus}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setLoginHistory(response.data.loginHistory || []);
        setTotalPages(response.data.totalPages || 1);
        setCurrentPage(response.data.currentPage || 1);
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message;
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    if (currentIndex === 6 && user?.id && token) {
      fetchLoginHistory(currentPage);
    }
  }, [currentIndex, user?.id, user?._id, token, filterStatus, currentPage]);

  // 2FA effect
  useEffect(() => {
    const generateSecret = async () => {
      try {
        setLoading(true);
        if (!token) throw new Error('No authentication token found');

        const response = await axios.post(
          'https://backend-nine-tau-59.vercel.app/api/users/2fa/generate', 
          {}, 
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.data.dataURL) throw new Error('No QR code data received');
        setQrCodeData(response.data.dataURL);
        setSecret(response.data.secret);
      } catch (err) {
        setError(`Failed to generate 2FA secret: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (token) generateSecret();
  }, [token]);

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

 {/* API Handlers - Put these with your other component functions */}
const handleSubmit = async (e) => {
  
    e.preventDefault();
    try {

     
      setLimitsLoading(true);
      const response = await axios.post(
        `https://backend-nine-tau-59.vercel.app/api/tradelimit/createtradelimit/${user.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTradingLimits(response.data);
      toast.success('Trading limits updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error('Failed to update trading limits');
    } finally {
      setLimitsLoading(false);
    }
  };
  
  const handleReset = async () => {
    try {

      console.log(user._id)
      setLimitsLoading(true);
      const response = await axios.post(
        `https://backend-nine-tau-59.vercel.app/api/tradelimit/${user.id}/reset`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTradingLimits(response.data);
      setFormData({
        maxOpenPositions: response.data.maxOpenPositions || '',
        maxAccountBalance: response.data.maxAccountBalance || '',
        maxAggregatePayouts: response.data.maxAggregatePayouts || '',
        selfExclusionLimit: response.data.selfExclusionLimit || '',
        commoditiesLimit: response.data.commoditiesLimit || '',
        forexLimit: response.data.forexLimit || '',
        majorPairsLimit: response.data.majorPairsLimit || '',
        minorPairsLimit: response.data.minorPairsLimit || '',
        stockIndicesLimit: response.data.stockIndicesLimit || '',
        derivedLimit: response.data.derivedLimit || '',
        commoditiesBasketLimit: response.data.commoditiesBasketLimit || '',
        forexBasketLimit: response.data.forexBasketLimit || '',
        useSelfExclusion: response.data.useSelfExclusion || false,
      });
      toast.success('Trading limits reset to default!');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      toast.error('Failed to reset trading limits');
    } finally {
      setLimitsLoading(false);
    }
  };
  
  // Initialize form data - call this in useEffect when component mounts
  const fetchTradingLimits = async () => {
    try {
      setLimitsLoading(true);
      const response = await axios.get(
        `https://backend-nine-tau-59.vercel.app/api/tradelimit/gettradelimit/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTradingLimits(response.data);
      setFormData({
        maxOpenPositions: response.data.maxOpenPositions || '',
        maxAccountBalance: response.data.maxAccountBalance || '',
        maxAggregatePayouts: response.data.maxAggregatePayouts || '',
        selfExclusionLimit: response.data.selfExclusionLimit || '',
        commoditiesLimit: response.data.commoditiesLimit || '',
        forexLimit: response.data.forexLimit || '',
        majorPairsLimit: response.data.majorPairsLimit || '',
        minorPairsLimit: response.data.minorPairsLimit || '',
        stockIndicesLimit: response.data.stockIndicesLimit || '',
        derivedLimit: response.data.derivedLimit || '',
        commoditiesBasketLimit: response.data.commoditiesBasketLimit || '',
        forexBasketLimit: response.data.forexBasketLimit || '',
        useSelfExclusion: response.data.useSelfExclusion || false,
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLimitsLoading(false);
    }
  };
  
  // Call this in useEffect when component mounts
  useEffect(() => {
    if (user?.id && token) {
      fetchTradingLimits();
    }
  }, [user?._id, token]);

  const handleCloseAccount = async () => {
    try {
        const token = localStorage.getItem('token'); // Get JWT token

        if (!token) {
            toast.error('User not authenticated'); // Show error toast
            return;
        }

        // Call the API to close the account
        await axios.delete('https://backend-nine-tau-59.vercel.app/api/users/deleteaccount', {
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
const handleVerifyToken = async () => {
if (!token) {
    setError('Please enter the authentication code');
    return;
}

try {
    setLoading(true);
    const response = await axios.post('https://backend-nine-tau-59.vercel.app/api/users/2fa/verify', { tokens }, {
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

                            
      // Handle form submission
     

      <div>
      <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>

      <div className='flex items-center gap-x-6 mt-5'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Firstname</p>
          <input 
            type="text" 
            name="firstName"
            value={formDatas.firstName}
            onChange={(e) => handleChange(e)}
            placeholder='First name' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Lastname</p>
          <input 
            type="text" 
            name="lastName"
            value={formDatas.lastName}
            onChange={(e) => handleChange(e)}
            placeholder='Lastname' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
      </div>

      {/* DOB & Country */}
      <div className='flex items-center gap-x-6 mt-5'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Date Of Birth</p>
          <input 
            type="date" 
            name="DOB"
            value={formDatas.DOB}
            onChange={(e) => handleChange(e)}
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Country Of Residence</p>
          <input 
            type="text" 
            name="countryOfResidence"
            value={formDatas.countryOfResidence}
            onChange={(e) => handleChange(e)}
            placeholder='US' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className='flex items-center gap-x-6 mt-5 border-b border-[#103147] pb-4'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Phone Number</p>
          <input 
            type="text" 
            value={formDatas.phoneNumbers[0] || ''}
            onChange={(e) => handleChange(e, 0, 'phone')}
            placeholder='Phone Number' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
      </div>

      {/* Address Line 1 & 2 */}
      <div className='flex items-center gap-x-6 mt-5'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Home Address</p>
          <input 
            type="text" 
            name="line1"
            value={formDatas.addresses[0].line1}
            onChange={(e) => handleChange(e, 0, 'address')}
            placeholder='Home Address' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Home Address 2</p>
          <input 
            type="text" 
            name="line2"
            value={formDatas.addresses[0].line2}
            onChange={(e) => handleChange(e, 0, 'address')}
            placeholder='Home Address 2' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
      </div>

      {/* City */}
      <div className='flex items-center gap-x-6 mt-5'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Town City</p>
          <input 
            type="text" 
            name="city"
            value={formDatas.addresses[0].city}
            onChange={(e) => handleChange(e, 0, 'address')}
            placeholder='Town City' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Town City 2</p>
          <input 
            type="text" 
            name="city"
            value={formDatas.addresses[1].city}
            onChange={(e) => handleChange(e, 1, 'address')}
            placeholder='Town City 2' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
      </div>

      {/* State/Province */}
      <div className='flex items-center gap-x-6 mt-5'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>State/Province</p>
          <input 
            type="text" 
            name="state"
            value={formDatas.addresses[0].state}
            onChange={(e) => handleChange(e, 0, 'address')}
            placeholder='State Province' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>State Province 2</p>
          <input 
            type="text" 
            name="state"
            value={formDatas.addresses[1].state}
            onChange={(e) => handleChange(e, 1, 'address')}
            placeholder='State Province 2' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
      </div>

      {/* Postal/Zip Code */}
      <div className='flex items-center gap-x-6 mt-5'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Postal Zip Code</p>
          <input 
            type="text" 
            name="postalCode"
            value={formDatas.addresses[0].postalCode}
            onChange={(e) => handleChange(e, 0, 'address')}
            placeholder='Postal Zip Code' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Postal Zip Code 2</p>
          <input 
            type="text" 
            name="postalCode"
            value={formDatas.addresses[1].postalCode}
            onChange={(e) => handleChange(e, 1, 'address')}
            placeholder='Postal Zip Code 2' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white' 
          />
        </div>
      </div>

      {/* Save Button */}
      <button 
        onClick={handleSubmitprofile}
        disabled={loading}
        className={`bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Saving...' : 'Save Edit'}
      </button>
    </div>
                        )
                    }

{
  currentIndex == 1 && (
    <div>
      <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
      <p className='mt-4'>Upload proof of identity</p>

      <div className='mt-5 pb-4'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Select a verification id</p>
          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 text-white'
          >
            <option value="national-id">National Identity</option>
            <option value="passport">Passport</option>
            <option value="drivers-license">Driver's License</option>
          </select>
        </div>

        <div className='mt-6'>
          <p className='text-sm text-[#c4c4c4] mb-2'>Upload Card Front</p>
          <input
            type="file"
            id="front-upload"
            onChange={(e) => handleFileChanges('front', e.target.files[0])}
            accept="image/*"
            className="hidden"
          />
          <label 
            htmlFor="front-upload"
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 text-white flex items-center cursor-pointer'
          >
            {frontFile ? frontFile.name : 'Upload Card Front'}
          </label>
          {frontPreview && (
            <img src={frontPreview} alt="Front Preview" className="mt-2 max-h-40" />
          )}
        </div>

        <div className='mt-6'>
          <p className='text-sm text-[#c4c4c4] mb-2'>Upload Card Back</p>
          <input
            type="file"
            id="back-upload"
            onChange={(e) => handleFileChanges('back', e.target.files[0])}
            accept="image/*"
            className="hidden"
          />
          <label 
            htmlFor="back-upload"
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 text-white flex items-center cursor-pointer'
          >
            {backFile ? backFile.name : 'Upload Card Back'}
          </label>
          {backPreview && (
            <img src={backPreview} alt="Back Preview" className="mt-2 max-h-40" />
          )}
        </div>
      </div>

      <button 
        onClick={handleSubmitdoc}
        disabled={loading}
        className={`bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Uploading...' : 'Submit'}
      </button>
    </div>
  )
}


{
  currentIndex == 2 && (
    <div>
      <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
      <p className='mt-4'>Upload proof of address</p>

      <div className='mt-5 pb-4'>
        <div>
          <p className='text-sm text-[#c4c4c4] mb-2'>Select address</p>
          <input 
            type="text" 
            placeholder='Select Address' 
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className='mt-6'>
          <p className='text-sm text-[#c4c4c4] mb-2'>Upload Proof</p>
          <input
            type="file"
            id="document-upload"
            onChange={handleFileChange}
            accept="image/*,.pdf"
            className="hidden"
          />
          <label 
            htmlFor="document-upload"
            className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 text-white flex items-center cursor-pointer'
          >
            {file ? file.name : 'Upload Proof'}
          </label>
          {previewUrl && (
            <div className="mt-2">
              {file.type.startsWith('image/') ? (
                <img src={previewUrl} alt="Preview" className="max-h-40" />
              ) : (
                <span className="text-white">PDF file selected</span>
              )}
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={ handleSubmitfiles}
        disabled={loading}
        className={`bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block mb-5 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Uploading...' : 'Submit'}
      </button>
    </div>
  )
}



{currentIndex === 3 && (
  <div>
    <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>
    
    {/* Email Change Section */}
    <div className='mt-5'>
      <p className='my-2'>Email address</p>
      <p className='text-sm text-[#c4c4c4]'>This is the email address associated with your account.</p>

      <div className='flex flex-col gap-4 mt-5'>
        <input 
          type="email" 
          placeholder={user.email}
          value={emailForm.newEmail}
          onChange={(e) => setEmailForm({...emailForm, newEmail: e.target.value})}
          className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white'
        />
        <input
          type="password"
          placeholder='Current Password'
          value={emailForm.currentPassword}
          onChange={(e) => setEmailForm({...emailForm, currentPassword: e.target.value})}
          className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white'
        />
        <button 
          onClick={handleEmailChange}
          className='bg-[#135960] h-[3rem] rounded-md w-[20rem]'
          disabled={emailLoading}
        >
          {emailLoading ? 'Processing...' : 'Change Email'}
        </button>
      </div>
    </div>

    {/* Password Change Section */}
    <div className='mt-8'>
      <p className='text-[#c4c4c4] mt-4 mb-2'>Old Password</p>
      <input 
        type="password" 
        placeholder='*****'
        value={passwordForm.oldPassword}
        onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
        className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white'
      />

      <p className='text-[#c4c4c4] mt-4 mb-2'>New Password</p>
      <input 
        type="password" 
        placeholder='*****'
        value={passwordForm.newPassword}
        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
        className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white'
      />

      <p className='text-[#c4c4c4] mt-4 mb-2'>Confirm Password</p>
      <input 
        type="password" 
        placeholder='*****'
        value={passwordForm.confirmPassword}
        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
        className='w-[20rem] bg-[#0A1A23] h-[3rem] rounded-md px-3 placeholder:text-white'
      />
      
      <button 
        onClick={handlePasswordChange}
        className='bg-[#135960] h-[3rem] rounded-md w-[20rem] mt-4 block'
        disabled={passwordLoading}
      >
        {passwordLoading ? 'Updating...' : 'Change Password'}
      </button>
    </div>
  </div>
)}


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



{currentIndex === 5 && (
  <div>
    <h1 className='text-2xl border-b border-[#103147] pb-4'>Manage Account Settings</h1>

    <form onSubmit={handleSubmit}>
      {/* Verification Section */}
      <div className='flex items-center gap-x-12 mt-5'>
        <p className='text-lg w-[40rem]'>Trading Limits</p>
        <p className='text-lg'>Limits</p>
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>*Maximum number of open positions</p>
        <input
          type="number"
          name="maxOpenPositions"
          value={formData.maxOpenPositions}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>*Maximum account cash balance</p>
        <input
          type="number"
          name="maxAccountBalance"
          value={formData.maxAccountBalance || ''}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
          placeholder="Not set"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Maximum aggregate payouts on open positions</p>
        <input
          type="number"
          name="maxAggregatePayouts"
          value={formData.maxAggregatePayouts}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Self-exclusion limit</p>
        <input
          type="number"
          name="selfExclusionLimit"
          value={formData.selfExclusionLimit}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      {/* Trading Instruments Section */}
      <div className='flex items-center gap-x-12 mt-5'>
        <p className='text-lg w-[40rem]'>Trading Instruments Limits</p>
        <p className='text-lg'>Limits</p>
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Commodities</p>
        <input
          type="number"
          name="commoditiesLimit"
          value={formData.commoditiesLimit}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Forex</p>
        <input
          type="number"
          name="forexLimit"
          value={formData.forexLimit || ''}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
          placeholder="Not set"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Major Pairs</p>
        <input
          type="number"
          name="majorPairsLimit"
          value={formData.majorPairsLimit}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Minor Pairs</p>
        <input
          type="number"
          name="minorPairsLimit"
          value={formData.minorPairsLimit}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Stock Indices</p>
        <input
          type="number"
          name="stockIndicesLimit"
          value={formData.stockIndicesLimit}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Derived</p>
        <input
          type="number"
          name="derivedLimit"
          value={formData.derivedLimit || ''}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
          placeholder="Not set"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Commodities Basket</p>
        <input
          type="number"
          name="commoditiesBasketLimit"
          value={formData.commoditiesBasketLimit}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Forex Basket</p>
        <input
          type="number"
          name="forexBasketLimit"
          value={formData.forexBasketLimit}
          onChange={handleInputChange}
          className="text-lg bg-transparent border-b border-[#c4c4c4] text-white w-32"
        />
      </div>

      {/* Self-exclusion toggle */}
      <div className='flex items-center gap-x-12 mt-5 text-[#c4c4c4]'>
        <p className='text-lg w-[40rem]'>Enable Self-exclusion override</p>
        <input
          type="checkbox"
          name="useSelfExclusion"
          checked={formData.useSelfExclusion}
          onChange={handleInputChange}
          className="w-5 h-5"
        />
      </div>

      {/* Action Buttons */}
      <div className='flex gap-4 mt-4'>
        <button 
          type="submit" 
          className={`bg-[#135960] h-[3rem] rounded-md w-[20rem] block mb-5 ${
            limitsLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#0e4a4f]'
          } transition-colors`}
          disabled={limitsLoading}
        >
          {limitsLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : 'Save Changes'}
        </button>
        
        <button 
          type="button" 
          className={`bg-[#591313] h-[3rem] rounded-md w-[20rem] block mb-5 ${
            limitsLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#4a0f0f]'
          } transition-colors`}
          onClick={handleReset}
          disabled={limitsLoading}
        >
          Reset to Default
        </button>
      </div>
    </form>
  </div>
)}



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