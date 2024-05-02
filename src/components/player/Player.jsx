import React, { useState } from "react";
import cassets from '../../assets/cassets.mp4'
import { useSelector } from 'react-redux';


import YouTubePlayer from "./YoutubePlayer";


export default function Player(){
    
        
    const year = useSelector((state) => state.videoplayer.year)

    return(
        <div className="backdrop-blur-sm fixed h-2/4 w-1/2 m-40 bg-white z-1">
            <div className="relative h-full">
                <div className=" absolute inset-0 flex justify-center rounded-sm bg-white">
                    {/* playsInline */}
                    <video className="object-cover h-full w-full" autoPlay loop muted >
                        <source src={cassets} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
                
            <div className="absolute top-80 left-0 right-0 bottom-0 flex justify-center items-center">
                <YouTubePlayer year={year} />
            </div>
        </div>
    )
}