import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import Card from "./card";
import { fetchStarship, backStarships } from "Redux/starWars/starWarsSlice";
import Search from "Components/pages/Starships/search";
import Loading from "Components/Loading";
import Error from "Components/Error";

const Starships = () => {
  const starships = useSelector((state) => state.starships.items);
  const status = useSelector((state) => state.starships.status);

  const filteredStarship = useSelector(
    (state) => state.starships.filteredStarship
  );

  const [page, setPage] = useState(6);

  const dispatch = useDispatch();

  useEffect(() => {
    for (let i = 1; i < 5; i++) {
      dispatch(fetchStarship(i));
    }
  }, [dispatch]);

  const handleClick = () => {
    setPage(page + 6);
  };

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "failed") {
    return <Error />;
  }

  const scrollWin = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <Search />
      </div>
      <div className="row pb-5">
        {starships && filteredStarship.length < 1 && (
          <>
            {starships.map(
              (starship, i) =>
                i < page && <Card key={starship.url} starship={starship} />
            )}

            {starships && page < 36 && (
              <div className="text-center">
                <button
                  className="btn btn-lg  btn-outline-warning mt-5"
                  onClick={handleClick}
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
        {filteredStarship.length > 0 && (
          <>
            <Card starship={filteredStarship[0]} />
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
        {filteredStarship.length < 1 && (
          <div
            role="button"
            className="text-muted text-center mt-3"
            onClick={scrollWin}
          >
            <FontAwesomeIcon icon={faChevronUp} className="fa-2x me-2" />
            <p>Başa Dön</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Starships;
