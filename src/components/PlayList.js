// import React, { useEffect, useState } from "react";

// function PlayList() {
//   const [songList, setSongList] = useState([]);

//   useEffect(() => {
//     function getAllSongs() {
//       const indexedDB = window.indexedDB;
//       const request = indexedDB.open("songsDB", 1);

//       request.onerror = function (event) {
//         console.log("An error occured");
//         console.log(event);
//       };

//       request.onsuccess = () => {
//         const db = request.result;
//         const transaction = db.transaction("songs", "readwrite");
//         const store = transaction.objectStore("songs");

//         const list = store.getAll();
//         setSongList(list);
//       };

//       request.onerror = (err) => {
//         console.error(`Error to get all students: ${err}`);
//       };
//     }

//     getAllSongs();
//     console.log("I am outer result", songList.result);
//   }, []);

//   return (
//     <div>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {songList.result.map((song, index) => (
//           <li key={index}>
//             <audio controls>
//               <source src={song.value} type="audio/mpeg" />
//               Your browser does not support the audio element.
//             </audio>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default PlayList;

// import React, { useEffect, useState } from "react";

// function PlayList() {
//   const [songList, setSongList] = useState([]);

//   useEffect(() => {
//     function getAllSongs() {
//       const indexedDB = window.indexedDB;
//       const request = indexedDB.open("songsDB", 1);

//       request.onerror = function (event) {
//         console.error(
//           "An error occurred while opening the database:",
//           event.target.error
//         );
//       };

//       request.onsuccess = () => {
//         const db = request.result;
//         const transaction = db.transaction("songs", "readwrite");
//         const store = transaction.objectStore("songs");

//         const getAllRequest = store.getAll();

//         getAllRequest.onsuccess = function (event) {
//           setSongList(event.target.result);
//         };

//         getAllRequest.onerror = function (err) {
//           console.error(`Error getting all songs: ${err}`);
//         };
//       };

//       request.onerror = (err) => {
//         console.error(`Error opening database: ${err}`);
//       };
//     }

//     getAllSongs();
//   }, []);

//   console.log(songList);

//   return (
//     <div
//       style={{
//         position: "absolute",
//         left: "25%",
//         right: "25%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop:"50px"
//       }}
//     >
//       <div style={{width:"75%"}}>
//         <h2 style={{textAlign:"center", marginBottom:"20px"}}>Playlist</h2>
//         <ul style={{ listStyleType: "none", padding: 0 }}>
//           {songList.map((song, index) => (
//             <li key={index}>
//               <audio controls style={{width:"100%"}}>
//                 <source src={song.value} type="audio/mpeg" />
//                 Your browser does not support the audio element.
//               </audio>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default PlayList;


import React, { useEffect, useState } from "react";

function PlayList() {
  const [songList, setSongList] = useState([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

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

  const playAudio = (src) => {
    const audioElement = new Audio(src);
    audioElement.play();
    setCurrentlyPlaying(audioElement);
  };

  const stopCurrentlyPlaying = () => {
    if (currentlyPlaying) {
      currentlyPlaying.pause();
      setCurrentlyPlaying(null);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "25%",
        right: "25%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop:"50px"
      }}
    >
      <div style={{width:"75%"}}>
        <h2 style={{textAlign:"center", marginBottom:"20px"}}>Playlist</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {songList.map((song, index) => (
            <li key={index}>
              <button onClick={() => {
                stopCurrentlyPlaying();
                playAudio(song.value);
              }}>Play</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PlayList;
