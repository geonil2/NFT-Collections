import React from 'react';
import Lottie from 'react-lottie-player';

const Ani = ({animation}: {animation: object}) => {
  return (
    <Lottie
      loop
      animationData={animation}
      play
      style={{ width: 50, height: 50 }}
    />
  );
};

export default Ani;
