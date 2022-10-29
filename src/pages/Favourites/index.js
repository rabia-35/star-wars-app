import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import Card from "components/Card";

const Favourite = () => {
  const favorites = useSelector((state) => state.starships.favorites);

  return (
    <div className="container mt-5">
      <div className="row">
        {/** sending favorite data to card as parameter */}

        {favorites.length > 0 &&
          favorites.map((favorite) => (
            <Card key={favorite.url} starship={favorite} />
          ))}

        {favorites.length < 1 && (
          <div className="text-center text-muted fs-4 my-5">
            <p>There is no favorite starship.</p>
          </div>
        )}

        <div className="d-flex justify-content-center mt-5 ">
          <Link
            to="/starships"
            className="back-page text-muted text-decoration-none  d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faCaretLeft} className="fa-2x" />
            <span>Back to Starships Page</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Favourite);
