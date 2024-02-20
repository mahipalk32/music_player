import React, { useState } from "react";

function UploadSongs() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setId] = useState(0);
  const [ query, setQury] = useState('')

  const handleAddSong = () => {
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = () => {
      const indexedDB = window.indexedDB;
      const request = indexedDB.open("songsDB", 1);

      request.onerror = function (event) {
        console.log("An error occured");
        console.log(event);
      };

      request.onupgradeneeded = function () {
        const db = request.result;
        const store = db.createObjectStore("songs", { keyPath: "id" });
        store.createIndex("songs_url", ["value"]);
      };

      request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction("songs", "readwrite");

        const store = transaction.objectStore("songs");
        setId(id + 1);
        store.put({ id: id, value: reader.result });

        const songQuery = store.get(0);

        songQuery.onsuccess = function() {
            setQury(songQuery.result.value)

            console.log(query)
        }
      };
    };

    reader.readAsDataURL(selectedFile);
  };


  console.log("I am outer query :", query)

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
      ></input>
      <button onClick={handleAddSong}>Add Song</button> <br/>

      {/* <audio controls>
        <source src={query} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio> */}
    </div>
  );
}

export default UploadSongs;

// import React, { useState } from "react";

// function UploadSongs() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [audioSrc, setAudioSrc] = useState('');

//   const handleAddSong = () => {
//     if (!selectedFile) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const indexedDB = window.indexedDB;
//       const request = indexedDB.open("songsDB", 1);

//       request.onerror = function (event) {
//         console.error("Failed to open database:", event.target.error);
//       };

//       request.onupgradeneeded = function (event) {
//         const db = event.target.result;
//         const store = db.createObjectStore("songs", { keyPath: "id" });
//       };

//       request.onsuccess = function (event) {
//         const db = event.target.result;
//         const transaction = db.transaction("songs", "readwrite");

//         const store = transaction.objectStore("songs");
//         const newId = Date.now().toString(); // Use timestamp as ID
//         store.put({ id: newId, audio: reader.result });

//         transaction.oncomplete = function () {
//           setAudioSrc(reader.result);
//         };

//         transaction.onerror = function (event) {
//           console.error("Transaction error:", event.target.error);
//         };
//       };
//     };

//     reader.readAsDataURL(selectedFile);
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         onChange={(e) => setSelectedFile(e.target.files[0])}
//       ></input>
//       <button onClick={handleAddSong}>Add Song</button> <br/>

//       {audioSrc && (
//         <audio controls>
//           <source src={audioSrc} type="audio/mpeg" />
//           Your browser does not support the audio element.
//         </audio>
//       )}
//     </div>
//   );
// }

// export default UploadSongs;



