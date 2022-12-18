import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "pages/Home";
import Favourites from "pages/Favourites";
import Detail from "pages/Detail";
import Starships from "pages/StarshipsList";
import "./App.css";
import Navbar from "components/Navbar";
import Page404 from "pages/Page404";
import Footer from "components/Footer";

function App() {
  const mode = useSelector((state) => state.starships.mode);
  const page = useSelector((state) => state.starships.page);
  const [position, setPosition] = useState(false);
  let bgColor = "";
  let color = "";
  if (!mode) {
    bgColor = "#00263d";
    color = "white";
  } else {
    bgColor = "#ffffff";
    color = "black";
  }
  console.log(page);
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

        {page > 1 && (
          <>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
