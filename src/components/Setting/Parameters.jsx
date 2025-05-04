import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, Spin, notification } from 'antd';
import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';

export const Parameters = () => {
  const [settings, setSettings] = useState({
    tradeSizeLimits: { minimum: '', maximum: '' },
    leverageMarginSettings: { minLeverage: '', maxLeverage: '', marginRequirement: '' },
    tradingHours: { regular: '', extended: '', marketHolidays: '' }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Ant Design notification setup
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message, description) => {
    api[type]({
      message,
      description,
      placement: 'topRight',
      duration: 3,
    });
  };

  // Fetch current settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tradingsetting');
        if (response.data) {
          setSettings(response.data);
        }
      } catch (error) {
        openNotification('error', 'Error', 'Failed to load trading settings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let checkResponse;
      try {
        checkResponse = await axios.get('http://localhost:5000/api/tradingsetting');
      } catch (error) {
        // If 404 error, it means no settings exist
        if (error.response && error.response.status === 404) {
          checkResponse = { data: null };
        } else {
          throw error;
        }
      }
  
      const payload = {
        minimumTradeSize: settings.tradeSizeLimits.minimum,
        maximumTradeSize: settings.tradeSizeLimits.maximum,
        minLeverage: settings.leverageMarginSettings.minLeverage,
        maxLeverage: settings.leverageMarginSettings.maxLeverage,
        marginRequirement: settings.leverageMarginSettings.marginRequirement,
        regularTradingHours: settings.tradingHours.regular,
        extendedTradingHours: settings.tradingHours.extended,
        marketHolidays: settings.tradingHours.marketHolidays
      };
  
      if (checkResponse.data) {
        await axios.patch('http://localhost:5000/api/tradingsetting/tradingparameterupdate', payload);
      } else {
        await axios.post('http://localhost:5000/api/tradingsetting/tradingparameter', payload);
      }
      
      openNotification('success', 'Success', 'Trading settings saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      openNotification('error', 'Error', error.response?.data?.message || 'Failed to save trading settings');
    } finally {
      setSaving(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }

  return (
    <div className='mt-[2rem]'>
      {contextHolder}
      
      <h1 className='text-xl font-semibold'>Trade Size Limits:</h1>
      <div className='mt-6 flex flex-wrap gap-6'>
        <div className='flex-1 min-w-[200px]'>
          <p className='mb-2 text-gray-600'>Minimum Trade Size</p>
          <Input
            value={settings.tradeSizeLimits.minimum}
            onChange={(e) => handleInputChange('tradeSizeLimits', 'minimum', e.target.value)}
            size="large"
            className='w-full bg-black text-white border-gray-600 hover:bg-black hover:border-blue-500 focus:bg-black focus:border-blue-500'
          />
        </div>
        <div className='flex-1 min-w-[200px]'>
          <p className='mb-2 text-gray-600'>Maximum Trade Size</p>
          <Input
            value={settings.tradeSizeLimits.maximum}
            onChange={(e) => handleInputChange('tradeSizeLimits', 'maximum', e.target.value)}
            size="large"
            className='w-full bg-black text-white border-gray-600 hover:bg-black hover:border-blue-500 focus:bg-black focus:border-blue-500'
          />
        </div>
      </div>

      <h1 className='text-xl font-semibold mt-8'>Leverage/Margin Settings:</h1>
      <div className='mt-6 flex flex-wrap gap-6'>
        <div className='flex-1 min-w-[200px]'>
          <p className='mb-2 text-gray-600'>Min Leverage</p>
          <Input
            value={settings.leverageMarginSettings.minLeverage}
            onChange={(e) => handleInputChange('leverageMarginSettings', 'minLeverage', e.target.value)}
            size="large"
            placeholder="1/100"
            className='w-full bg-black text-white border-gray-600 hover:bg-black hover:border-blue-500 focus:bg-black focus:border-blue-500'
          />
        </div>
        <div className='flex-1 min-w-[200px]'>
          <p className='mb-2 text-gray-600'>Max Leverage</p>
          <Input
            value={settings.leverageMarginSettings.maxLeverage}
            onChange={(e) => handleInputChange('leverageMarginSettings', 'maxLeverage', e.target.value)}
            size="large"
            placeholder="1/100"
            className='w-full bg-black text-white border-gray-600 hover:bg-black hover:border-blue-500 focus:bg-black focus:border-blue-500'
          />
        </div>
        <div className='flex-1 min-w-[200px]'>
          <p className='mb-2 text-gray-600'>Margin Requirement</p>
          <Input
            value={settings.leverageMarginSettings.marginRequirement}
            onChange={(e) => handleInputChange('leverageMarginSettings', 'marginRequirement', e.target.value)}
            size="large"
            placeholder="5%"
            className='w-full bg-black text-white border-gray-600 hover:bg-black hover:border-blue-500 focus:bg-black focus:border-blue-500'
          />
        </div>
      </div>

      <h1 className='text-xl font-semibold mt-8'>Trading Hours:</h1>
      <div className='mt-6 flex flex-wrap gap-6'>
        <div className='flex-1 min-w-[200px]'>
          <p className='mb-2 text-gray-600'>Regular Trading Hours</p>
          <Input
            value={settings.tradingHours.regular}
            onChange={(e) => handleInputChange('tradingHours', 'regular', e.target.value)}
            size="large"
            placeholder="9:30 AM - 4:00 PM EST"
            className='w-full bg-black text-white border-gray-600 hover:bg-black hover:border-blue-500 focus:bg-black focus:border-blue-500'
          />
        </div>
        <div className='flex-1 min-w-[200px]'>
          <p className='mb-2 text-gray-600'>Extended Trading Hours</p>
          <Input
            value={settings.tradingHours.extended}
            onChange={(e) => handleInputChange('tradingHours', 'extended', e.target.value)}
            size="large"
            placeholder="4:00 PM - 8:00 PM EST"
            className='w-full bg-black text-white border-gray-600 hover:bg-black hover:border-blue-500 focus:bg-black focus:border-blue-500'
          />
        </div>
        <div className='flex-1 min-w-[200px]'>
          <p className='mb-2 text-gray-600'>Market Holidays</p>
          <Input
            value={settings.tradingHours.marketHolidays}
            onChange={(e) => handleInputChange('tradingHours', 'marketHolidays', e.target.value)}
            size="large"
            placeholder="YYYY-MM-DD, YYYY-MM-DD"
            className='w-full bg-black text-white border-gray-600 hover:bg-black hover:border-blue-500 focus:bg-black focus:border-blue-500'
          />
        </div>
      </div>

      <div className='mt-8'>
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
          loading={saving}
          size="large"
          className='bg-[#135960] hover:bg-[#0f4a4f] h-12 w-32'
        >
          {saving ? 'Saving' : 'Save'}
        </Button>
      </div>
    </div>
  );
};