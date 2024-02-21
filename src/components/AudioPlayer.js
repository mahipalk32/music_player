import React, { useState, useEffect, useRef } from 'react';

const AudioPlayer = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    // Retrieve audio files from local storage if available
    const storedAudioFiles = JSON.parse(localStorage.getItem('audioFiles'));
    if (storedAudioFiles) {
      setAudioFiles(storedAudioFiles);
    }
    // Retrieve last played track index from local storage
    const lastPlayedIndex = localStorage.getItem('lastPlayedIndex');
    if (lastPlayedIndex !== null && lastPlayedIndex !== undefined) {
      setCurrentTrackIndex(parseInt(lastPlayedIndex));
      setIsPlaying(true);
    }
  }, []);

  useEffect(() => {
    // Save audio files to local storage whenever the state changes
    localStorage.setItem('audioFiles', JSON.stringify(audioFiles));
  }, [audioFiles]);

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch((error) => console.error('Error playing audio:', error));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Update the audio source whenever the current track index changes
    const audio = audioRef.current;
    if (audioFiles.length > 0) {
      audio.src = URL.createObjectURL(audioFiles[currentTrackIndex]);
      audio.load();
    }
  }, [currentTrackIndex, audioFiles]);

  const handleEnded = () => {
    // Play the next track when the current track ends
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const handlePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const handleFileChange = (e) => {
    // Add uploaded audio files to the playlist
    const files = Array.from(e.target.files);
    setAudioFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const saveLastPlayedIndex = () => {
    // Save the last played track index to local storage
    localStorage.setItem('lastPlayedIndex', currentTrackIndex);
  };

  return (
    <div>
      <input type="file" accept="audio/*" multiple onChange={handleFileChange} />
      {audioFiles.length > 0 && (
        <>
          <audio
            ref={audioRef}
            controls
            onEnded={handleEnded}
            onPlay={saveLastPlayedIndex}
            onPause={saveLastPlayedIndex}
          >
            <source src="" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <ul>
            {audioFiles.map((file, index) => (
              <li key={index}>
                <button onClick={() => setCurrentTrackIndex(index)}>
                  {`Track ${index + 1}`}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
};

export default AudioPlayer;
