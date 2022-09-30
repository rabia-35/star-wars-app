import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { addFavorites, removeFavorites } from "Redux/starWars/starWarsSlice";

const Card = ({ starship }) => {
  const { number } = useParams();
  const favorites = useSelector((state) => state.starships.favorites);
  const [onStar, setOnStar] = useState();
  const dispatch = useDispatch();

  const detailName = starship.name.match(/\w+/g).join("-");

  useEffect(() => {
    if (onStar) {
      dispatch(addFavorites(starship));
    } else if (onStar === false) {
      dispatch(removeFavorites(starship.url));
    }
  }, [onStar]);

  const handleClick = () => {
    onStar ? setOnStar(false) : setOnStar(true);
  };

  return (
    <div className=" col-12 col-sm-6 col-lg-4  mx-auto ">
      <div className="card mb-3">
        <div className="row g-0">
          <Link
            to={`/starships/${detailName}`}
            className="col-md-6 img-background text-center py-4 px-md-"
          >
            <img
              src={`../images/starships/${detailName}.png`}
              className="img-fluid rounded-start"
              alt={detailName}
            />
          </Link>

          <div className="col-md-6 text-dark">
            <div className="card-body">
              <div className="card-info">
                <h1 className="card-title fs-6">{starship.name}</h1>
                <p className="card-text mb-1 mb-xl-0">
                  <strong>Model </strong>
                  <span className="ms-2 fst-italic">{starship.model}</span>
                </p>
                <p className="card-text text-muted">
                  <strong>Hyperdrive Rating </strong>
                  <span className="fst-italic">
                    {starship.hyperdrive_rating}
                  </span>
                </p>
              </div>

              <div className="d-flex justify-content-between">
                {!number && (
                  <div onClick={handleClick} role="button">
                    <FontAwesomeIcon
                      icon={faStar}
                      className={
                        favorites.includes(starship)
                          ? "text-warning"
                          : "text-secondary"
                      }
                    />
                  </div>
                )}
                {number && (
                  <div
                    role="button"
                    className="text-secondary"
                    onClick={() => dispatch(removeFavorites(starship.url))}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="trash-icon fs-5"
                    />
                  </div>
                )}
                <Link
                  to={`/starships/${detailName}`}
                  className="btn btn-outline-warning "
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;