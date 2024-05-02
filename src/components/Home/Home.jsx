import React, { useEffect, useState } from "react";

export default function Home(){

    const [title, setTitle] = useState('Enter the year');

    const t = document.title;

    useEffect(()=>{
        setTitle(t)
    },[t])


    return(
        <div className="z-10 fixed mt-72 bg-white max-w-xs rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                
                <div className="font-bold text-xl mb-2"><span className="text-red-500">{title}</span></div>
                <p className="text-gray-700 text-base">
                        This is a small project I've created. With it, you can listen to older 
                        songs by traveling back in time and discover future 
                        hits by moving forward. Additionally, you can contribute 
                        songs to expand our collection and make it more comprehensive 
                        for each year.
                </p>
            </div>
            <div className="px-6 py-4">
                <a href="#" className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">Github</a>
            </div>

        
        </div>

    )
}