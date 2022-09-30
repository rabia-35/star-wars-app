import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { backStarships } from "Redux/starWars/starWarsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.starships.mode);

  let bgImage = "";

  !mode ? (bgImage = "../images/dark.jpg") : (bgImage = "../images/light.jpg");

  return (
    <div
      className="home d-flex align-items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="container">
        <div className="row justify-content-end align-items-center">
          {!mode && (
            <div className="col-12 col-lg-6">
              <img
                src="../images/starships/Death-Star.png"
                alt="death star image"
              />
            </div>
          )}
          <div className="col-12 col-lg-6 text-center">
            <h1>WELCOME TO THE STAR WARS UNIVERSSE</h1>
            <p className="w-75 mt-3">
              ARE YOU READY TO TAKE A RİDE AMONG THE STARSHİPS OF STAR WARS ?
            </p>
            <Link
              to="/starships"
              className="btn btn-outline-warning mx-auto mt-4"
              onClick={() => dispatch(backStarships())}
            >
              All Starships
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home);
