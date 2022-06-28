import React from 'react';
import Lottie from 'react-lottie-player';

const Animation = ({animation}: {animation: JSON}) => {
  return (
    <Lottie
      loop
      animationData={animation}
      play
      style={{ width: 50, height: 50 }}
    />
  );
};

export default Animation;
