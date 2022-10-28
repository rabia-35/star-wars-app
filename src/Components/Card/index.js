import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { addFavorites, removeFavorites } from "redux/StarWarsSlice";

const Card = ({ starship }) => {
  const { number } = useParams();
  const favorites = useSelector((state) => state.starships.favorites);
  const [onStar, setOnStar] = useState();
  const dispatch = useDispatch();

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

  const removeFavoriteClick = () => {
    setOnStar(false);
  };
  const onFavorite = favorites.every((item) => item.url !== starship.url);

  const detailName = starship.name.match(/\w+/g).join("-");

  return (
    <div
      className=" col-12 col-sm-6 col-lg-4  mx-auto "
      onClick={() => sessionStorage.setItem("position", window.scrollY)}
    >
      <div className="card mb-3">
        <div className="row g-0">
          {/********** Link to detail page  start ***********/}
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
          {/**********  Link to detail page  ending **********/}
          <div className="col-md-6 text-dark">
            <div className="card-body">
              {/********* Card-info  start   ****************/}
              <div className="card-info">
                <h1 className="card-title fs-6">{starship.name}</h1>
                <p className="card-text  mb-lg-4">
                  <strong>Model </strong>
                  <span className="ms-2 fst-italic mb-5-lg">
                    {starship.model}
                  </span>
                </p>
                <p className="card-text text-muted">
                  <strong>Hyperdrive Rating </strong>
                  <span className="fst-italic">
                    {starship.hyperdrive_rating}
                  </span>
                </p>
              </div>
              {/************ Card-info ending  ************/}

              <div className="d-flex justify-content-between">
                {/**** Icon to show when number is not present start ****/}
                {!number && (
                  <div onClick={handleClick} role="button">
                    <FontAwesomeIcon
                      icon={faStar}
                      className={
                        onStar || !onFavorite
                          ? "text-warning"
                          : "text-secondary"
                      }
                    />
                  </div>
                )}
                {/******** Icon to show when number is not present ending *******/}

                {/********* Icon to show when number is present start **********/}
                {number && (
                  <div
                    role="button"
                    className="text-secondary"
                    onClick={removeFavoriteClick}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="trash-icon fs-5"
                    />
                  </div>
                )}
                {/********** Icon to show when number is present ending ********/}
                {/*********** Link to detail page start ***********/}
                <Link
                  to={`/starships/${detailName}`}
                  className="btn btn-outline-warning "
                >
                  Detail
                </Link>
                {/*********** Link to detail page ending ***********/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
