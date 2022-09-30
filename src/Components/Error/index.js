import React from "react";
import { useSelector } from "react-redux";

const Error = () => {
  const error = useSelector((state) => state.starships.error);
  return (
    <div className="text-center text-muted mt-5">
      <div className="fs-4 ">{error}</div>
    </div>
  );
};

export default Error;
