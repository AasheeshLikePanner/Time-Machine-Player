import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import { useState } from "react";
import service from "../../appwrite/conf";
import {Query} from 'appwrite'
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { infinity } from 'ldrs'


const YouTubePlayer = ( year ) => {
  infinity.register();

  const [Loading, setLoading] = useState(false);
  const [songList, setSongList] = useState([]);
  const [length, setLength] = useState(0);
  const [songPlaying, setIsPlaying] = useState(true);
  const [player, setPlayer] = useState(null);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
      getSongs();
  }, [year]);

  useEffect(() => {
      if (length > 0) {
          const randomIndex = Math.floor(Math.random() * length);
          const video = getYouTubeVideoId(songList[randomIndex]?.url);
          setVideoId(video);
      }
  }, [length, songList]);
  function getYouTubeVideoId(url) {
    const regExp = /[?&]v=([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);

    return match && match[1];

  }

  async function getSongs() {
    // setLoading(false); 
    try {
        const songs = await service.getSongs([Query.equal("year", Number(year.year))]);
        if (songs.documents.length > 0) {
            setSongList(songs.documents);
            setLength(songs.documents.length);
        } else {
        }
    } finally {
    }
    console.log(songList);
  }

  const handlePause = () => {
      if (player) {
          player.pauseVideo();
          setIsPlaying(false);
      }

  };

  const handlePlay = () => {
      if (player) {
          player.playVideo();
          setIsPlaying(true);
      }

  };

  const opts = {
      height: '1',
      width: '1',
      playerVars: {
          autoplay: 1,
      },
  };

  const onReady = event => {
      let playerLocal = event.target;
      setPlayer(playerLocal);
  };

  const handleEnd = () => {
      const randomIndex = Math.floor(Math.random() * length);
      const video = getYouTubeVideoId(songList[randomIndex]?.url);
      setVideoId(video);

  };

  const handleNext = () => {
      const randomIndex = Math.floor(Math.random() * length);
      const video = getYouTubeVideoId(songList[randomIndex]?.url);
      setVideoId(video);
  }

  return (
      <div className="bg-white backdrop-blur-sm text-black rounded-lg p-4 flex items-center justify-between">
          {songPlaying ? <button onClick={handlePause}> <PauseIcon /> </button> : <button onClick={handlePlay}> <PlayArrowRoundedIcon /> </button>}
          <button onClick={handleNext}>
              <ArrowForwardIosIcon  className="ml-3" sx={{ fontSize: 18 }} />
          </button>
          <YouTube onEnd={handleEnd} videoId={videoId} opts={opts} onReady={onReady} /> 
          {length===0 &&  <div className='backdrop-blur-sm bg-white rounded-lg fixed w-80 h-40 text-black -left-20 -top-20 shadow-lg'>
          <h1 className=' bg-white m-6 rounded-lg'>There is no collection of songs present in this year. You can contribute your songs in this year to make our library bigger!</h1></div>}
      </div>
  );
};

export default YouTubePlayer;
