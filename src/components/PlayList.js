import React, { useState, useRef, useEffect } from "react";
import { MdSkipNext } from "react-icons/md";
import { MdSkipPrevious } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";
import { MdOutlinePause } from "react-icons/md";
import "./styles.css";
import music from "../music.jpg";

const AudioPlayer = () => {
  const [songList, setSongList] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const indexedDB = window.indexedDB;
      const request = indexedDB.open("songsDB", 1);

      request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
      };

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("songs")) {
          db.createObjectStore("songs", { keyPath: "id" });
        }}
  }, [])

  useEffect(() => {
    function getAllSongs() {
      const indexedDB = window.indexedDB;
      const request = indexedDB.open("songsDB", 1);

      request.onerror = function (event) {
        console.error(
          "An error occurred while opening the database:",
          event.target.error
        );
      };

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction("songs", "readwrite");
        const store = transaction.objectStore("songs");

        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = function (event) {
          setSongList(event.target.result);
        };

        getAllRequest.onerror = function (err) {
          console.error(`Error getting all songs: ${err}`);
        };
      };

      request.onerror = (err) => {
        console.error(`Error opening database: ${err}`);
      };
    }

    getAllSongs();
  }, []);

  useEffect(() => {
    const handleEnded = () => {
      if (currentTrackIndex === songList.length - 1) {
        setIsPlaying(false);
      } else {
        setCurrentTrackIndex((prevIndex) => prevIndex + 1);
      }
    };

    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.addEventListener("ended", handleEnded);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentTrackIndex, isPlaying, songList]);

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!currentAudio) return;

    if (isPlaying) {
      currentAudio.load();
      currentAudio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    } else {
      currentAudio.pause();
    }
  }, [currentTrackIndex, isPlaying]);

  const play = (index) => {
    if (index === currentTrackIndex && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      localStorage.setItem("lastPlayed", index);
    }
  };

  const next = (index) => {
    if (index < songList.length) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      localStorage.setItem("lastPlayed", index);
    }

    if (index === songList.length) {
      setCurrentTrackIndex(index - 1);
      setIsPlaying(true);
      localStorage.setItem("lastPlayed", index - 1);
    }
  };

  const last = (index) => {
    if (index === -1) {
      setCurrentTrackIndex(index + 1);
      setIsPlaying(true);
      localStorage.setItem("lastPlayed", index + 1);
    }

    if (index >= 0) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
      localStorage.setItem("lastPlayed", index);
    }
  };

  useEffect(() => {
    const lastPlayedIndex = localStorage.getItem("lastPlayed");
    if (lastPlayedIndex === null || lastPlayedIndex === undefined) {
      localStorage.setItem("lastPlayed", -1);
    } else {
      setCurrentTrackIndex(lastPlayedIndex);
      setIsPlaying(true);
    }
  }, []);

  const currentSong = songList[currentTrackIndex] || {};

  return (
    <div className="audio-player-container">
      {songList.length > 0 && (
        <>
          <div className="audio-player-content">
            <h3>Current Playing</h3>
            <div className="label-div">
              <label style={{ display: "flex", justifyContent: "center" }}>
                {currentSong.name}
              </label>
            </div>
            <div>
              <img src={music} alt="music" />
            </div>
            <div>
              <audio ref={audioRef} controls>
                <source src={currentSong.value} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
          <div className="song-list">
            <h3>Play List</h3>
            <div>
              {songList.map((song, index) => (
                <div key={song.id} className="song-div">
                  <div className="label-div">
                    <label>{song.name}</label>
                  </div>
                  <div className="buttons-div">
                    <button onClick={() => last(index - 1)}>
                      <MdSkipPrevious />
                    </button>
                    <button onClick={() => play(index)}>
                      {isPlaying && currentTrackIndex === index ? (
                        <MdOutlinePause />
                      ) : (
                        <IoIosPlay />
                      )}
                    </button>
                    <button onClick={() => next(index + 1)}>
                      <MdSkipNext />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
