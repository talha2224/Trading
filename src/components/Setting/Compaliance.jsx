import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Compaliance = () => {
  // State for form inputs
  const [newCompliance, setNewCompliance] = useState('');
  const [newRegulatory, setNewRegulatory] = useState('');
  const [securitySettings, setSecuritySettings] = useState({
    encryptionEnabled: false,
    firewallConfigured: false,
    auditingEnabled: false
  });
  
  // State for data from API
  const [complianceEntries, setComplianceEntries] = useState([]);
  const [regulatoryRequirements, setRegulatoryRequirements] = useState([]);
  
  // API base URL
  const API_BASE_URL = 'https://backend-nine-tau-59.vercel.app/api';
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch compliance entries
        const complianceRes = await axios.get(`${API_BASE_URL}/compliance/compliance`);
        setComplianceEntries(complianceRes.data);
        
        // Fetch regulatory requirements
        const regulatoryRes = await axios.get(`${API_BASE_URL}/compliance/regulatory`);
        setRegulatoryRequirements(regulatoryRes.data);
        
        // Fetch security settings
        const securityRes = await axios.get(`${API_BASE_URL}/compliance/security`);
        if (securityRes.data) {
          setSecuritySettings(securityRes.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle compliance form submission
  const handleAddCompliance = async () => {
    if (!newCompliance) return;
    
    try {
      await axios.post(`${API_BASE_URL}/compliance/compliance`, { entry: newCompliance });
      
      // Refresh compliance data
      const res = await axios.get(`${API_BASE_URL}/compliance/compliance`);
      setComplianceEntries(res.data);
      setNewCompliance('');
    } catch (error) {
      console.error('Error adding compliance entry:', error);
    }
  };
  
  // Handle regulatory form submission
  const handleAddRegulatory = async () => {
    if (!newRegulatory) return;
    
    try {
      await axios.post(`${API_BASE_URL}/compliance/regulatory`, { requirement: newRegulatory });
      
      // Refresh regulatory data
      const res = await axios.get(`${API_BASE_URL}/compliance/regulatory`);
      setRegulatoryRequirements(res.data);
      setNewRegulatory('');
    } catch (error) {
      console.error('Error adding regulatory requirement:', error);
    }
  };
  
  // Handle security settings form submission
  const handleSaveSettings = async () => {
    try {
      await axios.post(`${API_BASE_URL}/compliance/security`, securitySettings);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving security settings:', error);
    }
  };
  
  // Handle security settings toggle
  const handleToggleSetting = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  // Handle saving all changes
  const handleSaveAll = async () => {
    if (newCompliance) await handleAddCompliance();
    if (newRegulatory) await handleAddRegulatory();
    await handleSaveSettings();
  };

  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl'>Regulatory Compliance:</h1>

      <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Compliance Checklist</p>
          {complianceEntries.map((item, index) => (
            <input 
              key={item._id || index}
              type="text" 
              value={item.entry}
              readOnly
              className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block'
            />
          ))}
          <input 
            type="text"
            value={newCompliance}
            onChange={(e) => setNewCompliance(e.target.value)}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block' 
            placeholder='Add new compliance item'
          />
          <button 
            onClick={handleAddCompliance}
            className='mt-2 px-3 py-1 bg-[#135960] rounded-md'>
            Add
          </button>
        </div>
        
        <div>
          <p>Regulatory Reporting Requirements</p>
          {regulatoryRequirements.map((item, index) => (
            <input 
              key={item._id || index}
              type="text" 
              value={item.requirement}
              readOnly
              className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block'
            />
          ))}
          <input 
            type="text"
            value={newRegulatory}
            onChange={(e) => setNewRegulatory(e.target.value)}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 block'
            placeholder='Add new requirement'
          />
          <button 
            onClick={handleAddRegulatory}
            className='mt-2 px-3 py-1 bg-[#135960] rounded-md'>
            Add
          </button>
        </div>
      </div>

      <h1 className='text-xl mt-5'>Security Measures:</h1>

      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Encryption Settings</p>
          <div className='flex items-center gap-2 mt-3'>
            <input 
              type="checkbox" 
              id="encryption"
              checked={securitySettings.encryptionEnabled}
              onChange={() => handleToggleSetting('encryptionEnabled')}
              className='h-5 w-5'
            />
            <label htmlFor="encryption">
              {securitySettings.encryptionEnabled ? 'Enabled' : 'Disabled'}
            </label>
          </div>
        </div>
        
        <div>
          <p>Firewall Configuration</p>
          <div className='flex items-center gap-2 mt-3'>
            <input 
              type="checkbox" 
              id="firewall"
              checked={securitySettings.firewallConfigured}
              onChange={() => handleToggleSetting('firewallConfigured')}
              className='h-5 w-5'
            />
            <label htmlFor="firewall">
              {securitySettings.firewallConfigured ? 'Configured' : 'Not Configured'}
            </label>
          </div>
        </div>

        <div>
          <p>Security Auditing and Logging</p>
          <div className='flex items-center gap-2 mt-3'>
            <input 
              type="checkbox" 
              id="auditing"
              checked={securitySettings.auditingEnabled}
              onChange={() => handleToggleSetting('auditingEnabled')}
              className='h-5 w-5'
            />
            <label htmlFor="auditing">
              {securitySettings.auditingEnabled ? 'Enabled' : 'Disabled'}
            </label>
          </div>
        </div>
      </div>

      <button 
        onClick={handleSaveAll}
        className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960] mb-6'>
        Save
      </button>
    </div>
  );
};

export default Compaliance;