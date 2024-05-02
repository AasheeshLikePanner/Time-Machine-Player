import { useEffect, useState, useRef } from 'react';
import './App.css';
import {  Home, Navbar, Contribute, Player } from './components';
import wormhole from './assets/wormhole.mp4';
import { useSelector, useDispatch } from 'react-redux';
import { ContainerOpen, HomeOpen } from './store/VideoPlaySlice';


function App() {
  const [contributeOpen, setContributeOpen] = useState(true);
  const [homeOpen, setHomeOpen] = useState(true);
  const [playerOpen, setPlayerOpen] = useState(false); 

  const containerModelOPened =  useSelector((state) => state.videoplayer.ContainerOpend)
  const HomeModalOpened = useSelector((state) => state.videoplayer.HomeOpend)
  const videoPlay = useSelector((state) => state.videoplayer.flag);
  const backgroundVideo = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => { 
      setContributeOpen(containerModelOPened)
  },  [containerModelOPened])

  useEffect(() => { 
      setHomeOpen(HomeModalOpened)
  },  [HomeModalOpened])

  useEffect(() => {
    if (backgroundVideo.current) { 
      backgroundVideo.current.currentTime = 0;
      
      backgroundVideo.current.play();
      setPlayerOpen(false)
    }
  }, [videoPlay]);

  const handleContributeClose = () => {
    dispatch(ContainerOpen(false))
    setContributeOpen(false)

    dispatch(HomeOpen(false))
    setHomeOpen(false)

  }

  const OpenPlayer = () => {
    setPlayerOpen(true)
  }
  

  return (
    <div className='flex justify-center relative w-full h-full'>
      <Navbar/>
        <div className='fixed top-0 left-0 w-full h-full z-0'>
            <video onEnded={OpenPlayer} ref={backgroundVideo} onClick={handleContributeClose}>
              <source src={wormhole} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        </div>
        {contributeOpen && 
      <Contribute  onHide={handleContributeClose} isOpen={contributeOpen} ></Contribute>
    }
    {homeOpen && 
      <Home>
      </Home>
    }
    {playerOpen && <Player onClick={handleContributeClose}></Player>}
    </div>
  );
}

export default App;
