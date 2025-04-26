import React, { useState, useEffect } from 'react';
import axios from 'axios';

const General = () => {
    const [config, setConfig] = useState({
        platformName: '',
        logoUrl: '',
        defaultLanguage: 'en',
        defaultTimezone: 'UTC'
      });
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(false);
      const [logoFile, setLogoFile] = useState(null);
    
      // Fetch current configuration
      useEffect(() => {
        const fetchConfig = async () => {
          try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/platformconfig', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            setConfig(response.data);
          } catch (err) {
            setError(err.response?.data?.error || 'Failed to fetch configuration');
          } finally {
            setLoading(false);
          }
        };
    
        fetchConfig();
      }, []);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
      };
    
      const handleLogoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setLogoFile(file);
          
          // Create preview URL
          const previewUrl = URL.createObjectURL(file);
          setConfig(prev => ({ ...prev, logoUrl: previewUrl }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
      
        try {
          const formData = new FormData();
          formData.append('platformName', config.platformName);
          formData.append('defaultLanguage', config.defaultLanguage);
          formData.append('defaultTimezone', config.defaultTimezone);
          
          // Append file with correct field name 'logo'
          if (logoFile) {
            formData.append('logo', logoFile); // Changed from 'logoUrl' to 'logo'
          }
      
          const response = await axios.put(
            'http://localhost:5000/api/platformconfig/platformconfig',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }
          );
      
          setConfig(response.data);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
          setError(err.response?.data?.error || 'Failed to update configuration');
        } finally {
          setLoading(false);
        }
      };
    

  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl'>Platform Configuration</h1>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Configuration updated successfully!
        </div>
      )}

      <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Platform Name</p>
          <input
            type="text"
            name="platformName"
            value={config.platformName}
            onChange={handleInputChange}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white'
          />
        </div>
        <div>
          <p>Platform Logo</p>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white flex items-center cursor-pointer'
            >
              {logoFile ? logoFile.name : config.logoUrl ? 'Change Logo' : 'Upload Logo'}
            </label>
          </div>
          {config.logoUrl && (
            <div className="mt-2">
              <img 
                src={config.logoUrl} 
                alt="Platform Logo" 
                className="h-16 object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <h1 className='text-xl mt-10'>Localization</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Language Settings</p>
          <select
            name="defaultLanguage"
            value={config.defaultLanguage}
            onChange={handleInputChange}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white'
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
        </div>
        <div>
          <p>Time Zone Configuration</p>
          <select
            name="defaultTimezone"
            value={config.defaultTimezone}
            onChange={handleInputChange}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white'
          >
            <option value="UTC">UTC</option>
            <option value="EST">Eastern Time (EST)</option>
            <option value="PST">Pacific Time (PST)</option>
            <option value="CET">Central European Time (CET)</option>
            <option value="CST">China Standard Time (CST)</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`mt-6 w-[9rem] h-[3rem] rounded-md ${loading ? 'bg-gray-500' : 'bg-[#135960] hover:bg-[#0e454a]'} text-white transition`}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default General;