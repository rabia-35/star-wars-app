import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {Link } from "react-router-dom";

import { addFavorites, removeFavorites } from "redux/StarWarsSlice";

const CardInfo = (props) => {
  const favorites = useSelector((state) => state.starships.favorites);
  const [onStar, setOnStar] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (onStar) {
      dispatch(addFavorites(props.starship));
    } else if (onStar === false) {
      dispatch(removeFavorites(props.starship.url));
    }
  }, [onStar]);

  const handleClick = () => {
    onStar ? setOnStar(false) : setOnStar(true);
    
  };

  const removeFavoriteClick = () => {
    setOnStar(false);
   
  };
  const onFavorite = favorites.every((item) => item.url !== props.starship.url);

  return (
      <div className="card-body">
        <ul>
          <li className="card-text  mb-lg-4">
            <strong>Model </strong>
            <span className="ms-2 fst-italic mb-5-lg">
              {props.starship.model}
            </span>
          </li>
          <li className="card-text">
            <strong>Hyperdrive Rating </strong>
            <span className="fst-italic">
              {props.starship.hyperdrive_rating}
            </span>
          </li>
          <li>
            {!props.number &&(
              <FontAwesomeIcon onClick={handleClick} icon={faStar}  className={ onStar || !onFavorite ? "text-warning" : "text-secondary" } />
            )}
            {props.number &&(
              <FontAwesomeIcon onClick={removeFavoriteClick} icon={faTrashCan} className="trash-icon fs-5" />
            )}
             <Link to={`/starships/${props.detailName}`}>
            <button className="btn detail-btn" >Detail</button>
          </Link>
          </li>
        </ul>
      </div>

  );
};

export default CardInfo;
