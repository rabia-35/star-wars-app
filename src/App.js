import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "Components/pages/Home";
import Favourites from "Components/pages/Favourites";
import Detail from "Components/pages/Detail";
import Starships from "Components/pages/Starships/starships";
import "./App.css";
import Navbar from "Components/Navbar/navbar";

function App() {
  const mode = useSelector((state) => state.starships.mode);

  {
    /**** bgColor and color change according to mode start ****/
  }
  let bgColor = "";
  let color = "";
  if (!mode) {
    bgColor = "#00263d";
    color = "white";
  } else {
    bgColor = "#ffffff";
    color = "black";
  }

  {
    /**** bgColor and color change according to mode ending ****/
  }
  return (
    <Router>
      <div className="App" style={{ backgroundColor: bgColor, color: color }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/favourites/:number" element={<Favourites />} />
          <Route path="/starships/:name" element={<Detail />} />
          <Route exact path="/starships" element={<Starships />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
