import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import for redirection

const Backup = () => {
  const [backupData, setBackupData] = useState({
    backupLocation: '',
    schedule: '',
    disasterRecoveryPlan: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirecting when token expires
  
  useEffect(() => {
    // Load backup settings when component mounts
    fetchBackupSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBackupData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle token expiration by redirecting to login
  const handleTokenExpired = () => {
    localStorage.removeItem('adminToken'); // Clear the expired token
    toast.error('Your session has expired. Please login again.');
    navigate('/admin/login'); // Redirect to admin login page
  };

  const fetchBackupSettings = async () => {
    try {
      setLoading(true);
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        setError('Authentication required. Please login as admin.');
        setLoading(false);
        return;
      }
      
      const response = await axios.get('http://localhost:5000/api/backup', {
        headers: {
          'Authorization': `Bearer ${adminToken}`
        }
      });
      
      console.log('Backup settings response:', response.data);
      
      if (response.data && response.data.data) {
        setBackupData({
          backupLocation: response.data.data.backupLocation || '',
          schedule: response.data.data.schedule || '',
          disasterRecoveryPlan: response.data.data.disasterRecoveryPlan || ''
        });
      }
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching backup settings:', err);
      
      // Handle token expiration
      if (err.response?.status === 401 && 
          err.response?.data?.message?.includes('jwt expired')) {
        handleTokenExpired();
      } else {
        setError(err.response?.data?.message || 'Failed to load backup settings');
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        setError('Authentication required. Please login as admin.');
        setLoading(false);
        return;
      }
      
      // Validate required fields
      if (!backupData.backupLocation || !backupData.schedule) {
        setError('Backup location and schedule are required fields');
        setLoading(false);
        return;
      }
      
      const response = await axios.post('http://localhost:5000/api/backup', backupData, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Save response:', response.data);
      toast.success('Backup settings saved successfully!');
      setLoading(false);
    } catch (err) {
      console.error('Error saving backup settings:', err);
      
      // Handle token expiration
      if (err.response?.status === 401 && 
          err.response?.data?.message?.includes('jwt expired')) {
        handleTokenExpired();
      } else {
        setError(err.response?.data?.message || 'Failed to save backup settings');
        toast.error(err.response?.data?.message || 'Failed to save backup settings');
      }
      setLoading(false);
    }
  };

  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl mt-5'>Data Backup:</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
          <div>
            <p>Backup Storage Location</p>
            <input 
              type="text" 
              name="backupLocation" 
              value={backupData.backupLocation} 
              onChange={handleChange}
              className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' 
            />
            
            <div>
              <p>Scheduled Backup Configuration</p>
              <input 
                type="text" 
                name="schedule" 
                value={backupData.schedule} 
                onChange={handleChange}
                className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2' 
              />
            </div>
          </div>
        </div>

        <h1 className='text-xl mt-5'>Disaster Recovery Plan:</h1>

        <div className='mt-5'>
          <p>Disaster Recovery Plan</p>
          <textarea 
            name="disasterRecoveryPlan" 
            value={backupData.disasterRecoveryPlan}
            onChange={handleChange}
            className='h-[15rem] rounded-md min-w-[100%] sm:min-w-[30rem] py-5 outline-none px-3 bg-[#081F22] mt-2 resize-none' 
            placeholder='Step-by-step recovery plan in case of disaster...' 
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className={`mt-6 w-[9rem] h-[3rem] rounded-md ${loading ? 'bg-gray-500' : 'bg-[#135960] hover:bg-[#1a7680]'} mb-6`}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default Backup;