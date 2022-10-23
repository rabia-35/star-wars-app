import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtered } from "Redux/starWars/starWarsSlice";

const Search = () => {
  const [text, setText] = useState("");
  const error = useSelector((state) => state.starships.error);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filtered(text));
    setText("");
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <form className="input-group  mb-3" onSubmit={handleSubmit}>
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

      {/*********** Error Message **********/}
      {error.length > 0 && (
        <div className=" align-items-center mt-2 text-center ">{error}</div>
      )}
    </>
  );
};

export default React.memo(Search);
