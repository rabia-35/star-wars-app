import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faChevronUp } from "@fortawesome/free-solid-svg-icons";

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

  //With page in default state All data is pulled and at the end of each page change page is saved to sessionLocal

  useEffect(() => {
    dispatch(fetchStarship());
    let position = sessionStorage.getItem("position");
    if (position) {
      window.scrollTo(0, position);
    }
  }, [dispatch]);

  const handleClick = () => {
    dispatch(fetchLoadMoreStarship(page));
    if (page < 6) {
      dispatch(savePage(page + 1));
    }
  };

  if (status === "failed") {
    return <Error />;
  }

  const scrollWin = () => {
    window.scrollTo(0, 0);
  };
  console.log(starships);
  return (
    <div className="container mt-5">
      <div className="row">
        <Search />
      </div>
      <div className="row pb-5">
        {/*** starship parameter sent to Card when there is starships and there is no filteredStarship  start **/}
        {starships && filteredStarship.length < 1 && (
          <>
            {starships.map((starship, i) => (
              <Card key={starship.url} starship={starship} index={i} />
            ))}

            {starships.length > 0 && starships.length < 36 && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-lg  btn-outline-warning"
                  onClick={handleClick}
                >
                  Load More
                </button>
              </div>
            )}
            <div
              role="button"
              className="text-center text-muted"
              onClick={scrollWin}
            >
              <FontAwesomeIcon icon={faChevronUp} className="fa-2x me-2" />
              <p>Back to top</p>
            </div>
          </>
        )}
        {/*** starship parameter sent to Card when there is starships and there is no filteredStarship ending */}

        {/*** starship parameter sent to Card when there is filteredStarship  start **/}
        {filteredStarship.length > 0 && (
          <>
            {filteredStarship.map((starship) => (
              <Card key={starship.url} starship={starship} />
            ))}
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
        {status === "loading" && <Loading />}
      </div>
    </div>
  );
};

export default React.memo(Starships);
