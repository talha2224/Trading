import React, { useState, useEffect } from 'react';
import { FaImage, FaVideo, FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [content, setContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = useSelector((state) => state.auth.user.id);
  const token = useSelector((state) => state.auth.token);

 

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const headers = {
          'Authorization': `Bearer ${token}`
        };
            

        console.log(token)
        console.log(userId)
        const [allPostsRes, userPostsRes] = await Promise.all([
          fetch('http://localhost:5000/api/media', { headers }),
          fetch(`http://localhost:5000/api/media/user-posts/${userId}`, { headers })
        ]);
        
        if (!allPostsRes.ok) throw new Error('Failed to fetch posts');
        if (!userPostsRes.ok) throw new Error('Failed to fetch user posts');
        
        const allPosts = await allPostsRes.json();
        const userPosts = await userPostsRes.json();
        
        setPosts(Array.isArray(allPosts) ? allPosts : allPosts?.posts || []);
        setMyPosts(Array.isArray(userPosts) ? userPosts : userPosts?.posts || []);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (token) {
      fetchPosts();
    }
  }, [token, userId]);

  // ... other existing functions ...
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim() && selectedFiles.length === 0) {
      setError('Please add content or media to post');
      return;
    }
  
    // Validate files before upload
    if (selectedFiles.length > 0) {
      const invalidFiles = selectedFiles.some(file => {
        if (!file.type || file.size === 0) {
          return true;
        }
        return !file.type.startsWith('image/') && !file.type.startsWith('video/');
      });
  
      if (invalidFiles) {
        setError('Invalid files detected. Please check your uploads.');
        return;
      }
    }
  
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('content', content);
    
    // Append files with proper validation
    selectedFiles.forEach(file => {
      if (file && file.size > 0) {  // Ensure file exists and isn't empty
        formData.append('media', file, file.name);  // Include filename
      }
    });
  
    try {
      const response = await fetch('http://localhost:5000/api/media', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
          // Don't set Content-Type header - let browser set it with boundary
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || errorData.error || 'Failed to create post');
      }
      
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setMyPosts(prev => [newPost, ...prev]);
      setContent('');
      setSelectedFiles([]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error creating post:', err);
    }
  };
  


  const handleLike = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/media/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ userId }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to like post');
      }
      
      const updatedPost = await response.json();
      setPosts(posts.map(post => post._id === postId ? updatedPost : post));
      setMyPosts(myPosts.map(post => post._id === postId ? updatedPost : post));
    } catch (err) {
      setError(err.message);
      console.error('Error liking post:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#135960]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className='flex flex-col lg:flex-row justify-between items-start gap-5 bg-[#04080F] rounded-md p-5 w-full border border-[#229FAA0D]'>
      {/* Main Content */}
      <div className='w-full lg:flex-1'>
        <h2 className='text-xl font-semibold mb-3'>Community</h2>

        {/* Create Post */}
        <div className='bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md mb-5'>
          <h3 className='text-lg font-medium mb-3'>Create Post</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              className='w-full h-12 bg-[#04080F] px-4 mb-3 rounded-md border border-[#229FAA0D] focus:outline-none focus:ring-1 focus:ring-[#135960]' 
              placeholder='Type Here...' 
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className='flex flex-col sm:flex-row justify-between items-center gap-3'>
              <div className='flex items-center gap-4 flex-wrap'>
                <label className='flex items-center gap-2 cursor-pointer hover:text-[#135960] transition'>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span>Images</span>
                  <FaImage />
                </label>
                <label className='flex items-center gap-2 cursor-pointer hover:text-[#135960] transition'>
                  <input 
                    type="file" 
                    accept="video/*" 
                    multiple 
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <span>Video</span>
                  <FaVideo />
                </label>
                {selectedFiles.length > 0 && (
                  <span className="text-sm text-gray-400">
                    {selectedFiles.length} file(s) selected
                  </span>
                )}
              </div>
              <button 
                type="submit" 
                className='bg-[#135960] hover:bg-[#0e454a] px-4 py-2 rounded-md transition w-full sm:w-auto'
              >
                Post
              </button>
            </div>
          </form>
        </div>

        {/* All Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p>No posts yet. Be the first to post!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className='bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md mb-5'>
              <div className='flex flex-col sm:flex-row gap-5 items-start'>
                <div className="flex-shrink-0">
                  <img 
                    className='rounded-full w-16 h-16 object-cover' 
                    src={post.userId?.profilePicture || 'https://static.vecteezy.com/system/resources/thumbnails/036/442/721/small_2x/ai-generated-portrait-of-a-young-man-no-facial-expression-facing-the-camera-isolated-white-background-ai-generative-photo.jpg'} 
                    alt={post.userId?.username || 'User'} 
                  />
                </div>
                <div className='flex-1'>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <p className='font-medium'>{post.userId?.username || 'Unknown User'}</p>
                    <span className="hidden sm:block">•</span>
                    <p className='text-sm text-gray-400'>{formatTimeAgo(new Date(post.createdAt))}</p>
                  </div>
                  <p className='mt-2 mb-3'>{post.content}</p>
                  {post.media?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      {post.media.map((media, index) => (
                        media.mediaType === 'image' ? (
                          <img 
                            key={index} 
                            src={media.url} 
                            alt="" 
                            className="w-full h-auto rounded-md object-cover max-h-96" 
                          />
                        ) : (
                          <video 
                            key={index} 
                            src={media.url} 
                            controls 
                            className="w-full h-auto rounded-md max-h-96"
                          />
                        )
                      ))}
                    </div>
                  )}
                  <div className='flex items-center gap-4 mt-3'>
                    <button 
                      className='flex items-center gap-2 hover:text-[#135960] transition'
                      onClick={() => handleLike(post._id)}
                    >
                      <AiFillLike />
                      <span>{post.likes?.length || 0}</span>
                    </button>
                    <div className='flex items-center gap-2'>
                      <FaComment />
                      <span>{post.comments?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sidebar - My Posts */}
      <div className='w-full lg:w-80 xl:w-96 bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md lg:sticky lg:top-5'>
        <h3 className='text-lg font-medium mb-3'>My Posts</h3>
        {myPosts.length === 0 ? (
          <p className="text-center py-5 text-gray-400">You haven't posted yet</p>
        ) : (
          myPosts.map((post) => (
            <div key={post._id} className='bg-[#229FAA0D] bg-opacity-30 p-4 rounded-md mb-3'>
              <div className='flex gap-3 items-start'>
                <div className="flex-shrink-0">
                  <img 
                    className='rounded-full w-10 h-10 object-cover' 
                    src={post.userId?.profilePicture || 'https://static.vecteezy.com/system/resources/thumbnails/036/442/721/small_2x/ai-generated-portrait-of-a-young-man-no-facial-expression-facing-the-camera-isolated-white-background-ai-generative-photo.jpg'} 
                    alt={post.userId?.username || 'User'} 
                  />
                </div>
                <div className='flex-1'>
                  <p className='text-sm font-medium'>{post.userId?.username || 'You'}</p>
                  <p className='text-xs text-gray-400 mb-1'>{formatTimeAgo(new Date(post.createdAt))}</p>
                  <p className='text-sm line-clamp-2'>{post.content}</p>
                  <div className='flex items-center gap-3 mt-2 text-xs'>
                    <span className='flex items-center gap-1'>
                      <AiFillLike size={12} />
                      {post.likes?.length || 0}
                    </span>
                    <span className='flex items-center gap-1'>
                      <FaComment size={12} />
                      {post.comments?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Helper function to format time
function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return interval === 1 ? `${interval} ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }
  
  return 'Just now';
}

export default Community;