import React, { useEffect, useState, useMemo } from 'react';
import { BsThreeDotsVertical, BsSortDown, BsSortUp } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser } from '../redux/actions/adminauthAction';

const UserListing = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const { 
    users = [], 
    loading = false, 
    error = null 
  } = useSelector(state => state.adminAuth?.users || {});

  // Form state
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    DOB: '',
    Phoneno: '',
    Residence: ''
  });
  
  // UI state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ 
    key: 'createdAt', 
    direction: 'desc' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Fetch users on component mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Filter, sort and paginate users
  const processedUsers = useMemo(() => {
    // Filter with null checks
    let filtered = users.filter(user => {
      const username = user?.username?.toLowerCase() || '';
      const email = user?.email?.toLowerCase() || '';
      const search = searchTerm.toLowerCase();
      return username.includes(search) || email.includes(search);
    });
  
    // Sort with null checks
    filtered.sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  
    // Paginate
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filtered.slice(indexOfFirstUser, indexOfLastUser);
  }, [users, searchTerm, sortConfig, currentPage]);
    // Sort
   

    // Paginate
    

  const pageCount = Math.ceil(users.length / usersPerPage);

  // Handle user creation
  const handleAddUser = async () => {
    try {
      await dispatch(createUser(newUser));
      setShowAddUserModal(false);
      setNewUser({
        username: '', email: '', password: '', 
        DOB: '', Phoneno: '', Residence: ''
      });
      dispatch(fetchUsers());
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Handle sort
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Loading and error states
  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#229FAA]"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 p-4 bg-red-50 rounded-md">
      Error: {error}
    </div>
  );

  return (
    <div className='mt-[2rem]'>
      {/* Search and controls */}
      <div className='mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full h-[3rem] rounded-md outline-none px-4 bg-[#081F22] text-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => setShowAddUserModal(true)}
            className='h-[3rem] rounded-md px-6 bg-[#229FAA] hover:bg-[#1d8b94] transition-colors'
          >
            Add User
          </button>
        </div>
      </div>

      {/* Users table */}
      <div className='p-5 rounded-md w-[100%] mb-4 overflow-x-auto bg-[#0a1a1c]'>
        <div className='flex justify-between items-center min-w-[800px]'>
          <div 
            className='text-[#6E7975] flex-1 min-w-[10rem] mr-1 flex items-center cursor-pointer'
            onClick={() => requestSort('username')}
          >
            Username 
            {sortConfig.key === 'username' && (
              sortConfig.direction === 'asc' ? <BsSortUp className="ml-1" /> : <BsSortDown className="ml-1" />
            )}
          </div>
          <div 
            className='text-[#6E7975] flex-1 min-w-[10rem] mr-1 flex items-center cursor-pointer'
            onClick={() => requestSort('email')}
          >
            Email
            {sortConfig.key === 'email' && (
              sortConfig.direction === 'asc' ? <BsSortUp className="ml-1" /> : <BsSortDown className="ml-1" />
            )}
          </div>
          <div 
            className='text-[#6E7975] flex-1 min-w-[10rem] mr-1 flex items-center cursor-pointer'
            onClick={() => requestSort('createdAt')}
          >
            Registered
            {sortConfig.key === 'createdAt' && (
              sortConfig.direction === 'asc' ? <BsSortUp className="ml-1" /> : <BsSortDown className="ml-1" />
            )}
          </div>
          <div 
            className='text-[#6E7975] flex-1 min-w-[10rem] mr-1 flex items-center cursor-pointer'
            onClick={() => requestSort('lastSeen')}
          >
            Last Seen
            {sortConfig.key === 'lastSeen' && (
              sortConfig.direction === 'asc' ? <BsSortUp className="ml-1" /> : <BsSortDown className="ml-1" />
            )}
          </div>
          <div className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Status</div>
          <div className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Phone</div>
          <div className='text-[#6E7975] flex-1 min-w-[10rem] mr-1'>Actions</div>
        </div>
        
        {processedUsers.length > 0 ? (
          processedUsers.map(user => (
            <div 
              key={user._id} 
              className='flex justify-between items-center mt-4 pb-3 border-b border-[#1e2d30] min-w-[800px]'
            >
              <p className='flex-1 min-w-[10rem] mr-1 truncate' title={user.username}>
                {user.username}
              </p>
              <p className='flex-1 min-w-[10rem] mr-1 truncate' title={user.email}>
                {user.email}
              </p>
              <p className='flex-1 min-w-[10rem] mr-1 truncate'>
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
              <p className='flex-1 min-w-[10rem] mr-1 truncate'>
                {user.lastSeen ? new Date(user.lastSeen).toLocaleString() : 'Never'}
              </p>
              <div className='flex-1 min-w-[10rem] mr-1'>
                <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                  user.isOnline 
                    ? 'bg-green-900 text-green-300' 
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  {user.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <p className='flex-1 min-w-[10rem] mr-1 truncate' title={user.Phoneno}>
                {user.Phoneno}
              </p>
              <div className='flex-1 min-w-[10rem] mr-1'>
                <BsThreeDotsVertical 
                  className="cursor-pointer hover:text-[#229FAA] transition-colors" 
                  title="Actions"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-6 text-center text-gray-400">
            {searchTerm ? 'No matching users found' : 'No users available'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex gap-2">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-md flex items-center justify-center ${
                  currentPage === i + 1
                    ? 'bg-[#229FAA] text-white'
                    : 'bg-[#081F22] hover:bg-[#0e2a2e]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#081F22] p-6 rounded-lg w-full max-w-md border border-[#1e2d30]">
            <h2 className="text-xl mb-4 font-medium">Add New User</h2>
            
            <div className="space-y-4">
              {['username', 'email', 'password', 'DOB', 'Phoneno', 'Residence'].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-400 mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    placeholder={`Enter ${field}`}
                    className="w-full p-2 rounded bg-[#0a2a2e] border border-[#1e2d30] text-white"
                    value={newUser[field]}
                    onChange={(e) => setNewUser({...newUser, [field]: e.target.value})}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddUser}
                className="px-4 py-2 rounded bg-[#229FAA] hover:bg-[#1d8b94] transition-colors"
                disabled={!newUser.username || !newUser.email || !newUser.password}
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListing;