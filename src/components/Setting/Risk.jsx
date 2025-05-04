import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

export const Risk = () => {
  const [settings, setSettings] = useState({
    positionLimits: { minimumSize: 0, maximumSize: 0 },
    stopLossTakeProfit: { defaultStopLoss: 0, defaultTakeProfit: 0 },
    riskControls: { 
      riskPercentagePerTrade: 0, 
      maxDailyLossLimit: 0,
      riskExposureMonitoring: true 
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch settings when component mounts
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tradingsetting/positionlimitsetting');
        
        if (response.data) {
          const data = response.data;
          setSettings({
            positionLimits: {
              minimumSize: data.positionLimits?.minimumSize || 0,
              maximumSize: data.positionLimits?.maximumSize || 0
            },
            stopLossTakeProfit: {
              defaultStopLoss: data.stopLossTakeProfit?.defaultStopLoss || 0,
              defaultTakeProfit: data.stopLossTakeProfit?.defaultTakeProfit || 0
            },
            riskControls: {
              riskPercentagePerTrade: data.riskControls?.riskPercentagePerTrade || 0,
              maxDailyLossLimit: data.riskControls?.maxDailyLossLimit || 0,
              riskExposureMonitoring: data.riskControls?.riskExposureMonitoring !== undefined 
                ? data.riskControls.riskExposureMonitoring 
                : true
            }
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        setError('Failed to load settings. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleInputChange = (section, field, value) => {
    // Convert to number if not the riskExposureMonitoring field
    const processedValue = field === 'riskExposureMonitoring' 
      ? value 
      : Number(value) || 0;
    
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: processedValue
      }
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/tradingsetting/positionlimitsetting', settings);
      message.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      message.error(error.response?.data?.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading settings...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }
  return (
    <div className='mt-[2rem]'>
      <h1 className='text-xl'>Position Limits:</h1>
      <div className='mt-10 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Minimum Position Size</p>
          <input 
            type="text" 
            value={settings.positionLimits.minimumSize}
            onChange={(e) => handleInputChange('positionLimits', 'minimumSize', e.target.value)}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white' 
          />
        </div>
        <div>
          <p>Maximum Position Size</p>
          <input 
            type="text" 
            value={settings.positionLimits.maximumSize}
            onChange={(e) => handleInputChange('positionLimits', 'maximumSize', e.target.value)}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white' 
          />
        </div>
      </div>

      <h1 className='text-xl mt-10'>Stop-Loss/Take-Profit Settings:</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Default Stop Loss</p>
          <input 
            type="text" 
            value={settings.stopLossTakeProfit.defaultStopLoss}
            onChange={(e) => handleInputChange('stopLossTakeProfit', 'defaultStopLoss', e.target.value)}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white' 
            placeholder='-----/----' 
          />
        </div>
        <div>
          <p>Default Take Profit</p>
          <input 
            type="text" 
            value={settings.stopLossTakeProfit.defaultTakeProfit}
            onChange={(e) => handleInputChange('stopLossTakeProfit', 'defaultTakeProfit', e.target.value)}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white' 
            placeholder='----/----' 
          />
        </div>
      </div>

      <h1 className='text-xl mt-10'>Risk Controls:</h1>
      <div className='mt-5 flex justify-start gap-x-10 items-center overflow-x-auto'>
        <div>
          <p>Risk Percentage per Trade</p>
          <input 
            type="text" 
            value={settings.riskControls.riskPercentagePerTrade}
            onChange={(e) => handleInputChange('riskControls', 'riskPercentagePerTrade', e.target.value)}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white' 
            placeholder='-----/----' 
          />
        </div>
        <div>
          <p>Maximum Daily Loss Limit</p>
          <input 
            type="text" 
            value={settings.riskControls.maxDailyLossLimit}
            onChange={(e) => handleInputChange('riskControls', 'maxDailyLossLimit', e.target.value)}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white' 
            placeholder='----/----' 
          />
        </div>
        <div>
          <p>Risk Exposure Monitoring</p>
          <select
            value={settings.riskControls.riskExposureMonitoring}
            onChange={(e) => handleInputChange('riskControls', 'riskExposureMonitoring', e.target.value === 'true')}
            className='h-[3rem] rounded-md min-w-[12rem] outline-none px-3 bg-[#081F22] mt-2 text-white'
          >
            <option value="true">Enabled</option>
            <option value="false">Disabled</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleSave}
        disabled={loading}
        className='mt-6 w-[9rem] h-[3rem] rounded-md bg-[#135960] mb-6 hover:bg-[#0f4a4f] transition-colors disabled:opacity-50'
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};