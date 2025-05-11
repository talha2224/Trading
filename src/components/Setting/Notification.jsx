import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { message } from 'antd';

const BACKEND_URL = 'https://backend-nine-tau-59.vercel.app';

const Notification = () => {
  const [settings, setSettings] = useState({
    emailNotifications: 'Allow',
    pushNotifications: 'Allow'
  });
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  // Initialize socket connection with error handling
  useEffect(() => {
    // Modified socket configuration to fix Vercel connection issues
    const newSocket = io(BACKEND_URL, {
      transports: ['polling'],  // Force polling only
      polling: {
        extraHeaders: {
          "Access-Control-Allow-Origin": "*" // Try to address CORS
        }
      },
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
      timeout: 5000
    });

    // Socket event listeners
    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
    });
    
    newSocket.on('connect_error', (error) => {
      console.log('Socket connection error:', error.message);
      // Don't show error message to user, just log it
      
      // Optional: Add fallback mechanism for critical notifications
      // For example, periodically poll the notifications API
    });

    newSocket.on('notificationSettingsUpdated', (data) => {
      if (data.userId === localStorage.getItem('userId')) {
        setSettings(data.settings);
        if (data.message) {
          setAlertMessage(data.message);
          // Clear the alert message after 3 seconds
          setTimeout(() => setAlertMessage(null), 3000);
        }
      }
    });

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
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

  // Helper function to determine alert message
  const getAlertMessage = (emailSetting, pushSetting) => {
    if (emailSetting === 'Allow' && pushSetting === 'Allow') {
      return "Both notifications has been sent";
    } else if (emailSetting === 'Allow') {
      return "Email notification has been sent";
    } else if (pushSetting === 'Allow') {
      return "Push notification has been sent";
    } else {
      return null;
    }
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

      // Display the appropriate message based on settings
      const newAlertMessage = getAlertMessage(settings.emailNotifications, settings.pushNotifications);
      
      if (newAlertMessage) {
        setAlertMessage(newAlertMessage);
        // Clear the alert message after 3 seconds
        setTimeout(() => setAlertMessage(null), 3000);
      }
      
      message.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl mt-5'>Alerts and Notifications:</h1>
      
      {/* Show alert message if present */}
      {alertMessage && (
        <div className="notification-alert bg-[#135960] text-white p-3 rounded-md my-4">
          {alertMessage}
        </div>
      )}
      
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