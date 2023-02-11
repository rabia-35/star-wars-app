import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modeChange,backStarships } from "redux/StarWarsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const mode = useSelector((state) => state.starships.mode);
  const favorites = useSelector((state) => state.starships.favorites);
  const dispatch = useDispatch();

  let bgColor;
  !mode ? (bgColor = "#011e30") : (bgColor = "#e5e4e496");

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link to="/">
          <img
            className="navbar-brand ms-5 logo"
            src="../images/logo.png"
            alt="Star wars logo"
          />
        </Link>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto ">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/starships" onClick={() => dispatch(backStarships())}>Starships</Link>
            </li>
            <li className="nav-item">
              <Link to={`/favourites/${favorites.length}`}>Favourites</Link>
            </li>
          </ul>

          <div
            className={`mode rounded-circle me-5 ${
              mode ? "mode-light" : "mode-dark"
            } `}
            onClick={() => dispatch(modeChange())}
          >
            {mode ? (
              <FontAwesomeIcon icon={faSun} className="text-warning" />
            ) : (
              <FontAwesomeIcon icon={faMoon} className="text-secondary" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
