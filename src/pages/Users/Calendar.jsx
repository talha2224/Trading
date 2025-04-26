import React, { useState, useEffect } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { FaComment } from 'react-icons/fa';
import { GoAlertFill } from "react-icons/go";
import { useSelector } from 'react-redux';

const Calendar = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = useSelector((state) => state.auth.user.id);
    const token = useSelector((state) => state.auth.token);

    const calendarEvents = [
        { date: 'mm/dd/yyyy', event: 'GBP Imports', impact: 'Low', speech: '54.3' },
        { date: 'mm/dd/yyyy', event: 'GBP Inflation Rate', impact: 'High', speech: '-0.3' },
        // ... other calendar events
    ];

    useEffect(() => {
        const fetchUserPosts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/media/user-posts/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) throw new Error('Failed to fetch user posts');
                
                const posts = await response.json();
                console.log(posts)
                setMyPosts(Array.isArray(posts) ? posts : posts?.posts || []);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        
        if (token && userId) {
            fetchUserPosts();
        }
    }, [token, userId]);

    return (
        <div className='flex justify-between items-start gap-x-3 flex-wrap p-5 rounded-md bg-[#04080F] z-50'>
            <div className='flex-1'>
                <p className='text-white font-bold text-xl'>Calendar</p>

                <div className='mt-10 bg-[#229FAA0D] p-5 rounded-md overflow-x-auto'>
                    <table className='w-full table-auto border-collapse'>
                        <thead>
                            <tr className='text-white'>
                                <th className='text-left px-4 py-2'>Date</th>
                                <th className='text-left px-4 py-2'>Event</th>
                                <th className='text-left px-4 py-2'>Impact</th>
                                <th className='text-left px-4 py-2'>Speech</th>
                                <th className='text-left px-4 py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {calendarEvents.map((event, index) => (
                                <tr key={index}>
                                    <td className='px-4 py-2 text-white'>{event.date}</td>
                                    <td className='px-4 py-2 text-white'>{event.event}</td>
                                    <td className={`px-4 py-2 ${event.impact === 'High' ? 'text-red-500' : event.impact === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                                        {event.impact}
                                    </td>
                                    <td className='px-4 py-2 text-white'>{event.speech}</td>
                                    <td className='px-4 py-2 text-white flex items-center gap-x-3'>
                                        <GoAlertFill />
                                        <p>Alert Me</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className='w-[35rem] min-w-[35rem] bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md mt-[4.2rem]'>
                <p className='text-white font-bold text-xl'>My Posts</p>
                
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#135960]"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                        <strong className="font-bold">Error! </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                ) : myPosts.length === 0 ? (
                    <p className="text-center py-10 text-gray-400">You haven't posted yet</p>
                ) : (
                    myPosts.map((post, index) => (
                        <div key={index} className='bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md mt-5'>
                            <div className='flex gap-x-5 items-start mt-5 lg:flex-nowrap flex-wrap'>
                                {post.media?.length > 0 && (
                                    <div>
                                        {post.media[0].mediaType === 'image' ? (
                                            <img 
                                                className='min-h-[5rem] min-w-[5rem] rounded-md object-cover' 
                                                src={post.media[0].url} 
                                                alt="Post media" 
                                            />
                                        ) : (
                                            <video 
                                                className='min-h-[5rem] min-w-[5rem] rounded-md object-cover'
                                                src={post.media[0].url}
                                                controls
                                            />
                                        )}
                                    </div>
                                )}
                                <div className='flex-1'>
                                    <p className='text-white font-medium'>{post.userId?.username || 'You'}</p>
                                    <p className='mt-1 text-white text-wrap'>{post.content}</p>
                                    <div className='flex items-center gap-4 mt-2 text-white'>
                                        <div className='flex items-center gap-1'>
                                            <AiFillLike />
                                            <span>{post.likes?.length || 0}</span>
                                        </div>
                                        <div className='flex items-center gap-1'>
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
        </div>
    );
};

export default Calendar;