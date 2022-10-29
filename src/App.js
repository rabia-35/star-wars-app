import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "pages/Home";
import Favourites from "pages/Favourites";
import Detail from "pages/Detail";
import Starships from "pages/StarshipsList";
import "./App.css";
import Navbar from "components/Navbar";
import Page404 from "pages/Page404";

function App() {
  const mode = useSelector((state) => state.starships.mode);

  let bgColor = "";
  let color = "";
  if (!mode) {
    bgColor = "#00263d";
    color = "white";
  } else {
    bgColor = "#ffffff";
    color = "black";
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
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
