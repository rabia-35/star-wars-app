import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchStarship } from "redux/StarWarsSlice";

const Search = () => {
  const [text, setText] = useState("");
  const error = useSelector((state) => state.starships.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (text.length > 2) {
      dispatch(searchStarship(text));
    }
  }, [dispatch, text]);

  return (
    <>
      <div className="d-flex justify-content-center">
        <form className="input-group  mb-3" onSubmit={() => setText("")}>
          <input
            type="search"
            className="form-control"
            placeholder="Enter Name or Model"
            aria-label="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
      </div>

      {error.length > 0 && (
        <div className=" align-items-center mt-2 text-center ">{error}</div>
      )}
    </>
  );
};

export default React.memo(Search);
