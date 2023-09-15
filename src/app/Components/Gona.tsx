import React, { useRef, useEffect } from 'react';

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioRef }) => {


  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <audio ref={audioRef} controls className="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
