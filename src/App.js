import React from "react";
import UploadSong from "./components/UploadSong";
import PlayList from "./components/PlayList";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Home />
      {/* <UploadSong /> */}
      <PlayList />
    </div>
  );
}

export default App;
