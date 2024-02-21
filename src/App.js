import React from "react";
import UploadSong from "./components/UploadSong";
import PlayList from "./components/PlayList";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Home />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<UploadSong />} />
          <Route path="/playlist" element={<PlayList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
