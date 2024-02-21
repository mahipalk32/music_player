import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="header-main">
      <div className="child1">MUSIC</div>
      <div className="child2">
        <label onClick={() => navigate("/")}>Upload</label>
        <label onClick={() => navigate("/playlist")}>Play List</label>
      </div>
    </div>
  );
}

export default Home;
