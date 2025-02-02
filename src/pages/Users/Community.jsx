import React from 'react'
import { FaImage, FaVideo, FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

const Community = () => {
    return (
        <div className='flex justify-between items-start gap-x-5 bg-[#04080F] rounded-md p-5 w-full border border-[#229FAA0D] flex-wrap'>

            <div className='flex-1'>
                <p>Community</p>

                <div className='bg-[#229FAA0D] mt-3 bg-opacity-30 p-5 rounded-md'>
                    <h1>Create Post</h1>
                    <input type="text" className='w-[100%] h-[3rem] bg-[#04080F] px-4 mt-3 rounded-md' placeholder='Type Here...' />
                    <div className='flex justify-between items-center mt-5 flex-wrap'>
                        <div className='flex items-center gap-x-6 mt-2 flex-wrap'>
                            <div className='flex items-center gap-x-3 mt-2'>
                                <p>Images</p>
                                <FaImage />
                            </div>
                            <div className='flex items-center gap-x-3 mt-2'>
                                <p>Video</p>
                                <FaVideo />
                            </div>
                        </div>
                        <button className='bg-[#135960] px-4 py-3 rounded-md mt-2'>Post</button>
                    </div>
                </div>


                {
                    [1, 2, 3, 4, 5, 6, 7].map((i, index) => (
                        <div key={index} className='bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md mt-5'>
                            <div className='flex gap-x-5 items-start mt-5 lg:flex-nowrap flex-wrap'>
                                <div>
                                    <img className='rounded-full min-w-[4rem] min-h-[4rem] max-w-[4rem] max-h-[4rem]' src="https://static.vecteezy.com/system/resources/thumbnails/036/442/721/small_2x/ai-generated-portrait-of-a-young-man-no-facial-expression-facing-the-camera-isolated-white-background-ai-generative-photo.jpg" alt="" />
                                </div>
                                <div className=''>
                                    <p>Johnas John</p>
                                    <p className='mt-1'>5min ago</p>
                                    <p className='mt-2'>Forex Trading</p>
                                    <p className='mt-2 text-sm'>Lorem ipsum dolor sit amet consectetur. Velit malesuada odio risus amet in eget sit quam. Pharetra mi ut mauris auctor. Purus consectetur at tortor etiam tempor q</p>
                                    <div className='flex items-center gap-x-6 mt-2 flex-wrap'>
                                        <div className='flex items-center gap-x-3 mt-2'>
                                            <p>Like</p>
                                            <AiFillLike />
                                        </div>
                                        <div className='flex items-center gap-x-3 mt-2'>
                                            <p>Comment</p>
                                            <FaComment />
                                        </div>
                                    </div>
                                </div>
                                {/* <button className='bg-[#135960] px-4 py-3 rounded-md mt-2'>Post</button> */}
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className='w-[25rem] min-w-[25rem] bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md'>
                <p>My Posts</p>
                {
                    [1, 2, 3, 4, 5, 6, 7].map((i, index) => (
                        <div key={index} className='bg-[#229FAA0D] bg-opacity-30 p-5 rounded-md mt-5'>
                            <div className='flex gap-x-5 items-start mt-5 lg:flex-nowrap flex-wrap'>
                                <div>
                                    <img className='rounded-full min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem]' src="https://static.vecteezy.com/system/resources/thumbnails/036/442/721/small_2x/ai-generated-portrait-of-a-young-man-no-facial-expression-facing-the-camera-isolated-white-background-ai-generative-photo.jpg" alt="" />
                                </div>
                                <div className=''>
                                    <p>Johnas John</p>
                                    <p className='mt-1'>5min ago</p>
                                    <p className='mt-2'>Forex Trading</p>
                                    <p className='mt-2 text-sm'>Lorem ipsum dolor sit amet consectetur. Velit malesuada odio risus amet in eget sit quam. Pharetra mi ut mauris auctor. Purus consectetur at tortor etiam tempor q</p>
                                    <div className='flex items-center gap-x-6 mt-2 flex-wrap'>
                                        <div className='flex items-center gap-x-3 mt-2'>
                                            <p>Like</p>
                                            <AiFillLike />
                                        </div>
                                        <div className='flex items-center gap-x-3 mt-2'>
                                            <p>Comment</p>
                                            <FaComment />
                                        </div>
                                    </div>
                                </div>
                                {/* <button className='bg-[#135960] px-4 py-3 rounded-md mt-2'>Post</button> */}
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Community