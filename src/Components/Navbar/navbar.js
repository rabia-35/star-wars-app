import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { modeChange } from "Redux/starWars/starWarsSlice";
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
        {/**  Logo start  */}
        <Link to="/">
          <img
            className="navbar-brand ms-5 logo"
            src="../images/logo.png"
            alt="Star wars logo"
          />
        </Link>
        {/** Logo ending   */}

        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          {/** Nav-item start */}
          <ul className="navbar-nav me-auto ">
            <li className="nav-item mx-5">
              <Link to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link to={`/starships`}>STARSHİPS</Link>
            </li>
            <li className="nav-item mx-5">
              <Link to={`/favourites/${favorites.length}`}>FAVORİTES</Link>
            </li>
          </ul>
          {/** Nav-item ending */}
          {/** Mode button start */}
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
          {/** Mode button ending */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
