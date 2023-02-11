import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

import Card from "../../components/Card";
import {
  fetchStarship,
  backStarships,
  fetchLoadMoreStarship,
  savePage,
} from "redux/StarWarsSlice";
import Search from "components/Search";
import Loading from "components/Loading";
import Error from "components/Error";

const Starships = () => {
  const starships = useSelector((state) => state.starships.items);
  const status = useSelector((state) => state.starships.status);

  const filteredStarship = useSelector(
    (state) => state.starships.filteredStarship
  );
  const page = useSelector((state) => state.starships.page);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStarship());
    let position = sessionStorage.getItem("position");
    if (position) {
      window.scrollTo(0, position);
    }
  }, [dispatch]);

  // page state sent to fetchLoadMoreStarships as parameter
  const handleClick = () => {
    dispatch(fetchLoadMoreStarship(page));
    if (page < 5) {
      dispatch(savePage(page + 1));
    }
  };

  if (status === "failed") {
    return <Error />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <Search />
      </div>
      <div className="row pb-5">
        {starships && filteredStarship.length < 1  && (
          <>
            {starships.map((starship, i) => (
              <Card key={starship.url} starship={starship} index={i} />
            ))}
            {status === "loading" && <Loading />}

            {starships.length > 0 && starships.length < 36 && (
              <div className="load-more-btn text-center mt-3">
                <button className="text-muted" onClick={handleClick}>
                  <span>Load More</span>
                </button>
              </div>
            )}
          </>
        )}
        {/*** starship parameter sent to Card when there is filteredStarship  **/}
        {filteredStarship.length > 0 && (
          <>
            {filteredStarship.map((starship) => (
              <Card key={starship.url} starship={starship} />
            ))}
            {status === "loading" && <Loading />}
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className=" back-page btn btn-link text-muted text-decoration-none d-flex align-items-center"
                onClick={() => dispatch(backStarships())}
              >
                <FontAwesomeIcon icon={faCaretLeft} className="fa-2x" />
                <span>Back to Starships Page</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Starships);
