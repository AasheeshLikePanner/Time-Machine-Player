import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux'
import { play, ContainerOpen, HomeOpen, setyear } from "../../store/VideoPlaySlice";
import service from "../../appwrite/conf";
import {Query} from 'appwrite'

// import { open } from "../../store/ContainerSlice";

export default function Navbar() {
    const [year, setYear] = useState(2003);
    const [leftPos, setleftPos] = useState(3);
    const dispacth = useDispatch()
    const p = useSelector((state) => state.videoplayer.flag);
    const containerModelOpen = useSelector((state) => state.videoplayer.ContainerOpend);

    const sumbitTheYear =async (e) => {
        e.preventDefault();
        console.log('working');
        dispacth(setyear(year))
        dispacth(play(!p));
        document.title = year + ' Player';
    };

    function getYouTubeVideoId(url) {
        const regExp = /[?&]v=([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        return match && match[1];
    }

    useEffect(() => {
        const onMouseMove = (e) => {
            setleftPos(Math.min(600, Math.max(e.clientX - 680, -100)));
        };
        document.addEventListener('mousemove', onMouseMove);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    const handleContribute = () => {
        console.log('I am inside the Contribute block')
        dispacth(ContainerOpen(true))
        dispacth(HomeOpen(false))

    }
    const closeContribute = () => {
        dispacth(ContainerOpen(false))
        dispacth(HomeOpen(false))

    }

    const handleHome = ()=>{
        console.log('I am inside the Home block')
        dispacth(ContainerOpen(false))
        dispacth(HomeOpen(true))
    }

    return (
        <nav className="ml-20 overflow-hidden h-12 w-1/2 bg-white-800 rounded-lg backdrop-blur-sm shadow-xl flex p-3 z-20 text-lg">

            <button onClick={handleHome} className="z-21 text-white mx-10 hover:line-through hover:font-bold">HOME</button>
            <button onClick={handleContribute}  className="z-21 text-white mr-20 hover:line-through hover:font-bold">CONTRIBUTE</button>
            <form className="z-21" onSubmit={sumbitTheYear}>
                <input onClick={closeContribute} onChange={(e) => { setYear(e.target.value) }}
                    type="search" placeholder="Type year"
                    className="text-lg z-21 h-4 rounded-lg p-3 text-white  bg-black focus:outline-none"/>
            </form>
        </nav>
  


    );
}
