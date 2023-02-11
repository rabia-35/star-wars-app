import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import AppRouter from "routes";

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
        <AppRouter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
