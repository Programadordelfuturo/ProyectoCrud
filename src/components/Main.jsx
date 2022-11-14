import React from 'react';
import Video from '../assets/pexels-nicolaas-van-der-walt-5580688.mp4'

const Main = () => {
  return (
    <div className='main'>
      <video src={Video} autoPlay loop muted ></video>
    </div>
  );
};

export default Main;