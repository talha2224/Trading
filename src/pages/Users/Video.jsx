import React from 'react';
import { Link } from 'react-router-dom';
import Youtube from '../../assets/youtube.svg'
const Video = () => {

  return (
    <div className='bg-[#04080F] rounded-md p-5 w-full border border-[#229FAA0D]'>
      <div className='flex justify-between flex-wrap items-center'>
        <div className='flex items-center gap-x-3'>
          <Link to={"/user/membership"}>
            <button className='bg-[#135960] px-4 py-2 rounded-md text-white'>Go Back</button> {/* Added text color */}
          </Link>
          <p className='text-white text-xl'>Video</p>
        </div>
        <Link to={"/user/Video/video"}>
          <button className='bg-[#135960] px-4 py-2 rounded-md text-white'>Watch Video</button> {/* Added text color */}
        </Link>
      </div>

      <div className='bg-[#229FAA0D] rounded-md p-5 mt-10 overflow-x-auto flex justify-center items-center'>
        <img src={Youtube} alt="" />
      </div>
    </div>
  );
};

export default Video;