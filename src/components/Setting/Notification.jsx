import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { message } from 'antd';

const BACKEND_URL = 'http://localhost:5000';

const Notification = () => {
  const [settings, setSettings] = useState({
    emailNotifications: 'Allow',
    pushNotifications: 'Allow'
  });
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  // Initialize socket connection with error handling
  useEffect(() => {
    // Add reconnection options and error handling
    const newSocket = io(BACKEND_URL, {
      reconnectionAttempts: 3,
      timeout: 10000,
      reconnectionDelay: 10000
    });
    
    setSocket(newSocket);

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
    });
    
    newSocket.on('connect_error', (error) => {
      console.log('Socket connection error:', error);
      // Don't show error message to user, just log it
    });

    newSocket.on('notificationSettingsUpdated', (data) => {
      if (data.userId === localStorage.getItem('userId')) {
        setSettings(data.settings);
        message.info('Notification settings updated');
      }
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Rest of your component remains the same
  
  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${BACKEND_URL}/api/notifications/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching notification settings:', error);
        message.error('Failed to load notification settings');
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        message.error('Not authenticated');
        return;
      }

      await axios.put(`${BACKEND_URL}/api/notifications/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` }
      });

      message.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  // JSX return remains the same
  return (
    <div className='mt-[2rem]'>
      {/* Your existing JSX */}
      <h1 className='text-xl mt-5'>Alerts and Notifications:</h1>
      {/* Rest of your component JSX */}
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Email Notifications</p>
          <select
            name="emailNotifications"
            value={settings.emailNotifications}
            onChange={handleChange}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2'
          >
            <option value="Allow">Allow</option>
            <option value="Disable">Disable</option>
          </select>
        </div>
        <div>
          <p>Push Notifications</p>
          <select
            name="pushNotifications"
            value={settings.pushNotifications}
            onChange={handleChange}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2'
          >
            <option value="Allow">Allow</option>
            <option value="Disable">Disable</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={loading}
        className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960] mb-6'
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default Notification;