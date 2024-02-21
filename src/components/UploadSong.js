import React, { useState } from "react";
import "./styles.css";

function UploadSongs() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [id, setId] = useState(0);

  const handleAddSong = () => {
    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = () => {
      const indexedDB = window.indexedDB;
      const request = indexedDB.open("songsDB", 1);

      request.onerror = function (event) {
        console.error("Error opening database:", event.target.error);
      };

      request.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("songs")) {
          db.createObjectStore("songs", { keyPath: "id" });
        }
      };

      request.onsuccess = function (event) {
        const db = event.target.result;
        const transaction = db.transaction(["songs"], "readwrite");

        transaction.onerror = function (event) {
          console.error("Transaction error:", event.target.error);
        };

        const store = transaction.objectStore("songs");
        const songName = selectedFile.name;
        setId(id + 1); // Increment the id
        store.add({ id: id, name: songName, value: reader.result });
      };
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="upload-container">
      <h3>Upload</h3>
      <div className="upload-subdiv">
        <div>
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          ></input>
        </div>
        <div className="upload-button">
          <button onClick={handleAddSong}>Add Song</button> <br />
        </div>
      </div>
    </div>
  );
}

export default UploadSongs;
